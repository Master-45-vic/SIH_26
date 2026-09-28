"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const ExplainableCard: React.FC<{ bullets: string[] }> = ({ bullets }) => {
  const [open, setOpen] = useState(true);
  const { t } = useLanguage();

  if (!bullets || bullets.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-[#edf7eb] via-[#f3faf1] to-[#e8f4e6] border border-[#cbe3c6] rounded-2xl p-4 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left group cursor-pointer"
      >
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-xl bg-[#5a9330] text-white flex items-center justify-center shadow-sm">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#143825] group-hover:text-[#5a9330] transition-colors">
              {t("whyThisAnswer")}
            </h4>
            <p className="text-[11px] text-[#557b64]">
              Explainable AI reasoning & statutory deduction pathway
            </p>
          </div>
        </div>
        <div className="text-[#557b64] group-hover:text-[#143825]">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {open && (
        <div className="mt-3.5 pt-3 border-t border-[#cbe3c6] space-y-2.5 animate-in fade-in duration-200">
          {bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start space-x-2.5 text-xs text-[#1e4430] leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-[#5a9330] shrink-0 mt-0.5" />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
