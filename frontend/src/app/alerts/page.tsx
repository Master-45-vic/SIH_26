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
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-slate-900">Regulatory Change Alerts</h1>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-300">
                Live Gazettes
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tracking notifications, biodiversity amendments, and patent practice guidelines with actionable impact summaries.
            </p>
          </div>
        </div>

        {/* Jurisdiction Filter Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          {["all", "India", "International"].map((j) => (
            <button
              key={j}
              onClick={() => setSelectedJurisdiction(j)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                selectedJurisdiction === j
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
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
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <div className="animate-spin w-8 h-8 border-3 border-rose-600 border-t-transparent rounded-full mx-auto mb-3" />
            <p className="text-xs text-slate-500">Checking official gazette updates...</p>
          </div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500">
            <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="text-xs">No active regulatory alerts found matching current filter.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                        alert.impact_level === "High"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {alert.impact_level} Impact
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded border border-slate-200">
                      {alert.jurisdiction}
                    </span>
                    <span className="text-[10px] bg-sky-50 text-sky-700 font-bold px-2 py-0.5 rounded border border-sky-200">
                      {alert.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug pt-1">
                    {alert.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-3 text-xs text-slate-400 shrink-0">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{alert.date_notified}</span>
                  </div>
                  {alert.source_url && (
                    <a
                      href={alert.source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center space-x-1 text-sky-600 hover:text-sky-800 font-semibold"
                    >
                      <span>Gazette PDF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Stakeholders & Authority */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 pb-1">
                <div className="flex items-center space-x-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>Authority: <strong className="text-slate-700">{alert.authority}</strong></span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Impacted: <strong className="text-slate-700">{alert.target_stakeholders}</strong></span>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-sans">
                {alert.summary}
              </div>

              {/* Action Checklist */}
              {alert.action_checklist && alert.action_checklist.length > 0 && (
                <div className="space-y-2 pt-1">
                  <h5 className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Compliance Action Checklist:</span>
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {alert.action_checklist.map((task: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/70"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
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
