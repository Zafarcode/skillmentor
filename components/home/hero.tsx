"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { getVacancies, saveVacancies } from "@/lib/storage";
import { Vacancy } from "@/types";
import { Heart, X, MapPin, Briefcase, DollarSign, BookOpen, Clock } from "lucide-react";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

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
  {
    id: "1",
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

type ProfileData = {
  userid: number;
  email: string;
  fullname: string;
  age: number;
  experienceyears: number;
  education: string;
  phone: string;
  telegram: string;
  linkedin: string;
  aboutme: string;
  skills: string;
  desiredposition: string;
  expectedsalary: string;
  preferredprovince: string;
  preferreddistrict: string;
  readytorelocate: boolean;
};

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

  const [profile, setProfile] = useState<ProfileData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/profile", { cache: "no-store" });
        if (!res.ok) {
          console.error("API dan profilni olishda xatolik:", res.statusText);
          return;
        }
        const data: ProfileData = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Profilni olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(profile);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  const NAVBAR_HEIGHT = 80;
  const FILTER_BLOCK_HEIGHT = 180;

  const handleSendResume = async () => {
    if (!profile) {
      alert("Profil ma'lumotlari mavjud emas");
      return;
    }

    setIsApplying(true);
    setApplyError("");

    try {
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: profile.userid,
          fullName: profile.fullname,
          email: profile.email,
          resumeData: {
            age: profile.age,
            experienceYears: profile.experienceyears,
            education: profile.education,
            phone: profile.phone,
            telegram: profile.telegram,
            linkedin: profile.linkedin,
            aboutMe: profile.aboutme,
            skills: profile.skills, // agar skills string bo‘lsa
            desiredPosition: profile.desiredposition,
            expectedSalary: profile.expectedsalary,
            preferredProvince: profile.preferredprovince,
            preferredDistrict: profile.preferreddistrict,
            readyToRelocate: profile.readytorelocate,
          },
        }),
      });

      alert("Rezyume muvaffaqiyatli yuborildi!");
    } catch (error: any) {
      setApplyError(error.message || "Noma'lum xatolik");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Qotirilgan "Vakansiyalar" sarlavhasi va filtrlash qismi */}
      <div
        className="fixed left-0 w-full bg-white dark:bg-black/90 backdrop-blur-md z-40 py-4 shadow-lg dark:shadow-none border-b border-gray-200 dark:border-gray-800"
        style={{ top: `${NAVBAR_HEIGHT}px` }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl text-center font-bold text-black dark:text-white mb-4">Vakansiyalar</h1>{" "}
          {/* Mobil uchun text-2xl */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Input
              type="text"
              placeholder="Vakansiyalarni qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 text-sm sm:text-base" // Mobil uchun text-sm
            />
            <select
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setSelectedDistrict("");
              }}
              className="p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 md:w-auto w-full text-sm sm:text-base" // Mobil uchun text-sm
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
              className="p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 md:w-auto w-full text-sm sm:text-base" // Mobil uchun text-sm
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
              className="md:w-auto w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-black dark:text-white border-gray-300 dark:border-gray-600 text-sm sm:text-base" // Mobil uchun text-sm
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
            <p className="col-span-full text-center text-gray-600 dark:text-gray-300 text-base sm:text-lg py-10">
              {" "}
              {/* Mobil uchun text-base */}
              Hech qanday vakansiya topilmadi.
            </p>
          ) : (
            filteredVacancies.map((vacancy) => (
              <CardComponent // Har bir Card uchun yangi komponentdan foydalanildi
                key={vacancy.id}
                vacancy={vacancy}
                handleToggleFavorite={handleToggleFavorite}
                handleOpenVacancyDetails={handleOpenVacancyDetails}
              />
            ))
          )}
        </div>
      </div>

      {selectedVacancy && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 text-black dark:text-white">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                {" "}
                {/* Mobil uchun text-xl */}
                {selectedVacancy.direction}
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {" "}
                {/* Mobil uchun text-sm */}
                {selectedVacancy.province}, {selectedVacancy.district} | {selectedVacancy.salary}
              </DialogDescription>
            </DialogHeader>

            {/* Qolgan dialog kontenti shu yerda davom etadi */}
            <div className="py-4 space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Talablar:</h3>{" "}
                {/* Mobil uchun text-base */}
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 dark:text-gray-300 ml-4">
                  {" "}
                  {/* Mobil uchun text-sm */}
                  {selectedVacancy.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Afzalliklari:</h3>{" "}
                {/* Mobil uchun text-base */}
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 dark:text-gray-300 ml-4">
                  {" "}
                  {/* Mobil uchun text-sm */}
                  {selectedVacancy.benefits.map((ben, index) => (
                    <li key={index}>{ben}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Ish jadvali:</h3>{" "}
                {/* Mobil uchun text-base */}
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{selectedVacancy.schedule}</p>{" "}
                {/* Mobil uchun text-sm */}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Tavsif:</h3>{" "}
                {/* Mobil uchun text-base */}
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  {selectedVacancy.description}
                </p>{" "}
                {/* Mobil uchun text-sm */}
              </div>

              {selectedVacancy.testQuestions && selectedVacancy.testQuestions.length > 0 && (
                <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Test savollari:
                  </h3>{" "}
                  {/* Mobil uchun text-base */}
                  {selectedVacancy.testQuestions.map((q, qIndex) => (
                    <div key={qIndex} className="mb-4">
                      <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100 mb-2">
                        {" "}
                        {/* Mobil uchun text-sm */}
                        {qIndex + 1}. {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((option, oIndex) => (
                          <label
                            key={oIndex}
                            className="flex items-center text-sm sm:text-base text-gray-700 dark:text-gray-300 cursor-pointer" // Mobil uchun text-sm
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
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base" // Mobil uchun text-sm
                    disabled={Object.keys(userAnswers).length !== selectedVacancy.testQuestions.length}
                  >
                    Testni yakunlash
                  </Button>
                  {showApplyMessage && (
                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-sm sm:text-base">
                      {" "}
                      {/* Mobil uchun text-sm */}
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
                            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base" // Mobil uchun text-sm
                            disabled={isApplying}
                          >
                            {isApplying ? "Yuborilmoqda..." : "Rezyume yuborish"}
                          </Button>
                          {applyError && <p className="text-red-500 mt-2 text-sm sm:text-base">{applyError}</p>}{" "}
                          {/* Mobil uchun text-sm */}
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
              <Button variant="outline" onClick={handleCloseDialog} className="text-sm sm:text-base">
                {" "}
                {/* Mobil uchun text-sm */}
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

// Yangi Card komponentasi
interface CardComponentProps {
  vacancy: Vacancy;
  handleToggleFavorite: (id: string) => void;
  handleOpenVacancyDetails: (vacancy: Vacancy) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ vacancy, handleToggleFavorite, handleOpenVacancyDetails }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glitterPosition, setGlitterPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setGlitterPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const calculateTransform = (e: React.MouseEvent<HTMLDivElement>, intensity: number = 5) => {
    if (!cardRef.current) return "translateZ(0)";
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const y = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    return `perspective(1000px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) translateZ(10px)`;
  };

  return (
    <Card
      ref={cardRef}
      className={`
        relative overflow-hidden
        bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-800 dark:to-gray-950
        text-gray-900 dark:text-white
        shadow-2xl rounded-2xl p-4 sm:p-7 flex flex-col justify-between // Mobil uchun paddingni kamaytirdim
        transform transition-all duration-500 ease-out
        hover:scale-[1.04] hover:shadow-3xl
        group
      `}
      style={isHovered ? { transform: `scale(1.04)` } : {}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Glitter effekti */}
      {isHovered && (
        <div
          className="absolute inset-0 z-0 opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glitterPosition.x}px ${glitterPosition.y}px, rgba(255,255,255,0.4) 0%, transparent 70%)`,
          }}
        ></div>
      )}

      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
        {" "}
        {/* Mobil uchun joylashuvni o'zgartirdim */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleToggleFavorite(vacancy.id)}
          className="relative text-gray-400 hover:text-red-500 transition-colors duration-300 group w-8 h-8 sm:w-10 sm:h-10" // Tugma hajmini mobil uchun sozladim
        >
          <Heart
            className={
              vacancy.isFavorite
                ? "fill-red-500 text-red-500 animate-heart-beat w-5 h-5 sm:w-6 sm:h-6" // Ikona hajmini sozladim
                : "text-gray-400 group-hover:scale-125 transition-transform duration-300 w-5 h-5 sm:w-6 sm:h-6" // Ikona hajmini sozladim
            }
          />
          {vacancy.isFavorite && (
            <span className="absolute -top-0 -right-0 flex h-2 w-2 sm:h-3 sm:w-3">
              {" "}
              {/* Ping hajmini mobil uchun sozladim */}
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-red-500"></span>
            </span>
          )}
        </Button>
      </div>

      <div
        className="flex-grow flex flex-col justify-between"
        style={isHovered ? { transform: `translateZ(20px)` } : {}}
      >
        <div>
          <CardTitle className="text-xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-300 mb-2 sm:mb-3 flex items-center transition-transform duration-300">
            {" "}
            {/* Mobil uchun text-xl */}
            <BookOpen className="inline-block mr-2 w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 transform group-hover:rotate-6 transition-transform duration-300" />{" "}
            {/* Ikona hajmini sozladim */}
            {vacancy.direction}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-gray-700 dark:text-gray-300 flex items-center mb-1 sm:mb-2 transition-transform duration-300">
            {" "}
            {/* Mobil uchun text-sm */}
            <MapPin className="inline-block mr-2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 transform group-hover:-translate-y-0.5 transition-transform duration-300" />{" "}
            {/* Ikona hajmini sozladim */}
            {vacancy.province}, {vacancy.district}
          </CardDescription>
          <p className="mt-2 sm:mt-3 text-lg sm:text-2xl font-bold text-green-700 dark:text-green-400 flex items-center transition-transform duration-300">
            {" "}
            {/* Mobil uchun text-lg */}
            <DollarSign className="inline-block mr-2 w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-300 transform group-hover:scale-110 transition-transform duration-300" />{" "}
            {/* Ikona hajmini sozladim */}
            {vacancy.salary}
          </p>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 flex items-center mt-1 sm:mt-2 transition-transform duration-300">
            {" "}
            {/* Mobil uchun text-sm */}
            <Briefcase className="inline-block mr-2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 transform group-hover:translate-x-0.5 transition-transform duration-300" />{" "}
            {/* Ikona hajmini sozladim */}
            Tajriba: {vacancy.experience}
          </p>
          <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 line-clamp-3 sm:line-clamp-4 mt-3 sm:mt-4 leading-relaxed transition-transform duration-300">
            {" "}
            {/* Mobil uchun text-sm, line-clamp-3 */}
            <Clock className="inline-block mr-2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />{" "}
            {/* Ikona hajmini sozladim */}
            {vacancy.description}
          </p>
        </div>
        <Button
          onClick={() => handleOpenVacancyDetails(vacancy)}
          className="
            mt-4 sm:mt-6 w-full py-2 sm:py-3 text-base sm:text-lg font-semibold rounded-xl // Mobil uchun padding va text hajmini kamaytirdim
            bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
            text-white shadow-lg hover:shadow-xl
            transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01]
            relative overflow-hidden
          "
        >
          <span className="relative z-10">Batafsil ko'rish</span>
          <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></span>
        </Button>
      </div>
    </Card>
  );
};
