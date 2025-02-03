import { UserProvider } from "@/components/auth/user-provider";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "My Page Title",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <Navbar />
            <main>
              <div className="grid min-h-[calc(100vh_-_40px)] lg:grid-cols-2 mt-[40px]">
                <div className="flex flex-col p-6 md:p-10">
                  <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">{children}</div>
                  </div>
                </div>
                <div className="relative hidden bg-muted lg:block">
                  <img
                    src="https://avatars.mds.yandex.net/i?id=41e15638611417c9450a293fed78208b_l-4885523-images-thumbs&n=13"
                    alt="Image"
                    className="absolute inset-0 object-cover size-full dark:brightness-[0.2] dark:grayscale"
                  />
                  <p className="text-3xl font-black absolute flex justify-center items-center size-full text-center px-10">
                    Лучшие сервера в мире ваще топ рекомендую заходи пока вот
                    слева
                  </p>
                </div>
              </div>
            </main>
            <Footer />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
