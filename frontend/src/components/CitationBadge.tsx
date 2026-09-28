"use client";

import React, { useState } from "react";
import { BookOpen, ExternalLink, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";

interface CitationSource {
  doc_id: string;
  title: string;
  official_citation: string;
  jurisdiction: string;
  category: string;
  version: string;
  relevant_excerpt: string;
  relevance_score: number;
}

export const CitationBadge: React.FC<{ citation: CitationSource; index: number }> = ({ citation, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#f7faf6] border border-[#d6e7d4] rounded-2xl p-3.5 transition-all hover:border-[#5a9330] hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start space-x-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#e3efe1] text-[#4d8127] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            {index + 1}
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <h5 className="text-xs font-bold text-[#143825]">{citation.title}</h5>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                citation.jurisdiction === "India" 
                  ? "bg-[#e2f0de] text-[#2c5f1a] border-[#bcd9b5]" 
                  : "bg-[#eedbf5] text-[#5e2671] border-[#d8b0e5]"
              }`}>
                {citation.jurisdiction}
              </span>
              <span className="text-[10px] bg-[#eef4ed] text-[#436750] px-2 py-0.5 rounded-full font-medium">
                {citation.category}
              </span>
            </div>
            <p className="text-[11px] text-[#557b64] font-mono mt-0.5">{citation.official_citation}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <div className="text-right">
            <span className="text-[10px] text-[#6d8e7b] block">Match Score</span>
            <span className="text-xs font-extrabold text-[#4d8127] font-mono">
              {(citation.relevance_score * 100).toFixed(0)}%
            </span>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-lg text-[#557b64] hover:text-[#143825] hover:bg-[#e4ede2] transition-colors cursor-pointer"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-[#d6e7d4] text-xs text-[#1e4430] space-y-2 animate-in fade-in duration-150">
          <div>
            <span className="font-bold text-[#143825]">Verified Statutory Excerpt:</span>
            <p className="mt-1 text-[#2d523c] bg-white p-3 rounded-xl border border-[#d6e7d4] leading-relaxed font-sans italic">
              "{citation.relevant_excerpt}"
            </p>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#557b64] pt-1">
            <span>Doc ID: <code className="text-[#143825] font-semibold">{citation.doc_id}</code></span>
            <span>Version: <span className="font-semibold text-[#143825]">{citation.version}</span></span>
          </div>
        </div>
      )}
    </div>
  );
};
