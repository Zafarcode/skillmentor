"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type ProfileData = {
  userId: number | undefined; // userId 0 yoki undefined bo'lishi mumkin
  email: string;
  fullName: string;
  age: number | undefined;
  experienceYears: number | undefined;
  education: string;
  phone: string;
  telegram: string;
  linkedin: string;
  aboutMe: string;
  skills: string[]; // Ma'lumotlar bazasida TEXT[] tipida bo'lsa, bu to'g'ri
  desiredPosition: string;
  expectedSalary: string;
  preferredProvince: string;
  preferredDistrict: string;
  readyToRelocate: boolean;
};

const ProfileForm = () => {
  const [form, setForm] = useState<ProfileData>({
    userId: undefined, // Yangi profillar uchun undefined qilib qo'yilgan
    email: "",
    fullName: "",
    age: undefined,
    experienceYears: undefined,
    education: "",
    phone: "",
    telegram: "",
    linkedin: "",
    aboutMe: "",
    skills: [],
    desiredPosition: "",
    expectedSalary: "",
    preferredProvince: "",
    preferredDistrict: "",
    readyToRelocate: false,
  });

  // Holatni boshqarish uchun loading state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mavjud profil ma'lumotlarini yuklash uchun useEffect
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // userId: 1 deb belgilangan joyni, o'z autentifikatsiya tizimingizdan keladigan userId bilan almashtiring.
        // Hozirgi holatda backend /api/profile/current-user ga GET so'rovi yuborilganda
        // userId: 1 bo'lgan profilni qaytarishini kutamiz.
        const res = await fetch("/api/profile/current-user", { cache: "no-store" });

        if (res.ok) {
          const data: ProfileData = await res.json();

          // Bazadan kelgan `null` yoki bo'sh stringlarni `undefined` yoki `false` ga o'zgartirish
          // Bu, form holatining tipiga (number | undefined) mos kelishini ta'minlaydi.
          setForm({
            userId: data.userId || undefined, // Agar userId 0 bo'lsa ham undefined bo'ladi, tekshiring
            email: data.email,
            fullName: data.fullName,
            age: data.age ?? undefined, // null yoki undefined kelishini hisobga olgan holda
            experienceYears: data.experienceYears ?? undefined,
            education: data.education,
            phone: data.phone,
            telegram: data.telegram,
            linkedin: data.linkedin,
            aboutMe: data.aboutMe,
            skills: Array.isArray(data.skills) ? data.skills : [], // skills doim array bo'lishi kerak
            desiredPosition: data.desiredPosition,
            expectedSalary: data.expectedSalary,
            preferredProvince: data.preferredProvince,
            preferredDistrict: data.preferredDistrict,
            readyToRelocate: data.readyToRelocate || false,
          });
          console.log("Mavjud profil yuklandi:", data);
        } else if (res.status === 404) {
          // Agar profil topilmasa (yangi foydalanuvchi)
          console.warn("Mavjud profil topilmadi. Yangi profil yaratilmoqda.");
          // Form o'zining initial empty state'ida qoladi.
          setForm({
            // State ni tozalab, yangi profil uchun tayyorlash
            userId: undefined,
            email: "",
            fullName: "",
            age: undefined,
            experienceYears: undefined,
            education: "",
            phone: "",
            telegram: "",
            linkedin: "",
            aboutMe: "",
            skills: [],
            desiredPosition: "",
            expectedSalary: "",
            preferredProvince: "",
            preferredDistrict: "",
            readyToRelocate: false,
          });
        } else {
          const errorData = await res.json();
          setError(`Profilni yuklashda xato: ${errorData.message || res.statusText}`);
          console.error("Profilni yuklashda xato yuz berdi:", res.status, errorData);
        }
      } catch (err) {
        console.error("Profilni yuklashda tarmoq yoki server xatosi:", err);
        setError("Profilni yuklashda tarmoq xatosi yoki serverga ulanishda muammo yuz berdi.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []); // Bo'sh massiv komponent yuklanganda bir marta ishlashini ta'minlaydi

  // Barcha turdagi inputlar uchun umumiy o'zgarishlarni boshqaruvchi funksiya
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let processedValue: string | number | boolean | undefined = value;

    if (type === "checkbox") {
      processedValue = (e.target as HTMLInputElement).checked;
    } else if (type === "number") {
      // Raqam maydonlarini parseInt qilib, bo'sh bo'lsa undefined qilish
      processedValue = value === "" ? undefined : parseInt(value, 10);
    }

    setForm((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  // Ko'nikmalar (skills) inputi uchun maxsus o'zgarishlarni boshqaruvchi funksiya
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillsArray = e.target.value
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== ""); // Bo'sh stringlarni o'chirish
    setForm((prev) => ({
      ...prev,
      skills: skillsArray,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Oldingi xatolarni tozalash

    // userId mavjud bo'lsa PUT, aks holda POST
    const method = form.userId ? "PUT" : "POST";
    const apiUrl = "/api/profile"; // Profil amallari uchun API nuqtasi

    console.log("Forma yuborilmoqda, usul:", method, "va ma'lumotlar:", form);

    try {
      const res = await fetch(apiUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        let errorMessage = res.statusText;
        try {
          const errorData = await res.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (parseError) {
          console.warn("Xato javobini tahlil qilishda xato:", parseError);
        }

        console.error("Profilni saqlashda xato:", res.status, errorMessage);
        setError(`Profilni saqlashda xato yuz berdi: ${errorMessage}`);
        alert(`Profilni saqlashda xato yuz berdi: ${errorMessage}`);
        return;
      }

      const responseData = await res.json();
      if (method === "POST" && responseData.userId) {
        setForm((prev) => ({ ...prev, userId: responseData.userId })); // Yangi userId ni statega saqlash
        alert("Yangi profil muvaffaqiyatli yaratildi!");
        console.log("Yangi profil yaratildi, ID:", responseData.userId);
      } else {
        alert("Profil muvaffaqiyatli saqlandi!");
      }

      // Opsional: Foydalanuvchini boshqa sahifaga yo'naltirish
      // router.push("/profile-dashboard");
    } catch (err) {
      console.error("Profilni saqlashda tarmoq xatosi:", err);
      setError("Tarmoq xatosi yoki serverga ulanishda muammo yuz berdi.");
      alert("Tarmoq xatosi yoki serverga ulanishda muammo yuz berdi.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-950 dark:to-gray-850">
        <p className="text-xl text-indigo-700 dark:text-indigo-300">Profil yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-950 dark:to-gray-850 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl w-full bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-3xl space-y-10 border border-gray-100 dark:border-gray-700 transition-all duration-300 ease-in-out"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
            Profilni Tahrirlash
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Shaxsiy ma'lumotlaringizni to'ldiring yoki yangilang.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Xato: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* --- Shaxsiy Ma'lumotlar Qismi --- */}
        <section>
          <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-6 pb-2 border-b-2 border-indigo-200 dark:border-indigo-700">
            Shaxsiy Ma'lumotlar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label htmlFor="userId" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Foydalanuvchi ID
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={form.userId ?? ""} // userId undefined bo'lsa, bo'sh string ko'rsatadi
                readOnly // userId faqat o'qish uchun
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                placeholder="Avtomatik yaratiladi / yuklanadi"
              />
            </div>
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Ism Familiya <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 ease-in-out"
                placeholder="Falonchi Falonchiyev"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 ease-in-out"
                placeholder="siz@example.com"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Yosh
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={form.age ?? ""} // null/undefined bo'lsa bo'sh string ko'rsatish
                onChange={handleChange}
                min={0}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 ease-in-out"
                placeholder="Masalan, 25"
              />
            </div>

            <div>
              <label
                htmlFor="experienceYears"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Tajriba (yil)
              </label>
              <input
                type="number"
                id="experienceYears"
                name="experienceYears"
                value={form.experienceYears ?? ""} // null/undefined bo'lsa bo'sh string ko'rsatish
                onChange={handleChange}
                min={0}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 ease-in-out"
                placeholder="Masalan, 3"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="education" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Ma'lumot <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="education"
                name="education"
                value={form.education}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 ease-in-out"
                placeholder="Oliy, O'rta maxsus va h.k."
              />
            </div>
          </div>
        </section>

        {/* --- Aloqa Ma'lumotlari Qismi --- */}
        <section>
          <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-6 pb-2 border-b-2 border-indigo-200 dark:border-indigo-700">
            Aloqa Ma'lumotlari
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Telefon
              </label>
              <input
                type="tel" // Semantic uchun tel
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 ease-in-out"
                placeholder="+998 XX XXX XX XX"
              />
            </div>

            <div>
              <label htmlFor="telegram" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Telegram
              </label>
              <input
                type="text"
                id="telegram"
                name="telegram"
                value={form.telegram}
                onChange={handleChange}
                placeholder="@username"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 ease-in-out"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                LinkedIn Profilingiz
              </label>
              <input
                type="url" // URL tipi semantika va validatsiya uchun
                id="linkedin"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/your-profile"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 ease-in-out"
              />
            </div>
          </div>
        </section>

        {/* --- Qo'shimcha Ma'lumotlar Qismi --- */}
        <section>
          <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-6 pb-2 border-b-2 border-indigo-200 dark:border-indigo-700">
            Qo'shimcha Ma'lumotlar
          </h3>
          <div>
            <label htmlFor="aboutMe" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Men haqimda
            </label>
            <textarea
              id="aboutMe"
              name="aboutMe"
              value={form.aboutMe}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 min-h-[120px] transition duration-150 ease-in-out resize-y"
              rows={4}
              placeholder="O'zingiz haqingizda qisqacha ma'lumot bering, tajribangiz, yutuqlaringiz va maqsadlaringizni kiriting."
            />
          </div>

          <div className="mt-6">
            <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Ko'nikmalar (vergul bilan ajrating)
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={form.skills.join(", ")}
              onChange={handleSkillsChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 ease-in-out"
              placeholder="React, Next.js, JavaScript, CSS, Figma"
            />
          </div>
        </section>

        {/* --- Ish Izlash Ma'lumotlari --- */}
        <section>
          <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-6 pb-2 border-b-2 border-indigo-200 dark:border-indigo-700">
            Ish Izlash Ma'lumotlari
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label
                htmlFor="desiredPosition"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Qidirilayotgan lavozim
              </label>
              <input
                type="text"
                id="desiredPosition"
                name="desiredPosition"
                value={form.desiredPosition}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 ease-in-out"
                placeholder="Dasturchi, Dizayner, Menejer"
              />
            </div>

            <div>
              <label
                htmlFor="expectedSalary"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Kutilayotgan oylik
              </label>
              <input
                type="text"
                id="expectedSalary"
                name="expectedSalary"
                value={form.expectedSalary}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 ease-in-out"
                placeholder="Masalan, 500$ - 1000$"
              />
            </div>

            <div>
              <label
                htmlFor="preferredProvince"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Afzal ko'rgan viloyat
              </label>
              <input
                type="text"
                id="preferredProvince"
                name="preferredProvince"
                value={form.preferredProvince}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 ease-in-out"
                placeholder="Toshkent shahri, Samarqand"
              />
            </div>

            <div>
              <label
                htmlFor="preferredDistrict"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Afzal ko'rgan tuman
              </label>
              <input
                type="text"
                id="preferredDistrict"
                name="preferredDistrict"
                value={form.preferredDistrict}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition duration-150 ease-in-out"
                placeholder="Chilonzor, Shayxontohur"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 mt-8">
            <input
              type="checkbox"
              id="readyToRelocate"
              name="readyToRelocate"
              checked={form.readyToRelocate || false} // Undefined bo'lsa false bo'lishini ta'minlash
              onChange={handleChange}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 transition duration-150 ease-in-out"
            />
            <label
              htmlFor="readyToRelocate"
              className="text-base font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
            >
              Ko'chishga tayyorman
            </label>
          </div>
        </section>

        <Button
          type="submit"
          className="w-full flex justify-center py-3.5 px-6 border border-transparent rounded-lg shadow-md text-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg"
        >
          Profilni Saqlash
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
