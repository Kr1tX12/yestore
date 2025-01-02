import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import HeroPage from "@/pages/hero-page/HeroPage";
import { Inter } from "next/font/google";
import { Fragment } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export default function Home() {
  return (
    <div className={`${inter.variable}`}>
      
      <main className={`mb-64`}>
        <HeroPage />
      </main>
      
    </div>
  );
}
