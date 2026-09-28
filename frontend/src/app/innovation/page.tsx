"use client";

import React, { useState } from "react";
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-slate-900">Innovation Gap Analyzer</h1>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
                White-Space Finder
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Identifies prior art hurdles in TKDL & granted patents, discovering high-value patentable opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Formulation Submission Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <form onSubmit={handleAnalyze} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Formulation / Project Name
              </label>
              <input
                type="text"
                value={formulationName}
                onChange={(e) => setFormulationName(e.target.value)}
                placeholder="e.g. CurcuNeem Bio-Matrix"
                className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Herbal Ingredients (e.g. Turmeric, Neem)
              </label>
              <input
                type="text"
                value={ingredientsInput}
                onChange={(e) => setIngredientsInput(e.target.value)}
                placeholder="e.g. Turmeric, Neem, Piperine"
                className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Target Therapeutic Indication / Intended Use
              </label>
              <input
                type="text"
                value={intendedUse}
                onChange={(e) => setIntendedUse(e.target.value)}
                placeholder="e.g. Accelerated wound healing, skin microbiome rebalance"
                className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Proposed Delivery Matrix
              </label>
              <select
                value={currentForm}
                onChange={(e) => setCurrentForm(e.target.value)}
                className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
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
              <span className="text-[11px] font-bold text-slate-400">Quick Test Cases:</span>
              {sampleFormulations.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setFormulationName(`${item.name} Formulation`);
                    setIngredientsInput(item.name);
                    setIntendedUse(item.desc);
                  }}
                  className="text-[11px] bg-slate-100 hover:bg-amber-50 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 font-medium cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-1.5 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
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
            <h3 className="text-base font-bold text-slate-900">
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
                <h3 className="text-base font-bold text-slate-900">
                  White-Space Innovation Opportunities
                </h3>
                <p className="text-xs text-slate-500">
                  Actionable technological leaps capable of overcoming Indian Patents Act Section 3(p) & 3(e).
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                3 Pathways Discovered
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {analysis.innovation_opportunities.map((opp: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        {opp.category}
                      </span>
                      <span className="text-xs font-bold text-emerald-600">
                        {opp.patentability_potential} Upside
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {opp.opportunity}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {opp.technical_description}
                    </p>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-[11px] space-y-1">
                      <span className="font-bold text-slate-700 block">IP Barrier Overcome:</span>
                      <p className="text-slate-600 italic">"{opp.prior_art_hurdle}"</p>
                    </div>

                    <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/70 text-[11px] space-y-1">
                      <span className="font-bold text-emerald-800 block">Lab Validation Protocol:</span>
                      <p className="text-slate-700">{opp.recommended_experimentation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prior Art Conflict Analysis: Granted Patents & TKDL Treatises */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patents Landscape */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-900">
                <Scale className="w-4 h-4 text-sky-600" />
                <span>Existing Patents & Landmark Invalidation Precedents</span>
              </div>
              <div className="space-y-3">
                {analysis.existing_patents.map((pat: any, i: number) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-900">{pat.patent_number}</span>
                      <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded border border-rose-200">
                        {pat.status}
                      </span>
                    </div>
                    <div className="font-semibold text-slate-800">{pat.title}</div>
                    <p className="text-[11px] text-slate-500">{pat.relevance}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Traditional Knowledge Citations */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-900">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Traditional Knowledge (TKDL / Treatise References)</span>
              </div>
              <div className="space-y-3">
                {analysis.traditional_knowledge_prior_art.map((tk: any, i: number) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/80 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-900">{tk.source}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{tk.shloka_reference}</span>
                    </div>
                    <p className="text-[11px] text-slate-700 italic">"{tk.recorded_use}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ABS Compliance Roadmap */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-3xl p-6 border border-teal-200/80 space-y-3">
            <h4 className="text-sm font-bold text-teal-950 flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-teal-700" />
              <span>National Biodiversity Authority (NBA) ABS Compliance Roadmap</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysis.abs_compliance_roadmap.map((step: string, i: number) => (
                <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-800 bg-white/80 p-3 rounded-xl border border-teal-100">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
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
