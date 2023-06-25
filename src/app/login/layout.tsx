import { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <title>Andra | Bem Vindo</title>
      {children}
    </section>
  );
}
