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

  // Agar xohlasangiz, shu yerda mavjud profilni yuklash uchun useEffect yozish mumkin

  // Formdagi inputlarni boshqarish uchun umumiy handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6 p-4 bg-white rounded shadow dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4">Profilni tahrirlash</h2>

      <div>
        <label htmlFor="fullName" className="block mb-1 font-semibold">
          Ism Familiya
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="age" className="block mb-1 font-semibold">
          Yosh
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={form.age || ""}
          onChange={handleChange}
          min={0}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="experienceYears" className="block mb-1 font-semibold">
          Tajriba (yil)
        </label>
        <input
          type="number"
          id="experienceYears"
          name="experienceYears"
          value={form.experienceYears || ""}
          onChange={handleChange}
          min={0}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="education" className="block mb-1 font-semibold">
          Ma'lumot
        </label>
        <input
          type="text"
          id="education"
          name="education"
          value={form.education}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block mb-1 font-semibold">
          Telefon
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="telegram" className="block mb-1 font-semibold">
          Telegram
        </label>
        <input
          type="text"
          id="telegram"
          name="telegram"
          value={form.telegram || ""}
          onChange={handleChange}
          placeholder="@username"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="linkedin" className="block mb-1 font-semibold">
          LinkedIn
        </label>
        <input
          type="text"
          id="linkedin"
          name="linkedin"
          value={form.linkedin || ""}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/your-profile"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="aboutMe" className="block mb-1 font-semibold">
          Men haqimda
        </label>
        <textarea
          id="aboutMe"
          name="aboutMe"
          value={form.aboutMe || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>

      <div>
        <label htmlFor="skills" className="block mb-1 font-semibold">
          Ko'nikmalar (vergul bilan ajrating)
        </label>
        <input
          type="text"
          id="skills"
          name="skills"
          value={form.skills.join(", ")}
          onChange={handleSkillsChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="desiredPosition" className="block mb-1 font-semibold">
          Qidirilayotgan lavozim
        </label>
        <input
          type="text"
          id="desiredPosition"
          name="desiredPosition"
          value={form.desiredPosition || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="expectedSalary" className="block mb-1 font-semibold">
          Kutilayotgan oylik
        </label>
        <input
          type="text"
          id="expectedSalary"
          name="expectedSalary"
          value={form.expectedSalary || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="preferredProvince" className="block mb-1 font-semibold">
          Afzal ko'rgan viloyat
        </label>
        <input
          type="text"
          id="preferredProvince"
          name="preferredProvince"
          value={form.preferredProvince || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="preferredDistrict" className="block mb-1 font-semibold">
          Afzal ko'rgan tuman
        </label>
        <input
          type="text"
          id="preferredDistrict"
          name="preferredDistrict"
          value={form.preferredDistrict || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="readyToRelocate"
          name="readyToRelocate"
          checked={form.readyToRelocate || false}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <label htmlFor="readyToRelocate" className="font-semibold">
          Ko'chishga tayyorman
        </label>
      </div>

      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        Saqlash
      </Button>
    </form>
  );
};

export default ProfileForm;
