"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, UserCheck, Lock, Mail, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, demoLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      router.push("/assistant");
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = async () => {
    setLoading(true);
    try {
      await demoLogin();
      router.push("/assistant");
    } catch (err: any) {
      setError(err.message || "Failed demo login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 space-y-6">
      <div className="text-center space-y-2.5">
        <div className="w-14 h-14 rounded-2xl bg-[#e2ede0] text-[#143825] flex items-center justify-center mx-auto border border-[#c2d8be] shadow-sm">
          <span className="font-black text-3xl">अ</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#143825]">Sign in to GURU</h1>
        <p className="text-xs sm:text-sm text-[#5e7164]">
          Access your saved product classifications, innovation dossiers, and consultation dockets.
        </p>
      </div>

      <div className="glass-eco rounded-3xl p-8 border border-[#c8d9c5]/80 shadow-md space-y-6">
        {/* Fast Demo Access Button */}
        <div className="bg-[#eef6ec] p-4 rounded-2xl border border-[#c2d8be] text-center space-y-2.5 shadow-sm">
          <div className="flex items-center justify-center space-x-1.5 text-xs font-bold text-[#143825]">
            <Sparkles className="w-4 h-4 text-[#5a9330]" />
            <span>Instant Demo Evaluation</span>
          </div>
          <p className="text-[11px] text-[#4a6152]">
            Click below for instant one-click authenticated access with preloaded demo profile:
          </p>
          <button
            onClick={handleDemoAccess}
            disabled={loading}
            className="w-full py-2.5 bg-[#5a9330] hover:bg-[#4d7d28] text-white rounded-full text-xs font-bold shadow-md shadow-[#5a9330]/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-1.5"
          >
            <UserCheck className="w-4 h-4" />
            <span>Instant Demo Access</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#c8d9c5]/60 w-full" />
          <span className="bg-[#edf5eb] px-3 text-[11px] font-semibold text-[#5e7164] uppercase tracking-wider absolute">
            Or with credentials
          </span>
        </div>

        {error && (
          <div className="p-3 rounded-2xl bg-[#fef2f2] text-[#991b1b] text-xs font-medium border border-[#fecaca]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#143825] mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="innovator@ayurveda.in"
                className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-2xl border border-[#c8d9c5] focus:outline-none focus:ring-2 focus:ring-[#5a9330] bg-white/80"
                required
              />
              <Mail className="w-4 h-4 text-[#5e7164] absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#143825] mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs pl-9 pr-3.5 py-2.5 rounded-2xl border border-[#c8d9c5] focus:outline-none focus:ring-2 focus:ring-[#5a9330] bg-white/80"
                required
              />
              <Lock className="w-4 h-4 text-[#5e7164] absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#143825] hover:bg-[#0c2417] text-white rounded-full text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-1.5"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
