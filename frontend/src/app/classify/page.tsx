"use client";

import React, { useState } from "react";
import Image from "next/image";
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
    <div className="relative max-w-4xl mx-auto space-y-8">
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
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center space-x-2 bg-[#e2ede0] text-[#143825] text-xs font-bold px-4 py-1.5 rounded-full border border-[#c2d8be]">
          <Layers className="w-3.5 h-3.5 text-[#5a9330]" />
          <span>Statutory Product Classification Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#143825] tracking-tight">
          Ayurvedic Regulatory Classification
        </h1>
        <p className="text-xs sm:text-sm text-[#4a6152] max-w-xl mx-auto">
          Accurately classify your herbal product into Classical Medicine, Proprietary, Phytopharmaceutical, Ayurveda-Aahar, or Cosmetics under Drugs & Cosmetics Act & FSSAI.
        </p>
      </div>

      {/* Progress Stepper Bar */}
      {step <= 5 && (
        <div className="glass-eco p-4 rounded-2xl border border-[#c8d9c5]/70 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-[#143825] mb-2">
            <span>Step {step} of 5</span>
            <span className="text-[#5a9330] font-extrabold">{Math.round((step / 5) * 100)}% Completed</span>
          </div>
          <div className="w-full bg-[#e2ede0] rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-[#74aa43] to-[#4d7d28] h-2.5 rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Wizard Card */}
      <div className="glass-eco rounded-3xl p-6 sm:p-10 border border-[#c8d9c5]/80 shadow-md relative">
        {/* Step 1: Product Name & Ingredients */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-bold text-[#143825]">1. Product Identity & Herbal Ingredients</h3>
              <p className="text-xs text-[#5e7164]">Provide the commercial name and botanical composition.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#143825] mb-1.5">
                  Proposed Product Name / Brand
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-2xl border border-[#c8d9c5] focus:outline-none focus:ring-2 focus:ring-[#5a9330] bg-white/80"
                  placeholder="e.g. CurcuVeda Forte"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#143825] mb-1.5">
                  Herbal Ingredients List (comma-separated)
                </label>
                <textarea
                  rows={3}
                  value={ingredientsInput}
                  onChange={(e) => setIngredientsInput(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-2xl border border-[#c8d9c5] focus:outline-none focus:ring-2 focus:ring-[#5a9330] bg-white/80"
                  placeholder="e.g. Ashwagandha, Turmeric, Neem, Piperine"
                />
                <p className="text-[11px] text-[#5e7164] mt-1">
                  Specify Sanskrit, common, or botanical names.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                disabled={!productName.trim() || !ingredientsInput.trim()}
                className="flex items-center space-x-1.5 px-7 py-3 bg-[#5a9330] hover:bg-[#4d7d28] text-white rounded-full text-xs font-bold transition-all cursor-pointer disabled:opacity-50 shadow-sm"
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
              <h3 className="text-xl font-bold text-[#143825]">2. Authoritative Treatise Reference</h3>
              <p className="text-xs text-[#5e7164]">
                Are the formulation ingredients and process verbatim from the First Schedule 54 books?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setIsTextual(true)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  isTextual
                    ? "border-[#5a9330] bg-[#eef6ec] shadow-sm"
                    : "border-[#c8d9c5]/70 bg-white/70 hover:border-[#5a9330]/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-[#143825]">Yes, Verbatim Classical Recipe</span>
                  {isTextual && <CheckCircle className="w-4 h-4 text-[#5a9330]" />}
                </div>
                <p className="text-[11px] text-[#4a6152] leading-relaxed">
                  Mentioned in Charaka Samhita, Sushruta Samhita, Sharangadhara Samhita, Bhavaprakasha, or other First Schedule texts without modifying ingredient ratios.
                </p>
              </div>

              <div
                onClick={() => setIsTextual(false)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  !isTextual
                    ? "border-[#5a9330] bg-[#eef6ec] shadow-sm"
                    : "border-[#c8d9c5]/70 bg-white/70 hover:border-[#5a9330]/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-[#143825]">No, Modified or Proprietary Formulation</span>
                  {!isTextual && <CheckCircle className="w-4 h-4 text-[#5a9330]" />}
                </div>
                <p className="text-[11px] text-[#4a6152] leading-relaxed">
                  Modified ingredient ratios, modern excipients, combination of multiple recipes, or novel extraction solvents.
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="flex items-center space-x-1.5 px-5 py-2.5 text-[#143825] hover:bg-[#e2ede0] rounded-full text-xs font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center space-x-1.5 px-7 py-3 bg-[#5a9330] hover:bg-[#4d7d28] text-white rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm"
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
              <h3 className="text-xl font-bold text-[#143825]">3. Therapeutic & Commercial Claims</h3>
              <p className="text-xs text-[#5e7164]">What is the intended use claimed on the label and marketing?</p>
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
                      ? "border-[#5a9330] bg-[#eef6ec] shadow-sm"
                      : "border-[#c8d9c5]/70 bg-white/70 hover:border-[#5a9330]/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-[#143825]">{opt.label}</span>
                    {claimsType === opt.id && <CheckCircle className="w-4 h-4 text-[#5a9330]" />}
                  </div>
                  <p className="text-[11px] text-[#4a6152]">{opt.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="flex items-center space-x-1.5 px-5 py-2.5 text-[#143825] hover:bg-[#e2ede0] rounded-full text-xs font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex items-center space-x-1.5 px-7 py-3 bg-[#5a9330] hover:bg-[#4d7d28] text-white rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm"
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
              <h3 className="text-xl font-bold text-[#143825]">4. Dosage Form & Purification</h3>
              <p className="text-xs text-[#5e7164]">Select the finished pharmaceutical or food matrix.</p>
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
                  className={`p-3 rounded-2xl border-2 text-xs font-bold text-center transition-all cursor-pointer ${
                    form === f
                      ? "border-[#5a9330] bg-[#eef6ec] text-[#143825] shadow-sm"
                      : "border-[#c8d9c5]/70 bg-white/70 text-[#4a6152] hover:border-[#5a9330]/50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Phytopharmaceutical checkbox */}
            <div className="bg-[#eef6ec]/60 p-4 rounded-2xl border border-[#c8d9c5]">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPurified}
                  onChange={(e) => setIsPurified(e.target.checked)}
                  className="mt-0.5 rounded border-[#c8d9c5] text-[#5a9330] focus:ring-[#5a9330]"
                />
                <div>
                  <span className="text-xs font-bold text-[#143825]">
                    Purified fraction with defined chemical biomarkers (CDSCO Rule 122E)?
                  </span>
                  <p className="text-[11px] text-[#5e7164] mt-0.5">
                    Check this if you have standardized a purified fraction with at least 4 active chemical markers or high purity.
                  </p>
                </div>
              </label>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(3)}
                className="flex items-center space-x-1.5 px-5 py-2.5 text-[#143825] hover:bg-[#e2ede0] rounded-full text-xs font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex items-center space-x-1.5 px-7 py-3 bg-[#5a9330] hover:bg-[#4d7d28] text-white rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm"
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
              <h3 className="text-xl font-bold text-[#143825]">5. Route of Administration</h3>
              <p className="text-xs text-[#5e7164]">Confirm intended anatomical delivery route.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Oral", "Topical", "Nasal (Nasya)", "Sublingual"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRoute(r)}
                  className={`p-3 rounded-2xl border-2 text-xs font-bold text-center transition-all cursor-pointer ${
                    route === r
                      ? "border-[#5a9330] bg-[#eef6ec] text-[#143825] shadow-sm"
                      : "border-[#c8d9c5]/70 bg-white/70 text-[#4a6152] hover:border-[#5a9330]/50"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="bg-[#eef6ec] p-4 rounded-2xl border border-[#c2d8be] text-xs text-[#143825] space-y-1">
              <div className="font-bold text-[#143825]">Summary Before Analysis:</div>
              <div>Product: <span className="font-semibold">{productName}</span></div>
              <div>Ingredients: <span className="font-semibold">{ingredientsInput}</span></div>
              <div>Form: <span className="font-semibold">{form}</span> ({route})</div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(4)}
                className="flex items-center space-x-1.5 px-5 py-2.5 text-[#143825] hover:bg-[#e2ede0] rounded-full text-xs font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center space-x-2 px-8 py-3 bg-[#5a9330] hover:bg-[#4d7d28] text-white rounded-full text-xs font-bold shadow-md shadow-[#5a9330]/20 transition-all cursor-pointer disabled:opacity-50"
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
            <div className="text-center space-y-2 pb-4 border-b border-[#c8d9c5]/60">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#143825] bg-[#e2ede0] px-4 py-1 rounded-full border border-[#c2d8be]">
                Official Statutory Classification Report
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#143825] mt-1">{result.product_name}</h2>
              <div className="inline-block mt-2">
                <span className="text-sm font-black uppercase tracking-wide bg-[#5a9330] text-white px-5 py-2 rounded-full shadow-sm">
                  {result.classification}
                </span>
              </div>
            </div>

            {/* Key Dossier Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Authority & Section */}
              <div className="p-5 rounded-2xl bg-white/80 border border-[#c8d9c5]/80 space-y-2 shadow-sm">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#143825]">
                  <Building className="w-4 h-4 text-[#5a9330]" />
                  <span>Regulatory Licensing Authority</span>
                </div>
                <p className="text-xs text-[#143825] font-semibold leading-relaxed">
                  {result.licensing_authority}
                </p>
                <div className="text-[11px] text-[#5e7164] pt-2 border-t border-[#c8d9c5]/50 font-mono">
                  {result.statutory_reference}
                </div>
              </div>

              {/* Mandatory Forms */}
              <div className="p-5 rounded-2xl bg-white/80 border border-[#c8d9c5]/80 space-y-2 shadow-sm">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#143825]">
                  <ClipboardList className="w-4 h-4 text-[#5a9330]" />
                  <span>Mandatory Statutory Filings</span>
                </div>
                <ul className="text-xs text-[#143825] space-y-1.5">
                  {result.mandatory_forms.map((f: string, idx: number) => (
                    <li key={idx} className="flex items-center space-x-2 font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#5a9330]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Safety & Pre-clinical Requirements */}
            <div className="p-5 rounded-2xl bg-[#fff8eb] border border-[#f1d7a8] space-y-2 shadow-sm">
              <span className="text-xs font-bold text-[#7c4a03] flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#b45309]" />
                <span>Safety & Toxicity Requirements (Rule 158-B / FSSAI)</span>
              </span>
              <p className="text-xs text-[#5e7164] leading-relaxed font-sans">
                {result.safety_data_required}
              </p>
            </div>

            {/* Statutory Reasoning */}
            <div className="p-5 rounded-2xl bg-[#eef6ec] border border-[#c2d8be] space-y-3">
              <span className="text-xs font-bold text-[#143825]">Statutory Reasoning Behind Classification:</span>
              <div className="space-y-2">
                {result.reasoning.map((r: string, idx: number) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-[#143825] leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-[#5a9330] shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#c8d9c5]/60">
              <button
                onClick={resetForm}
                className="flex items-center space-x-1.5 px-5 py-2.5 border border-[#c8d9c5] rounded-full text-xs font-bold text-[#143825] hover:bg-[#e2ede0] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Classify Another Formulation</span>
              </button>

              <button
                onClick={() => window.print()}
                className="flex items-center space-x-2 px-6 py-2.5 bg-[#143825] hover:bg-[#0c2417] text-white rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm"
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
