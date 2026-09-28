"use client";

import React from "react";

interface RiskGaugeProps {
  label: string;
  score: number; // 0 - 100
  type?: "patentability" | "tkdl" | "abs" | "commercial";
  size?: "sm" | "md" | "lg";
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ label, score, type = "patentability", size = "md" }) => {
  const radius = size === "lg" ? 48 : size === "sm" ? 32 : 40;
  const strokeWidth = size === "lg" ? 9 : size === "sm" ? 6 : 8;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  // Color mapping based on metric type
  let strokeColor = "#0284c7"; // sky-600
  let badgeText = "Moderate";
  let badgeColor = "bg-sky-50 text-sky-700 border-sky-200";

  if (type === "patentability" || type === "commercial") {
    if (clampedScore >= 75) {
      strokeColor = "#10b981"; // emerald-500
      badgeText = "High Potential";
      badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
    } else if (clampedScore >= 50) {
      strokeColor = "#f59e0b"; // amber-500
      badgeText = "Viable";
      badgeColor = "bg-amber-50 text-amber-700 border-amber-200";
    } else {
      strokeColor = "#f43f5e"; // rose-500
      badgeText = "Challenging";
      badgeColor = "bg-rose-50 text-rose-700 border-rose-200";
    }
  } else {
    // For Risk (TKDL or ABS), high score = high danger!
    if (clampedScore >= 70) {
      strokeColor = "#e11d48"; // rose-600
      badgeText = "High Risk";
      badgeColor = "bg-rose-50 text-rose-700 border-rose-200";
    } else if (clampedScore >= 40) {
      strokeColor = "#f59e0b"; // amber-500
      badgeText = "Moderate Risk";
      badgeColor = "bg-amber-50 text-amber-700 border-amber-200";
    } else {
      strokeColor = "#10b981"; // emerald-500
      badgeText = "Low Risk";
      badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  }

  const svgDim = (radius + strokeWidth) * 2;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-md hover:border-slate-300">
      <div className="relative flex items-center justify-center mb-2">
        <svg width={svgDim} height={svgDim} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={svgDim / 2}
            cy={svgDim / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Foreground progress circle */}
          <circle
            cx={svgDim / 2}
            cy={svgDim / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black text-slate-900 font-mono tracking-tight">
            {Math.round(clampedScore)}%
          </span>
        </div>
      </div>

      <h5 className="text-xs font-bold text-slate-800 line-clamp-1">{label}</h5>
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border mt-1.5 ${badgeColor}`}>
        {badgeText}
      </span>
    </div>
  );
};
