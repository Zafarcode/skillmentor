import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: NextRequest) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query("select * from profiledata");
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
      INSERT INTO profiledata (
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
