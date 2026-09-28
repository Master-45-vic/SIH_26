import React from "react";
import Link from "next/link";
import { ShieldCheck, BookOpen, ExternalLink, Award } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-sky-600 flex items-center justify-center text-white text-sm">
                अ
              </div>
              <span>AyurGuru</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Empowering Ayurveda practitioners, biotech researchers, MSMEs, and medicinal cultivators with AI-driven IPR & Regulatory navigation.
            </p>
            <div className="flex items-center space-x-2 text-amber-400 font-semibold pt-1">
              <Award className="w-4 h-4" />
              <span>Smart India Hackathon 2024 Solution</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Indian Legal Framework</h4>
            <ul className="space-y-1.5">
              <li><span className="hover:text-sky-300">Indian Patents Act 1970 (Sec 3p, 3d, 3e)</span></li>
              <li><span className="hover:text-sky-300">Drugs & Cosmetics Rules (Rule 158-B)</span></li>
              <li><span className="hover:text-sky-300">Biological Diversity Act (ABS Form III)</span></li>
              <li><span className="hover:text-sky-300">FSSAI Ayurveda Aahar Regulations 2022</span></li>
              <li><span className="hover:text-sky-300">CSIR Traditional Knowledge Digital Library</span></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">International Framework</h4>
            <ul className="space-y-1.5">
              <li><span className="hover:text-sky-300">WIPO Genetic Resources & TK Treaty 2024</span></li>
              <li><span className="hover:text-sky-300">US FDA Botanical Drug Guidance (21 CFR 312)</span></li>
              <li><span className="hover:text-sky-300">EU Herbal Directive (2004/24/EC - THMPD)</span></li>
              <li><span className="hover:text-sky-300">Nagoya Protocol on Access & Benefit Sharing</span></li>
              <li><span className="hover:text-sky-300">WHO Guidelines on Good Agricultural Practices</span></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">National Portals</h4>
            <ul className="space-y-1.5">
              <li>
                <a href="https://ayush.gov.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-sky-300">
                  <span>Ministry of AYUSH</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://ipindia.gov.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-sky-300">
                  <span>Controller General of Patents (CGPDTM)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://nbaindia.org" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-sky-300">
                  <span>National Biodiversity Authority (NBA)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://fssai.gov.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-sky-300">
                  <span>FSSAI Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © 2024 AyurGuru AI. Designed for Smart India Hackathon. Strictly separated India & International regulatory guidance.
          </div>
          <div className="flex items-center space-x-4">
            <span>Hybrid RAG (BM25 + Dense Vectors)</span>
            <span>•</span>
            <span>LangGraph Agentic State Machine</span>
            <span>•</span>
            <span>Gemini AI Grounded</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
