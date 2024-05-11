"use client"
import LoginCard from "@/components/custom/loginCard";
import { FC } from "react";
import { useRouter } from 'next/navigation'

const LoginPage: FC = () => {
  const router = useRouter()

  return (
    <div className="flex h-screen w-screen">
      <div className="hidden lg:block w-1/2 bg-black"></div>
      <div className="flex-grow bg-white p-8 items-center content-center">
        <LoginCard router={router}/>
      </div>
    </div>
  );
};

export default LoginPage;
