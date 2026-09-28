"use client";

import React, { useState } from "react";
import { X, UserCheck, ShieldAlert, CheckCircle, Send, Clock, FileText } from "lucide-react";
import { api } from "@/lib/api";

interface EscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultExpert?: string;
  defaultReason?: string;
  queryContext?: string;
}

export const HumanEscalationModal: React.FC<EscalationModalProps> = ({
  isOpen,
  onClose,
  defaultExpert = "Patent Expert",
  defaultReason = "Legal ambiguity regarding Section 3(p) prior art or ABS Form III compliance.",
  queryContext = "",
}) => {
  const [expertType, setExpertType] = useState(defaultExpert);
  const [reason, setReason] = useState(defaultReason);
  const [email, setEmail] = useState("innovator@ayurveda-startup.in");
  const [submitting, setSubmitting] = useState(false);
  const [ticketResult, setTicketResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.escalateQuery({
        expert_type: expertType,
        reason,
        contact_email: email,
        query_context: queryContext,
      });
      setTicketResult(res);
    } catch (err) {
      console.error("Escalation error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {ticketResult ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                Ticket Docket Created
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">{ticketResult.ticket_id}</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto mt-2 leading-relaxed">
                {ticketResult.message}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Assigned Domain:</span>
                <span className="font-bold text-slate-800">{ticketResult.expert_type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Estimated Review Time:</span>
                <span className="font-bold text-emerald-700">{ticketResult.estimated_response_time}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
            >
              Close & Return to Dashboard
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Escalate to Certified Human Expert</h3>
                <p className="text-xs text-slate-500">
                  Direct referral for patent claim drafting, NBA Form III filing, or AYUSH SLA licensing.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Panel Expert Specialization
                </label>
                <select
                  value={expertType}
                  onChange={(e) => setExpertType(e.target.value)}
                  className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                >
                  <option value="Patent Attorney (Ayurveda & Biotech Specialist)">
                    ⚖️ Patent Attorney (Ayurveda & Biotech Specialist)
                  </option>
                  <option value="AYUSH Regulatory Consultant / Drug Licensing Expert">
                    🌿 AYUSH Regulatory Consultant / Drug Licensing Expert
                  </option>
                  <option value="ABS Officer / Biodiversity Law Advisor">
                    🌱 ABS Officer / Biodiversity Law Advisor
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Reason for Legal Escalation
                </label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Describe ambiguity, prior art objections, or licensing hurdles..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Contact Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Free consultation for SIH Prototype</span>
                </span>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center space-x-1.5 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? "Booking..." : "Submit Escalation"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
