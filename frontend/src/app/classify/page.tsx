"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { api } from "@/lib/api";
import {
  Layers,
  CheckCircle,
  FileText,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ShieldCheck,
  Building,
  ClipboardList,
  Sparkles,
} from "lucide-react";

export default function ClassifyPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Form State
  const [productName, setProductName] = useState("AyurImmuno Care");
  const [ingredientsInput, setIngredientsInput] = useState("Ashwagandha, Tulsi, Giloy, Black Pepper");
  const [isTextual, setIsTextual] = useState<boolean>(false);
  const [claimsType, setClaimsType] = useState("Curative/Therapeutic");
  const [form, setForm] = useState("Capsule");
  const [isPurified, setIsPurified] = useState<boolean>(false);
  const [route, setRoute] = useState("Oral");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const ingredients = ingredientsInput
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);

      const res = await api.classifyProduct({
        product_name: productName,
        ingredients,
        is_textual_reference: isTextual,
        claims_type: claimsType,
        form,
        is_purified_fraction: isPurified,
        route_of_administration: route,
      });

      setResult(res);
      setStep(6); // result step
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    } catch (err: any) {
      alert(`Classification error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 bg-sky-50 text-sky-800 text-xs font-extrabold px-3 py-1 rounded-full border border-sky-200">
          <Layers className="w-3.5 h-3.5 text-sky-600" />
          <span>Statutory Product Classification Engine</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Ayurvedic Regulatory Classification Wizard
        </h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto">
          Accurately classify your product before marketing or licensing into Classical Medicine, Proprietary, Phytopharmaceutical, Ayurveda-Aahar, or Cosmetics.
        </p>
      </div>

      {/* Progress Stepper Bar */}
      {step <= 5 && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
            <span>Step {step} of 5</span>
            <span className="text-sky-600">{Math.round((step / 5) * 100)}% Completed</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-sky-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Wizard Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative">
        {/* Step 1: Product Name & Ingredients */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900">1. Product Identity & Herbal Ingredients</h3>
              <p className="text-xs text-slate-500">Provide the commercial name and botanical composition.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Proposed Product Name / Brand
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="e.g. CurcuVeda Forte"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Herbal Ingredients List (comma-separated)
                </label>
                <textarea
                  rows={3}
                  value={ingredientsInput}
                  onChange={(e) => setIngredientsInput(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="e.g. Ashwagandha, Turmeric, Neem, Piperine"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Specify Sanskrit, common, or botanical names.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                disabled={!productName.trim() || !ingredientsInput.trim()}
                className="flex items-center space-x-1.5 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Traditional Textual Reference */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900">2. Authoritative Treatise Reference</h3>
              <p className="text-xs text-slate-500">
                Are the formulation ingredients and process verbatim from the First Schedule 54 books?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setIsTextual(true)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  isTextual
                    ? "border-sky-600 bg-sky-50/50 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-slate-900">Yes, Verbatim Classical Recipe</span>
                  {isTextual && <CheckCircle className="w-4 h-4 text-sky-600" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Mentioned in Charaka Samhita, Sushruta Samhita, Sharangadhara Samhita, Bhavaprakasha, or other First Schedule texts without modifying ingredient ratios.
                </p>
              </div>

              <div
                onClick={() => setIsTextual(false)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  !isTextual
                    ? "border-sky-600 bg-sky-50/50 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-slate-900">No, Modified or Proprietary Formulation</span>
                  {!isTextual && <CheckCircle className="w-4 h-4 text-sky-600" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Modified ingredient ratios, modern excipients, combination of multiple recipes, or novel extraction solvents.
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="flex items-center space-x-1.5 px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center space-x-1.5 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Claims Type */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900">3. Therapeutic & Commercial Claims</h3>
              <p className="text-xs text-slate-500">What is the intended use claimed on the label and marketing?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: "Curative/Therapeutic",
                  label: "Medical Treatment / Curative",
                  desc: "Claims to treat, mitigate, or cure medical conditions (e.g. Arthritis, Diabetes, Eczema).",
                },
                {
                  id: "Nutritional/Well-being",
                  label: "Everyday Nutritional / Well-Being",
                  desc: "Supports physiological vitality, digestion, rasayana, or immunity without medical cure claims.",
                },
                {
                  id: "Cosmetic/Topical",
                  label: "Cosmetic / Dermal Enhancement",
                  desc: "Topical application for cleansing, beautifying, skin glowing, hair conditioning.",
                },
                {
                  id: "New Molecule",
                  label: "Isolated Synthetic / New Drug Entity",
                  desc: "Single active chemical synthesized or isolated for clinical drug trials.",
                },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setClaimsType(opt.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    claimsType === opt.id
                      ? "border-sky-600 bg-sky-50/50 shadow-sm"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900">{opt.label}</span>
                    {claimsType === opt.id && <CheckCircle className="w-4 h-4 text-sky-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500">{opt.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="flex items-center space-x-1.5 px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex items-center space-x-1.5 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Dosage Form */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900">4. Dosage Form & Purification</h3>
              <p className="text-xs text-slate-500">Select the finished pharmaceutical or food matrix.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                "Churna",
                "Vati",
                "Asava/Arishta",
                "Tablet",
                "Capsule",
                "Extract",
                "Cream/Oil",
                "Injection",
              ].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setForm(f)}
                  className={`p-3 rounded-xl border-2 text-xs font-bold text-center transition-all cursor-pointer ${
                    form === f
                      ? "border-sky-600 bg-sky-50 text-sky-800 shadow-sm"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Phytopharmaceutical checkbox */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPurified}
                  onChange={(e) => setIsPurified(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800">
                    Purified fraction with defined chemical biomarkers (CDSCO Rule 122E)?
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Check this if you have standardized a purified fraction with at least 4 active chemical markers or high purity.
                  </p>
                </div>
              </label>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(3)}
                className="flex items-center space-x-1.5 px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex items-center space-x-1.5 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Route of Administration & Submit */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900">5. Route of Administration</h3>
              <p className="text-xs text-slate-500">Confirm intended anatomical delivery route.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Oral", "Topical", "Nasal (Nasya)", "Sublingual"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRoute(r)}
                  className={`p-3 rounded-xl border-2 text-xs font-bold text-center transition-all cursor-pointer ${
                    route === r
                      ? "border-sky-600 bg-sky-50 text-sky-800 shadow-sm"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-200/80 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-sky-900">Summary Before Analysis:</div>
              <div>Product: <span className="font-semibold">{productName}</span></div>
              <div>Ingredients: <span className="font-semibold">{ingredientsInput}</span></div>
              <div>Form: <span className="font-semibold">{form}</span> ({route})</div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(4)}
                className="flex items-center space-x-1.5 px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center space-x-1.5 px-8 py-3 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? "Analyzing Statutorily..." : "Generate Classification"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Classification Result Dossier */}
        {step === 6 && result && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2 pb-4 border-b border-slate-100">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                Official Classification Report
              </span>
              <h2 className="text-2xl font-black text-slate-900">{result.product_name}</h2>
              <div className="inline-block mt-2">
                <span className="text-sm font-black uppercase tracking-wide bg-gradient-to-r from-sky-600 to-blue-700 text-white px-4 py-1.5 rounded-xl shadow-sm">
                  {result.classification}
                </span>
              </div>
            </div>

            {/* Key Dossier Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Authority & Section */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-900">
                  <Building className="w-4 h-4 text-sky-600" />
                  <span>Regulatory Authority</span>
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {result.licensing_authority}
                </p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 font-mono">
                  {result.statutory_reference}
                </div>
              </div>

              {/* Mandatory Forms */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-900">
                  <ClipboardList className="w-4 h-4 text-emerald-600" />
                  <span>Mandatory Statutory Forms</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1">
                  {result.mandatory_forms.map((f: string, idx: number) => (
                    <li key={idx} className="flex items-center space-x-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Safety & Pre-clinical Requirements */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1.5">
              <span className="text-xs font-bold text-amber-900 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Safety & Toxicity Requirements</span>
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                {result.safety_data_required}
              </p>
            </div>

            {/* Statutory Reasoning */}
            <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-200/80 space-y-2.5">
              <span className="text-xs font-bold text-sky-900">Statutory Reasoning Behind Classification:</span>
              <div className="space-y-2">
                {result.reasoning.map((r: string, idx: number) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-800 leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={resetForm}
                className="flex items-center space-x-1.5 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Classify Another Formulation</span>
              </button>

              <button
                onClick={() => window.print()}
                className="flex items-center space-x-1.5 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Export Classification Dossier</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
