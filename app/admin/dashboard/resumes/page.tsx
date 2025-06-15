// app/dashboard/resumes/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getApplications } from "@/lib/storage"; // getApplications import qilindi
import { LocalApplication } from "@/types"; // LocalApplication import qilindi
import { Loader2 } from "lucide-react"; // Loader2 ikonkasi lucide-react dan olingan

const ResumesPage: React.FC = () => {
  const [applications, setApplications] = useState<LocalApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      const storedApplications = getApplications();
      setApplications(storedApplications);
    } catch (err) {
      console.error("Failed to load applications from localStorage:", err);
      setError("Rezyumelarni yuklashda xatolik yuz berdi (lokal).");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Rezyumelar yuklanmoqda...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 text-red-600 dark:text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Yuborilgan Rezyumelar</h1>

      {applications.length === 0 ? (
        <div className="text-center py-10 text-gray-600 dark:text-gray-300">
          <p>Hozircha hech qanday rezyume yuborilmagan.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Rezyumelar Ro'yxati</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Yuborilgan barcha rezyumelarni ko'ring.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-[150px]"
                  >
                    Vakansiya
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Foydalanuvchi
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Aloqa
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Test Natijasi
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Ma'lumotlar
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Yuborilgan sana
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-400">
                      {app.vacancyDirection}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      <p className="font-semibold">{app.userProfile.fullName}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{app.userProfile.userId}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      <p>{app.userProfile.email}</p>
                      <p>{app.userProfile.phoneNumber}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {app.testScore !== null ? (
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${app.testScore >= 50 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
                        >
                          {app.testScore.toFixed(2)}%
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          Natija yo'q
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Tajriba:</span>{" "}
                        {app.userProfile.experienceYears !== null
                          ? `${app.userProfile.experienceYears} yil`
                          : "Noma'lum"}
                      </p>
                      <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                        <span className="font-medium">Ma'lumoti:</span> {app.userProfile.education || "Noma'lum"}
                      </p>
                      {app.userProfile.skills && app.userProfile.skills.length > 0 && (
                        <div className="mt-2">
                          <span className="font-medium text-xs">Ko'nikmalar:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {app.userProfile.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {app.userProfile.resumeLink && (
                        <a
                          href={app.userProfile.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline text-sm block mt-2"
                        >
                          Rezyume Linki
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-gray-100">
                      {new Date(app.submittedAt).toLocaleDateString()}
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(app.submittedAt).toLocaleTimeString()}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumesPage;
