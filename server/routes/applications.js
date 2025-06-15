// server/routes/applications.js (yoki shunga o'xshash)

const express = require("express");
const router = express.Router();

// Agar sizda database mavjud bo'lsa, bu yerda uni import qiling
// const db = require('../config/database');

router.post("/admin/applications", async (req, res) => {
  try {
    const { vacancyId, vacancyDirection, userProfile, testScore, submittedAt } = req.body;

    if (!userProfile || !vacancyId) {
      return res.status(400).json({ message: "Kerakli ma'lumotlar to'liq emas." });
    }

    // Bu yerda siz bu ma'lumotlarni databasega saqlashingiz mumkin
    // Masalan, MongoDB uchun:
    // const newApplication = new Application({
    //   vacancyId,
    //   vacancyDirection,
    //   applicant: userProfile,
    //   testScore,
    //   submittedAt,
    // });
    // await newApplication.save();

    // Yoki oddiygina logga yozishingiz mumkin (test uchun)
    console.log("Yangi ariza keldi:");
    console.log("Vakansiya ID:", vacancyId);
    console.log("Vakansiya Yo'nalishi:", vacancyDirection);
    console.log("Foydalanuvchi Profili:", userProfile.fullName, userProfile.email);
    console.log("Test Natijasi:", testScore);
    console.log("Yuborilgan vaqt:", submittedAt);

    // Admin paneliga qanday yetkazishingiz loyihangizga bog'liq:
    // 1. Email orqali bildirishnoma yuborish (Nodemailer kabi kutubxonalar bilan)
    // 2. WebSocket orqali admin paneliga real-time yangilash (Socket.io kabi)
    // 3. Shunchaki databasega saqlab, admin panelida list qilib ko'rsatish

    res.status(201).json({ message: "Ariza muvaffaqiyatli qabul qilindi!" });
  } catch (error) {
    console.error("Ariza yuborishda server xatosi:", error);
    res.status(500).json({ message: "Server xatosi, arizani qabul qilishda muammo yuz berdi." });
  }
});

module.exports = router;
