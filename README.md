# 🌿 AyurGuru – AI-Powered Multilingual Ayurveda IPR & Regulatory Assistant

[![Smart India Hackathon 2024](https://img.shields.io/badge/SIH-2024_Finalist-blue.svg)](https://sih.gov.in)
[![Next.js 15](https://img.shields.io/badge/Frontend-Next.js_15-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)](https://fastapi.tiangolo.com/)
[![RAG](https://img.shields.io/badge/RAG-Hybrid_BM25_+_Qdrant-orange.svg)](https://qdrant.tech/)
[![LangGraph](https://img.shields.io/badge/Agent-LangGraph_State_Machine-red.svg)](https://langchain.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**AyurGuru** is an AI-powered national intelligence portal designed to help Ayurveda practitioners, researchers, biotech startups, MSMEs, and medicinal plant cultivators navigate intellectual property rights (IPR) and statutory regulations across both **India** and **International** jurisdictions.

---

## 🏛️ Strict Jurisdiction Separation

The platform strictly isolates legal frameworks to avoid hazardous statutory conflation:
- **🇮🇳 India Domestic Guidance:**
  - **Indian Patents Act, 1970:** Section 3(p) (traditional knowledge prior art), Section 3(d) (therapeutic efficacy bar), Section 3(e) (mere admixture).
  - **Drugs and Cosmetics Act, 1940 & Rules 1945:** Rule 158-B licensing (Classical Category 4.1 vs Proprietary Category 4.2).
  - **CDSCO Rule 122E:** Phytopharmaceutical drugs with ≥4 chemical biomarkers.
  - **Biological Diversity Act, 2002 (amended 2023):** National Biodiversity Authority (NBA) **Form III** IPR prior approvals, Form I commercial access, benefit sharing levies (0.1%–0.5%).
  - **FSSAI (Ayurveda Aahar) Regulations, 2022:** Schedule A authoritative texts, health promotion claims, mandatory green insignia.
  - **CSIR Traditional Knowledge Digital Library (TKDL):** Defensive prior art database.
- **🌐 International Guidance:**
  - **US FDA Botanical Drug Development (21 CFR Part 312):** CMC requirements, spectroscopic fingerprinting, clinical IND pathways, DSHEA dietary supplements.
  - **EU Directive 2004/24/EC (THMPD):** Traditional Herbal Medicinal Products Directive (30-year traditional use, 15-year EU presence).
  - **WIPO Treaty (May 2024):** Mandatory patent disclosure of genetic resources and traditional knowledge country of origin.
  - **Nagoya Protocol on Access and Benefit Sharing (ABS).**

---

## 🚀 Core Features

### 1. Product Classification Engine
- 5-step questionnaire wizard analyzing traditional text citations, therapeutic claim types, dosage forms, purified fractions, and routes of administration.
- Categorizes formulations into:
  1. **Classical Medicine** (Rule 158-B Category 4.1, presumed safe from First Schedule texts)
  2. **Proprietary Medicine** (Rule 158-B Category 4.2, requires acute oral toxicity & published literature)
  3. **Phytopharmaceutical** (CDSCO Rule 122E, ≥4 standardized chemical markers, IND trials)
  4. **Ayurveda-Aahar** (FSSAI 2022, Schedule A recipes, no disease cure claims permitted)
  5. **Cosmetics** (Section 3(aaa), dermal irritation tests)
  6. **New Drug** (CDSCO NDCT 2019, clinical trial pathway)

### 2. Hybrid RAG Engine
- Combines **BM25 keyword search** (for statutory sections like "Section 3(p)", "Rule 158-B") with **Dense Vector semantic search** powered by Qdrant.
- Every response includes verified statutory citations with official citations, jurisdiction tags, and direct legal excerpts.

### 3. Evidence Verification Engine
- Before generating the final response, verifies:
  1. Source Availability
  2. Jurisdiction Match (Zero tolerance for mixing India vs International)
  3. Document Version Validity
  4. Confidence Score Calculation
- If confidence falls below 60%, flags: *"Unable to verify confidently. Please consult a human expert."*

### 4. Innovation Gap Analyzer
- Submits polyherbal formulations (e.g., *"Turmeric + Neem"* or *"Ashwagandha + Brahmi"*).
- Reviews prior art in TKDL and landmark revoked patents (US 5,401,504 Turmeric revocation, EPO Neem revocation).
- Outputs 3 high-value patentable white-space opportunities:
  - **New Delivery Mechanism** (SNEDDS, liposomes, phytosomes)
  - **New Extraction Method** (Supercritical CO2 green extraction)
  - **New Formulation Process** (Synergistic Chou-Talalay ratio CI < 0.70)
- Generates 4 dynamic gauges: **Patentability Score**, **TKDL Risk Score**, **ABS Risk Score**, and **Commercialization Readiness Score**.

### 5. Human Expert Escalation Engine
- When queries involve legal ambiguity or low verification scores, offers direct docket creation for:
  - **Registered Patent Attorney** (Ayurveda & Biotech Specialist)
  - **AYUSH Regulatory Consultant** (State Licensing Authority Expert)
  - **ABS Officer** (National Biodiversity Authority Advisor)

### 6. Interactive 5-Tier Knowledge Graph
- Visualizes statutory lineage across:
  `Plant` ➔ `Traditional Knowledge (TKDL)` ➔ `Patent` ➔ `ABS` ➔ `Regulation`
- Interactive SVG canvas with zoom, pan, plant filtering, and click-to-inspect properties drawer.

### 7. Regulatory Change Alert System
- Live notification dashboard tracking recent AYUSH Ministry circulars, 2023 Biodiversity Amendment rules, CGPDTM expedited examination rules, and US FDA botanicals with actionable checklists.

### 8. Multilingual Support
- Instant toggle between **English**, **Hindi (हिन्दी)**, and **Tamil (தமிழ்)** across all navigation terms and assistant responses.

---

## 📁 Repository Structure

```
SIH_GURU/
├── backend/
│   ├── app/
│   │   ├── agent/
│   │   │   ├── gemini_client.py   # Grounded Gemini API client + statutory fallback
│   │   │   └── graph.py           # LangGraph agentic regulatory workflow
│   │   ├── rag/
│   │   │   ├── corpus.py          # Seeder for statutory documents
│   │   │   ├── hybrid_retriever.py# BM25 + Qdrant in-memory vector retriever
│   │   │   └── verifier.py        # Evidence verification engine
│   │   ├── services/
│   │   │   ├── alerts.py          # Regulatory alerts service
│   │   │   ├── classifier.py      # Product classification engine
│   │   │   ├── gap_analyzer.py    # Innovation white-space analyzer
│   │   │   ├── knowledge_graph.py # 5-tier knowledge graph generator
│   │   │   └── translator.py      # Multilingual translation dictionary
│   │   ├── routers/
│   │   │   ├── admin.py           # Legal document ingestion & corpus browser
│   │   │   ├── alerts.py          # Gazette alerts API
│   │   │   ├── assistant.py       # AI assistant & human escalation API
│   │   │   ├── auth.py            # JWT authentication & one-click demo login
│   │   │   ├── classifier.py      # Product classification wizard API
│   │   │   ├── graph.py           # Knowledge graph API
│   │   │   └── innovation.py      # Innovation gap analyzer API
│   │   ├── auth.py                # JWT token creation & hashlib security
│   │   ├── config.py              # Environment configuration
│   │   ├── database.py            # SQLite database engine
│   │   ├── main.py                # FastAPI entrypoint with lifespan seeder
│   │   ├── models.py              # SQLAlchemy database models
│   │   └── schemas.py             # Pydantic validation schemas
│   ├── requirements.txt
│   ├── run_backend.py
│   └── test_backend.py
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/page.tsx     # Admin PDF upload & corpus manager
│   │   │   ├── alerts/page.tsx    # Regulatory change alerts dashboard
│   │   │   ├── assistant/page.tsx # AI regulatory chat assistant
│   │   │   ├── classify/page.tsx  # Product classification wizard
│   │   │   ├── graph/page.tsx     # Fullscreen knowledge graph explorer
│   │   │   ├── innovation/page.tsx# Innovation gap analyzer
│   │   │   ├── login/page.tsx     # Login & SIH Jury one-click demo access
│   │   │   ├── layout.tsx         # Root layout with providers
│   │   │   └── page.tsx           # National portal hero & dashboard
│   │   ├── components/
│   │   │   ├── CitationBadge.tsx  # Expandable statutory citation card
│   │   │   ├── ExplainableCard.tsx# "Why this answer?" reasoning bullets
│   │   │   ├── Footer.tsx         # National portal footer
│   │   │   ├── HumanEscalationModal.tsx # Expert referral booking modal
│   │   │   ├── KnowledgeGraphView.tsx # Interactive SVG 5-tier graph
│   │   │   ├── Navbar.tsx         # Government-tech header with switches
│   │   │   └── RiskGauge.tsx      # SVG circular score meters
│   │   ├── context/
│   │   │   ├── AuthContext.tsx    # Authentication state & demo user
│   │   │   ├── JurisdictionContext.tsx # India vs International switcher
│   │   │   └── LanguageContext.tsx# English / Hindi / Tamil localization
│   │   └── lib/
│   │       └── api.ts             # Typed REST API client
│   ├── package.json
│   └── tsconfig.json
├── sample_legal_dataset/
│   ├── ayush_drugs_cosmetics_rule_158b.json
│   ├── biodiversity_act_abs.json
│   ├── fssai_ayurveda_aahar_2022.json
│   ├── india_patents_act_sec3p.json
│   ├── international_ip_wipo_fda_ema.json
│   └── traditional_knowledge_tkdl_monographs.json
├── run.bat                        # Windows 1-click launcher
├── test_e2e.py                    # Complete end-to-end test suite
└── README.md
```

---

## 🛠️ Quickstart (Running Locally)

### Prerequisites
- Python 3.10+
- Node.js 18+ (tested on Node v24)
- (Optional) Gemini API Key from [Google AI Studio](https://aistudio.google.com) — *app functions out-of-the-box with built-in statutory engine if left blank.*

### Method 1: One-Click Windows Launcher
Simply double-click `run.bat` in the project root! It will automatically start both the backend on port 8000 and the frontend on port 3000.

### Method 2: Manual Terminal Launch

#### Step 1: Start Backend (FastAPI)
```bash
# In first terminal:
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
Backend will be available at: **`http://127.0.0.1:8000`** (Swagger docs at `/docs`).

#### Step 2: Start Frontend (Next.js)
```bash
# In second terminal:
cd frontend
npm install
npm run dev
```
Frontend will be available at: **`http://localhost:3000`**.

---

## 🧪 Running Automated Test Suites

```bash
# Verify backend unit pipelines:
backend\venv\Scripts\python backend/test_backend.py

# Verify end-to-end full-stack integration:
backend\venv\Scripts\python test_e2e.py
```

---

## 🚢 Deployment Ready

### Backend (Render / Railway / Fly.io)
- Set build command: `pip install -r backend/requirements.txt`
- Set start command: `python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Set environment variables: `DATABASE_URL=sqlite:///./ayurguru.db`, `GEMINI_API_KEY=<your_key>`

### Frontend (Vercel)
- Root Directory: `frontend`
- Framework Preset: `Next.js`
- Set environment variable: `NEXT_PUBLIC_API_URL=https://<your-render-backend-url>/api/v1`
