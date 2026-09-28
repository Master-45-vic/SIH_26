"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const ExplainableCard: React.FC<{ bullets: string[] }> = ({ bullets }) => {
  const [open, setOpen] = useState(true);
  const { t } = useLanguage();

  if (!bullets || bullets.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-sky-50/70 via-blue-50/50 to-indigo-50/70 border border-sky-200/80 rounded-2xl p-4 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left group"
      >
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-sm">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
              {t("whyThisAnswer")}
            </h4>
            <p className="text-[11px] text-slate-500">
              Explainable AI reasoning & statutory deduction pathway
            </p>
          </div>
        </div>
        <div className="text-slate-400 group-hover:text-slate-700">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {open && (
        <div className="mt-3.5 pt-3 border-t border-sky-200/60 space-y-2.5 animate-in fade-in duration-200">
          {bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-800 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
