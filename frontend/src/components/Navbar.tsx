"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useJurisdiction } from "@/context/JurisdictionContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import {
  ShieldCheck,
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
  UserCheck,
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
    { href: "/", label: t("navHome"), icon: ShieldCheck },
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
      {/* Top Government-tech Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-sky-900 to-indigo-950 text-white text-xs py-1.5 px-4 border-b border-sky-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400/20 text-amber-300 font-semibold px-2 py-0.5 rounded text-[11px] border border-amber-400/30">
              SIH 2024 Finalist
            </span>
            <span className="text-sky-200 hidden sm:inline">
              Ayurveda IPR & Regulatory Compliance Intelligent Portal
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setApiKeyModalOpen(true)}
              className="flex items-center space-x-1 text-sky-200 hover:text-white transition-colors cursor-pointer"
            >
              <Key className="w-3.5 h-3.5 text-amber-300" />
              <span>Gemini API Key</span>
            </button>
            <div className="flex items-center space-x-1.5 text-emerald-300 font-medium">
              <UserCheck className="w-3.5 h-3.5" />
              <span>{user?.full_name || "Dr. Aarav Sharma (Jury Demo)"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-md shadow-sky-500/20 border border-sky-400/30 group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-2xl tracking-tighter">अ</span>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-2xl font-extrabold text-slate-900 tracking-tight">Ayur</span>
                  <span className="text-2xl font-black bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Guru</span>
                  <span className="text-[10px] uppercase font-bold bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded border border-sky-200">
                    AI 1.0
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                  Ayurveda IPR & Regulatory Shield
                </p>
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
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-sky-50 text-sky-700 shadow-sm border border-sky-100"
                        : "text-slate-600 hover:text-sky-700 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-sky-600" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Controls: Jurisdiction Toggle + Language Selector */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* Jurisdiction Toggle Switch */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 shadow-inner">
                <button
                  type="button"
                  onClick={() => setJurisdiction("India")}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    jurisdiction === "India"
                      ? "bg-gradient-to-r from-blue-700 to-sky-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span className="text-sm">🇮🇳</span>
                  <span>India</span>
                </button>
                <button
                  type="button"
                  onClick={() => setJurisdiction("International")}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    jurisdiction === "International"
                      ? "bg-gradient-to-r from-indigo-700 to-purple-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
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
                className="bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                <option value="English">🇬🇧 English</option>
                <option value="Hindi">🇮🇳 हिन्दी (Hindi)</option>
                <option value="Tamil">🇮🇳 தமிழ் (Tamil)</option>
              </select>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-500 uppercase">Jurisdiction</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setJurisdiction("India")}
                  className={`text-xs px-2.5 py-1 rounded font-bold ${
                    jurisdiction === "India" ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  🇮🇳 India
                </button>
                <button
                  onClick={() => setJurisdiction("International")}
                  className={`text-xs px-2.5 py-1 rounded font-bold ${
                    jurisdiction === "International" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  🌐 Global
                </button>
              </div>
            </div>

            <div className="space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                      isActive ? "bg-sky-50 text-sky-700 font-bold" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-sky-600" />
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setApiKeyModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Configure Gemini API Key</h3>
                <p className="text-xs text-slate-500">Optional: App functions out-of-the-box with built-in statutory engine.</p>
              </div>
            </div>

            <form onSubmit={handleSaveKey} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Google Gemini API Key
                </label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Get your free key from <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-sky-600 underline">Google AI Studio</a>.
                </p>
              </div>

              {keySaved && (
                <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Key saved and active! Ready to analyze queries.</span>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setApiKeyModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 rounded-lg shadow-sm shadow-sky-500/30 transition-all cursor-pointer"
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
