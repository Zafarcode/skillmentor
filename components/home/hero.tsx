// app/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext"; // AuthContext'ni import qiling
import { getVacancies, saveVacancies } from "@/lib/storage";
import { Vacancy } from "@/types";
import axios from "axios"; // API so'rovlari uchun axios
import { Heart, X } from "lucide-react"; // Send ikonkasini qo'shdik
import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"; // DialogContent, DialogDescription, DialogHeader, DialogTitle komponentlarini qo'shdik

// ID yaratish uchun oddiy helper funksiya
const generateUniqueId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
};

interface Province {
  id: number;
  name: string;
  districts: { id: number; name: string }[];
}

const provinces: Province[] = [
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

const VACANCY_STATIC_DATA: Vacancy[] = [
  // Sizning bergan Matematika va Fizika o'qituvchisi namunalari
  {
    id: "1", // Statik ID
    direction: "Matematika O'qituvchisi",
    salary: "4-7 million so'm",
    requirements: [
      "Oliy ma'lumot (matematika)",
      "Kamida 2 yil pedagogik tajriba",
      "Darslarni interaktiv o'tish ko'nikmasi",
      "Talabalarga individual yondashuv",
      "O'quvchilar bilan samarali ishlash tajribasi",
    ],
    benefits: [
      "Qulay ish sharoitlari",
      "Kasbiy rivojlanish imkoniyatlari",
      "Bonuslar tizimi",
      "Zamonaviy o'quv materiallari va texnologiyalar",
      "Yosh jamoada ishlash",
    ],
    schedule: "To'liq kun, 5 kunlik ish haftasi",
    experience: "2+ yil",
    description:
      "Bizning ta'lim markazimizga tajribali va ijodkor matematika o'qituvchisi kerak. Agar siz o'quvchilarga matematikani qiziqarli va tushunarli tarzda o'rgata olsangiz, sizni kutamiz!",
    province: "Toshkent shahri",
    district: "Chilonzor tumani",
    isFavorite: false,
    testQuestions: [
      {
        question: "Integral nimani ifodalaydi?",
        options: ["Funksiyaning hosilasi", "Egri chiziq ostidagi yuza", "Funksiyaning limiti", "Teskari funksiya"],
        correctAnswer: 1,
      },
      {
        question: "Pifagor teoremasi qaysi uchburchakka tegishli?",
        options: ["Teng tomonli", "Teng yonli", "To'g'ri burchakli", "O'tmas burchakli"],
        correctAnswer: 2,
      },
      {
        question: "2x + 5 = 11 tenglamaning yechimi?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "2", // Statik ID
    direction: "Fizika O'qituvchisi",
    salary: "5-8 million so'm",
    requirements: [
      "Oliy ma'lumot (fizika)",
      "Tajriba muhim (3+ yil)",
      "Innovatsion yondashuv",
      "Laboratoriya ishlarini tashkil qilish",
      "Murakkab mavzularni sodda tilda tushuntira olish",
    ],
    benefits: [
      "Ilmiy izlanishlar uchun sharoit",
      "Bepul ta'lim kurslari",
      "Tadbir va konferensiyalarda ishtirok etish",
      "Raqobatbardosh ish haqi",
      "Ijodiy muhit",
    ],
    schedule: "To'liq kun, moslashuvchan",
    experience: "3+ yil",
    description:
      "Fizika fani bo'yicha kuchli bilimga ega, talabalarga ilmga bo'lgan qiziqishni uyg'ota oladigan o'qituvchi izlaymiz. Laboratoriya ishlari bilan amaliy ko'nikmalarni oshirishga yordam berish asosiy vazifalardan.",
    province: "Samarqand viloyati",
    district: "Samarqand shahri",
    isFavorite: false,
    testQuestions: [
      {
        question: "Nyutonning ikkinchi qonuni formulasi?",
        options: ["E=mc²", "F=ma", "P=U/I", "V=IR"],
        correctAnswer: 1,
      },
      {
        question: "Elektr tokining o'lchov birligi nima?",
        options: ["Volt", "Amper", "Ohm", "Vatt"],
        correctAnswer: 1,
      },
      {
        question: "Jismning erkin tushish tezlanishi taxminan qanchaga teng?",
        options: ["8.9 m/s²", "9.8 m/s²", "10.0 m/s²", "11.2 m/s²"],
        correctAnswer: 1,
      },
    ],
  },
];

const HomePage: React.FC = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number | null }>({});
  const [testResult, setTestResult] = useState<number | null>(null);
  const [testPercentage, setTestPercentage] = useState<number | null>(null); // YANGI: Foizni saqlash uchun
  const [showApplyMessage, setShowApplyMessage] = useState<boolean>(false); // YANGI: Rezyume yuborish holatini ko'rsatish
  const [isApplying, setIsApplying] = useState<boolean>(false); // YANGI: Rezyume yuborish jarayoni
  const [applyError, setApplyError] = useState<string | null>(null); // YANGI: Rezyume yuborish xatosi

  const { user, fetchUserProfile, isLoggedIn } = useAuth(); // AuthContext'dan ma'lumotlarni oling

  // Lokal ma'lumotlarni yuklash
  useEffect(() => {
    const localVacancies = getVacancies();
    // Agar localStorage bo'sh bo'lsa, statik ma'lumotlarni qo'shish
    if (localVacancies.length === 0) {
      saveVacancies(VACANCY_STATIC_DATA);
      setVacancies(VACANCY_STATIC_DATA);
    } else {
      setVacancies(localVacancies);
    }
    setLoading(false);
  }, []);

  const availableDistricts = useMemo(() => {
    const province = provinces.find((p) => p.name === selectedProvince);
    return province ? province.districts : [];
  }, [selectedProvince]);

  const filteredVacancies = useMemo(() => {
    let filtered = vacancies;

    if (searchTerm) {
      filtered = filtered.filter(
        (vacancy) =>
          vacancy.direction.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vacancy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vacancy.requirements.some((req) => req.toLowerCase().includes(searchTerm.toLowerCase())) ||
          vacancy.benefits.some((ben) => ben.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    if (selectedProvince) {
      filtered = filtered.filter((vacancy) => vacancy.province === selectedProvince);
    }

    if (selectedDistrict) {
      filtered = filtered.filter((vacancy) => vacancy.district === selectedDistrict);
    }

    return filtered;
  }, [vacancies, searchTerm, selectedProvince, selectedDistrict]);

  const handleOpenVacancyDetails = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setUserAnswers({}); // Dialog ochilganda javoblarni tozalash
    setTestResult(null); // Natijani tozalash
    setTestPercentage(null); // Foizni tozalash
    setShowApplyMessage(false); // Xabarni tozalash
    setApplyError(null); // Xatolarni tozalash
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedVacancy(null);
    setIsDialogOpen(false);
  };

  const handleToggleFavorite = (id: string) => {
    const updatedVacancies = vacancies.map((v) => (v.id === id ? { ...v, isFavorite: !v.isFavorite } : v));
    setVacancies(updatedVacancies);
    saveVacancies(updatedVacancies); // localStoragega saqlash
  };

  const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmitTest = () => {
    if (!selectedVacancy || !selectedVacancy.testQuestions) return;

    let correctCount = 0;
    selectedVacancy.testQuestions.forEach((q, qIndex) => {
      if (userAnswers[qIndex] === q.correctAnswer) {
        correctCount++;
      }
    });

    setTestResult(correctCount);

    const totalQuestions = selectedVacancy.testQuestions.length;
    const percentage = (correctCount / totalQuestions) * 100;
    setTestPercentage(percentage);
    setShowApplyMessage(true); // Test natijasini ko'rsatishga ruxsat berish
  };

  // YANGI: Rezyumeni yuborish funksiyasi
  const handleSendResume = async () => {
    if (!isLoggedIn) {
      alert("Rezyume yuborish uchun tizimga kirishingiz kerak!");
      // router.push('/login'); // Foydalanuvchini login sahifasiga yo'naltirish
      return;
    }

    if (!user || !user.id) {
      setApplyError("Foydalanuvchi ma'lumotlari topilmadi. Qaytadan urinib ko'ring.");
      return;
    }

    setIsApplying(true);
    setApplyError(null);

    try {
      // Foydalanuvchi profil ma'lumotlarini yuklash
      const userProfile = await fetchUserProfile(user.id);

      if (!userProfile) {
        setApplyError(
          "Profil ma'lumotlarini yuklashda xatolik. Iltimos, profilingizni to'ldirganingizga ishonch hosil qiling.",
        );
        setIsApplying(false);
        return;
      }

      // Backend API'ga rezyume ma'lumotlarini yuborish
      // Bu yerda sizning backend API endpointingiz bo'ladi
      const response = await axios.post("/api/submit-application", {
        vacancyId: selectedVacancy?.id,
        userProfile: userProfile,
        testScore: testPercentage, // Test natijasini ham qo'shish mumkin
      });

      if (response.status === 200) {
        alert("Rezyume muvaffaqiyatli yuborildi!");
        handleCloseDialog(); // Dialogni yopish
      } else {
        setApplyError(response.data.message || "Rezyumeni yuborishda noma'lum xatolik yuz berdi.");
      }
    } catch (error: any) {
      console.error("Rezyume yuborishda xatolik:", error);
      setApplyError(
        error.response?.data?.message || "Rezyumeni yuborishda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.",
      );
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  const NAVBAR_HEIGHT = 80;
  const FILTER_BLOCK_HEIGHT = 180;

  return (
    <div className="relative min-h-screen">
      {/* Qotirilgan "Vakansiyalar" sarlavhasi va filtrlash qismi */}
      <div
        className="fixed left-0 w-full bg-white dark:bg-black/90 backdrop-blur-md z-40 py-4 shadow-lg dark:shadow-none border-b border-gray-200 dark:border-gray-800"
        style={{ top: `${NAVBAR_HEIGHT}px` }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">Vakansiyalar</h1>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Input
              type="text"
              placeholder="Vakansiyalarni qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
            <select
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setSelectedDistrict("");
              }}
              className="p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 md:w-auto w-full"
            >
              <option value="">Barcha viloyatlar</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 md:w-auto w-full"
              disabled={!selectedProvince}
            >
              <option value="">Barcha tumanlar</option>
              {availableDistricts.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedProvince("");
                setSelectedDistrict("");
              }}
              className="md:w-auto w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-black dark:text-white border-gray-300 dark:border-gray-600"
            >
              <X className="w-4 h-4 mr-2" /> Filtrlarni tozalash
            </Button>
          </div>
        </div>
      </div>

      {/* Vakansiya kartalari asosiy kontenti */}
      <div
        className="w-full max-w-full xl:max_w-7xl mx-auto px-4 relative z-10"
        style={{ paddingTop: `${NAVBAR_HEIGHT + FILTER_BLOCK_HEIGHT}px` }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVacancies.length === 0 ? (
            <p className="col-span-full text-center text-gray-600 dark:text-gray-300 text-lg py-10">
              Hech qanday vakansiya topilmadi.
            </p>
          ) : (
            filteredVacancies.map((vacancy) => (
              <Card
                key={vacancy.id}
                className="bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200 ease-in-out border border-gray-200 dark:border-gray-700"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {vacancy.direction}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleFavorite(vacancy.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Heart className={vacancy.isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"} />
                    </Button>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
                    {vacancy.province}, {vacancy.district}
                  </CardDescription>
                  <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-200">{vacancy.salary}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Tajriba: {vacancy.experience}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mt-2">{vacancy.description}</p>
                </div>
                <Button
                  onClick={() => handleOpenVacancyDetails(vacancy)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white w-full"
                >
                  Batafsil
                </Button>
              </Card>
            ))
          )}
        </div>
      </div>

      {selectedVacancy && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 text-black dark:text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {selectedVacancy.direction}
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                {selectedVacancy.province}, {selectedVacancy.district} | {selectedVacancy.salary}
              </DialogDescription>
            </DialogHeader>

            {/* Qolgan dialog kontenti shu yerda davom etadi */}
            <div className="py-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Talablar:</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 ml-4">
                  {selectedVacancy.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Afzalliklari:</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 ml-4">
                  {selectedVacancy.benefits.map((ben, index) => (
                    <li key={index}>{ben}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Ish jadvali:</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedVacancy.schedule}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Tavsif:</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedVacancy.description}</p>
              </div>

              {selectedVacancy.testQuestions && selectedVacancy.testQuestions.length > 0 && (
                <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Test savollari:</h3>
                  {selectedVacancy.testQuestions.map((q, qIndex) => (
                    <div key={qIndex} className="mb-4">
                      <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                        {qIndex + 1}. {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((option, oIndex) => (
                          <label
                            key={oIndex}
                            className="flex items-center text-gray-700 dark:text-gray-300 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={`question-${qIndex}`}
                              value={oIndex}
                              checked={userAnswers[qIndex] === oIndex}
                              onChange={() => handleAnswerChange(qIndex, oIndex)}
                              className="mr-2 accent-blue-600"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={handleSubmitTest}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                    disabled={Object.keys(userAnswers).length !== selectedVacancy.testQuestions.length}
                  >
                    Testni yakunlash
                  </Button>

                  {showApplyMessage && (
                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md">
                      <p className="font-semibold mb-2">Test natijasi:</p>
                      <p>
                        Siz {selectedVacancy.testQuestions.length} savoldan {testResult} tasiga to'g'ri javob berdingiz.
                      </p>
                      <p>Foiz: {testPercentage?.toFixed(2)}%</p>
                      {testPercentage !== null && testPercentage >= 70 ? (
                        <div className="mt-4">
                          <p className="text-green-700 dark:text-green-300 font-bold">
                            Tabriklaymiz! Siz testdan muvaffaqiyatli o'tdingiz. Endi rezyumeyingizni yuborishingiz
                            mumkin.
                          </p>
                          <Button
                            onClick={handleSendResume}
                            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
                            disabled={isApplying}
                          >
                            {isApplying ? "Yuborilmoqda..." : "Rezyume yuborish"}
                          </Button>
                          {applyError && <p className="text-red-500 mt-2">{applyError}</p>}
                        </div>
                      ) : (
                        <p className="text-red-700 dark:text-red-300 font-bold mt-4">
                          Kechirasiz, testdan o'tish uchun kamida 70% to'g'ri javob berishingiz kerak.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={handleCloseDialog}>
                Yopish
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default HomePage;
