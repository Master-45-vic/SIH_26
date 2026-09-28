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
    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 transition-all hover:border-sky-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start space-x-2.5">
          <div className="w-6 h-6 rounded-md bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            {index + 1}
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <h5 className="text-xs font-bold text-slate-900">{citation.title}</h5>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                citation.jurisdiction === "India" 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                  : "bg-purple-50 text-purple-700 border-purple-200"
              }`}>
                {citation.jurisdiction}
              </span>
              <span className="text-[10px] bg-slate-200/70 text-slate-700 px-1.5 py-0.2 rounded">
                {citation.category}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">{citation.official_citation}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Match Score</span>
            <span className="text-xs font-extrabold text-sky-700 font-mono">
              {(citation.relevance_score * 100).toFixed(0)}%
            </span>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-slate-200/70 text-xs text-slate-700 space-y-2 animate-in fade-in duration-150">
          <div>
            <span className="font-semibold text-slate-900">Verified Statutory Excerpt:</span>
            <p className="mt-1 text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200 leading-relaxed font-sans italic">
              "{citation.relevant_excerpt}"
            </p>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>Doc ID: <code className="text-slate-700">{citation.doc_id}</code></span>
            <span>Version: <span className="font-medium text-slate-700">{citation.version}</span></span>
          </div>
        </div>
      )}
    </div>
  );
};
