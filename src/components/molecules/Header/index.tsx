"use client";
import { Button } from "@/components/atoms/Button";
import { Moon, SignOut, SunHorizon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const logout = () => {
    destroyCookie(null, "auth-token");
    router.push("/login");
  };

  const HandleThemeSwitch = () => {
    const handleThemeChange = () => {
      if (theme === "light") {
        setTheme("dark");
        return;
      }
      setTheme("light");
    };

    return (
      <Button className="!bg-gray-200" onClick={handleThemeChange}>
        {theme === "light" ? (
          <SunHorizon weight="fill" color="#252525" />
        ) : (
          <Moon weight="fill" color="#252525" />
        )}
      </Button>
    );
  };

  return (
    <header className="h-20 bg-primary border-b border-gray-600">
      <div className="max-w-[1600px] h-full bg-primary m-auto flex items-center justify-between px-3">
        <Image
          alt="logo"
          src={"/images/logobranco.png"}
          loading="eager"
          priority={true}
          width={100}
          height={100}
        />

        <div className="flex items-center gap-4">
          <HandleThemeSwitch />
          <Button
            onClick={logout}
            variant="ghost"
            className="text-white hover:text-primary dark:hover:text-white "
          >
            <SignOut />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};
