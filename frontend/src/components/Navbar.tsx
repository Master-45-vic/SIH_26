"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useJurisdiction } from "@/context/JurisdictionContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import {
  Globe,
  Sparkles,
  Layers,
  Lightbulb,
  Share2,
  Bell,
  Database,
  Key,
  CheckCircle,
  Menu,
  X,
  Leaf,
  ChevronDown
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { jurisdiction, setJurisdiction } = useJurisdiction();
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [keySaved, setKeySaved] = useState(false);

  const navLinks = [
    { href: "/", label: t("navHome"), icon: Leaf },
    { href: "/assistant", label: t("navAssistant"), icon: Sparkles },
    { href: "/classify", label: t("navClassify"), icon: Layers },
    { href: "/innovation", label: t("navInnovation"), icon: Lightbulb },
    { href: "/graph", label: t("navGraph"), icon: Share2 },
    { href: "/alerts", label: t("navAlerts"), icon: Bell },
    { href: "/admin", label: t("navAdmin"), icon: Database },
  ];

  const handleSaveKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim()) {
      try {
        await api.setGeminiKey(inputKey.trim());
        setKeySaved(true);
        setTimeout(() => {
          setApiKeyModalOpen(false);
          setKeySaved(false);
        }, 1500);
      } catch (err) {
        console.error("Key save error:", err);
      }
    }
  };

  return (
    <>
      {/* Main Organic Navbar - Santhika & Ecology Style */}
      <nav className="sticky top-0 z-50 bg-[#edf5eb]/90 backdrop-blur-md border-b border-[#d8e8d5]/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Santhika / Ecology Style Leaf Logo */}
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#4e8b2b] to-[#7dbb3e] flex items-center justify-center shadow-md shadow-[#4e8b2b]/20 group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1">
                  <span className="text-2xl font-black text-[#143825] tracking-tight font-sans">GURU</span>
                </div>
                <span className="text-[10px] font-semibold text-[#668874] tracking-wider -mt-1 uppercase">
                  Holistic IPR Portal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#5a9330] text-white shadow-sm shadow-[#5a9330]/20"
                        : "text-[#1d442f] hover:text-[#5a9330] hover:bg-[#e2efe0]"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Controls: Organic Jurisdiction Switcher + Language Selector */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* Jurisdiction Toggle Pill */}
              <div className="flex items-center bg-[#deede0] p-1 rounded-full border border-[#cbdccb]">
                <button
                  type="button"
                  onClick={() => setJurisdiction("India")}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    jurisdiction === "India"
                      ? "bg-[#143825] text-[#d6ecd0] shadow-sm"
                      : "text-[#244c35] hover:text-[#143825]"
                  }`}
                >
                  <span>🇮🇳</span>
                  <span>India</span>
                </button>
                <button
                  type="button"
                  onClick={() => setJurisdiction("International")}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    jurisdiction === "International"
                      ? "bg-[#5a9330] text-white shadow-sm"
                      : "text-[#244c35] hover:text-[#143825]"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Global (WIPO/FDA)</span>
                </button>
              </div>

              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-[#deede0] border border-[#cbdccb] text-[#143825] text-xs font-bold rounded-full px-3 py-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5a9330] cursor-pointer"
              >
                <option value="English">🇬🇧 English</option>
                <option value="Hindi">🇮🇳 हिन्दी</option>
                <option value="Tamil">🇮🇳 தமிழ்</option>
              </select>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#143825] hover:bg-[#e2efe0] focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#d8e8d5] bg-[#edf5eb] px-4 pt-3 pb-6 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#d8e8d5]">
              <span className="text-xs font-bold text-[#567a65] uppercase">Jurisdiction</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setJurisdiction("India")}
                  className={`text-xs px-3 py-1 rounded-full font-bold ${
                    jurisdiction === "India" ? "bg-[#143825] text-white" : "bg-[#deede0] text-[#143825]"
                  }`}
                >
                  🇮🇳 India
                </button>
                <button
                  onClick={() => setJurisdiction("International")}
                  className={`text-xs px-3 py-1 rounded-full font-bold ${
                    jurisdiction === "International" ? "bg-[#5a9330] text-white" : "bg-[#deede0] text-[#143825]"
                  }`}
                >
                  🌐 Global
                </button>
              </div>
            </div>

            <div className="space-y-1">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-xl text-sm font-bold ${
                      isActive ? "bg-[#5a9330] text-white" : "text-[#143825] hover:bg-[#e2efe0]"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Gemini API Key Modal */}
      {apiKeyModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0f2b1c]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#d8e8d5] relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setApiKeyModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#eef7eb] text-[#5a9330] flex items-center justify-center border border-[#cbe1c7]">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#143825]">Configure Gemini API Key</h3>
                <p className="text-xs text-slate-500">App works out-of-the-box with built-in statutory engine.</p>
              </div>
            </div>

            <form onSubmit={handleSaveKey} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#143825] mb-1">
                  Google Gemini API Key
                </label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5a9330]"
                />
              </div>

              {keySaved && (
                <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Key saved and active! Ready to analyze queries.</span>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setApiKeyModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#5a9330] hover:bg-[#4d8127] rounded-full shadow-sm shadow-[#5a9330]/30 transition-all cursor-pointer"
                >
                  Save API Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
