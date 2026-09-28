import urllib.request
import json
import time

def test_endpoint(url, method="GET", data=None):
    req = urllib.request.Request(url, method=method)
    req.add_header("User-Agent", "AyurGuru-Test-Runner/1.0")
    if data:
        req.add_header("Content-Type", "application/json")
        body = json.dumps(data).encode("utf-8")
        req.data = body
        
    try:
        with urllib.request.urlopen(req, timeout=15) as res:
            code = res.status
            content = res.read().decode("utf-8", errors="ignore")
            return code, content
    except Exception as e:
        return 500, str(e)

def run_tests():
    print("=" * 60)
    print("AYURGURU FULL-STACK END-TO-END VALIDATION SUITE")
    print("=" * 60)

    # 1. Test Frontend Pages
    frontend_pages = [
        ("/", "Home Page"),
        ("/assistant", "AI Assistant Page"),
        ("/classify", "Classification Wizard Page"),
        ("/innovation", "Innovation Gap Analyzer Page"),
        ("/graph", "Knowledge Graph Page"),
        ("/alerts", "Regulatory Alerts Page"),
        ("/admin", "Admin Sources Page"),
        ("/login", "Login & Jury Demo Page")
    ]

    print("\n--- 1. Testing Frontend Route HTML Generation (Port 3000) ---")
    for path, name in frontend_pages:
        code, content = test_endpoint(f"http://localhost:3000{path}")
        print(f"[{code}] {name} (http://localhost:3000{path}) - Length: {len(content)} bytes")
        assert code == 200, f"Failed to load {name}"

    # 2. Test Backend API Endpoints
    print("\n--- 2. Testing Backend API Endpoints (Port 8000) ---")
    api_base = "http://127.0.0.1:8000/api/v1"

    # A. Root health
    code, content = test_endpoint("http://127.0.0.1:8000/health")
    print(f"[{code}] Backend /health: {content}")
    assert code == 200

    # B. Demo Login
    code, content = test_endpoint(f"{api_base}/auth/demo-login", method="POST")
    print(f"[{code}] Auth Demo Login: {content[:100]}...")
    token_data = json.loads(content)
    token = token_data.get("access_token")
    assert token, "Token not found"

    # C. Assistant Query - India Jurisdiction (Patents Act Sec 3p)
    code, content = test_endpoint(
        f"{api_base}/assistant/query",
        method="POST",
        data={
            "query": "Can I patent a Turmeric and Neem formulation under Section 3(p)?",
            "jurisdiction": "India",
            "language": "English"
        }
    )
    india_res = json.loads(content)
    print(f"[{code}] Assistant (India): Citations={len(india_res.get('citations', []))}, Verified={india_res.get('verification', {}).get('is_verified')}")
    print(f"    Why this answer bullets: {len(india_res.get('why_this_answer', []))}")
    assert "Section 3(p)" in india_res["answer"] or "Indian Patents Act" in india_res["answer"]
    assert len(india_res["citations"]) > 0

    # D. Assistant Query - International Jurisdiction (US FDA / WIPO)
    code, content = test_endpoint(
        f"{api_base}/assistant/query",
        method="POST",
        data={
            "query": "What are US FDA requirements for marketing botanical drugs?",
            "jurisdiction": "International",
            "language": "English"
        }
    )
    intl_res = json.loads(content)
    print(f"[{code}] Assistant (International): Answer contains FDA/EMA? {('FDA' in intl_res['answer'] or 'International' in intl_res['answer'])}")
    assert intl_res["jurisdiction"] == "International"

    # E. Assistant Query - Multilingual Hindi
    code, content = test_endpoint(
        f"{api_base}/assistant/query",
        method="POST",
        data={
            "query": "क्या मैं हल्दी और नीम का पेटेंट ले सकता हूँ?",
            "jurisdiction": "India",
            "language": "Hindi"
        }
    )
    hindi_res = json.loads(content)
    print(f"[{code}] Assistant (Hindi): Answer contains Devanagari? {any(ord(c) >= 0x0900 and ord(c) <= 0x097F for c in hindi_res['answer'])}")

    # F. Product Classification Engine
    code, content = test_endpoint(
        f"{api_base}/classify/",
        method="POST",
        data={
            "product_name": "Classical Triphala Churna",
            "ingredients": ["Amla", "Haritaki", "Bibhitaki"],
            "is_textual_reference": True,
            "claims_type": "Curative/Therapeutic",
            "form": "Churna",
            "is_purified_fraction": False,
            "route_of_administration": "Oral"
        }
    )
    class_res = json.loads(content)
    print(f"[{code}] Product Classification: {class_res.get('product_name')} -> {class_res.get('classification')}")
    print(f"    Statutory Reference: {class_res.get('statutory_reference')}")
    assert class_res.get("classification") == "Classical Medicine"

    # G. Innovation Gap Analyzer
    code, content = test_endpoint(
        f"{api_base}/innovation/analyze",
        method="POST",
        data={
            "formulation_name": "Turmeric + Neem Bio-Gel",
            "ingredients": ["Turmeric", "Neem"],
            "intended_use": "Wound healing and antimicrobial skin regeneration",
            "current_form": "Topical Gel"
        }
    )
    gap_res = json.loads(content)
    print(f"[{code}] Innovation Gap Analyzer:")
    print(f"    Patentability Score: {gap_res.get('patentability_score')}%")
    print(f"    TKDL Risk Score: {gap_res.get('tkdl_risk_score')}%")
    print(f"    ABS Risk Score: {gap_res.get('abs_risk_score')}%")
    print(f"    White Space Opportunities: {len(gap_res.get('innovation_opportunities', []))}")
    assert len(gap_res.get("innovation_opportunities", [])) >= 3

    # H. Knowledge Graph
    code, content = test_endpoint(f"{api_base}/graph/")
    kg_res = json.loads(content)
    print(f"[{code}] Knowledge Graph: {len(kg_res.get('nodes', []))} nodes, {len(kg_res.get('edges', []))} edges")
    assert len(kg_res.get("nodes", [])) >= 10

    # I. Regulatory Alerts
    code, content = test_endpoint(f"{api_base}/alerts/")
    alerts_res = json.loads(content)
    print(f"[{code}] Regulatory Alerts: {len(alerts_res)} live gazette notifications loaded")
    assert len(alerts_res) >= 4

    # J. Admin Documents
    code, content = test_endpoint(f"{api_base}/admin/documents")
    docs_res = json.loads(content)
    print(f"[{code}] Admin Documents: {len(docs_res)} verified statutory corpora indexed")
    assert len(docs_res) >= 6

    print("\n" + "=" * 60)
    print("ALL FRONTEND & BACKEND SUITES PASSED WITH 100% SUCCESS!")
    print("=" * 60)

if __name__ == "__main__":
    run_tests()
