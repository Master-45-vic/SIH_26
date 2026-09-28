"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJurisdiction } from "@/context/JurisdictionContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  Layers,
  Lightbulb,
  Share2,
  Bell,
  Database,
  ArrowRight,
  ShieldCheck,
  Search,
  Scale,
  Award,
  Globe2,
  FileCheck2,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { jurisdiction, setJurisdiction } = useJurisdiction();
  const { language, t } = useLanguage();
  const [quickQuery, setQuickQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      router.push(`/assistant?q=${encodeURIComponent(quickQuery.trim())}`);
    }
  };

  const sampleQuestions = [
    "Can I patent a novel liposomal Curcumin + Piperine formulation in India?",
    "What is the difference between Classical Medicine and Proprietary Medicine under Rule 158-B?",
    "When is National Biodiversity Authority (NBA) Form III mandatory?",
    "How does FSSAI Ayurveda Aahar differ from AYUSH proprietary medicine?",
    "What are US FDA requirements for marketing an Ayurvedic botanical drug under 21 CFR 312?",
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-sky-800 to-indigo-950 text-white p-8 sm:p-12 lg:p-16 shadow-xl border border-sky-700/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Active Jurisdiction Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active Framework:</span>
            <span className="text-amber-300 font-bold">
              {jurisdiction === "India" ? "🇮🇳 India Domestic Laws" : "🌐 International (WIPO / US FDA / EU)"}
            </span>
            <button
              onClick={() => setJurisdiction(jurisdiction === "India" ? "International" : "India")}
              className="ml-1 text-[11px] underline text-sky-200 hover:text-white cursor-pointer"
            >
              (Switch)
            </button>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            AI-Powered Multilingual <br />
            <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-amber-200 bg-clip-text text-transparent">
              Ayurveda IPR & Regulatory Assistant
            </span>
          </h1>

          <p className="text-base sm:text-lg text-sky-100/90 font-normal max-w-2xl mx-auto leading-relaxed">
            Navigate Patents (Sec 3p/3d/3e), TKDL prior art, ABS compliance (NBA Form III), AYUSH Rule 158-B licensing, and FSSAI Ayurveda Aahar with statutory precision.
          </p>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center">
              <input
                type="text"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder={t("askQuestion")}
                className="w-full text-slate-900 bg-white placeholder-slate-400 pl-12 pr-32 py-4 rounded-2xl text-sm font-medium shadow-2xl focus:outline-none focus:ring-4 focus:ring-sky-400/40"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4" />
              <button
                type="submit"
                className="absolute right-2.5 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold text-xs rounded-xl shadow-md hover:from-sky-700 hover:to-blue-700 transition-all cursor-pointer flex items-center space-x-1"
              >
                <span>Analyze</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Sample Prompts Pills */}
          <div className="pt-2 text-left sm:text-center">
            <span className="text-[11px] uppercase tracking-wider text-sky-300 font-bold block mb-2">
              Popular Statutory Inquiries:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {sampleQuestions.slice(0, 3).map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => router.push(`/assistant?q=${encodeURIComponent(q)}`)}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-xl border border-white/15 backdrop-blur-sm transition-all text-left truncate max-w-xs cursor-pointer"
                >
                  "{q.slice(0, 48)}..."
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* National Portal Stats Marquee */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Codified Treatises & Acts", val: "54+ Texts", sub: "First Schedule D&C Act & TKDL", icon: Scale },
          { label: "Hybrid RAG Precision", val: "BM25 + Vectors", sub: "Statutory source citation guarantee", icon: Database },
          { label: "Jurisdiction Guardrails", val: "100% Isolated", sub: "India vs International separated", icon: Globe2 },
          { label: "Multilingual Engine", val: "EN • HI • TA", sub: "English, हिन्दी, தமிழ்", icon: Award },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-100">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-black text-slate-900 tracking-tight block">{stat.val}</span>
                <h4 className="text-xs font-bold text-slate-700">{stat.label}</h4>
                <p className="text-[11px] text-slate-400">{stat.sub}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Core Feature Suites */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Intelligent Regulatory Suite
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Purpose-Built for the Ayurveda Innovation Ecosystem
          </h2>
          <p className="text-xs text-slate-500">
            From formulation idea to patent grant and commercial license.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Product Classification */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-sky-500/20">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  Product Classification Engine
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  5-question wizard categorizing products into Classical Medicine, Proprietary, Phytopharmaceutical, Ayurveda-Aahar, or Cosmetics with Rule 158-B reasoning.
                </p>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Rule 158-B Category 4.1 vs 4.2 differentiation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>CDSCO Rule 122E Phytopharmaceutical checks</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>FSSAI Ayurveda Aahar Schedule A check</span>
                </li>
              </ul>
            </div>
            <Link
              href="/classify"
              className="mt-6 flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-700 font-bold text-xs border border-slate-200 hover:border-sky-200 transition-all"
            >
              <span>Launch Classification Wizard</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Innovation Gap Analyzer */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  Innovation Gap Analyzer
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Analyze polyherbal ideas (e.g. Turmeric + Neem). Uncover patentable white space across novel delivery, supercritical CO2 extraction, and synergistic ratios.
                </p>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>TKDL prior art and landmark revocations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>SNEDDS, liposomes, phytosome pathways</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Patentability & ABS scorecards</span>
                </li>
              </ul>
            </div>
            <Link
              href="/innovation"
              className="mt-6 flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-800 font-bold text-xs border border-slate-200 hover:border-amber-200 transition-all"
            >
              <span>Analyze Formulation White Space</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: Interactive Knowledge Graph */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Share2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                  Interactive Knowledge Graph
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Explore dynamic links across 5 statutory tiers: Plant → Traditional Knowledge → Patent → ABS → Regulation with instant node inspection.
                </p>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Interactive node-link SVG canvas with zoom</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Filter by Ashwagandha, Turmeric, Neem, Brahmi</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Statutory lineage and invalidation evidence</span>
                </li>
              </ul>
            </div>
            <Link
              href="/graph"
              className="mt-6 flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-800 font-bold text-xs border border-slate-200 hover:border-indigo-200 transition-all"
            >
              <span>Explore Knowledge Graph</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Secondary Features Grid: AI Assistant, Alerts, Admin */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-br from-sky-50 to-white rounded-3xl border border-sky-100 flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Explainable AI & Human Escalation</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Every answer includes "Why this answer?" reasoning bullets. If confidence &lt; 60%, the system flags human escalation to certified Patent Attorneys or ABS Officers.
            </p>
            <Link href="/assistant" className="inline-flex items-center space-x-1 text-xs font-bold text-sky-700 hover:underline mt-2">
              <span>Open Assistant</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-blue-100 flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Regulatory Change Alerts</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Live updates on AYUSH notifications, Biodiversity Amendment 2023 rules, CGPDTM patent amendments, and US FDA botanical guidance with actionable checklists.
            </p>
            <Link href="/alerts" className="inline-flex items-center space-x-1 text-xs font-bold text-blue-700 hover:underline mt-2">
              <span>View Active Alerts</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-3xl border border-purple-100 flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Admin Document Ingestion</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Upload statutory gazette notifications and PDFs directly into the hybrid RAG corpus. Browse all indexed citations and legal excerpts.
            </p>
            <Link href="/admin" className="inline-flex items-center space-x-1 text-xs font-bold text-purple-700 hover:underline mt-2">
              <span>Admin Sources</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
