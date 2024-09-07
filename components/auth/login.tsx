import LoginForm from "@/components/auth/login-form";
import LogoIcon from "@/components/LogoIcon";
import Link from "next/link";

const LoginComponent = () => {
  return (
    <section className="min-h-[calc(100vh-164px)] flex flex-col justify-center ">
      <div className="container">
        <div className="w-full max-w-[500px] h-full flex flex-col items-center text-center mx-auto">
          <LogoIcon />
          <span className="sr-only">CinemaTube logo</span>
          <h1 className="text-3xl lg:text-5xl font-bold py-5">Kodni kiriting</h1>
          <p className="text-base lg:text-lg mb-5">
            <Link className="underline text-gray-500" href="https://t.me/wordwondersbot">
              @cinematubebot
            </Link>{" "}
            telegram botiga kiring va 1 daqiqalik kodingizni oling.
          </p>
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default LoginComponent;
