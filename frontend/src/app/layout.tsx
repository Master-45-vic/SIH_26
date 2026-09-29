import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import { JurisdictionProvider } from "@/context/JurisdictionContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "GURU | AI-Powered Ayurveda IPR & Regulatory Assistant",
  description:
    "Natural wisdom for modern innovation. AI-powered Ayurveda IPR and statutory compliance navigation for patents, biodiversity, and regulatory clearance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#edf5eb] text-[#143825] antialiased selection:bg-[#c9e5bf] selection:text-[#113120] relative">
        {/* Persistent High-Res Ambient Nature Background: Guru Teaching in Nature */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <Image
            src="/images/guru_nature_ambient.jpg"
            alt="Guru teaching in serene nature sanctuary"
            fill
            priority
            className="object-cover object-center opacity-25 filter blur-[0.5px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#edf5eb]/90 via-[#edf5eb]/85 to-[#edf5eb]/92" />
        </div>

        <JurisdictionProvider>
          <LanguageProvider>
            <AuthProvider>
              <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 w-full mx-auto">
                  {children}
                </main>
                <Footer />
              </div>
            </AuthProvider>
          </LanguageProvider>
        </JurisdictionProvider>
      </body>
    </html>
  );
}
