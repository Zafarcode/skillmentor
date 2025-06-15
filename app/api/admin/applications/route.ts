// app/api/admin/applications/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Body'dan kerakli ma'lumotlarni ajratib olish
    const { vacancyId, vacancyDirection, userProfile, testScore, submittedAt } = body;

    // Ma'lumotlarni server konsoliga chiqarish (tekshirish uchun)
    console.log("Yangi rezyume qabul qilindi:");
    console.log("Vakansiya ID:", vacancyId);
    console.log("Vakansiya Yo'nalishi:", vacancyDirection);
    console.log("Foydalanuvchi Profili:", userProfile); // userProfile obyekti
    console.log("Test Natijasi (%):", testScore);
    console.log("Yuborilgan vaqt:", submittedAt);

    // --- BU YERGA MA'LUMOTLAR BAZASIGA SAQLASH LOGIKASINI QO'SHING ---
    // Masalan:
    // const newApplication = await db.application.create({
    //   data: {
    //     vacancyId,
    //     vacancyDirection,
    //     userId: userProfile.userId, // Agar userProfile'da userId bo'lsa
    //     fullName: userProfile.fullName,
    //     email: userProfile.email,
    //     phoneNumber: userProfile.phoneNumber,
    //     testScore,
    //     submittedAt: new Date(submittedAt),
    //     // Qo'shimcha profil ma'lumotlari: userProfile.resumeLink, userProfile.skills, etc.
    //   },
    // });
    // console.log('Ma\'lumotlar bazasiga saqlandi:', newApplication);
    // ------------------------------------------------------------------

    // Muvaffaqiyatli javob qaytarish
    return NextResponse.json({ message: "Rezyume muvaffaqiyatli qabul qilindi!", data: body }, { status: 200 });
  } catch (error) {
    console.error("Rezyume qabul qilishda xatolik:", error);
    return NextResponse.json(
      { message: "Server xatosi: Rezyumeni qabul qilib bo'lmadi.", error: (error as Error).message },
      { status: 500 },
    );
  }
}

// Boshqa HTTP metodlari uchun ham funksiyalar yozishingiz mumkin (GET, PUT, DELETE),
// lekin rezyume yuborish uchun POST yetarli.
// export async function GET(request: Request) { ... }
