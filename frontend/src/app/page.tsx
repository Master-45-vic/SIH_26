"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useJurisdiction } from "@/context/JurisdictionContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  Layers,
  Lightbulb,
  Share2,
  ArrowRight,
  Search,
  Globe2,
  Leaf,
  CheckCircle2
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { jurisdiction, setJurisdiction } = useJurisdiction();
  const { t } = useLanguage();
  const [quickQuery, setQuickQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      router.push(`/assistant?q=${encodeURIComponent(quickQuery.trim())}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* 
        ========================================================================
        HERO SECTION: Clean, uncluttered, spacious botanical layout
        ========================================================================
      */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Focused, concise typography & search */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#e2ede0] text-[#143825] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#c2d8be]">
              <Leaf className="w-3.5 h-3.5 text-[#5a9330]" />
              <span>Ayurveda IPR & Regulatory Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#143825] tracking-tight leading-[1.12]">
              Navigating Ayurveda IPR & Compliance with AI
            </h1>

            <p className="text-sm sm:text-base text-[#4a6152] leading-relaxed max-w-xl">
              Instant statutory guidance across Patents Act Section 3(p), Drugs & Cosmetics Rule 158-B, and National Biodiversity Authority (NBA) ABS compliance.
            </p>

            {/* Quick Ask Search Input */}
            <form onSubmit={handleSearchSubmit} className="max-w-lg">
              <div className="relative flex items-center shadow-sm rounded-full bg-white/90 border border-[#c8d9c5] p-1.5 focus-within:ring-2 focus-within:ring-[#5a9330]">
                <Search className="w-4 h-4 text-[#5a9330] ml-3" />
                <input
                  type="text"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder="Ask about Section 3(p), Rule 158-B, or formulation..."
                  className="w-full bg-transparent text-xs sm:text-sm text-[#143825] placeholder-[#7d9f8c] px-3 py-2 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#5a9330] hover:bg-[#4d7d28] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer shadow-sm"
                >
                  Analyze
                </button>
              </div>
            </form>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/assistant"
                className="bg-[#143825] hover:bg-[#0c2417] text-white px-6 py-3 rounded-full text-xs font-bold shadow-sm transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#a6eb90]" />
                <span>Launch AI Assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/classify"
                className="bg-white/80 hover:bg-white text-[#143825] border border-[#c8d9c5] px-6 py-3 rounded-full text-xs font-bold shadow-sm transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#5a9330]" />
                <span>Classify Product</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px] h-[460px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-white group">
              <Image
                src="/images/ayurveda_lawyer_guidance.jpg"
                alt="IPR Patent Lawyer providing statutory guidance on Ayurveda formulation"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        THREE CORE ENGINES: Clean, spacious, uncrowded cards
        ========================================================================
      */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-[#143825]">
            Core Statutory Engines
          </h2>
          <p className="text-xs text-[#5e7164]">
            Actionable legal and regulatory intelligence tailored for practitioners, researchers, and enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Classification */}
          <Link
            href="/classify"
            className="glass-eco rounded-3xl p-6 sm:p-7 border border-[#c8d9c5]/80 shadow-sm hover:shadow-md hover:border-[#5a9330]/60 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#e2ede0] text-[#5a9330] flex items-center justify-center shadow-sm">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#143825] group-hover:text-[#5a9330] transition-colors">
                Product Classification
              </h3>
              <p className="text-xs text-[#4a6152] leading-relaxed">
                Categorize products into Classical Medicine, Proprietary, Phytopharmaceutical, or Ayurveda-Aahar with statutory forms and licensing rules.
              </p>
            </div>
            <div className="pt-4 flex items-center space-x-1.5 text-xs font-bold text-[#5a9330]">
              <span>Run Wizard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Innovation Gap */}
          <Link
            href="/innovation"
            className="glass-eco rounded-3xl p-6 sm:p-7 border border-[#c8d9c5]/80 shadow-sm hover:shadow-md hover:border-[#5a9330]/60 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#e2ede0] text-[#5a9330] flex items-center justify-center shadow-sm">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#143825] group-hover:text-[#5a9330] transition-colors">
                Innovation White Space
              </h3>
              <p className="text-xs text-[#4a6152] leading-relaxed">
                Analyze polyherbal recipes against TKDL prior art to discover patentable white space overcoming Section 3(p) objections.
              </p>
            </div>
            <div className="pt-4 flex items-center space-x-1.5 text-xs font-bold text-[#5a9330]">
              <span>Analyze Formulation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Knowledge Graph */}
          <Link
            href="/graph"
            className="glass-eco rounded-3xl p-6 sm:p-7 border border-[#c8d9c5]/80 shadow-sm hover:shadow-md hover:border-[#5a9330]/60 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#e2ede0] text-[#5a9330] flex items-center justify-center shadow-sm">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#143825] group-hover:text-[#5a9330] transition-colors">
                Knowledge Graph Explorer
              </h3>
              <p className="text-xs text-[#4a6152] leading-relaxed">
                Explore the 5-tier lineage connecting Plants → TKDL Monographs → Patent Precedents → ABS Approval → Drug Regulations.
              </p>
            </div>
            <div className="pt-4 flex items-center space-x-1.5 text-xs font-bold text-[#5a9330]">
              <span>Explore Graph</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 
        ========================================================================
        JURISDICTION ISOLATION BANNER: Concise, clean, statutory guarantee
        ========================================================================
      */}
      <section className="glass-eco rounded-3xl p-6 sm:p-8 border border-[#c8d9c5]/80 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center space-x-2">
              <Globe2 className="w-4 h-4 text-[#5a9330]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#143825]">
                Strict Jurisdiction Isolation
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#143825]">
              India Statutory Law vs. International Frameworks
            </h3>
            <p className="text-xs text-[#4a6152] leading-relaxed">
              GURU guarantees 100% boundary isolation. Domestic queries follow Patents Act 1970, Rule 158-B, and Biodiversity Act. Export queries adhere to US FDA Botanical Guidelines, EU THMPD, and WIPO.
            </p>
          </div>

          <div className="flex items-center space-x-2.5 shrink-0">
            <button
              onClick={() => setJurisdiction("India")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                jurisdiction === "India"
                  ? "bg-[#5a9330] text-white shadow-sm"
                  : "bg-white/80 text-[#143825] border border-[#c8d9c5] hover:bg-[#e2ede0]"
              }`}
            >
              🇮🇳 India Mode
            </button>
            <button
              onClick={() => setJurisdiction("International")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                jurisdiction === "International"
                  ? "bg-[#5a9330] text-white shadow-sm"
                  : "bg-white/80 text-[#143825] border border-[#c8d9c5] hover:bg-[#e2ede0]"
              }`}
            >
              🌐 International Mode
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
