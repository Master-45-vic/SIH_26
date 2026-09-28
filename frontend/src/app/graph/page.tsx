"use client";

import React, { useState } from "react";
import { KnowledgeGraphView } from "@/components/KnowledgeGraphView";
import { Share2, Info, CheckCircle2, Shield, BookOpen, Scale, Sparkles } from "lucide-react";

export default function GraphPage() {
  const [selectedHerb, setSelectedHerb] = useState("all");

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-700 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-slate-900">Knowledge Graph Explorer</h1>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-300">
                5-Tier Lineage
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Visualizing the statutory continuum from botanical medicinal plants to TKDL prior art, patent grants/revocations, ABS compliance, and drug regulations.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {["all", "turmeric", "neem", "ashwagandha", "brahmi"].map((herb) => (
            <button
              key={herb}
              onClick={() => setSelectedHerb(herb)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                selectedHerb === herb
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {herb === "all" ? "All Lineages" : herb}
            </button>
          ))}
        </div>
      </div>

      {/* Main Graph Component */}
      <KnowledgeGraphView selectedPlant={selectedHerb} />

      {/* Statutory Architecture Explainer */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          {
            tier: "Tier 1: Plant",
            desc: "Botanical identity, Sanskrit name, active chemotypes (Withanolides, Curcumin, Azadirachtin, Bacosides).",
            color: "border-emerald-200 bg-emerald-50/50 text-emerald-800",
          },
          {
            tier: "Tier 2: TKDL",
            desc: "Charaka Samhita, Sushruta Samhita, and CSIR defensive digital library protecting against biopiracy.",
            color: "border-amber-200 bg-amber-50/50 text-amber-800",
          },
          {
            tier: "Tier 3: Patent",
            desc: "Landmark revocations (US Turmeric, EPO Neem) and valid white space (SNEDDS, liposomes, nano-carriers).",
            color: "border-indigo-200 bg-indigo-50/50 text-indigo-800",
          },
          {
            tier: "Tier 4: ABS",
            desc: "National Biodiversity Authority approvals (Form III before grant, Form I access, benefit sharing fee).",
            color: "border-teal-200 bg-teal-50/50 text-teal-800",
          },
          {
            tier: "Tier 5: Regulation",
            desc: "Patents Act Sec 3p/3d/3e, Drugs & Cosmetics Rule 158-B, FSSAI Ayurveda Aahar, and US FDA Guidance.",
            color: "border-sky-200 bg-sky-50/50 text-sky-800",
          },
        ].map((item, idx) => (
          <div key={idx} className={`p-4 rounded-2xl border ${item.color} space-y-1`}>
            <span className="text-xs font-black uppercase tracking-wide block">{item.tier}</span>
            <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
