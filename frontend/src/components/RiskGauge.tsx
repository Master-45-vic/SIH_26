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
  let strokeColor = "#5a9330"; // herbal green
  let badgeText = "Moderate";
  let badgeColor = "bg-[#eef6ec] text-[#2d5c1e] border-[#c2d8be]";

  if (type === "patentability" || type === "commercial") {
    if (clampedScore >= 75) {
      strokeColor = "#5a9330"; // herbal green
      badgeText = "High Potential";
      badgeColor = "bg-[#eef6ec] text-[#2d5c1e] border-[#c2d8be]";
    } else if (clampedScore >= 50) {
      strokeColor = "#d97706"; // warm amber
      badgeText = "Viable";
      badgeColor = "bg-[#fff8eb] text-[#92400e] border-[#fde68a]";
    } else {
      strokeColor = "#dc2626"; // muted red
      badgeText = "Challenging";
      badgeColor = "bg-[#fef2f2] text-[#991b1b] border-[#fecaca]";
    }
  } else {
    // For Risk (TKDL or ABS), high score = high danger!
    if (clampedScore >= 70) {
      strokeColor = "#dc2626"; // rose-600
      badgeText = "High Risk";
      badgeColor = "bg-[#fef2f2] text-[#991b1b] border-[#fecaca]";
    } else if (clampedScore >= 40) {
      strokeColor = "#d97706"; // amber-500
      badgeText = "Moderate Risk";
      badgeColor = "bg-[#fff8eb] text-[#92400e] border-[#fde68a]";
    } else {
      strokeColor = "#5a9330"; // herbal green
      badgeText = "Low Risk";
      badgeColor = "bg-[#eef6ec] text-[#2d5c1e] border-[#c2d8be]";
    }
  }

  const svgDim = (radius + strokeWidth) * 2;

  return (
    <div className="bg-white/90 rounded-2xl border border-[#c8d9c5]/80 p-4 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-md hover:border-[#5a9330]/60">
      <div className="relative flex items-center justify-center mb-2">
        <svg width={svgDim} height={svgDim} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={svgDim / 2}
            cy={svgDim / 2}
            r={radius}
            stroke="#e2ede0"
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
          <span className="text-xl font-black text-[#143825] font-mono tracking-tight">
            {Math.round(clampedScore)}%
          </span>
        </div>
      </div>

      <h5 className="text-xs font-bold text-[#143825] line-clamp-1">{label}</h5>
      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border mt-1.5 ${badgeColor}`}>
        {badgeText}
      </span>
    </div>
  );
};
