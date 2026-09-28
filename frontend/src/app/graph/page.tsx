"use client";

import React, { useState } from "react";
import { KnowledgeGraphView } from "@/components/KnowledgeGraphView";
import { Share2, Info, CheckCircle2, Shield, BookOpen, Scale, Sparkles } from "lucide-react";

export default function GraphPage() {
  const [selectedHerb, setSelectedHerb] = useState("all");

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="glass-eco p-6 sm:p-8 rounded-3xl border border-[#c8d9c5]/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#e2ede0] text-[#5a9330] flex items-center justify-center border border-[#c2d8be] shadow-sm">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#143825]">Knowledge Graph Explorer</h1>
              <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-[#e2ede0] text-[#143825] border border-[#c2d8be]">
                5-Tier Lineage
              </span>
            </div>
            <p className="text-xs text-[#5e7164] mt-0.5">
              Visualizing the statutory continuum from botanical medicinal plants to TKDL prior art, patent grants/revocations, ABS compliance, and drug regulations.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          {["all", "turmeric", "neem", "ashwagandha", "brahmi"].map((herb) => (
            <button
              key={herb}
              onClick={() => setSelectedHerb(herb)}
              className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                selectedHerb === herb
                  ? "bg-[#5a9330] text-white shadow-sm"
                  : "bg-[#e2ede0]/70 text-[#143825] hover:bg-[#e2ede0] border border-[#c2d8be]/70"
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
            color: "border-[#c2d8be] bg-[#eef6ec] text-[#143825]",
          },
          {
            tier: "Tier 2: TKDL",
            desc: "Charaka Samhita, Sushruta Samhita, and CSIR defensive digital library protecting against biopiracy.",
            color: "border-[#f1d7a8] bg-[#fff8eb] text-[#7c4a03]",
          },
          {
            tier: "Tier 3: Patent",
            desc: "Landmark revocations (US Turmeric, EPO Neem) and valid white space (SNEDDS, liposomes, nano-carriers).",
            color: "border-[#c8d9c5] bg-white/90 text-[#143825]",
          },
          {
            tier: "Tier 4: ABS",
            desc: "National Biodiversity Authority approvals (Form III before grant, Form I access, benefit sharing fee).",
            color: "border-[#99d5ca] bg-[#e6f7f4] text-[#0f594d]",
          },
          {
            tier: "Tier 5: Regulation",
            desc: "Patents Act Sec 3p/3d/3e, Drugs & Cosmetics Rule 158-B, FSSAI Ayurveda Aahar, and US FDA Guidance.",
            color: "border-[#c2d8be] bg-[#e2ede0] text-[#143825]",
          },
        ].map((item, idx) => (
          <div key={idx} className={`p-4 rounded-3xl border ${item.color} space-y-1.5 shadow-sm`}>
            <span className="text-xs font-black uppercase tracking-wide block">{item.tier}</span>
            <p className="text-[11px] text-[#4a6152] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
