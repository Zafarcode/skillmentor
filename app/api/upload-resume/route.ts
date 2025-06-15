// app/api/upload-resume/route.ts
import fs from "fs/promises"; // fs/promises asenkron ishlash uchun
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const resumeFile = formData.get("resume") as File | null; // 'resume' input nomiga qarang

    if (!resumeFile) {
      return NextResponse.json({ message: "Resume file not found" }, { status: 400 });
    }

    // Fayl yo'llarini aniqlash
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    // Agar uploads papkasi mavjud bo'lmasa, yaratish
    await fs.mkdir(uploadsDir, { recursive: true });

    // Fayl nomi (masalan, original nom + timestamp)
    const fileExtension = path.extname(resumeFile.name);
    const newFileName = `${path.parse(resumeFile.name).name}-${Date.now()}${fileExtension}`;
    const filePath = path.join(uploadsDir, newFileName);

    // Faylni bufferga o'qish va saqlash
    const buffer = Buffer.from(await resumeFile.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    // Frontendga faylning URL'ini qaytarish
    const fileUrl = `/uploads/${newFileName}`;
    return NextResponse.json({ message: "File uploaded successfully", url: fileUrl }, { status: 200 });
  } catch (error: any) {
    console.error("File upload error:", error);
    return NextResponse.json({ message: "Error uploading file", error: error.message }, { status: 500 });
  }
}
