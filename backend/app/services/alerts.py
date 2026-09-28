from typing import List, Optional
from ..schemas import AlertItem

class RegulatoryAlertService:
    """
    Manages live and simulated regulatory alerts across AYUSH, Biodiversity, Patents, FSSAI, and International bodies.
    """
    
    def __init__(self):
        self.alerts: List[AlertItem] = [
            AlertItem(
                id=1,
                title="AYUSH Notification: Clarification on Stability Data Requirements for Proprietary Formulations",
                jurisdiction="India",
                category="AYUSH Regulations",
                authority="Ministry of AYUSH (Pharmacopoeia Commission for Indian Medicine)",
                date_notified="2024-08-15",
                impact_level="High",
                target_stakeholders="Ayurveda Startups, MSME Drug Manufacturers, Exporters",
                summary="Mandates real-time and accelerated stability testing (as per ICH/WHO guidelines adapted for herbal matrices) for all new patent and proprietary ASU medicine license applications.",
                action_checklist=[
                    "Conduct 6-month accelerated stability testing (40°C ± 2°C / 75% RH ± 5% RH) before filing Form 24-D.",
                    "Include chromatographic fingerprint stability for at least 2 active phytomarkers.",
                    "Update product packaging shelf-life claim to match real-time stability dossier."
                ],
                source_url="https://ayush.gov.in/notifications"
            ),
            AlertItem(
                id=2,
                title="Biological Diversity (Amendment) Act 2023 - Operational Rules Notified",
                jurisdiction="India",
                category="Biodiversity & ABS",
                authority="National Biodiversity Authority (NBA) & MoEFCC",
                date_notified="2024-06-10",
                impact_level="High",
                target_stakeholders="Cultivators, AYUSH Practitioners, Patent Applicants",
                summary="Formally exempts codified traditional knowledge practitioners and cultivators of domestic medicinal plants from prior intimation to State Biodiversity Boards. However, mandatory Form III filing before patent grant remains strictly enforced under Section 6.",
                action_checklist=[
                    "Maintain certified cultivator purchase certificates to claim SBB exemption.",
                    "For any domestic or international patent filing, ensure Form III is submitted to NBA immediately upon filing.",
                    "Review foreign collaboration equity structures to verify Form I applicability."
                ],
                source_url="https://nbaindia.org/rules-2024"
            ),
            AlertItem(
                id=3,
                title="Indian Patent Office (CGPDTM) Patent Rules Amendment 2024 - Expedited Examination for Startups",
                jurisdiction="India",
                category="Patent Rules",
                authority="Controller General of Patents, Designs and Trade Marks (CGPDTM)",
                date_notified="2024-03-15",
                impact_level="Medium",
                target_stakeholders="AYUSH Innovators, Biotech Startups, R&D Labs",
                summary="Provides up to 80% fee reduction and eligibility for expedited examination (Form 18A) for DPIIT-recognized startups working on AYUSH novel drug delivery mechanisms.",
                action_checklist=[
                    "Ensure DPIIT startup recognition certificate is valid.",
                    "File Form 18A for expedited examination within 36 months of priority date.",
                    "Prepare experimental synergy or bioavailability data beforehand to answer First Examination Report (FER) within 6 months."
                ],
                source_url="https://ipindia.gov.in/news-updates"
            ),
            AlertItem(
                id=4,
                title="FSSAI Advisory on Ayurveda Aahar Label Claims Compliance",
                jurisdiction="India",
                category="FSSAI Regulations",
                authority="Food Safety and Standards Authority of India (FSSAI)",
                date_notified="2024-05-20",
                impact_level="High",
                target_stakeholders="Ayurvedic Food & Beverage Brands, Wellness Startups",
                summary="Strict crack-down on misleading disease cure claims on products marketed under Ayurveda Aahar regulations. Clarifies that direct therapeutic claims require drug licensing under Rule 158-B.",
                action_checklist=[
                    "Audit product labels to remove words like 'Cures Diabetes', 'Anti-arthritic', or 'Prevents Infection'.",
                    "Replace with permissible terms: 'Supports physiological vitality (Ojas)', 'Promotes digestion (Deepana/Pachana)'.",
                    "Verify the green Ayurveda Aahar logo is printed with minimum 15mm height on display panel."
                ],
                source_url="https://fssai.gov.in/ayurveda-aahar"
            ),
            AlertItem(
                id=5,
                title="WIPO Diplomatic Conference: Adoption of Global Treaty on Genetic Resources & TK",
                jurisdiction="International",
                category="International Treaties",
                authority="World Intellectual Property Organization (WIPO)",
                date_notified="2024-05-24",
                impact_level="High",
                target_stakeholders="Global Exporters, Pharmaceutical Startups, Researchers",
                summary="Mandates patent applicants in all contracting member states to disclose the country of origin of genetic resources and traditional knowledge, strengthening international defense against biopiracy.",
                action_checklist=[
                    "Disclose Indian origin of herbal extracts in all PCT and Paris Convention patent filings.",
                    "Keep verifiable supply records traceable to Indian cultivators or authorized collectors.",
                    "Check target export country ratification status for compliance deadlines."
                ],
                source_url="https://wipo.int/tk/en/treaty-2024"
            ),
            AlertItem(
                id=6,
                title="US FDA Guidance Update: Botanical Drug Consistency & Fingerprint Assays",
                jurisdiction="International",
                category="International Drug Regulations",
                authority="US Food and Drug Administration (CDER)",
                date_notified="2024-02-18",
                impact_level="Medium",
                target_stakeholders="Herbal Exporters, US-bound Clinical Trial Sponsors",
                summary="Clarifies spectroscopic batch-to-batch consistency requirements for botanical mixtures entering US Phase 2 IND clinical trials.",
                action_checklist=[
                    "Establish multi-wavelength HPLC or LC-MS chromatographic fingerprints across at least 3 commercial batches.",
                    "Document Good Agricultural and Collection Practices (GACP) for farm-level botanical raw material sourcing."
                ],
                source_url="https://fda.gov/drugs/botanical-guidance"
            )
        ]

    def get_alerts(self, jurisdiction: Optional[str] = None, category: Optional[str] = None) -> List[AlertItem]:
        filtered = self.alerts
        if jurisdiction and jurisdiction.lower() != "all":
            filtered = [a for a in filtered if a.jurisdiction.lower() == jurisdiction.lower()]
        if category and category.lower() != "all":
            filtered = [a for a in filtered if category.lower() in a.category.lower()]
        return filtered

regulatory_alert_service = RegulatoryAlertService()
