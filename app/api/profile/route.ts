import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query("select * from profile");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return new NextResponse("Server Error", { status: 500 });
  } finally {
    if (client) client.release();
  }
}

export async function POST(req: NextRequest) {
  const {
    userId,
    fullName,
    age,
    experienceYears,
    education,
    phone,
    email,
    telegram,
    linkedin,
    aboutMe,
    skills,
    desiredPosition,
    expectedSalary,
    preferredProvince,
    preferredDistrict,
    readyToRelocate,
  } = await req.json();

  try {
    const client = await pool.connect();

    const query = `
      INSERT INTO profile (
        userId, fullName, age, experienceYears, education, phone, email, telegram, linkedin, aboutMe, skills, desiredPosition, expectedSalary, preferredProvince, preferredDistrict, readyToRelocate
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *;
    `;

    const values = [
      userId,
      fullName,
      age,
      experienceYears,
      education,
      phone,
      email,
      telegram,
      linkedin,
      aboutMe,
      skills,
      desiredPosition,
      expectedSalary,
      preferredProvince,
      preferredDistrict,
      readyToRelocate,
    ];

    const result = await client.query(query, values);
    client.release();

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Xato:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  let client;
  try {
    const body = await request.json();
    console.log("PUT /api/profile qabul qilindi:", body);

    const userIdToUpdate = body.userId;

    if (!userIdToUpdate) {
      return NextResponse.json(
        { message: "Profilni yangilash uchun foydalanuvchi ID'si talab qilinadi" },
        { status: 400 },
      );
    }

    const skillsToSave = Array.isArray(body.skills) ? body.skills : [];

    client = await pool.connect();
    const result = await client.query(
      `UPDATE profile SET
        email = $1,
        fullName = $2,
        age = $3,
        experienceYears = $4,
        education = $5,
        phone = $6,
        telegram = $7,
        linkedin = $8,
        aboutMe= $9,
        skills = $10,
        desiredPosition = $11,
        expectedSalary = $12,
        preferredProvince = $13,
        preferredDistrict = $14,
        readyToRelocate = $15,
        updatedAt = NOW()
      WHERE userId = $16
      RETURNING *`, // Yangilangan profilni qaytarish
      [
        body.email,
        body.fullName,
        body.age ? parseInt(body.age, 10) : null,
        body.experienceYears ? parseInt(body.experienceYears, 10) : null,
        body.education,
        body.phone || null,
        body.telegram || null,
        body.linkedin || null,
        body.aboutMe || null,
        skillsToSave,
        body.desiredPosition || null,
        body.expectedSalary || null,
        body.preferredProvince || null,
        body.preferredDistrict || null,
        body.readyToRelocate || false,
        userIdToUpdate, // WHERE sharti uchun
      ],
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: "Yangilash uchun profil topilmadi" }, { status: 404 });
    }

    console.log("Bazada profil yangilandi:", result.rows[0]);
    return NextResponse.json({ message: "Profil muvaffaqiyatli yangilandi!" }, { status: 200 });
  } catch (error: any) {
    console.error("Bazadagi profilni yangilashda xato:", error);
    if (error.code === "23505" && error.constraint?.includes("email")) {
      return NextResponse.json({ message: "Bu email bilan profil allaqachon mavjud." }, { status: 409 });
    }
    return NextResponse.json({ message: "Profilni yangilashda ichki server xatosi yuz berdi." }, { status: 500 });
  } finally {
    if (client) {
      client.release();
    }
  }
}
