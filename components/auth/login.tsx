"use client"; // <-- TypeScript fayllari uchun ham bu juda muhim

import LoginForm from "@/components/auth/login-form";
import Link from "next/link";
import { useState, useEffect } from "react";

const LoginComponent = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);

  useEffect(() => {
    // timerId ning turini aniq ko'rsatamiz
    // TypeScriptda `NodeJS.Timeout` tipi setInterval qaytargan ID uchun ishlatiladi.
    let timerId: NodeJS.Timeout | undefined; // Yoki `number | undefined` brauzerga xos loyihalar uchun

    if (isCountingDown && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isCountingDown) {
      setIsCountingDown(false);
    }

    return () => {
      // timerId mavjud bo'lsa, tozalaymiz
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timeLeft, isCountingDown]);

  const formatTime = (seconds: number) => {
    // seconds uchun ham tur ko'rsatildi
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleRequestCode = async () => {
    console.log("Kodni yuborish so'rovi yuborilmoqda...");
    setTimeLeft(60);
    setIsCountingDown(true);
  };

  return (
    <section className="min-h-[calc(100vh-164px)] flex flex-col justify-center ">
      <div className="container">
        <div className="w-full max-w-[500px] h-full flex flex-col items-center text-center mx-auto">
          <h1 className="text-5xl font-bold">
            <span className="text-red-600">Skill</span>
            <span className="text-white">Mentor</span>
          </h1>
          <span className="sr-only"></span>
          <h1 className="text-3xl lg:text-5xl font-bold py-5">Kodni kiriting</h1>
          <p className="text-base text-orange-600 lg:text-lg mb-5">
            <Link className="underline text-gray-500" href="https://t.me/cinematuberobot" target="blank">
              {/* Siz bu yerga matn qo'shishingiz mumkin */}
            </Link>{" "}
            1 daqiqalik kodingizni oling.
          </p>

          <div className="text-2xl font-bold mb-4">{formatTime(timeLeft)}</div>

          {!isCountingDown && timeLeft === 0 ? (
            <button
              onClick={handleRequestCode}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Kodni qayta yuborish
            </button>
          ) : (
            <p className="text-sm text-gray-500 mt-4">
              {isCountingDown ? "Kodni soʻrash uchun kuting" : "Kodni olish uchun tugmani bosing"}
            </p>
          )}

          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default LoginComponent;
