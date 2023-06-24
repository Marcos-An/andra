"use client";

import { Button } from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { Title } from "@/components/atoms/Text";
import { EnvelopeSimple, Eye, EyeClosed, Lock } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import jwt from "jsonwebtoken";
import api from "@/axios/api";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [email, setEmail] = useState("testevagas@andrasistemas.com.br");
  const [password, setPassword] = useState("frontendpleno");
  const [isLoading, setIsLoading] = useState(false);

  const generateToken = () => {
    const encodedPassword = jwt.sign(
      { usuSenhaLogin: password },
      "andra3RPW@8aZ"
    );
    return encodedPassword;
  };

  const handleLogin = () => {
    setIsLoading(true);
    const encodedPassword = generateToken();

    api
      .post("/auth/login", {
        usuEMailLogin: "testevagas@andrasistemas.com.br",
        usuSenhaLogin: encodedPassword,
      })
      .then((res) => {
        setCookie(null, "auth-token", res.headers["x-token"], {
          maxAge: 60 * 60 * 1, // 60 minutes
        });

        router.replace("/dashboard");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="grid grid-cols-1 h-screen md:grid-cols-2">
      <div className="bg-primary hidden items-center justify-center  md:flex ">
        <Image
          alt="logo"
          src={"/images/logobranco.png"}
          width={300}
          height={300}
        />
      </div>

      <div className="flex items-center justify-center flex-col">
        <div className="md:w-3/4 md:max-w-lg md:p-4 p-10 w-full ">
          <Image
            alt="logo"
            src={"/images/logoazul.png"}
            className="absolute  top-20  left-1/2  -translate-x-1/2 md:hidden"
            width={200}
            height={200}
          />
          <Title size="2xl">Olá usuário </Title>
          <br />
          <br />
          <Input
            icon={<EnvelopeSimple />}
            value={email}
            label="Email"
            onChange={({ target }) => {
              setEmail(target.value);
            }}
          />
          <Input
            icon={<Lock />}
            value={password}
            appendIcon={
              isTypePassword ? (
                <Eye
                  size={20}
                  onClick={() => setIsTypePassword(!isTypePassword)}
                />
              ) : (
                <EyeClosed
                  size={20}
                  onClick={() => setIsTypePassword(!isTypePassword)}
                />
              )
            }
            label="Senha"
            type={isTypePassword ? "password" : "text"}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
          <Button isLoading={isLoading} onClick={handleLogin} fullWidth>
            ENTRAR
          </Button>
        </div>
      </div>
    </div>
  );
}