"use client";

import React from "react";
import {
  X,
  Mic,
  FileText,
  Languages,
  Brain,
  Scale,
  GitBranch,
  Database,
  Layers,
  Cpu,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowDown,
  BookOpen,
  Share2,
  Lock,
  UserCheck,
  AlertTriangle,
  Sparkles
} from "lucide-react";

interface ArchitectureDiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ArchitectureDiagramModal({ isOpen, onClose }: ArchitectureDiagramModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#f7faf6] rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#c8d9c5] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-white/90 border-b border-[#d6e5d3] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5a9330] text-white flex items-center justify-center shadow-md shadow-[#5a9330]/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black text-[#143825]">AyurGuru System Architecture</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-[#e2f0de] text-[#2c5f1a] border border-[#bcd9b5]">
                  Official Pipeline Flow
                </span>
              </div>
              <p className="text-xs text-[#557b64]">
                Multi-Hop LangGraph Agent, Triple Grounding (KB + RAG + Graph), Evidence Verification, and Safe Abstain.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#edf5eb] hover:bg-[#e1efe0] text-[#143825] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Diagram Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Main Flow Layout Container */}
          <div className="p-5 bg-white/80 rounded-3xl border border-[#d6e5d3] shadow-xs space-y-6">
            
            {/* Stage 1: Ingest & Understanding Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Box 1: User Query Dual Ingest */}
              <div className="p-4 rounded-2xl bg-[#e3f4fd] border border-[#bce2fb] text-center shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white mx-auto mb-2 flex items-center justify-center shadow-xs">
                  <div className="flex items-center space-x-1">
                    <FileText className="w-4 h-4" />
                    <Mic className="w-4 h-4 text-sky-200" />
                  </div>
                </div>
                <h4 className="text-xs font-bold text-sky-950">1. User Query</h4>
                <p className="text-[10px] text-sky-700 mt-1">
                  Dual Ingest: Text input & Voice Microphone (Web Speech API)
                </p>
              </div>

              {/* Box 2: Language Detection & Translation */}
              <div className="p-4 rounded-2xl bg-[#f0f9ec] border border-[#cde8c4] text-center shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#5a9330] text-white mx-auto mb-2 flex items-center justify-center shadow-xs">
                  <Languages className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-[#143825]">2. Language & Translation</h4>
                <p className="text-[10px] text-[#4d7a5b] mt-1">
                  Hindi (Devanagari), Tamil, Telugu, Sanskrit & English canonicalization
                </p>
              </div>

              {/* Box 3: Query Understanding */}
              <div className="p-4 rounded-2xl bg-[#f8effe] border border-[#edd7fc] text-center shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white mx-auto mb-2 flex items-center justify-center shadow-xs">
                  <Brain className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-purple-950">3. Query Understanding</h4>
                <p className="text-[10px] text-purple-700 mt-1">
                  Entity extraction (Herbs, Classical texts, Statutory clauses, Intent)
                </p>
              </div>

              {/* Box 4: Jurisdiction Selection */}
              <div className="p-4 rounded-2xl bg-[#fef5e7] border border-[#fbe0be] text-center shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white mx-auto mb-2 flex items-center justify-center shadow-xs">
                  <Scale className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-amber-950">4. Jurisdiction Isolation</h4>
                <div className="flex items-center justify-center space-x-1.5 mt-1.5 text-[10px] font-bold">
                  <span className="px-2 py-0.5 bg-white rounded-md border border-amber-300 text-amber-900">🇮🇳 India Laws</span>
                  <span className="px-2 py-0.5 bg-white rounded-md border border-amber-300 text-amber-900">🌐 Global</span>
                </div>
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-[#edf5eb] flex items-center justify-center text-[#5a9330]">
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>

            {/* Stage 2: Branching & Domain Routing + Triple Grounding */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left 2 Cols: Domain Routing */}
              <div className="lg:col-span-2 p-4 rounded-2xl bg-[#fcf8ff] border border-[#ecdcfc] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <GitBranch className="w-4 h-4 text-purple-700" />
                    <h4 className="text-xs font-bold text-purple-950">5. Branching & Domain Routing</h4>
                  </div>
                  <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                    Specialized Retrievers
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {/* Sub-retriever 1: IP Retriever */}
                  <div className="p-3 rounded-xl bg-white border border-purple-200 text-center shadow-xs">
                    <div className="text-sm font-black text-purple-700">® IP Retriever</div>
                    <p className="text-[10px] text-[#555] mt-1">
                      Patents Act 1970 (Sec 3p/3d/3e), Trademarks, GI, Copyrights
                    </p>
                  </div>

                  {/* Sub-retriever 2: Regulatory Retriever */}
                  <div className="p-3 rounded-xl bg-white border border-purple-200 text-center shadow-xs">
                    <div className="text-sm font-black text-purple-700">📜 Regulatory</div>
                    <p className="text-[10px] text-[#555] mt-1">
                      AYUSH Rule 158-B, Form 25D, CDSCO Rule 122E, FSSAI Aahar
                    </p>
                  </div>

                  {/* Sub-retriever 3: ABS/TKDL Retriever */}
                  <div className="p-3 rounded-xl bg-white border border-purple-200 text-center shadow-xs">
                    <div className="text-sm font-black text-purple-700">🌿 ABS / TKDL</div>
                    <p className="text-[10px] text-[#555] mt-1">
                      BD Act 2002/2023, NBA Form III/I, CSIR TKDL monographs
                    </p>
                  </div>
                </div>

                {/* Alternate Branch: Product Classification */}
                <div className="p-2.5 rounded-xl bg-[#eef7ec] border border-[#c5e4bc] flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#143825]">Product Classification Branch:</span>
                    <span className="text-[11px] text-[#446650]">
                      Classical vs Proprietary vs Phytopharmaceutical vs Ayurveda Aahar
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white text-[#2c5f1a] font-bold text-[10px] border border-[#bcd9b5]">
                    Direct Engine
                  </span>
                </div>
              </div>

              {/* Right 1 Col: Triple-Source Retrieval Grounding */}
              <div className="p-4 rounded-2xl bg-[#eaf4e8] border border-[#c4dec0] space-y-3">
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-[#5a9330]" />
                  <h4 className="text-xs font-bold text-[#143825]">6. Triple-Source Grounding</h4>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 bg-white rounded-xl border border-[#cde2c9] text-xs">
                    <div className="font-bold text-[#143825] flex items-center justify-between">
                      <span>Verified Knowledge Base</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-[10px] text-[#557b64] mt-0.5">
                      Statutory Gazettes & First Schedule Treatises (54 classical books)
                    </p>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-[#cde2c9] text-xs">
                    <div className="font-bold text-[#143825] flex items-center justify-between">
                      <span>RAG Retrieval Engine</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-[10px] text-[#557b64] mt-0.5">
                      Hybrid BM25 sparse index + Qdrant dense vector embeddings
                    </p>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-[#cde2c9] text-xs">
                    <div className="font-bold text-[#143825] flex items-center justify-between">
                      <span>Knowledge Graph</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-[10px] text-[#557b64] mt-0.5">
                      Neo4j multi-tier Plant ➔ TK ➔ Patent ➔ ABS ➔ Regulation relations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-[#edf5eb] flex items-center justify-center text-[#5a9330]">
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>

            {/* Stage 3: AI Agents Reasoning & Evidence Verification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#f0f4ff] border border-[#d2defa] text-center shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white mx-auto mb-2 flex items-center justify-center shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-blue-950">7. AI Agents Reasoning</h4>
                <p className="text-[11px] text-blue-700 mt-1">
                  Multi-hop LangGraph synthesis combining statutory citations with why-this-answer explanation
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#ecf8ef] border border-[#c1e5c8] text-center shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#5a9330] text-white mx-auto mb-2 flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-[#143825]">8. Evidence Verification Engine</h4>
                <p className="text-[11px] text-[#346b41] mt-1">
                  Strict confidence scoring, citation cross-checking, and jurisdiction boundary enforcement
                </p>
              </div>
            </div>

            {/* Stage 4: Decision Branching: Evidence Ok vs Evidence Weak */}
            <div className="p-4 rounded-2xl bg-[#fafafa] border border-[#e5e5e5] space-y-3">
              <div className="text-center font-bold text-xs text-[#333]">
                9. Statutory Decision Branching
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Branch 1: Evidence Ok */}
                <div className="p-4 rounded-2xl bg-[#edf7eb] border-2 border-[#86c879] shadow-xs space-y-2">
                  <div className="flex items-center space-x-2 text-[#1c5f18] font-black text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#2ca01e]" />
                    <span>Evidence Ok</span>
                  </div>
                  <p className="text-xs text-[#2c5f1a] leading-relaxed">
                    Confidence ≥ 70%, verified official citation found, and strict jurisdiction matched.
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-[#b2ddaa] text-xs font-bold text-[#143825]">
                    ➔ Emits Grounded Legal Output with Citations & Risk Scores
                  </div>
                </div>

                {/* Branch 2: Evidence Weak -> Safe Abstain */}
                <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 shadow-xs space-y-2">
                  <div className="flex items-center space-x-2 text-rose-900 font-black text-sm">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Evidence Weak ➔ Safe Abstain</span>
                  </div>
                  <p className="text-xs text-rose-800 leading-relaxed">
                    Prevents AI hallucination on ambiguous law. System safely abstains from speculative legal counsel.
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-rose-200 text-xs font-bold text-rose-900 flex items-center justify-between">
                    <span>➔ 1-Click Human Expert Escalation</span>
                    <UserCheck className="w-4 h-4 text-rose-600" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-white/95 border-t border-[#d6e5d3] flex items-center justify-between">
          <span className="text-xs text-[#557b64]">
            AyurGuru Architecture strictly enforced in backend <code className="text-[#143825] font-mono">RegulatoryWorkflowGraph</code>.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#143825] hover:bg-[#1f5236] text-white rounded-full text-xs font-bold transition-colors cursor-pointer"
          >
            Close Architecture Flow
          </button>
        </div>
      </div>
    </div>
  );
}
