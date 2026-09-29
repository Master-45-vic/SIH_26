"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "English" | "Hindi" | "Tamil";

interface Translations {
  [key: string]: {
    English: string;
    Hindi: string;
    Tamil: string;
  };
}

export const UI_TRANSLATIONS: Translations = {
  appName: {
    English: "GURU",
    Hindi: "गुरु",
    Tamil: "குரு",
  },
  tagline: {
    English: "AI-Powered Multilingual Ayurveda IPR & Regulatory Assistant",
    Hindi: "एआई-संचालित बहुभाषी आयुर्वेद बौद्धिक संपदा और नियामक सहायक",
    Tamil: "AI-ஆல் இயக்கப்படும் பன்மொழி ஆயுர்வேத IPR & ஒழுங்குமுறை உதவியாளர்",
  },
  indiaGuidance: {
    English: "India Guidance",
    Hindi: "भारत दिशानिर्देश",
    Tamil: "இந்திய வழிகாட்டுதல்",
  },
  intlGuidance: {
    English: "International Guidance",
    Hindi: "अंतर्राष्ट्रीय दिशानिर्देश",
    Tamil: "சர்வதேச வழிகாட்டுதல்",
  },
  navHome: {
    English: "Home",
    Hindi: "मुख्य पृष्ठ",
    Tamil: "முகப்பு",
  },
  navAssistant: {
    English: "AI Assistant",
    Hindi: "एआई सहायक",
    Tamil: "AI உதவியாளர்",
  },
  navClassify: {
    English: "Product Classification",
    Hindi: "उत्पाद वर्गीकरण",
    Tamil: "தயாரிப்பு வகைப்பாடு",
  },
  navInnovation: {
    English: "Innovation Analyzer",
    Hindi: "नवाचार विश्लेषक",
    Tamil: "கண்டுபிடிப்பு பகுப்பாய்வி",
  },
  navGraph: {
    English: "Knowledge Graph",
    Hindi: "ज्ञान ग्राफ",
    Tamil: "அறிவு வரைபடம்",
  },
  navAlerts: {
    English: "Regulatory Alerts",
    Hindi: "नियामक अलर्ट",
    Tamil: "ஒழுங்குமுறை எச்சரிக்கைகள்",
  },
  navAdmin: {
    English: "Admin Sources",
    Hindi: "प्रशासनिक स्रोत",
    Tamil: "நிர்வாக மூலங்கள்",
  },
  demoUser: {
    English: "Demo User",
    Hindi: "डेमो उपयोगकर्ता",
    Tamil: "டெமோ பயனர்",
  },
  askQuestion: {
    English: "Ask any IPR, Patent, ABS or AYUSH regulatory question...",
    Hindi: "कोई भी आईपीआर, पेटेंट, एबीएस या आयुष नियामक प्रश्न पूछें...",
    Tamil: "ஏதேனும் IPR, காப்புரிமை, ABS அல்லது ஆயுஷ் ஒழுங்குமுறை கேள்வியைக் கேளுங்கள்...",
  },
  whyThisAnswer: {
    English: "Why this answer?",
    Hindi: "यह उत्तर क्यों?",
    Tamil: "இந்த பதில் ஏன்?",
  },
  verifiedSources: {
    English: "Verified Statutory Sources",
    Hindi: "सत्यापित वैधानिक स्रोत",
    Tamil: "சரிபார்க்கப்பட்ட சட்ட மூலங்கள்",
  },
  patentabilityScore: {
    English: "Patentability Score",
    Hindi: "पेटेंट योग्यता स्कोर",
    Tamil: "காப்புரிமை சாத்தியக்கூறு",
  },
  tkdlRiskScore: {
    English: "TKDL Risk Score",
    Hindi: "पारंपरिक ज्ञान (TKDL) जोखिम",
    Tamil: "பாரம்பரிய அறிவு இடர்",
  },
  absRiskScore: {
    English: "ABS Risk Score",
    Hindi: "जैव विविधता (ABS) जोखिम",
    Tamil: "பல்லுயிர் இடர்",
  },
  commercialReadiness: {
    English: "Commercial Readiness",
    Hindi: "व्यावसायिक तैयारी",
    Tamil: "வணிக தயார்நிலை",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "English",
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("English");

  useEffect(() => {
    const saved = localStorage.getItem("ayurguru_language") as Language;
    if (saved === "English" || saved === "Hindi" || saved === "Tamil") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("ayurguru_language", lang);
  };

  const t = (key: string): string => {
    if (UI_TRANSLATIONS[key] && UI_TRANSLATIONS[key][language]) {
      return UI_TRANSLATIONS[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
