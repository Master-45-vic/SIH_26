import React from "react";
import Link from "next/link";
import { Leaf, ExternalLink, Award, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0e2a1b] text-[#bad6c1] text-xs border-t border-[#1d4d33] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-full bg-[#5a9330] flex items-center justify-center text-white">
                <Leaf className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-black text-white">ayur</span>
                <span className="font-black text-[#a6eb90]">guru</span>
              </div>
            </div>
            <p className="text-[#a4c5ac] text-xs leading-relaxed">
              Empowering Ayurveda practitioners, researchers, MSMEs, and medicinal cultivators with AI-driven IPR & statutory regulatory navigation.
            </p>
            <div className="flex items-center space-x-2 text-[#a6eb90] font-semibold pt-1">
              <Award className="w-4 h-4" />
              <span>Smart India Hackathon 2024 Solution</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">Indian Legal Framework</h4>
            <ul className="space-y-1.5 text-[#a4c5ac]">
              <li><span className="hover:text-white transition-colors">Indian Patents Act 1970 (Sec 3p, 3d, 3e)</span></li>
              <li><span className="hover:text-white transition-colors">Drugs & Cosmetics Rules (Rule 158-B)</span></li>
              <li><span className="hover:text-white transition-colors">Biological Diversity Act (ABS Form III)</span></li>
              <li><span className="hover:text-white transition-colors">FSSAI Ayurveda Aahar Regulations 2022</span></li>
              <li><span className="hover:text-white transition-colors">CSIR Traditional Knowledge Digital Library</span></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">International Framework</h4>
            <ul className="space-y-1.5 text-[#a4c5ac]">
              <li><span className="hover:text-white transition-colors">WIPO Genetic Resources & TK Treaty 2024</span></li>
              <li><span className="hover:text-white transition-colors">US FDA Botanical Drug Guidance (21 CFR 312)</span></li>
              <li><span className="hover:text-white transition-colors">EU Herbal Directive (2004/24/EC - THMPD)</span></li>
              <li><span className="hover:text-white transition-colors">Nagoya Protocol on Access & Benefit Sharing</span></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">National Portals</h4>
            <ul className="space-y-1.5 text-[#a4c5ac]">
              <li>
                <a href="https://ayush.gov.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-white transition-colors">
                  <span>Ministry of AYUSH</span>
                  <ExternalLink className="w-3 h-3 text-[#5a9330]" />
                </a>
              </li>
              <li>
                <a href="https://ipindia.gov.in" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-white transition-colors">
                  <span>Indian Patent Office (CGPDTM)</span>
                  <ExternalLink className="w-3 h-3 text-[#5a9330]" />
                </a>
              </li>
              <li>
                <a href="https://nbaindia.org" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-white transition-colors">
                  <span>National Biodiversity Authority (NBA)</span>
                  <ExternalLink className="w-3 h-3 text-[#5a9330]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1d4d33] flex flex-col sm:flex-row items-center justify-between gap-3 text-[#8cb496] text-[11px]">
          <div>
            © 2024 AyurGuru. Eco-luxury holistic interface inspired by Santhika and Ecology.
          </div>
          <div className="flex items-center space-x-3">
            <span>Hybrid RAG (BM25 + Vectors)</span>
            <span>•</span>
            <span>LangGraph Agentic State Machine</span>
            <span>•</span>
            <span>Gemini Grounded</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
