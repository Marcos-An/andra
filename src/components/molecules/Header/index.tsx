"use client";
import { Button } from "@/components/atoms/Button";
import { SignOut } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";

export const Header = () => {
  const router = useRouter();

  const logout = () => {
    destroyCookie(null, "auth-token");
    router.push("/login");
  };

  return (
    <header className="h-20 bg-primary border-b border-gray-600">
      <div className="max-w-[1600px] h-full bg-primary m-auto flex items-center justify-between px-3">
        <Image
          alt="logo"
          src={"/images/logobranco.png"}
          width={100}
          height={100}
        />

        <Button
          onClick={logout}
          variant="ghost"
          className="text-white hover:text-primary"
        >
          <SignOut />
          Sair
        </Button>
      </div>
    </header>
  );
};
