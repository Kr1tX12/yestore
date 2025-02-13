import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import DashboardSidebar from "./components/sidebar/dashboard-sidebar";
import { UserProvider } from "@/components/auth/user-provider";
import DashboardNavbar from "./components/navbar/dashboard-navbar";
import { Toaster } from "@/components/ui/toaster";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "My Page Title",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("sign-in");

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <UserProvider>
            <DashboardNavbar />
            <SidebarProvider>
              <DashboardSidebar />
              <main className="w-full">
                {children}
                <Toaster />
                <Footer />
              </main>
            </SidebarProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
