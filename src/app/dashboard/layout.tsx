import { Header } from "@/components/molecules/Header";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();

  const token = cookieStore.get("auth-token");

  if (!token) {
    redirect("/login");
  }

  return (
    <section>
      <Header />
      <div className="max-w-[1600px] h-full m-auto py-7 px-3">{children}</div>
    </section>
  );
}
