"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import {
  Bell,
  AlertTriangle,
  CheckSquare,
  ExternalLink,
  Calendar,
  Building,
  Users,
  Filter,
  ShieldAlert,
} from "lucide-react";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const data = await api.getAlerts(
        selectedJurisdiction === "all" ? undefined : selectedJurisdiction,
        selectedCategory === "all" ? undefined : selectedCategory
      );
      setAlerts(data);
    } catch (err) {
      console.error("Alerts error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [selectedJurisdiction, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="glass-eco p-6 sm:p-8 rounded-3xl border border-[#c8d9c5]/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#e2ede0] text-[#5a9330] flex items-center justify-center border border-[#c2d8be] shadow-sm">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#143825]">Regulatory Change Alerts</h1>
              <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-[#e2ede0] text-[#143825] border border-[#c2d8be]">
                Live Gazettes
              </span>
            </div>
            <p className="text-xs text-[#5e7164] mt-0.5">
              Tracking notifications, biodiversity amendments, and patent practice guidelines with actionable impact summaries.
            </p>
          </div>
        </div>

        {/* Jurisdiction Filter Switcher */}
        <div className="flex items-center bg-[#e2ede0]/60 p-1 rounded-full border border-[#c2d8be]/70 shadow-inner">
          {["all", "India", "International"].map((j) => (
            <button
              key={j}
              onClick={() => setSelectedJurisdiction(j)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                selectedJurisdiction === j
                  ? "bg-[#5a9330] text-white shadow-sm"
                  : "text-[#143825] hover:text-[#5a9330] hover:bg-white/60"
              }`}
            >
              {j === "all" ? "All Jurisdictions" : j}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-20 glass-eco rounded-3xl border border-[#c8d9c5]/80">
            <div className="animate-spin w-8 h-8 border-3 border-[#5a9330] border-t-transparent rounded-full mx-auto mb-3" />
            <p className="text-xs text-[#5e7164]">Checking official gazette updates...</p>
          </div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-16 glass-eco rounded-3xl border border-[#c8d9c5]/80 text-[#5e7164]">
            <Bell className="w-8 h-8 mx-auto mb-2 text-[#c8d9c5]" />
            <p className="text-xs">No active regulatory alerts found matching current filter.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="glass-eco rounded-3xl p-6 sm:p-7 border border-[#c8d9c5]/80 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                        alert.impact_level === "High"
                          ? "bg-[#fef2f2] text-[#991b1b] border-[#fecaca]"
                          : "bg-[#fff8eb] text-[#92400e] border-[#fde68a]"
                      }`}
                    >
                      {alert.impact_level} Impact
                    </span>
                    <span className="text-[10px] bg-[#e2ede0] text-[#143825] font-bold px-2.5 py-0.5 rounded-full border border-[#c2d8be]">
                      {alert.jurisdiction}
                    </span>
                    <span className="text-[10px] bg-[#eef6ec] text-[#2d5c1e] font-bold px-2.5 py-0.5 rounded-full border border-[#c2d8be]">
                      {alert.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#143825] leading-snug pt-1">
                    {alert.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-3 text-xs text-[#5e7164] shrink-0">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{alert.date_notified}</span>
                  </div>
                  {alert.source_url && (
                    <a
                      href={alert.source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center space-x-1 text-[#5a9330] hover:text-[#4a7e25] font-semibold"
                    >
                      <span>Gazette PDF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Stakeholders & Authority */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#5e7164] pt-1 pb-1">
                <div className="flex items-center space-x-1.5">
                  <Building className="w-3.5 h-3.5 text-[#5e7164]" />
                  <span>Authority: <strong className="text-[#143825]">{alert.authority}</strong></span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-[#5e7164]" />
                  <span>Impacted: <strong className="text-[#143825]">{alert.target_stakeholders}</strong></span>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-[#edf5eb]/60 p-4 rounded-2xl border border-[#c8d9c5]/70 text-xs text-[#143825] leading-relaxed font-sans">
                {alert.summary}
              </div>

              {/* Action Checklist */}
              {alert.action_checklist && alert.action_checklist.length > 0 && (
                <div className="space-y-2 pt-1">
                  <h5 className="text-xs font-bold text-[#143825] flex items-center space-x-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-[#5a9330]" />
                    <span>Compliance Action Checklist:</span>
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {alert.action_checklist.map((task: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-2 text-xs text-[#143825] bg-white/90 p-2.5 rounded-xl border border-[#c8d9c5]/60"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5a9330] shrink-0 mt-1.5" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
