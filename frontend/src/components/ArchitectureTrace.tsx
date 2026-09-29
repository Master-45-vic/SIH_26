"use client";

import React, { useState } from "react";
import {
  Mic,
  FileText,
  Languages,
  Brain,
  Scale,
  GitBranch,
  Database,
  Layers,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Cpu,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  UserCheck
} from "lucide-react";

export interface PipelineTraceData {
  input_mode?: string;
  detected_language?: string;
  translated_query?: string;
  query_understanding?: {
    primary_intent?: string;
    detected_herbs?: string[];
    statutory_clauses?: string[];
    formulation_categories?: string[];
    analysis_timestamp?: string;
  };
  jurisdiction?: string;
  domain_route?: string;
  retrieval_sources?: Array<{
    name: string;
    type?: string;
    count?: number;
    status?: string;
  }>;
  ai_agent_status?: string;
  evidence_status?: string; // "Evidence Ok" or "Evidence Weak"
  safe_abstain?: boolean;
  safe_abstain_reason?: string;
  recommended_expert?: string;
  execution_time_ms?: number;
}

interface ArchitectureTraceProps {
  trace?: PipelineTraceData;
  onEscalate?: () => void;
}

export function ArchitectureTrace({ trace, onEscalate }: ArchitectureTraceProps) {
  const [expanded, setExpanded] = useState(false);

  if (!trace) return null;

  const isEvidenceOk = trace.evidence_status === "Evidence Ok" && !trace.safe_abstain;
  const isVoice = trace.input_mode?.toLowerCase() === "voice";

  return (
    <div className="mt-3 rounded-2xl border border-[#c8d9c5] bg-[#f4f9f3] overflow-hidden shadow-xs text-xs font-sans">
      {/* Summary Header Strip */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="px-3.5 py-2.5 bg-[#eaf4e8] hover:bg-[#e1efe0] transition-colors flex items-center justify-between cursor-pointer border-b border-[#c8d9c5]"
      >
        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
          <div className="flex items-center space-x-1.5 font-bold text-[#143825]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5a9330]" />
            <span>Verification Pipeline:</span>
          </div>

          {/* Step 1: Input Mode */}
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-white border border-[#cadac8] text-[11px] font-semibold text-[#143825]">
            {isVoice ? <Mic className="w-3 h-3 text-rose-600" /> : <FileText className="w-3 h-3 text-[#5a9330]" />}
            <span>{isVoice ? "Voice Query" : "Text Query"}</span>
          </span>

          <ArrowRight className="w-3 h-3 text-[#8ca896]" />

          {/* Step 2: Language */}
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-white border border-[#cadac8] text-[11px] font-semibold text-[#143825]">
            <Languages className="w-3 h-3 text-[#5a9330]" />
            <span>{trace.detected_language || "English"}</span>
          </span>

          <ArrowRight className="w-3 h-3 text-[#8ca896]" />

          {/* Step 5: Domain Route */}
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-white border border-[#cadac8] text-[11px] font-semibold text-[#143825]">
            <GitBranch className="w-3 h-3 text-[#5a9330]" />
            <span>{trace.domain_route || "IP Retriever"}</span>
          </span>

          <ArrowRight className="w-3 h-3 text-[#8ca896]" />

          {/* Step 9: Decision Output */}
          <span
            className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] font-bold ${
              isEvidenceOk
                ? "bg-[#d8edd3] text-[#1c5520] border border-[#aed3a6]"
                : "bg-rose-100 text-rose-800 border border-rose-300"
            }`}
          >
            {isEvidenceOk ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-[#2c7526]" />
                <span>Evidence Ok</span>
              </>
            ) : (
              <>
                <XCircle className="w-3 h-3 text-rose-600" />
                <span>Evidence Weak (Safe Abstain)</span>
              </>
            )}
          </span>

          {trace.execution_time_ms && (
            <span className="text-[10px] text-[#6d8e7b] ml-1">
              ({trace.execution_time_ms}ms)
            </span>
          )}
        </div>

        <button className="text-[#557b64] hover:text-[#143825] p-1">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Architecture Pipeline Details */}
      {expanded && (
        <div className="p-4 space-y-4 bg-white/70">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Box 1: Query Understanding & Language */}
            <div className="p-3 bg-white rounded-xl border border-[#d6e5d3] space-y-2">
              <div className="flex items-center space-x-1.5 font-bold text-[#143825] text-xs">
                <Brain className="w-4 h-4 text-[#5a9330]" />
                <span>1 & 2. Query & Translation</span>
              </div>
              <div className="space-y-1 text-[11px] text-[#446552]">
                <p>
                  <span className="font-semibold text-[#143825]">Input Ingest:</span>{" "}
                  {trace.input_mode}
                </p>
                <p>
                  <span className="font-semibold text-[#143825]">Detected Language:</span>{" "}
                  {trace.detected_language}
                </p>
                {trace.translated_query && trace.translated_query !== trace.input_mode && (
                  <p className="line-clamp-2" title={trace.translated_query}>
                    <span className="font-semibold text-[#143825]">Statutory Translation:</span>{" "}
                    {trace.translated_query}
                  </p>
                )}
                {trace.query_understanding?.detected_herbs && trace.query_understanding.detected_herbs.length > 0 && (
                  <p>
                    <span className="font-semibold text-[#143825]">Herbs:</span>{" "}
                    {trace.query_understanding.detected_herbs.join(", ")}
                  </p>
                )}
                {trace.query_understanding?.statutory_clauses && trace.query_understanding.statutory_clauses.length > 0 && (
                  <p>
                    <span className="font-semibold text-[#143825]">Clauses:</span>{" "}
                    {trace.query_understanding.statutory_clauses.join(", ")}
                  </p>
                )}
              </div>
            </div>

            {/* Box 2: Routing & Grounding Sources */}
            <div className="p-3 bg-white rounded-xl border border-[#d6e5d3] space-y-2">
              <div className="flex items-center space-x-1.5 font-bold text-[#143825] text-xs">
                <Database className="w-4 h-4 text-[#5a9330]" />
                <span>3. Triple-Source Grounding</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-[#143825]">
                  <span className="font-semibold">Jurisdiction:</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#edf5eb] font-bold text-[#2d6139]">
                    {trace.jurisdiction === "India" ? "🇮🇳 India Laws" : "🌐 International"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#143825]">
                  <span className="font-semibold">Domain Route:</span>
                  <span className="font-bold text-[#5a9330]">{trace.domain_route}</span>
                </div>

                <div className="pt-1 border-t border-[#edf5eb] space-y-1 text-[10px] text-[#557b64]">
                  {trace.retrieval_sources?.map((s, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span>• {s.name}</span>
                      <span className="font-mono text-[#2c5f1a] font-semibold">{s.count ?? 0} docs</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Box 3: Verification & Decision */}
            <div className="p-3 bg-white rounded-xl border border-[#d6e5d3] space-y-2">
              <div className="flex items-center space-x-1.5 font-bold text-[#143825] text-xs">
                <Scale className="w-4 h-4 text-[#5a9330]" />
                <span>4. Evidence Verification & Output</span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#143825]">Verification Engine:</span>
                  <span
                    className={`font-bold px-1.5 py-0.5 rounded ${
                      isEvidenceOk ? "bg-[#e2f0de] text-[#2c5f1a]" : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {trace.evidence_status}
                  </span>
                </div>

                {isEvidenceOk ? (
                  <p className="text-[11px] text-[#3e684d] leading-relaxed">
                    ✓ Grounded in official statutory acts & treatises. Citations verified with high confidence.
                  </p>
                ) : (
                  <div className="space-y-2 pt-1">
                    <p className="text-[11px] text-rose-800 leading-relaxed font-medium">
                      ⚠️ <strong>Safe Abstain Active:</strong> Low statutory confidence or legal ambiguity. Refusing to guess.
                    </p>
                    {trace.recommended_expert && (
                      <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-[10px] text-amber-900">
                        <span className="font-bold">Recommended Specialist:</span> {trace.recommended_expert}
                      </div>
                    )}
                    {onEscalate && (
                      <button
                        onClick={onEscalate}
                        className="w-full flex items-center justify-center space-x-1.5 py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-xs text-xs cursor-pointer transition-colors"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Escalate Docket</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
