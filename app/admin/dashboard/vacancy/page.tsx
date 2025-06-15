// app/admin/dashboard/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { getVacancies, saveVacancies } from "@/lib/storage";
import { TestQuestion, Vacancy } from "@/types";
import { Plus, Trash2, X } from "lucide-react"; // Ikonkalar
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
// import { v4 as uuidv4 } from "uuid"; // <-- Bu qatorni o'chiramiz

// ID yaratish uchun oddiy helper funksiya
const generateUniqueId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
};

const provinces = [
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
];

const AdminVacancyPage: React.FC = () => {
  const { isAdminLoggedIn, isLoadingAdmin, adminLogout } = useAdminAuth();

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
    options: ["", "", "", ""], // 4 ta bo'sh variant
    correctAnswer: 0,
  });
  const [editingVacancyId, setEditingVacancyId] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const handleVacancyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewVacancy((prev) => ({ ...prev, [name]: value }));

    if (name === "province") {
      setSelectedProvince(value);
      setSelectedDistrict(""); // Viloyat o'zgarsa, tumanni tozalash
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
      updatedVacancies = [...vacancies, { ...newVacancy, id: generateUniqueId() }]; // <-- ID yaratish uchun yangi funksiya
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
    window.scrollTo({ top: 0, behavior: "smooth" }); // Yuqoriga o'tish
  };

  const handleDeleteVacancy = (id: string) => {
    if (confirm("Haqiqatan ham ushbu vakansiyani o'chirmoqchimisiz?")) {
      const updatedVacancies = vacancies.filter((v) => v.id !== id);
      saveVacancies(updatedVacancies);
      setVacancies(updatedVacancies);
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

            {/* Test Savollari (agar kerak bo'lmasa, bu qismni o'chirishingiz mumkin) */}
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

          <h2 className="text-2xl font-semibold mt-10 mb-4 border-b pb-2 dark:border-gray-700">Mavjud Vakansiyalar</h2>
          {vacancies.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-300">Hozircha vakansiyalar mavjud emas.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vacancies.map((vacancy) => (
                <Card
                  key={vacancy.id}
                  className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">{vacancy.direction}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">Maosh: {vacancy.salary}</p>
                    <p className="text-gray-700 dark:text-gray-300">Tajriba: {vacancy.experience}</p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Hudud: {vacancy.province}, {vacancy.district}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => handleEditVacancy(vacancy)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                      Tahrirlash
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteVacancy(vacancy.id)}>
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
