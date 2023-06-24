import { redirect } from "next/navigation";
import { parseCookies } from "nookies";

export default function Home() {
  const { "auth-token": token } = parseCookies();

  if (token) {
    redirect("/login");
  }
  redirect("/dashboard");
}
