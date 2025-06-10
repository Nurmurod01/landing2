import type React from "react";
import type { Metadata } from "next";
import { Noto_Sans, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "10 kunlik Suniy Intellekt bilan Shaxsiy Brending ",
  description:
    "Suniy Intellekt yordamida shaxsiy brendingizni qanday yaratish va rivojlantirish mumkinligini o'rganing. 10 kunlik bepul kursimizda AI yordamida kontent yaratish, marketing strategiyalari va brendni monetizatsiya qilish sirlari bilan tanishing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body
        className={`${roboto.className} md:h-screen h-full  tracking-tight bg-gradient-to-br from-gray-100 to-gray-200`}
      >
        {children}
      </body>
    </html>
  );
}
