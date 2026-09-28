from typing import List, Dict, Any
from ..schemas import ClassificationSubmission, ClassificationResult

class ProductClassifier:
    """
    Expert Rule & Statutory Classification Engine.
    Categorizes health/herbal products into:
      1. Classical Medicine
      2. Proprietary Medicine
      3. New Drug
      4. Phytopharmaceutical
      5. Ayurveda-Aahar
      6. Cosmetic
    Citing Drugs & Cosmetics Act 1940, Rule 158-B, CDSCO Rule 122E, and FSSAI 2022 Gazette.
    """
    
    def classify(self, submission: ClassificationSubmission) -> ClassificationResult:
        name = submission.product_name
        is_textual = submission.is_textual_reference
        claims = submission.claims_type.lower()
        form = submission.form.lower()
        purified = submission.is_purified_fraction
        route = submission.route_of_administration.lower()
        
        # Rule 1: Phytopharmaceutical Check (CDSCO Rule 122E)
        if purified or "phytopharmaceutical" in claims:
            return ClassificationResult(
                product_name=name,
                classification="Phytopharmaceutical",
                statutory_reference="Drugs & Cosmetics (Second Amendment) Rules, 2015, Rule 122E (Gazette GSR 918(E))",
                licensing_authority="Central Drugs Standard Control Organization (CDSCO) / DCGI New Delhi",
                mandatory_forms=["Form 44 (Application for New Drug)", "Schedule Y / NDCT Rules Preclinical & Clinical Dossier"],
                safety_data_required="Comprehensive Pre-clinical toxicology (genotoxicity, carcinogenicity), minimum 4 chemical biomarker profile (>=95% standardized), and Phase I, II, III human clinical trials.",
                reasoning=[
                    "Product contains a purified and standardized fraction with characterized chemical biomarkers.",
                    "Regulated under modern allopathic CDSCO drug framework, NOT under State AYUSH Licensing Authority.",
                    "Unlocks conventional pharmaceutical composition and method patents without Section 3(p) TKDL barriers."
                ],
                confidence_score=0.98
            )

        # Rule 2: Ayurveda-Aahar Check (FSSAI Regulations 2022)
        if ("nutritional" in claims or "well-being" in claims or "food" in claims) and "curative" not in claims and form not in ["injection"]:
            return ClassificationResult(
                product_name=name,
                classification="Ayurveda-Aahar",
                statutory_reference="Food Safety and Standards (Ayurveda Aahar) Regulations, 2022 (F. No. Stds/SP(Nutraceuticals)/Ayush-1/FSSAI-2021)",
                licensing_authority="Food Safety and Standards Authority of India (FSSAI) Central/State Licensing",
                mandatory_forms=["FSSAI Form B (Food Business License Application)", "Ayurveda Aahar Schedule A Textual Justification"],
                safety_data_required="Food-grade microbiological testing, heavy metals compliance (Lead, Arsenic, Cadmium, Mercury within FSSAI limits), pesticide residue certificate. No animal toxicity or clinical trial required if prepared per Schedule A authoritative books.",
                reasoning=[
                    "Intended for daily physiological well-being, Rasayana, or nutritional balance without disease curing claims.",
                    "Must bear mandatory green 'Ayurveda Aahar' insignia with AYUSH & FSSAI logos on principal display panel.",
                    "Direct therapeutic, disease-treatment, or drug claims are strictly barred on the packaging."
                ],
                confidence_score=0.96
            )

        # Rule 3: Cosmetic Check (Drugs and Cosmetics Act Section 3(aaa))
        if ("cosmetic" in claims or "topical" in claims or "skincare" in claims) and form in ["cream/oil", "gel", "lotion", "serum", "powder"]:
            return ClassificationResult(
                product_name=name,
                classification="Cosmetic",
                statutory_reference="Drugs and Cosmetics Act 1940, Section 3(aaa) & Cosmetic Rules, 2020",
                licensing_authority="State Drugs Licensing Authority (Cosmetics Division)",
                mandatory_forms=["Form COS-8 (Application for grant of license to manufacture cosmetics)", "Form COS-9 (License)"],
                safety_data_required="Dermal irritation test (OECD 404), microbial limits, safety assessment of herbal ingredients, heavy metal test.",
                reasoning=[
                    "Intended for application to human body for cleansing, beautifying, promoting attractiveness or altering appearance.",
                    "Does not claim to cure dermatological diseases (e.g. eczema or psoriasis cure would shift to Proprietary Ayurvedic Medicine)."
                ],
                confidence_score=0.94
            )

        # Rule 4: Classical Medicine Check (Rule 158-B Category 4.1)
        if is_textual and "curative" in claims and form in ["churna", "vati", "asava/arishta", "oil", "ghrita", "taila", "bhasma", "kashayam"]:
            return ClassificationResult(
                product_name=name,
                classification="Classical Medicine",
                statutory_reference="Drugs & Cosmetics Act 1940, Section 3(a) & Rule 158-B (Category 4.1)",
                licensing_authority="State AYUSH Licensing Authority (Directorate of AYUSH / ISM)",
                mandatory_forms=["Form 24-D (Application for license to manufacture ASU drugs)", "Form 25-D (Grant of License)"],
                safety_data_required="Presumed historically safe. No animal toxicology or new clinical trials required if exact ingredients, proportions, and classical procedures from First Schedule 54 authoritative texts are followed.",
                reasoning=[
                    "Formulation matches authentic recipe from authoritative treatise listed in First Schedule (e.g., Charaka Samhita, Sharangadhara Samhita).",
                    "Requires compliance with Schedule T Good Manufacturing Practices (GMP).",
                    "Cannot be patented directly due to Section 3(p) Traditional Knowledge prior art bar."
                ],
                confidence_score=0.99
            )

        # Rule 5: New Drug Check (Allopathic/Novel chemical route)
        if "new molecule" in claims or form in ["injection"] or route in ["intravenous", "subcutaneous"]:
            return ClassificationResult(
                product_name=name,
                classification="New Drug",
                statutory_reference="New Drugs and Clinical Trials Rules, 2019 (NDCT) & Drugs and Cosmetics Act Section 3(b)",
                licensing_authority="Central Drugs Standard Control Organization (CDSCO) / DCGI",
                mandatory_forms=["Form CT-04 (Application for Clinical Trial)", "Form CT-18 (Market Authorization)"],
                safety_data_required="Full IND toxicity studies, GLP pharmacology, Phase I-III clinical trials.",
                reasoning=[
                    "Injectable or novel isolated chemical compound falls completely outside AYUSH statutory purview.",
                    "Requires standard pharmaceutical new chemical entity (NCE) regulatory pathway."
                ],
                confidence_score=0.95
            )

        # Rule 6: Default Ayurvedic Patent or Proprietary Medicine (Rule 158-B Category 4.2)
        return ClassificationResult(
            product_name=name,
            classification="Proprietary Medicine",
            statutory_reference="Drugs & Cosmetics Act 1940, Section 3(h) & Rule 158-B (Category 4.2)",
            licensing_authority="State AYUSH Licensing Authority (SLA)",
            mandatory_forms=["Form 24-D (Manufacturing License)", "Schedule T GMP Certification"],
            safety_data_required="Published safety and efficacy literature from recognized scientific journals, acute oral toxicity data in rodents (OECD 423/425), and pilot clinical trial proof of effectiveness.",
            reasoning=[
                "Product contains ingredients mentioned in First Schedule texts but in novel proportions, modern dosage forms (tablets, capsules), or with novel excipients.",
                "Marketed under a brand/trade name (patent or proprietary medicine) rather than classical Sanskrit monograph name.",
                "Eligible for patent protection on novel delivery system or proven synergistic ratio (CI < 1.0) under Section 3(e)."
            ],
            confidence_score=0.93
        )

product_classifier = ProductClassifier()
