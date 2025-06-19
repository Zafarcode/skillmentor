"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Linkedin, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

type ProfileData = {
  userId: number;
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

const ResumePage = () => {
  const [profile, setProfile] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/profile`, {
          cache: "no-store", // Har safar so‘rov qilish uchun
        });
        if (!res.ok) {
          const errorText = await res.text();
          console.error("API dan profilni olishda xatolik:", res.statusText, errorText);
          setError("Ma'lumotlarni yuklashda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.");
          return;
        }
        const data: ProfileData[] = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Profilni olishda xatolik:", error);
        setError("Tarmoq xatosi yoki serverga ulanishda muammo yuz berdi.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-850 p-6 md:p-10 lg:p-12 font-sans">
      <Card className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-3xl rounded-2xl overflow-hidden animate-fade-in">
        <CardHeader className="relative p-8 md:p-12 text-white text-center overflow-hidden bg-gradient-to-br from-blue-700 to-purple-800">
          {/* Background overlay for subtle effect */}
          <div className="absolute inset-0 opacity-10 bg-[url('/path/to/subtle-pattern.svg')] dark:bg-[url('/path/to/dark-subtle-pattern.svg')]"></div>
          <div className="relative z-10">
            {profile.length > 0 && (
              <>
                <CardTitle className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2 drop-shadow-lg leading-tight">
                  {profile[0].fullname}
                </CardTitle>
                <p className="text-blue-100 text-2xl font-medium mt-2 drop-shadow">
                  {profile[0].desiredposition || "Mutaxassis"}
                </p>
              </>
            )}
            {!profile.length && !loading && !error && (
              <CardTitle className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2 drop-shadow-lg leading-tight">
                Rezyume Mavjud Emas
              </CardTitle>
            )}
            {loading && (
              <CardTitle className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2 drop-shadow-lg leading-tight">
                Yuklanmoqda...
              </CardTitle>
            )}
            {error && (
              <CardTitle className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2 drop-shadow-lg leading-tight">
                Xatolik
              </CardTitle>
            )}
          </div>
        </CardHeader>

        {loading ? (
          <CardContent className="p-8 text-center text-gray-600 dark:text-gray-300 text-xl">
            Ma'lumotlar yuklanmoqda... Iltimos kuting.
            <div className="mt-4 flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          </CardContent>
        ) : error ? (
          <CardContent className="p-8 text-center text-red-600 dark:text-red-400 text-xl">{error}</CardContent>
        ) : profile.length > 0 ? (
          profile.map((userProfile, index) => (
            <CardContent
              key={index}
              className="p-8 md:p-10 space-y-10 border-b border-gray-100 dark:border-gray-700 last:border-none"
            >
              {/* Shaxsiy ma'lumotlar */}
              <section className="animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700 dark:text-blue-400 border-b-2 border-blue-200 dark:border-blue-700 pb-2">
                  Shaxsiy ma'lumotlar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-6 text-lg">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Ism Familiya</p>
                    <p className="text-xl font-semibold mt-1 text-gray-800 dark:text-gray-200">
                      {userProfile.fullname}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Yosh</p>
                    <p className="text-xl font-semibold mt-1 text-gray-800 dark:text-gray-200">
                      {userProfile.age ? `${userProfile.age} yosh` : "Noma'lum"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Tajriba</p>
                    <p className="text-xl font-semibold mt-1 text-gray-800 dark:text-gray-200">
                      {userProfile.experienceyears ? `${userProfile.experienceyears} yil` : "Yo'q"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Ma'lumot</p>
                    <p className="text-xl font-semibold mt-1 text-gray-800 dark:text-gray-200">
                      {userProfile.education || "Kiritilmagan"}
                    </p>
                  </div>
                </div>
              </section>

              {/* Bog'lanish */}
              <section className="animate-fade-in-up delay-100">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700 dark:text-blue-400 border-b-2 border-blue-200 dark:border-blue-700 pb-2">
                  Bog'lanish
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                  <div className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <Mail className="w-7 h-7 text-blue-500 flex-shrink-0" />
                    <p className="text-gray-800 dark:text-gray-200 break-words">
                      {userProfile.email || "Kiritilmagan"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <Phone className="w-7 h-7 text-green-500 flex-shrink-0" />
                    <p className="text-gray-800 dark:text-gray-200">{userProfile.phone || "Kiritilmagan"}</p>
                  </div>
                  <div className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    {userProfile.telegram ? (
                      <a
                        href={`https://t.me/${userProfile.telegram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 transition-colors"
                      >
                        {/* Inline SVG for better control, or ensure /icons/telegram.svg exists */}
                        <svg
                          className="w-7 h-7 flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.71 7.23L11.51 15.6c-.19.19-.45.3-.72.3s-.53-.11-.72-.3L7.33 12.16c-.32-.32-.32-.84 0-1.16s.84-.32 1.16 0L11 13.48l4.47-4.47c.32-.32.84-.32 1.16 0s.32.84 0 1.16z" />
                        </svg>
                        <p className="break-words">{userProfile.telegram}</p>
                      </a>
                    ) : (
                      <>
                        <svg
                          className="w-7 h-7 text-gray-500 dark:text-gray-400 flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.71 7.23L11.51 15.6c-.19.19-.45.3-.72.3s-.53-.11-.72-.3L7.33 12.16c-.32-.32-.32-.84 0-1.16s.84-.32 1.16 0L11 13.48l4.47-4.47c.32-.32.84-.32 1.16 0s.32.84 0 1.16z" />
                        </svg>
                        <p className="text-gray-500 dark:text-gray-400">Kiritilmagan</p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    {userProfile.linkedin ? (
                      <a
                        href={userProfile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-200 transition-colors"
                      >
                        <Linkedin className="w-7 h-7 flex-shrink-0" />
                        <p className="truncate break-all">{userProfile.linkedin}</p>
                      </a>
                    ) : (
                      <>
                        <Linkedin className="w-7 h-7 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                        <p className="text-gray-500 dark:text-gray-400">Kiritilmagan</p>
                      </>
                    )}
                  </div>
                </div>
              </section>

              {/* Men haqimda */}
              <section className="animate-fade-in-up delay-200">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700 dark:text-blue-400 border-b-2 border-blue-200 dark:border-blue-700 pb-2">
                  Men haqimda
                </h2>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                    {userProfile.aboutme || "Kiritilmagan"}
                  </p>
                </div>
              </section>

              {/* Ko‘nikmalar */}
              <section className="animate-fade-in-up delay-300">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700 dark:text-blue-400 border-b-2 border-blue-200 dark:border-blue-700 pb-2">
                  Ko'nikmalar
                </h2>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  {userProfile.skills ? (
                    <div className="flex flex-wrap gap-2">
                      {userProfile.skills.split(",").map((skill, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">Kiritilmagan</p>
                  )}
                </div>
              </section>

              {/* Ish Talablari */}
              <section className="animate-fade-in-up delay-400">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700 dark:text-blue-400 border-b-2 border-blue-200 dark:border-blue-700 pb-2">
                  Qidirilayotgan ish
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div>
                    <strong className="block text-gray-600 dark:text-gray-400 text-sm mb-1">Lavozim:</strong>
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {userProfile.desiredposition || "Kiritilmagan"}
                    </p>
                  </div>
                  <div>
                    <strong className="block text-gray-600 dark:text-gray-400 text-sm mb-1">Kutilayotgan oylik:</strong>
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {userProfile.expectedsalary || "Kiritilmagan"}
                    </p>
                  </div>
                  <div>
                    <strong className="block text-gray-600 dark:text-gray-400 text-sm mb-1">
                      Afzal ko'rgan hudud:
                    </strong>
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {userProfile.preferredprovince || "Kiritilmagan"}
                      {userProfile.preferreddistrict ? `, ${userProfile.preferreddistrict}` : ""}
                    </p>
                  </div>
                  <div>
                    <strong className="block text-gray-600 dark:text-gray-400 text-sm mb-1">
                      Ko'chishga tayyormi:
                    </strong>
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {userProfile.readytorelocate ? (
                        <span className="text-green-600 dark:text-green-400">Ha</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">Yo'q</span>
                      )}
                    </p>
                  </div>
                </div>
              </section>
            </CardContent>
          ))
        ) : (
          <CardContent className="p-8 text-center text-gray-600 dark:text-gray-300 text-xl">
            Hali hech qanday rezyume yuklanmagan.
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ResumePage;
