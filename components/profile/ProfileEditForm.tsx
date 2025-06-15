// src/components/ProfileEditForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserProfile } from "@/types";
import React, { useEffect, useMemo, useState } from "react";

import { addOrUpdateProfile } from "@/app/admin/lib/profileStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Province {
  id: number;
  name: string;
  districts: { id: number; name: string }[];
}

interface ProfileEditFormProps {
  initialProfile: UserProfile | null; // Bu prop hali ham kelishi mumkin
  onSave: (profile: UserProfile) => void;
  onCancel: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ initialProfile, onSave, onCancel }) => {
  const [profile, setProfile] = useState<UserProfile>(
    initialProfile || {
      userId: "",
      fullName: "",
      age: null,
      experienceYears: null,
      education: null,
      phone: null,
      email: "",
      telegram: null,
      linkedin: null,
      aboutMe: null,
      skills: [],
      desiredPosition: null,
      expectedSalary: null,
      preferredProvince: null,
      preferredDistrict: null,
      readyToRelocate: false,
      resumeLink: null,
    },
  );

  const [newSkill, setNewSkill] = useState("");

  // Hududiy ma'lumotlar - bu qismi o'zgarishsiz qoladi
  const provinces: Province[] = useMemo(
    () => [
      {
        id: 1,
        name: "Toshkent shahri",
        districts: [
          { id: 1, name: "Chilonzor tumani" },
          { id: 2, name: "Mirzo Ulug'bek tumani" },
          { id: 3, name: "Yunusobod tumani" },
        ],
      },
      {
        id: 2,
        name: "Toshkent viloyati",
        districts: [
          { id: 4, name: "Zangiota tumani" },
          { id: 5, name: "Qibray tumani" },
          { id: 6, name: "Parkent tumani" },
        ],
      },
      {
        id: 3,
        name: "Samarqand viloyati",
        districts: [
          { id: 7, name: "Samarqand shahri" },
          { id: 8, name: "Tayloq tumani" },
          { id: 9, name: "Pastdarg'om tumani" },
        ],
      },
      {
        id: 4,
        name: "Andijon viloyati",
        districts: [
          { id: 10, name: "Andijon shahri" },
          { id: 11, name: "Asaka tumani" },
          { id: 12, name: "Xonobod shahri" },
        ],
      },
      {
        id: 5,
        name: "Farg'ona viloyati",
        districts: [
          { id: 13, name: "Farg'ona shahri" },
          { id: 14, name: "Marg'ilon shahri" },
          { id: 15, name: "Quva tumani" },
        ],
      },
      {
        id: 6,
        name: "Namangan viloyati",
        districts: [
          { id: 16, name: "Namangan shahri" },
          { id: 17, name: "Chust tumani" },
          { id: 18, name: "Pop tumani" },
        ],
      },
    ],
    [],
  );

  // Bu useEffect initialProfile prop o'zgarganda (masalan, yuklangan profil kelganda)
  // profildagi holatni yangilaydi. Agar siz har doim qo'lda to'ldirishni xohlasangiz,
  // bu useEffect'ni olib tashlashingiz yoki uni o'zgartirishingiz mumkin.
  // Lekin agar ba'zida mavjud profilni tahrirlash (yuklash) ham kerak bo'lsa,
  // bu qism qolishi kerak.
  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
    }
  }, [initialProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setProfile((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (name === "age" || name === "experienceYears") {
      setProfile((prev) => ({ ...prev, [name]: value === "" ? null : Number(value) }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value === "" ? null : value }));
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "" && !profile.skills.includes(newSkill.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOrUpdateProfile(profile); // <-- local massivga yozamiz
    onSave(profile); // Bu parent componentga xabar berish
  };

  const availableDistricts = useMemo(() => {
    const province = provinces.find((p) => p.name === profile.preferredProvince);
    return province ? province.districts : [];
  }, [profile.preferredProvince, provinces]);

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Profilni Tahrirlash</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Shaxsiy ma'lumotlar */}
          <div>
            <h5 className="text-xl font-semibold mb-3">Shaxsiy ma'lumotlar</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName">Ism Familiya</label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  placeholder="Ism Familiyangiz"
                  className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="age">Yosh</label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={profile.age ?? ""}
                  onChange={handleChange}
                  placeholder="Yoshingiz"
                  className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="experienceYears">Tajriba (yil)</label>
                <Input
                  id="experienceYears"
                  name="experienceYears"
                  type="number"
                  value={profile.experienceYears ?? ""}
                  onChange={handleChange}
                  placeholder="Tajribangiz (yil)"
                  className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="education">Ma'lumot</label>
                <Input
                  id="education"
                  name="education"
                  value={profile.education || ""}
                  onChange={handleChange}
                  placeholder="Misol: Bakalavr, Magistr"
                  className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Bog'lanish ma'lumotlari */}
          <div>
            <h5 className="text-xl font-semibold mb-3">Bog'lanish ma'lumotlari</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone">Telefon raqami</label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profile.phone || ""}
                  onChange={handleChange}
                  placeholder="+998 XX XXX XX XX"
                  className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="telegram">Telegram username</label>
                <Input
                  id="telegram"
                  name="telegram"
                  value={profile.telegram || ""}
                  onChange={handleChange}
                  placeholder="@username"
                  className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="linkedin">LinkedIn profil</label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={profile.linkedin || ""}
                  onChange={handleChange}
                  placeholder="LinkedIn profil linki"
                  className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Men haqimda */}
          <div>
            <label htmlFor="aboutMe">Men haqimda</label>
            <Textarea
              id="aboutMe"
              name="aboutMe"
              value={profile.aboutMe || ""}
              onChange={handleChange}
              placeholder="O'zingiz haqingizda qisqa ma'lumot kiriting..."
              rows={4}
              className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Ko'nikmalar */}
          <div>
            <label htmlFor="skills">Ko'nikmalar</label>
            <div className="flex gap-2 mb-2">
              <Input
                id="newSkill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Yangi ko'nikma qo'shish"
                className="flex-grow bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
              />
              <Button type="button" onClick={handleAddSkill} className="bg-green-600 hover:bg-green-700 text-white">
                Qo'shish
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1 dark:bg-blue-900 dark:text-blue-200"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1 text-blue-600 dark:text-blue-200 hover:text-blue-800 dark:hover:text-blue-50 text-xl leading-none"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Qidirilayotgan ish */}
          <div>
            <h5 className="text-xl font-semibold mb-3">Qidirilayotgan ish</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="desiredPosition">Qidirayotgan lavozim</label>
                <Input
                  id="desiredPosition"
                  name="desiredPosition"
                  value={profile.desiredPosition || ""}
                  onChange={handleChange}
                  placeholder="Misol: Frontend Dasturchi"
                  className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="expectedSalary">Kutilayotgan oylik</label>
                <Input
                  id="expectedSalary"
                  name="expectedSalary"
                  value={profile.expectedSalary || ""}
                  onChange={handleChange}
                  placeholder="Misol: 8-12 million so'm"
                  className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="preferredProvince">Afzal ko'rgan viloyat</label>
                <select
                  id="preferredProvince"
                  name="preferredProvince"
                  value={profile.preferredProvince || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                >
                  <option value="">Viloyatni tanlang</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="preferredDistrict">Afzal ko'rgan tuman</label>
                <select
                  id="preferredDistrict"
                  name="preferredDistrict"
                  value={profile.preferredDistrict || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                  disabled={!profile.preferredProvince}
                >
                  <option value="">Tumanni tanlang</option>
                  {availableDistricts.map((district) => (
                    <option key={district.id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  id="readyToRelocate"
                  name="readyToRelocate"
                  checked={profile.readyToRelocate}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500
                                 dark:bg-gray-600 dark:border-gray-500 dark:checked:bg-blue-600 dark:checked:border-transparent"
                />
                <label htmlFor="readyToRelocate">Ko'chishga tayyorman</label>
              </div>
            </div>
          </div>

          {/* Tugmalar */}
          <div className="flex justify-end gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-gray-300 text-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Bekor qilish
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              Saqlash
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileEditForm;
