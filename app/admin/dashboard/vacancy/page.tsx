// app/admin/dashboard/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { getVacancies, saveVacancies } from "@/lib/storage";
import { TestQuestion, Vacancy } from "@/types";
import { Briefcase, DollarSign, MapPin, Plus, Rocket, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const generateUniqueId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
};

const provinces = [
  // Qoraqalpogʻiston AR
  {
    id: 1,
    name: "Qoraqalpogʻiston AR",
    districts: [
      { id: 1, name: "Nukus shahri" },
      { id: 2, name: "Amudaryo tumani" },
      { id: 3, name: "Beruniy tumani" },
      { id: 4, name: "Boʻzatov tumani" },
      { id: 5, name: "Qanlikoʻl tumani" },
      { id: 6, name: "Qoraoʻzak tumani" },
      { id: 7, name: "Qoʻngʻirot tumani" },
      { id: 8, name: "Kegeyli tumani" },
      { id: 9, name: "Moʻynoq tumani" },
      { id: 10, name: "Nukus tumani" },
      { id: 11, name: "Taxiatosh tumani" },
      { id: 12, name: "Taxtakoʻpir tumani" },
      { id: 13, name: "Toʻrtkoʻl tumani" },
      { id: 14, name: "Xoʻjayli tumani" },
      { id: 15, name: "Chimboy tumani" },
      { id: 16, name: "Shoʻmanoy tumani" },
      { id: 17, name: "Ellikqalʻa tumani" },
    ],
  },
  // Toshkent shahri
  {
    id: 2,
    name: "Toshkent shahri",
    districts: [
      { id: 1, name: "Bektemir" },
      { id: 2, name: "Chilonzor" },
      { id: 3, name: "Yakkasaroy" },
      { id: 4, name: "Shayxontohur" },
      { id: 5, name: "Yunusobod" },
      { id: 6, name: "Uchtepa" },
      { id: 7, name: "Olmazor" },
      { id: 8, name: "Mirobod" },
      { id: 9, name: "Mirzo Ulugʻbek" },
      { id: 10, name: "Sergeli" },
      { id: 11, name: "Yashnobod" },
      { id: 12, name: "Yangihayot" },
    ],
  },
  // Toshkent viloyati
  {
    id: 3,
    name: "Toshkent viloyati",
    districts: [
      { id: 1, name: "Bekobod tumani" },
      { id: 2, name: "Boʻka tumani" },
      { id: 3, name: "Boʻstonliq tumani" },
      { id: 4, name: "Chinoz tumani" },
      { id: 5, name: "Ohangaron tumani" },
      { id: 6, name: "Oqqoʻrgʻon tumani" },
      { id: 7, name: "Parkent tumani" },
      { id: 8, name: "Piskent tumani" },
      { id: 9, name: "Quyichirchiq tumani" },
      { id: 10, name: "Yangiyoʻl tumani" },
      { id: 11, name: "Zangiota tumani" },
      { id: 12, name: "Oʻrtachirchiq tumani" },
      { id: 13, name: "Yuqorichirchiq tumani" },
      { id: 14, name: "Toshkent tumani" },
      { id: 15, name: "Olmaliq shahri" },
      { id: 16, name: "Angren shahri" },
    ],
  },
  // Andijon viloyati
  {
    id: 4,
    name: "Andijon viloyati",
    districts: [
      { id: 1, name: "Andijon shahri" },
      { id: 2, name: "Xonobod shahri" },
      { id: 3, name: "Andijon tumani" },
      { id: 4, name: "Asaka tumani" },
      { id: 5, name: "Baliqchi tumani" },
      { id: 6, name: "Boʻz tumani" },
      { id: 7, name: "Buloqboshi tumani" },
      { id: 8, name: "Izboskan tumani" },
      { id: 9, name: "Jalaquduq tumani" },
      { id: 10, name: "Xoʻjaobod tumani" },
      { id: 11, name: "Qoʻrgʻontepa tumani" },
      { id: 12, name: "Marhamat tumani" },
      { id: 13, name: "Oltinkoʻl tumani" },
      { id: 14, name: "Paxtaobod tumani" },
      { id: 15, name: "Shahrixon tumani" },
      { id: 16, name: "Ulugʻnor tumani" },
    ],
  },
  // Buxoro viloyati
  {
    id: 5,
    name: "Buxoro viloyati",
    districts: [
      { id: 1, name: "Buxoro shahri" },
      { id: 2, name: "Kogon shahri" },
      { id: 3, name: "Buxoro tumani" },
      { id: 4, name: "G‘ijduvon tumani" },
      { id: 5, name: "Jondor tumani" },
      { id: 6, name: "Kogon tumani" },
      { id: 7, name: "Olot tumani" },
      { id: 8, name: "Peshku tumani" },
      { id: 9, name: "Romitan tumani" },
      { id: 10, name: "Shofirkon tumani" },
      { id: 11, name: "Vobkent tumani" },
      { id: 12, name: "Qorovulbozor tumani" },
      { id: 13, name: "Qorako‘l tumani" },
    ],
  },
  // Jizzax viloyati
  {
    id: 6,
    name: "Jizzax viloyati",
    districts: [
      { id: 1, name: "Jizzax shahri" },
      { id: 2, name: "Arnasoy tumani" },
      { id: 3, name: "Baxmal tumani" },
      { id: 4, name: "Doʻstlik tumani" },
      { id: 5, name: "G‘allaorol tumani" },
      { id: 6, name: "Mirzachoʻl tumani" },
      { id: 7, name: "Paxtakor tumani" },
      { id: 8, name: "Forish tumani" },
      { id: 9, name: "Sharof Rashidov tumani" },
      { id: 10, name: "Yangiobod tumani" },
      { id: 11, name: "Zarbdor tumani" },
      { id: 12, name: "Zomin tumani" },
    ],
  },
  // Qashqadaryo viloyati
  {
    id: 7,
    name: "Qashqadaryo viloyati",
    districts: [
      { id: 1, name: "Qarshi shahri" },
      { id: 2, name: "Shahrisabz shahri" },
      { id: 3, name: "Dehqonobod tumani" },
      { id: 4, name: "Kasbi tumani" },
      { id: 5, name: "Kitob tumani" },
      { id: 6, name: "Koson tumani" },
      { id: 7, name: "Koʻkdala tumani" },
      { id: 8, name: "Mirishkor tumani" },
      { id: 9, name: "Muborak tumani" },
      { id: 10, name: "Nishon tumani" },
      { id: 11, name: "Qamashi tumani" },
      { id: 12, name: "Yakkabogʻ tumani" },
      { id: 13, name: "G‘uzor tumani" },
      { id: 14, name: "Chiroqchi tumani" },
    ],
  },
  // Samarqand viloyati
  {
    id: 8,
    name: "Samarqand viloyati",
    districts: [
      { id: 1, name: "Samarqand shahri" },
      { id: 2, name: "Kattaqoʻrgʻon shahri" },
      { id: 3, name: "Bulung‘ur tumani" },
      { id: 4, name: "Jomboy tumani" },
      { id: 5, name: "Ishtixon tumani" },
      { id: 6, name: "Kattaqoʻrgʻon tumani" },
      { id: 7, name: "Mirzaobod tumani" },
      { id: 8, name: "Narpay tumani" },
      { id: 9, name: "Oqdaryo tumani" },
      { id: 10, name: "Paxtachi tumani" },
      { id: 11, name: "Pastdarg‘om tumani" },
      { id: 12, name: "Payariq tumani" },
      { id: 13, name: "Qoʻshrabot tumani" },
      { id: 14, name: "Tayloq tumani" },
      { id: 15, name: "Urgut tumani" },
    ],
  },
  // Surxondaryo viloyati
  {
    id: 9,
    name: "Surxondaryo viloyati",
    districts: [
      { id: 1, name: "Termiz shahri" },
      { id: 2, name: "Boysun tumani" },
      { id: 3, name: "Denov tumani" },
      { id: 4, name: "Muzrabot tumani" },
      { id: 5, name: "Oltinsoy tumani" },
      { id: 6, name: "Sariosiyo tumani" },
      { id: 7, name: "Sherobod tumani" },
      { id: 8, name: "Shoʻrchi tumani" },
      { id: 9, name: "Termiz tumani" },
      { id: 10, name: "Uzun tumani" },
      { id: 11, name: "Bandixon tumani" },
      { id: 12, name: "Denov shahri" },
      { id: 13, name: "Qiziriq tumani" },
      { id: 14, name: "Boysun shahri" },
    ],
  },
  // Sirdaryo viloyati
  {
    id: 10,
    name: "Sirdaryo viloyati",
    districts: [
      { id: 1, name: "Guliston shahri" },
      { id: 2, name: "Guliston tumani" },
      { id: 3, name: "Mirzaobod tumani" },
      { id: 4, name: "Oqoltin tumani" },
      { id: 5, name: "Sayxunobod tumani" },
      { id: 6, name: "Sirdaryo tumani" },
      { id: 7, name: "Sardoba tumani" },
      { id: 8, name: "Xavast tumani" },
    ],
  },
  // Namangan viloyati
  {
    id: 11,
    name: "Namangan viloyati",
    districts: [
      { id: 1, name: "Namangan shahri" },
      { id: 2, name: "Chortoq tumani" },
      { id: 3, name: "Chust tumani" },
      { id: 4, name: "Kosonsoy tumani" },
      { id: 5, name: "Mingbuloq tumani" },
      { id: 6, name: "Namangan tumani" },
      { id: 7, name: "Norin tumani" },
      { id: 8, name: "Pop tumani" },
      { id: 9, name: "Toʻraqoʻrgʻon tumani" },
      { id: 10, name: "Uchqoʻrgʻon tumani" },
      { id: 11, name: "Uychi tumani" },
      { id: 12, name: "Yangiqoʻrgʻon tumani" },
    ],
  },
  // Fargʻona viloyati
  {
    id: 12,
    name: "Fargʻona viloyati",
    districts: [
      { id: 1, name: "Fargʻona shahri" },
      { id: 2, name: "Qoʻqon shahri" },
      { id: 3, name: "Margʻilon shahri" },
      { id: 4, name: "Beshariq tumani" },
      { id: 5, name: "Bogʻdod tumani" },
      { id: 6, name: "Dangʻara tumani" },
      { id: 7, name: "Furqat tumani" },
      { id: 8, name: "Oltiariq tumani" },
      { id: 9, name: "Qoʻshtepa tumani" },
      { id: 10, name: "Quva tumani" },
      { id: 11, name: "Rishton tumani" },
      { id: 12, name: "Soʻx tumani" },
      { id: 13, name: "Toshloq tumani" },
      { id: 14, name: "Uchkoʻprik tumani" },
      { id: 15, name: "Yozyovon tumani" },
    ],
  },
  // Xorazm viloyati
  {
    id: 13,
    name: "Xorazm viloyati",
    districts: [
      { id: 1, name: "Urganch shahri" },
      { id: 2, name: "Xiva shahri" },
      { id: 3, name: "Bog‘ot tumani" },
      { id: 4, name: "Gurlan tumani" },
      { id: 5, name: "Hazorasp tumani" },
      { id: 6, name: "Qo‘shko‘pir tumani" },
      { id: 7, name: "Shovot tumani" },
      { id: 8, name: "Xazorasp tumani" },
      { id: 9, name: "Yangiariq tumani" },
      { id: 10, name: "Yangibozor tumani" },
      { id: 11, name: "Yangiqo‘rg‘on tumani" },
    ],
  },
  // Navoiy viloyati
  {
    id: 14,
    name: "Navoiy viloyati",
    districts: [
      { id: 1, name: "Navoiy shahri" },
      { id: 2, name: "Zarafshon shahri" },
      { id: 3, name: "G‘ozg‘on shahri" },
      { id: 4, name: "Konimex tumani" },
      { id: 5, name: "Qiziltepa tumani" },
      { id: 6, name: "Navbahor tumani" },
      { id: 7, name: "Karmana tumani" },
      { id: 8, name: "Nurota tumani" },
      { id: 9, name: "Tomdi tumani" },
      { id: 10, name: "Uchquduq tumani" },
      { id: 11, name: "Xatirchi tumani" },
    ],
  },
];

const AdminVacancyPage: React.FC = () => {
  const { isAdminLoggedIn, isLoadingAdmin, adminLogout } = useAdminAuth();
  const router = useRouter(); // router'ni import qiling

  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [newVacancy, setNewVacancy] = useState<Vacancy>({
    id: "",
    direction: "",
    salary: "",
    requirements: [],
    benefits: [],
    schedule: "",
    experience: "",
    description: "",
    province: "",
    district: "",
    isFavorite: false,
    testQuestions: [],
  });
  const [newRequirement, setNewRequirement] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const [newTestQuestion, setNewTestQuestion] = useState<TestQuestion>({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });
  const [editingVacancyId, setEditingVacancyId] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Uncomment this useEffect to load vacancies on component mount
  useEffect(() => {
    if (!isLoadingAdmin && !isAdminLoggedIn) {
      router.push("/admin/login");
    } else if (isAdminLoggedIn) {
      const storedVacancies = getVacancies();
      setVacancies(storedVacancies);
    }
  }, [isAdminLoggedIn, isLoadingAdmin, router]);

  const handleVacancyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewVacancy((prev) => ({ ...prev, [name]: value }));

    if (name === "province") {
      setSelectedProvince(value);
      setSelectedDistrict("");
      setNewVacancy((prev) => ({ ...prev, district: "" }));
    } else if (name === "district") {
      setSelectedDistrict(value);
    }
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim() !== "") {
      setNewVacancy((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }));
      setNewRequirement("");
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setNewVacancy((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim() !== "") {
      setNewVacancy((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }));
      setNewBenefit("");
    }
  };

  const handleRemoveBenefit = (index: number) => {
    setNewVacancy((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const handleTestQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTestQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleTestOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newTestQuestion.options];
    updatedOptions[index] = value;
    setNewTestQuestion((prev) => ({ ...prev, options: updatedOptions }));
  };

  const handleCorrectAnswerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTestQuestion((prev) => ({ ...prev, correctAnswer: Number(e.target.value) }));
  };

  const handleAddTestQuestion = () => {
    if (newTestQuestion.question.trim() === "" || newTestQuestion.options.some((opt) => opt.trim() === "")) {
      alert("Iltimos, savol va barcha variantlarni to'ldiring.");
      return;
    }
    setNewVacancy((prev) => ({
      ...prev,
      testQuestions: [...(prev.testQuestions || []), newTestQuestion],
    }));
    setNewTestQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    });
  };

  const handleRemoveTestQuestion = (index: number) => {
    setNewVacancy((prev) => ({
      ...prev,
      testQuestions: (prev.testQuestions || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmitVacancy = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newVacancy.direction ||
      !newVacancy.salary ||
      !newVacancy.description ||
      !newVacancy.province ||
      !newVacancy.district
    ) {
      alert("Yo'nalish, maosh, tavsif, viloyat va tuman maydonlari to'ldirilishi shart!");
      return;
    }

    let updatedVacancies;
    if (editingVacancyId) {
      updatedVacancies = vacancies.map((v) =>
        v.id === editingVacancyId ? { ...newVacancy, id: editingVacancyId } : v,
      );
      setEditingVacancyId(null);
    } else {
      updatedVacancies = [...vacancies, { ...newVacancy, id: generateUniqueId() }];
    }

    saveVacancies(updatedVacancies);
    setVacancies(updatedVacancies);
    // Formani tozalash
    setNewVacancy({
      id: "",
      direction: "",
      salary: "",
      requirements: [],
      benefits: [],
      schedule: "",
      experience: "",
      description: "",
      province: "",
      district: "",
      isFavorite: false,
      testQuestions: [],
    });
    setNewRequirement("");
    setNewBenefit("");
    setNewTestQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    });
    setSelectedProvince("");
    setSelectedDistrict("");
  };

  const handleEditVacancy = (vacancy: Vacancy) => {
    setNewVacancy(vacancy);
    setEditingVacancyId(vacancy.id);
    setSelectedProvince(vacancy.province);
    setSelectedDistrict(vacancy.district);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteVacancy = (id: string) => {
    if (confirm("Haqiqatan ham ushbu vakansiyani o'chirmoqchimisiz?")) {
      const updatedVacancies = vacancies.filter((v) => v.id !== id);
      saveVacancies(updatedVacancies);
      setVacancies(updatedVacancies); // Update state after deletion
    }
  };

  const availableDistricts = useMemo(() => {
    const province = provinces.find((p) => p.name === selectedProvince);
    return province ? province.districts : [];
  }, [selectedProvince]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 flex flex-col items-center px-4">
      <Card className="w-full max-w-5xl bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-lg p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-3xl font-bold">Vakansiya qo'shish</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 pt-4">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 dark:border-gray-700">
            {editingVacancyId ? "Vakansiyani Tahrirlash" : "Yangi Vakansiya Qo'shish"}
          </h2>
          <form onSubmit={handleSubmitVacancy} className="space-y-6">
            <div>
              <label htmlFor="direction">Yo'nalish / Lavozim</label>
              <Input
                id="direction"
                name="direction"
                value={newVacancy.direction}
                onChange={handleVacancyChange}
                placeholder="Misol: Frontend Dasturchi"
                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="salary">Maosh</label>
              <Input
                id="salary"
                name="salary"
                value={newVacancy.salary}
                onChange={handleVacancyChange}
                placeholder="Misol: 5-8 million so'm"
                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="description">Tavsif</label>
              <Textarea
                id="description"
                name="description"
                value={newVacancy.description}
                onChange={handleVacancyChange}
                placeholder="Vakansiya tavsifi..."
                rows={4}
                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="experience">Tajriba</label>
              <Input
                id="experience"
                name="experience"
                value={newVacancy.experience}
                onChange={handleVacancyChange}
                placeholder="Misol: 2+ yil"
                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="schedule">Ish jadvali</label>
              <Input
                id="schedule"
                name="schedule"
                value={newVacancy.schedule}
                onChange={handleVacancyChange}
                placeholder="Misol: To'liq kun, 5 kunlik ish haftasi"
                className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>

            {/* Hududlar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="province">Viloyat</label>
                <select
                  id="province"
                  name="province"
                  value={selectedProvince}
                  onChange={handleVacancyChange}
                  className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                >
                  <option value="">Viloyatni tanlang</option>
                  {provinces.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="district">Tuman</label>
                <select
                  id="district"
                  name="district"
                  value={selectedDistrict}
                  onChange={handleVacancyChange}
                  className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                  disabled={!selectedProvince}
                >
                  <option value="">Tumanni tanlang</option>
                  {availableDistricts.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Talablar */}
            <div>
              <label htmlFor="requirements">Talablar</label>
              <div className="flex gap-2 mb-2">
                <Input
                  id="newRequirement"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="Yangi talab qo'shish"
                  className="flex-grow bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                />
                <Button type="button" onClick={handleAddRequirement} variant="outline">
                  <Plus className="w-4 h-4 mr-2" /> Qo'shish
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newVacancy.requirements.map((req, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center gap-1 dark:bg-gray-700 dark:text-gray-200"
                  >
                    {req}
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(index)}
                      className="ml-1 text-gray-600 dark:text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Imtiyozlar */}
            <div>
              <label htmlFor="benefits">Imtiyozlar</label>
              <div className="flex gap-2 mb-2">
                <Input
                  id="newBenefit"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="Yangi imtiyoz qo'shish"
                  className="flex-grow bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
                />
                <Button type="button" onClick={handleAddBenefit} variant="outline">
                  <Plus className="w-4 h-4 mr-2" /> Qo'shish
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newVacancy.benefits.map((ben, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center gap-1 dark:bg-green-900 dark:text-green-200"
                  >
                    {ben}
                    <button
                      type="button"
                      onClick={() => handleRemoveBenefit(index)}
                      className="ml-1 text-green-600 dark:text-green-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Test Savollari */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Test Savollari</h3>
              <div className="space-y-4 border p-4 rounded-md bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <div>
                  <label htmlFor="question">Savol</label>
                  <Textarea
                    id="question"
                    name="question"
                    value={newTestQuestion.question}
                    onChange={handleTestQuestionChange}
                    placeholder="Savolni kiriting"
                    rows={2}
                    className="bg-gray-100 dark:bg-gray-600 text-black dark:text-white border-gray-300 dark:border-gray-500"
                  />
                </div>
                {newTestQuestion.options.map((option, index) => (
                  <div key={index}>
                    <label htmlFor={`option-${index}`}>Variant {index + 1}</label>
                    <Input
                      id={`option-${index}`}
                      value={option}
                      onChange={(e) => handleTestOptionChange(index, e.target.value)}
                      placeholder={`Variant ${index + 1}`}
                      className="bg-gray-100 dark:bg-gray-600 text-black dark:text-white border-gray-300 dark:border-gray-500"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="correctAnswer">To'g'ri javob</label>
                  <select
                    id="correctAnswer"
                    name="correctAnswer"
                    value={newTestQuestion.correctAnswer}
                    onChange={handleCorrectAnswerChange}
                    className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-600 text-black dark:text-white border-gray-300 dark:border-gray-500"
                  >
                    {newTestQuestion.options.map((_, index) => (
                      <option key={index} value={index}>
                        Variant {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  type="button"
                  onClick={handleAddTestQuestion}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" /> Savol Qo'shish
                </Button>
              </div>

              {newVacancy.testQuestions && newVacancy.testQuestions.length > 0 && (
                <div className="mt-4 space-y-3">
                  <h4 className="font-medium text-lg">Qo'shilgan savollar:</h4>
                  {newVacancy.testQuestions.map((q, qIndex) => (
                    <div
                      key={qIndex}
                      className="p-3 border rounded-md bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 flex justify-between items-start"
                    >
                      <div>
                        <p className="font-semibold">
                          {qIndex + 1}. {q.question}
                        </p>
                        <ul className="list-disc list-inside text-sm mt-1">
                          {q.options.map((opt, oIndex) => (
                            <li
                              key={oIndex}
                              className={
                                oIndex === q.correctAnswer
                                  ? "text-green-600 font-medium"
                                  : "text-gray-700 dark:text-gray-300"
                              }
                            >
                              {opt} {oIndex === q.correctAnswer && "(To'g'ri)"}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveTestQuestion(qIndex)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-8">
              {editingVacancyId ? "Vakansiyani Saqlash" : "Vakansiyani Qo'shish"}
            </Button>
            {editingVacancyId && (
              <Button
                type="button"
                onClick={() => {
                  setEditingVacancyId(null);
                  setNewVacancy({
                    id: "",
                    direction: "",
                    salary: "",
                    requirements: [],
                    benefits: [],
                    schedule: "",
                    experience: "",
                    description: "",
                    province: "",
                    district: "",
                    isFavorite: false,
                    testQuestions: [],
                  });
                  setNewRequirement("");
                  setNewBenefit("");
                  setNewTestQuestion({ question: "", options: ["", "", "", ""], correctAnswer: 0 });
                  setSelectedProvince("");
                  setSelectedDistrict("");
                }}
                variant="outline"
                className="w-full mt-2 border-gray-300 text-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Bekor qilish
              </Button>
            )}
          </form>
          ---
          <h2 className="text-2xl font-semibold mt-10 mb-4 border-b pb-2 dark:border-gray-700">Mavjud Vakansiyalar</h2>
          {vacancies.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-300">Hozircha vakansiyalar mavjud emas.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vacancies.map((vacancy) => (
                <Card
                  key={vacancy.id}
                  className="relative bg-white dark:bg-gray-700 shadow-xl rounded-lg p-6 flex flex-col justify-between overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:h-2 transition-all duration-300"></div>{" "}
                  {/* Top accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:h-2 transition-all duration-300"></div>{" "}
                  {/* Bottom accent */}
                  <div>
                    <h3 className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 mb-2">
                      <Rocket className="inline-block mr-2 w-6 h-6 text-indigo-500" />
                      {vacancy.direction}
                    </h3>
                    <div className="space-y-1 text-gray-700 dark:text-gray-300">
                      <p className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                        <span className="font-medium">Maosh:</span> {vacancy.salary}
                      </p>
                      <p className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 text-yellow-500" />
                        <span className="font-medium">Tajriba:</span> {vacancy.experience || "Ko'rsatilmagan"}
                      </p>
                      <p className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-red-500" />
                        <span className="font-medium">Hudud:</span> {vacancy.province}, {vacancy.district}
                      </p>
                      {vacancy.schedule && (
                        <p className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2 text-cyan-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium">Jadval:</span> {vacancy.schedule}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3 justify-end">
                    <Button
                      size="sm"
                      onClick={() => handleEditVacancy(vacancy)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path
                          fillRule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Tahrirlash
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteVacancy(vacancy.id)}
                      className="flex items-center transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      O'chirish
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVacancyPage;
