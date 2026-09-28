import type { Metadata } from "next";
import "./globals.css";
import { JurisdictionProvider } from "@/context/JurisdictionContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "AyurGuru | AI-Powered Multilingual Ayurveda IPR & Regulatory Assistant",
  description:
    "Next-generation AI assistant helping Ayurveda researchers, startups, MSMEs, and cultivators navigate Patents, TKDL, ABS compliance, AYUSH licensing, and FSSAI regulations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50/50 via-slate-50 to-blue-50/30 text-slate-900 antialiased selection:bg-sky-200 selection:text-sky-900 font-sans">
        <JurisdictionProvider>
          <LanguageProvider>
            <AuthProvider>
              <Navbar />
              <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
              <Footer />
            </AuthProvider>
          </LanguageProvider>
        </JurisdictionProvider>
      </body>
    </html>
  );
}
