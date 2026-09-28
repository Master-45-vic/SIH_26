"use client";

import React, { useState } from "react";
import Image from "next/image";
import { api } from "@/lib/api";
import { RiskGauge } from "@/components/RiskGauge";
import {
  Lightbulb,
  Sparkles,
  Search,
  Scale,
  ShieldAlert,
  FileCheck,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  FlaskConical,
  BookOpen,
} from "lucide-react";

export default function InnovationPage() {
  const [formulationName, setFormulationName] = useState("CurcuNeem Bio-Matrix");
  const [ingredientsInput, setIngredientsInput] = useState("Turmeric, Neem");
  const [intendedUse, setIntendedUse] = useState("Accelerated wound healing and antimicrobial dermal regeneration");
  const [currentForm, setCurrentForm] = useState("Topical Gel");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!ingredientsInput.trim() || loading) return;

    setLoading(true);
    try {
      const ingredients = ingredientsInput
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);

      const res = await api.analyzeInnovation({
        formulation_name: formulationName,
        ingredients,
        intended_use: intendedUse,
        current_form: currentForm,
      });

      setAnalysis(res);
    } catch (err: any) {
      alert(`Innovation analysis failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const sampleFormulations = [
    { name: "Turmeric + Neem", desc: "Dermal repair & wound healing" },
    { name: "Ashwagandha + Brahmi", desc: "Cognitive endurance & neuroprotection" },
    { name: "Tulsi + Giloy", desc: "Immuno-modulatory respiratory syrup" },
  ];

  return (
    <div className="relative space-y-8">
      {/* Decorative Botanical Leaf Accent (Santhika Style) */}
      <div className="absolute -left-16 -top-4 w-40 h-40 pointer-events-none opacity-60 hidden lg:block">
        <Image
          src="/images/leaf_accent.jpg"
          alt="Ayurvedic Botanical Leaf"
          width={160}
          height={160}
          className="object-contain mix-blend-multiply"
        />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-eco p-6 sm:p-8 rounded-3xl border border-[#c8d9c5]/80 shadow-sm">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#e2ede0] text-[#5a9330] flex items-center justify-center border border-[#c2d8be] shadow-sm">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#143825]">Innovation Gap Analyzer</h1>
              <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-[#e2ede0] text-[#143825] border border-[#c2d8be]">
                White-Space Finder
              </span>
            </div>
            <p className="text-xs text-[#5e7164] mt-0.5">
              Identifies prior art hurdles in TKDL & granted patents, discovering high-value patentable opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Formulation Submission Form */}
      <div className="glass-eco rounded-3xl p-6 sm:p-8 border border-[#c8d9c5]/80 shadow-md">
        <form onSubmit={handleAnalyze} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#143825] mb-1.5">
                Formulation / Project Name
              </label>
              <input
                type="text"
                value={formulationName}
                onChange={(e) => setFormulationName(e.target.value)}
                placeholder="e.g. CurcuNeem Bio-Matrix"
                className="w-full text-xs sm:text-sm px-4 py-3 rounded-2xl border border-[#c8d9c5] focus:outline-none focus:ring-2 focus:ring-[#5a9330] bg-white/80"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#143825] mb-1.5">
                Herbal Ingredients (e.g. Turmeric, Neem)
              </label>
              <input
                type="text"
                value={ingredientsInput}
                onChange={(e) => setIngredientsInput(e.target.value)}
                placeholder="e.g. Turmeric, Neem, Piperine"
                className="w-full text-xs sm:text-sm px-4 py-3 rounded-2xl border border-[#c8d9c5] focus:outline-none focus:ring-2 focus:ring-[#5a9330] bg-white/80"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#143825] mb-1.5">
                Target Therapeutic Indication / Intended Use
              </label>
              <input
                type="text"
                value={intendedUse}
                onChange={(e) => setIntendedUse(e.target.value)}
                placeholder="e.g. Accelerated wound healing, skin microbiome rebalance"
                className="w-full text-xs sm:text-sm px-4 py-3 rounded-2xl border border-[#c8d9c5] focus:outline-none focus:ring-2 focus:ring-[#5a9330] bg-white/80"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#143825] mb-1.5">
                Proposed Delivery Matrix
              </label>
              <select
                value={currentForm}
                onChange={(e) => setCurrentForm(e.target.value)}
                className="w-full text-xs sm:text-sm px-4 py-3 rounded-2xl border border-[#c8d9c5] focus:outline-none focus:ring-2 focus:ring-[#5a9330] bg-white/80"
              >
                <option value="Topical Gel">Topical Gel / Cream</option>
                <option value="Oral Capsule / Tablet">Oral Capsule / Tablet</option>
                <option value="SNEDDS Nano-Emulsion">SNEDDS Nano-Emulsion</option>
                <option value="Liposomal Suspension">Liposomal Suspension</option>
                <option value="Supercritical CO2 Extract">Supercritical CO2 Extract</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold text-[#5e7164]">Quick Test Cases:</span>
              {sampleFormulations.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setFormulationName(`${item.name} Formulation`);
                    setIngredientsInput(item.name);
                    setIntendedUse(item.desc);
                  }}
                  className="text-[11px] bg-[#e2ede0] hover:bg-[#d6e8d3] text-[#143825] px-3 py-1 rounded-full border border-[#c2d8be] font-semibold cursor-pointer transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-7 py-3 bg-[#5a9330] hover:bg-[#4d7d28] text-white rounded-full text-xs font-bold shadow-md shadow-[#5a9330]/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? "Analyzing Patents & TKDL..." : "Analyze Innovation Gaps"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Analysis Output Section */}
      {analysis && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Dashboard Gauges */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#143825]">
              Patentability & Risk Scorecards ({analysis.formulation_name})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <RiskGauge
                label="Patentability Potential"
                score={analysis.patentability_score}
                type="patentability"
                size="md"
              />
              <RiskGauge
                label="TKDL Prior Art Risk"
                score={analysis.tkdl_risk_score}
                type="tkdl"
                size="md"
              />
              <RiskGauge
                label="ABS Biodiversity Risk"
                score={analysis.abs_risk_score}
                type="abs"
                size="md"
              />
              <RiskGauge
                label="Commercialization Score"
                score={analysis.commercial_readiness_score}
                type="commercial"
                size="md"
              />
            </div>
          </div>

          {/* Three White-Space Opportunities */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#143825]">
                  White-Space Innovation Opportunities
                </h3>
                <p className="text-xs text-[#5e7164]">
                  Actionable technological leaps capable of overcoming Indian Patents Act Section 3(p) & 3(e).
                </p>
              </div>
              <span className="text-xs font-bold text-[#2d5c1e] bg-[#eef6ec] px-3.5 py-1 rounded-full border border-[#c2d8be]">
                3 Pathways Discovered
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {analysis.innovation_opportunities.map((opp: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white/90 rounded-3xl p-6 border border-[#c8d9c5]/80 shadow-sm hover:shadow-md hover:border-[#5a9330]/60 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#e2ede0] text-[#143825] border border-[#c2d8be]">
                        {opp.category}
                      </span>
                      <span className="text-xs font-bold text-[#5a9330]">
                        {opp.patentability_potential} Upside
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#143825] leading-snug">
                      {opp.opportunity}
                    </h4>

                    <p className="text-xs text-[#4a6152] leading-relaxed">
                      {opp.technical_description}
                    </p>

                    <div className="bg-[#eef6ec] p-3 rounded-2xl border border-[#c2d8be] text-[11px] space-y-1">
                      <span className="font-bold text-[#143825] block">IP Barrier Overcome:</span>
                      <p className="text-[#4a6152] italic">"{opp.prior_art_hurdle}"</p>
                    </div>

                    <div className="bg-[#f0f7ef] p-3 rounded-2xl border border-[#c8d9c5] text-[11px] space-y-1">
                      <span className="font-bold text-[#2d5c1e] block">Lab Validation Protocol:</span>
                      <p className="text-[#4a6152]">{opp.recommended_experimentation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prior Art Conflict Analysis: Granted Patents & TKDL Treatises */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patents Landscape */}
            <div className="bg-white/90 rounded-3xl p-6 border border-[#c8d9c5]/80 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#143825]">
                <Scale className="w-4 h-4 text-[#5a9330]" />
                <span>Existing Patents & Landmark Invalidation Precedents</span>
              </div>
              <div className="space-y-3">
                {analysis.existing_patents.map((pat: any, i: number) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-[#edf5eb]/60 border border-[#c8d9c5]/70 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#143825]">{pat.patent_number}</span>
                      <span className="text-[10px] bg-[#fef2f2] text-[#991b1b] font-bold px-2 py-0.5 rounded-full border border-[#fecaca]">
                        {pat.status}
                      </span>
                    </div>
                    <div className="font-semibold text-[#143825]">{pat.title}</div>
                    <p className="text-[11px] text-[#5e7164]">{pat.relevance}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Traditional Knowledge Citations */}
            <div className="bg-white/90 rounded-3xl p-6 border border-[#c8d9c5]/80 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#143825]">
                <BookOpen className="w-4 h-4 text-[#b45309]" />
                <span>Traditional Knowledge (TKDL / Treatise References)</span>
              </div>
              <div className="space-y-3">
                {analysis.traditional_knowledge_prior_art.map((tk: any, i: number) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-[#fff8eb] border border-[#f1d7a8] text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#7c4a03]">{tk.source}</span>
                      <span className="text-[10px] text-[#7c4a03] font-mono">{tk.shloka_reference}</span>
                    </div>
                    <p className="text-[11px] text-[#5e7164] italic">"{tk.recorded_use}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ABS Compliance Roadmap */}
          <div className="bg-[#eef6ec] rounded-3xl p-6 sm:p-7 border border-[#c2d8be] space-y-3.5 shadow-sm">
            <h4 className="text-sm font-bold text-[#143825] flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-[#5a9330]" />
              <span>National Biodiversity Authority (NBA) ABS Compliance Roadmap</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysis.abs_compliance_roadmap.map((step: string, i: number) => (
                <div key={i} className="flex items-start space-x-2.5 text-xs text-[#143825] bg-white/90 p-3.5 rounded-2xl border border-[#c8d9c5]/70">
                  <CheckCircle className="w-4 h-4 text-[#5a9330] shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
