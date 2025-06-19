import { NextResponse } from "next/server";

// In-memory storage for resumes (for demonstration purposes)
// In a real application, this would be a database (e.g., PostgreSQL, MongoDB)
let resumes: any[] = [];

export async function POST(request: Request) {
  try {
    const resume = await request.json();

    // Basic validation
    if (
      !resume ||
      !resume.userId ||
      !resume.fullName ||
      !resume.email ||
      !resume.vacancyId ||
      !resume.vacancyDirection ||
      !resume.testScore ||
      !resume.resumeData
    ) {
      return NextResponse.json(
        { error: "Kerakli ma'lumotlar yetishmayapti" },
        { status: 400 }
      );
    }

    const newResume = {
      id: resumes.length + 1, // Simple ID generation
      created_at: new Date().toISOString(),
      ...resume, // Spread the incoming resume data
    };

    resumes.push(newResume);

    console.log("Rezyume muvaffaqiyatli saqlandi:", newResume);
    return NextResponse.json({ message: "Rezyume muvaffaqiyatli saqlandi" }, { status: 200 });
  } catch (error: any) {
    console.error("Rezyume saqlashda xatolik:", error);
    return NextResponse.json(
      { error: "Server xatosi: " + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // In a real app, you'd fetch from a database here
    console.log("Rezyumelar so'rovi qabul qilindi. Hozirgi rezyumelar:", resumes);
    return NextResponse.json(resumes, { status: 200 });
  } catch (error: any) {
    console.error("Rezyumelarni olishda xatolik:", error);
    return NextResponse.json(
      { error: "Server xatosi: " + error.message },
      { status: 500 }
    );
  }
}