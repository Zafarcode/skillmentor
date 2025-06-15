// types.ts
export interface Vacancy {
  id: string;
  direction: string;
  salary: string;
  requirements: string[];
  benefits: string[];
  schedule: string;
  experience: string;
  description: string;
  province: string;
  district: string;
  isFavorite: boolean;
  testQuestions?: TestQuestion[]; // Test savollari ixtiyoriy
}

export interface TestQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Correct option index
}

export interface UserProfile {
  userId: string;
  email: string;
  fullName: string;
  age: number;
  experienceYears: number;
  education: string;
  phone: string;
  telegram: string;
  linkedin: string;
  aboutMe: string;
  skills: string;
  desiredPosition: string;
  expectedSalary: string;
  preferredProvince: string;
  preferredDistrict: string;
  readyToRelocate: boolean;
}

// Admin foydalanuvchisi uchun tip
export interface AdminUser {
  username: string;
  password: string;
}
