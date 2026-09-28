"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useJurisdiction } from "@/context/JurisdictionContext";
import { useLanguage } from "@/context/LanguageContext";
import { api } from "@/lib/api";
import { CitationBadge } from "@/components/CitationBadge";
import { ExplainableCard } from "@/components/ExplainableCard";
import { HumanEscalationModal } from "@/components/HumanEscalationModal";
import {
  Send,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  BookOpen,
  UserCheck,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Scale,
  Globe2,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  jurisdiction: string;
  why_this_answer?: string[];
  citations?: any[];
  verification?: any;
  patentability_score?: number;
  tkdl_risk_score?: number;
  abs_risk_score?: number;
  timestamp: string;
}

function AssistantInner() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q");
  
  const { jurisdiction } = useJurisdiction();
  const { language, t } = useLanguage();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [escalationModalOpen, setEscalationModalOpen] = useState(false);
  const [activeEscalationContext, setActiveEscalationContext] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Initial welcome message
  useEffect(() => {
    const welcomeText =
      jurisdiction === "India"
        ? `Namaste! I am AyurGuru, your AI legal & regulatory assistant configured for **🇮🇳 India Domestic Laws** (Indian Patents Act 1970, Drugs & Cosmetics Rules 1945 Rule 158-B, Biological Diversity Act 2002/2023, and FSSAI 2022). How can I assist your formulation, patent drafting, or licensing inquiry today?`
        : `Welcome! I am AyurGuru, configured for **🌐 International Regulatory Frameworks** (US FDA Botanical Drug Guidance 21 CFR 312, EU Herbal Directive 2004/24/EC THMPD, and WIPO treaties). How can I assist your global compliance and patent strategy?`;

    setMessages([
      {
        id: "welcome",
        sender: "assistant",
        text: welcomeText,
        jurisdiction,
        why_this_answer: [
          jurisdiction === "India"
            ? "Indian statutory framework applied (CGPDTM, AYUSH Ministry, NBA)."
            : "International regulatory framework applied (US FDA CDER, EMA HMPC, WIPO).",
          "Hybrid RAG enabled with BM25 terminology index and dense semantic search.",
          "Every response undergoes multi-stage statutory evidence verification.",
        ],
        citations: [],
        verification: {
          is_verified: true,
          confidence_score: 0.98,
          source_available: true,
          jurisdiction_matched: true,
          version_valid: true,
        },
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);

    if (queryParam) {
      handleSend(queryParam);
    }
  }, [jurisdiction]);

  const handleSend = async (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: q.trim(),
      jurisdiction,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setLoading(true);

    try {
      const res = await api.queryAssistant({
        query: q.trim(),
        jurisdiction,
        language,
      });

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: res.answer,
        jurisdiction: res.jurisdiction,
        why_this_answer: res.why_this_answer,
        citations: res.citations,
        verification: res.verification,
        patentability_score: res.patentability_score,
        tkdl_risk_score: res.tkdl_risk_score,
        abs_risk_score: res.abs_risk_score,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: `Error processing query: ${err.message || "Failed to contact AyurGuru statutory engine"}. Please ensure the backend is running.`,
        jurisdiction,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = jurisdiction === "India" ? [
    "Can I patent a Turmeric + Neem polyherbal gel?",
    "What are the safety requirements for Ayurvedic Proprietary Medicine under Rule 158-B?",
    "Is NBA Form III mandatory before filing a patent or before patent grant?",
    "Can I sell Chyawanprash under FSSAI Ayurveda Aahar?",
  ] : [
    "How to register an Ayurvedic product as a US FDA Botanical Drug?",
    "What is the 15-year EU usage requirement under THMPD Directive 2004/24/EC?",
    "What are mandatory patent disclosures under the 2024 WIPO Genetic Resources Treaty?",
    "Can Ayurvedic herbs be marketed as Dietary Supplements under US DSHEA?",
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-eco p-6 rounded-3xl border border-[#c8d9c5]/80 shadow-md">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#5a9330] text-white flex items-center justify-center shadow-md shadow-[#5a9330]/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-[#143825]">AyurGuru AI Assistant</h2>
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                jurisdiction === "India" 
                  ? "bg-[#e2f0de] text-[#2c5f1a] border-[#bcd9b5]" 
                  : "bg-[#eedbf5] text-[#5e2671] border-[#d8b0e5]"
              }`}>
                {jurisdiction === "India" ? "🇮🇳 India Laws" : "🌐 International Framework"}
              </span>
            </div>
            <p className="text-xs text-[#557b64] mt-0.5">
              Strictly isolated statutory reasoning with BM25+Vector hybrid retrieval and evidence verification.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([]);
            setTimeout(() => {
              setMessages([
                {
                  id: "welcome",
                  sender: "assistant",
                  text: `Chat reset. Currently answering in ${jurisdiction} jurisdiction and ${language} language.`,
                  jurisdiction,
                  why_this_answer: ["Jurisdiction isolated", "Evidence verification active"],
                  citations: [],
                  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
              ]);
            }, 100);
          }}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-[#cbdccb] text-xs font-bold text-[#143825] hover:bg-[#deede0] transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Main Chat Interface */}
      <div className="glass-eco rounded-3xl border border-[#c8d9c5]/80 shadow-md overflow-hidden flex flex-col h-[650px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-white/50 backdrop-blur-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div className="flex items-center space-x-2 mb-1 text-[11px] text-[#6d8e7b] font-medium px-1">
                <span>{msg.sender === "user" ? "You (Innovator)" : "AyurGuru Regulatory Engine"}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-3xl rounded-3xl p-5 shadow-sm text-xs leading-relaxed space-y-4 ${
                  msg.sender === "user"
                    ? "bg-[#143825] text-[#d6ecd0] rounded-tr-sm"
                    : "bg-white text-[#143825] border border-[#d6e5d3] rounded-tl-sm"
                }`}
              >
                {/* Message Body */}
                <div className="whitespace-pre-line font-sans text-xs sm:text-[13px] leading-relaxed">
                  {msg.text}
                </div>

                {/* Evidence Verification Meter for Assistant Messages */}
                {msg.sender === "assistant" && msg.verification && (
                  <div className="pt-3 border-t border-[#e2efe1] flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      {msg.verification.is_verified ? (
                        <div className="flex items-center space-x-1.5 text-[#2c5f1a] font-bold text-xs bg-[#e2f0de] px-2.5 py-1 rounded-full border border-[#bcd9b5]">
                          <ShieldCheck className="w-4 h-4 text-[#4d8127]" />
                          <span>Statutorily Verified ({Math.round(msg.verification.confidence_score * 100)}% Confidence)</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1.5 text-amber-800 font-bold text-xs bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span>Verification Notice: {Math.round(msg.verification.confidence_score * 100)}% Confidence</span>
                        </div>
                      )}
                      <span className="text-[10px] text-[#6d8e7b]">
                        {msg.verification.jurisdiction_matched ? "✓ Jurisdiction Matched" : "✗ Jurisdiction Mismatch"}
                      </span>
                    </div>

                    {msg.verification.requires_human_expert && (
                      <button
                        onClick={() => {
                          setActiveEscalationContext(msg);
                          setEscalationModalOpen(true);
                        }}
                        className="flex items-center space-x-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-full shadow-sm transition-all cursor-pointer"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Escalate to Human Expert</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Explainable AI: Why This Answer? */}
                {msg.sender === "assistant" && msg.why_this_answer && msg.why_this_answer.length > 0 && (
                  <ExplainableCard bullets={msg.why_this_answer} />
                )}

                {/* Citations List */}
                {msg.sender === "assistant" && msg.citations && msg.citations.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-[#143825]">
                      <BookOpen className="w-4 h-4 text-[#5a9330]" />
                      <span>{t("verifiedSources")} ({msg.citations.length})</span>
                    </div>
                    <div className="space-y-2">
                      {msg.citations.map((c: any, i: number) => (
                        <CitationBadge key={i} citation={c} index={i} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex flex-col items-start">
              <div className="flex items-center space-x-2 mb-1 text-[11px] text-[#6d8e7b] font-medium px-1">
                <span>AyurGuru Regulatory Engine</span>
              </div>
              <div className="bg-white border border-[#d6e5d3] rounded-3xl p-5 shadow-sm text-xs text-[#557b64] flex items-center space-x-3">
                <div className="animate-spin w-4 h-4 border-2 border-[#5a9330] border-t-transparent rounded-full" />
                <span>Performing hybrid retrieval, verifying evidence against {jurisdiction} statutory corpus...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Sample Prompts Tray */}
        <div className="px-4 py-2 border-t border-[#c8d9c5]/60 bg-white/75 backdrop-blur-md flex items-center space-x-2 overflow-x-auto">
          <span className="text-[10px] uppercase font-bold text-[#5e7164] shrink-0">Prompts:</span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-[11px] text-[#143825] bg-[#e2ede0] hover:bg-[#d6e8d3] px-3.5 py-1 rounded-full border border-[#c2d8be] shrink-0 transition-colors cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white/85 backdrop-blur-md border-t border-[#c8d9c5]/70 flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={`Ask a question under ${jurisdiction} IPR / regulatory framework in ${language}...`}
            className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-full border border-[#c8d9c5] focus:outline-none focus:ring-2 focus:ring-[#5a9330] bg-white/70"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || loading}
            className="px-6 py-3 bg-[#5a9330] hover:bg-[#4d8127] text-white rounded-full font-bold text-xs shadow-md shadow-[#5a9330]/20 transition-all cursor-pointer disabled:opacity-40 flex items-center space-x-1.5"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Human Escalation Modal */}
      <HumanEscalationModal
        isOpen={escalationModalOpen}
        onClose={() => setEscalationModalOpen(false)}
        defaultExpert={activeEscalationContext?.verification?.recommended_expert || "Patent Attorney"}
        defaultReason={activeEscalationContext?.verification?.escalation_reason || "Statutory ambiguity regarding Section 3(p) prior art."}
        queryContext={activeEscalationContext?.text}
      />
    </div>
  );
}

export default function AssistantPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <div className="animate-spin w-8 h-8 border-3 border-sky-600 border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-xs text-slate-500">Initializing AyurGuru Regulatory Assistant...</p>
        </div>
      }
    >
      <AssistantInner />
    </Suspense>
  );
}
