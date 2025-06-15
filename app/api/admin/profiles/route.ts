// src/app/api/admin/profiles/route.ts
// Bu fayl server tomonida ishlaydi, mijozga ko'rinmaydi

import { UserProfile } from "@/types"; // UserProfile tipini import qiling
import { NextResponse } from "next/server";
// Agar sizda ma'lumotlar bazasi bilan ishlash uchun kutubxona bo'lsa, uni shu yerda import qiling.
// Masalan: import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body: UserProfile = await request.json(); // Mijozdan kelgan JSON ma'lumotni o'qiymiz
    console.log("Backendga kelgan yangi profil ma'lumotlari:", body);

    // --- BU YERDA MA'LUMOTLAR BAZASIGA SAQLASH LOGIKASINI QO'SHING ---
    // Hozircha, ma'lumotlar bazasi ulanmagani uchun
    // shunchaki simulyatsiya qilingan javob qaytaramiz.
    // real loyihada bu yerda Prisma, Mongoose yoki boshqa ORM yordamida DBga saqlaysiz.

    // Ma'lumotlar bazasiga saqlash misoli (Prisma yordamida):
    // const newProfile = await prisma.userProfile.create({
    //   data: {
    //     userId: body.userId || `generated_user_id_${Date.now()}`, // userId ni qanday boshqarishingizga bog'liq
    //     fullName: body.fullName,
    //     age: body.age,
    //     experienceYears: body.experienceYears,
    //     education: body.education,
    //     phone: body.phone,
    //     email: body.email,
    //     telegram: body.telegram,
    //     linkedin: body.linkedin,
    //     aboutMe: body.aboutMe,
    //     skills: body.skills,
    //     desiredPosition: body.desiredPosition,
    //     expectedSalary: body.expectedSalary,
    //     preferredProvince: body.preferredProvince,
    //     preferredDistrict: body.preferredDistrict,
    //     readyToRelocate: body.readyToRelocate,
    //     resumeLink: body.resumeLink,
    //   },
    // });

    // Vaqtinchalik javob (DB ga ulanmaguncha):
    const newProfile = { id: Date.now().toString(), ...body }; // Har safar noyob ID beradi
    console.log("Yangi profil (simulyatsiya qilingan):", newProfile);

    // Muvaffaqiyatli javobni JSON formatida qaytaramiz
    return NextResponse.json(
      { message: "Profil muvaffaqiyatli yaratildi!", profile: newProfile },
      { status: 201 }, // 201 Created status kodi
    );
  } catch (error) {
    console.error("API xatosi:", error);
    // Xato yuz berganda xatolik xabarini JSON formatida qaytaramiz
    return NextResponse.json(
      { message: "Profil yaratishda server xatoligi yuz berdi.", error: (error as Error).message },
      { status: 500 }, // 500 Internal Server Error status kodi
    );
  }
}

// Agar siz PUT, GET, DELETE kabi boshqa HTTP metodlarini ham qo'llab-quvvatlamoqchi bo'lsangiz,
// shu faylda ularning funksiyalarini ham eksport qilishingiz mumkin:
// export async function GET(request: Request) { ... }
// export async function PUT(request: Request) { ... }
