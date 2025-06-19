"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

type ProfileData = {
  userId?: number;
  email: string;
  fullName: string;
  age?: number;
  experienceYears?: number;
  education: string;
  phone?: string;
  telegram?: string;
  linkedin?: string;
  aboutMe?: string;
  skills: string[];
  desiredPosition?: string;
  expectedSalary?: string;
  preferredProvince?: string;
  preferredDistrict?: string;
  readyToRelocate?: boolean;
};

const ProfileForm = () => {
  const [form, setForm] = useState<ProfileData>({
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

  // Agar mavjud profilni yuklash kerak bo'lsa, shu yerda useEffect yozish mumkin

  // Formdagi inputlarni boshqarish uchun umumiy handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Checkbox uchun alohida holatni tekshiramiz
    const inputValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  // Skills uchun maxsus input (comma-separated string)
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillsArray = e.target.value.split(",").map((skill) => skill.trim());
    setForm((prev) => ({
      ...prev,
      skills: skillsArray,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/profile", {
        method: "POST", // yoki PUT agar tahrirlash bo'lsa
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        console.error("Profilni saqlashda xatolik:", res.statusText);
        alert("Profilni saqlashda xatolik yuz berdi.");
        return;
      }

      alert("Profil muvaffaqiyatli saqlandi!");
      // Shu yerda redirect yoki boshqa harakat qilish mumkin
    } catch (error) {
      console.error("Profilni saqlashda xatolik:", error);
      alert("Profilni saqlashda xatolik yuz berdi.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl w-full bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl space-y-8 border border-gray-100 dark:border-gray-700"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            Profilni Ma'lumotlarini To'ldirish
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Shaxsiy ma'lumotlaringizni to'ldiring yoki yangilang.</p>
        </div>

        {/* Shaxsiy Ma'lumotlar Qismi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Id <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={form.userId}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder=""
            />
          </div>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ism Familiya <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Falonchi Falonchiyev"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="siz@example.com"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Yosh
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={form.age || ""}
              onChange={handleChange}
              min={0}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Masalan, 25"
            />
          </div>

          <div>
            <label
              htmlFor="experienceYears"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Tajriba (yil)
            </label>
            <input
              type="number"
              id="experienceYears"
              name="experienceYears"
              value={form.experienceYears || ""}
              onChange={handleChange}
              min={0}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Masalan, 3"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="education" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ma'lumot <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="education"
              name="education"
              value={form.education}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Oliy, O'rta maxsus va h.k."
            />
          </div>
        </div>

        {/* Aloqa Ma'lumotlari Qismi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Telefon
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="+998 XX XXX XX XX"
            />
          </div>

          <div>
            <label htmlFor="telegram" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Telegram
            </label>
            <input
              type="text"
              id="telegram"
              name="telegram"
              value={form.telegram || ""}
              onChange={handleChange}
              placeholder="@username"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              LinkedIn
            </label>
            <input
              type="text"
              id="linkedin"
              name="linkedin"
              value={form.linkedin || ""}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/your-profile"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
        </div>

        {/* Qo'shimcha Ma'lumotlar Qismi */}
        <div>
          <label htmlFor="aboutMe" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Men haqimda
          </label>
          <textarea
            id="aboutMe"
            name="aboutMe"
            value={form.aboutMe || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 min-h-[100px]"
            rows={4}
            placeholder="O'zingiz haqingizda qisqacha ma'lumot bering..."
          />
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ko'nikmalar (vergul bilan ajrating)
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={form.skills.join(", ")}
            onChange={handleSkillsChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="React, Next.js, JavaScript, CSS"
          />
        </div>

        {/* Ish Izlash Ma'lumotlari */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="desiredPosition"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Qidirilayotgan lavozim
            </label>
            <input
              type="text"
              id="desiredPosition"
              name="desiredPosition"
              value={form.desiredPosition || ""}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Dasturchi, Dizayner, Menejer"
            />
          </div>

          <div>
            <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Kutilayotgan oylik
            </label>
            <input
              type="text"
              id="expectedSalary"
              name="expectedSalary"
              value={form.expectedSalary || ""}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Masalan, 500$"
            />
          </div>

          <div>
            <label
              htmlFor="preferredProvince"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Afzal ko'rgan viloyat
            </label>
            <input
              type="text"
              id="preferredProvince"
              name="preferredProvince"
              value={form.preferredProvince || ""}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Toshkent shahri, Samarqand"
            />
          </div>

          <div>
            <label
              htmlFor="preferredDistrict"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Afzal ko'rgan tuman
            </label>
            <input
              type="text"
              id="preferredDistrict"
              name="preferredDistrict"
              value={form.preferredDistrict || ""}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Chilonzor, Shayxontohur"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 mt-6">
          <input
            type="checkbox"
            id="readyToRelocate"
            name="readyToRelocate"
            checked={form.readyToRelocate || false}
            onChange={handleChange}
            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="readyToRelocate"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            Ko'chishga tayyorman
          </label>
        </div>

        <Button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition duration-300 ease-in-out transform hover:scale-[1.01]"
        >
          Profilni Saqlash
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
