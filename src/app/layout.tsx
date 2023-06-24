import "../styles/globals.css";
import { ReactNode } from "react";
import { Roboto } from "next/font/google";
import Providers from "@/providers";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function RoootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={roboto.className}>
      <body suppressHydrationWarning={true} className="dark:bg-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
