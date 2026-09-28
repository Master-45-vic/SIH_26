from typing import List, Dict, Any
from ..schemas import GraphNode, GraphEdge, KnowledgeGraphResponse

class KnowledgeGraphService:
    """
    Supplies the full interactive Knowledge Graph:
    Plant -> Traditional Knowledge -> Patent -> ABS -> Regulation
    """

    def get_graph_data(self, plant_filter: str = None) -> KnowledgeGraphResponse:
        nodes: List[GraphNode] = [
            # 1. Plants
            GraphNode(
                id="plant-turmeric",
                label="Turmeric (Curcuma longa)",
                type="Plant",
                properties={"sanskrit": "Haridrā", "active": "Curcuminoids (Curcumin, BDMC)", "botanical_family": "Zingiberaceae"}
            ),
            GraphNode(
                id="plant-neem",
                label="Neem (Azadirachta indica)",
                type="Plant",
                properties={"sanskrit": "Nimba", "active": "Azadirachtin, Nimbin, Nimbidin", "botanical_family": "Meliaceae"}
            ),
            GraphNode(
                id="plant-ashwagandha",
                label="Ashwagandha (Withania somnifera)",
                type="Plant",
                properties={"sanskrit": "Aśvagandhā", "active": "Withanolide A, B, Withaferin A", "botanical_family": "Solanaceae"}
            ),
            GraphNode(
                id="plant-brahmi",
                label="Brahmi (Bacopa monnieri)",
                type="Plant",
                properties={"sanskrit": "Brāhmī", "active": "Bacosides A & B", "botanical_family": "Plantaginaceae"}
            ),

            # 2. Traditional Knowledge
            GraphNode(
                id="tk-charaka",
                label="Charaka Samhita",
                type="TraditionalKnowledge",
                properties={"era": "Classical (c. 100 BCE - 200 CE)", "category": "Brihat Trayi", "focus": "Internal medicine, Kusthaghna, Rasayana"}
            ),
            GraphNode(
                id="tk-sushruta",
                label="Sushruta Samhita",
                type="TraditionalKnowledge",
                properties={"era": "Classical (c. 600 BCE)", "category": "Brihat Trayi", "focus": "Surgery, wound healing (Vranaropana), toxicology"}
            ),
            GraphNode(
                id="tk-tkdl",
                label="CSIR Traditional Knowledge Digital Library (TKDL)",
                type="TraditionalKnowledge",
                properties={"authority": "CSIR & AYUSH", "languages": "5 UN languages", "purpose": "Defensive prior art database against biopiracy"}
            ),

            # 3. Patents
            GraphNode(
                id="pat-us-turmeric",
                label="US Patent 5,401,504 (Revoked)",
                type="Patent",
                properties={"inventor": "Univ of Mississippi", "claim": "Wound healing with turmeric", "verdict": "Revoked upon CSIR-TKDL evidence"}
            ),
            GraphNode(
                id="pat-ep-neem",
                label="EPO Patent EP0436257 (Revoked)",
                type="Patent",
                properties={"inventor": "W.R. Grace", "claim": "Antifungal effect of neem", "verdict": "Revoked after legal challenge citing TKDL"}
            ),
            GraphNode(
                id="pat-snedds-curcumin",
                label="Novel SNEDDS Bioavailability Patent",
                type="Patent",
                properties={"type": "Delivery System Patent", "status": "Patentable", "basis": "Non-obvious lipid carrier overcoming low solubility"}
            ),

            # 4. ABS (Access and Benefit Sharing)
            GraphNode(
                id="abs-nba-form3",
                label="NBA Form III (IPR Approval)",
                type="ABS",
                properties={"statute": "BD Act Section 6(1)", "mandate": "Approval prior to patent grant for inventions based on Indian bio-resources"}
            ),
            GraphNode(
                id="abs-nba-form1",
                label="NBA Form I (Commercial Access)",
                type="ABS",
                properties={"statute": "BD Act Section 3 & 4", "mandate": "Approval for foreign entities accessing Indian bio-resources"}
            ),
            GraphNode(
                id="abs-benefit-sharing",
                label="ABS Benefit Sharing (0.1% - 0.5%)",
                type="ABS",
                properties={"levy": "0.1% to 0.5% ex-factory sales or 3-5% patent royalty to Local Biodiversity Management Committees"}
            ),

            # 5. Regulation
            GraphNode(
                id="reg-sec3p",
                label="Indian Patents Act Section 3(p)",
                type="Regulation",
                properties={"jurisdiction": "India", "clause": "Bars patenting of traditional knowledge or aggregations"}
            ),
            GraphNode(
                id="reg-rule158b",
                label="Drugs & Cosmetics Rule 158-B",
                type="Regulation",
                properties={"jurisdiction": "India", "authority": "State AYUSH Licensing Authority", "clause": "Proof of safety & efficacy for ASU drugs"}
            ),
            GraphNode(
                id="reg-ayurveda-aahar",
                label="FSSAI Ayurveda Aahar Reg 2022",
                type="Regulation",
                properties={"jurisdiction": "India", "authority": "FSSAI", "clause": "Authoritative recipes for food; no curative disease claims"}
            ),
            GraphNode(
                id="reg-us-fda-botanical",
                label="US FDA Botanical Drug Guidance (21 CFR 312)",
                type="Regulation",
                properties={"jurisdiction": "International", "authority": "US FDA CDER", "clause": "Prescription botanical NDA approval pathway"}
            ),
            GraphNode(
                id="reg-eu-thmpd",
                label="EU Directive 2004/24/EC (THMPD)",
                type="Regulation",
                properties={"jurisdiction": "International", "authority": "EMA HMPC", "clause": "30-year traditional use (15 years in EU)"}
            )
        ]

        edges: List[GraphEdge] = [
            # Plant -> Traditional Knowledge
            GraphEdge(source="plant-turmeric", target="tk-charaka", relation="DESCRIBED_IN", label="Kusthaghna, Varnya in Charaka"),
            GraphEdge(source="plant-turmeric", target="tk-sushruta", relation="DESCRIBED_IN", label="Vranaropana (Wound Healing)"),
            GraphEdge(source="plant-turmeric", target="tk-tkdl", relation="CATALOGUED_IN", label="TKDL Monograph Haridra"),
            GraphEdge(source="plant-neem", target="tk-sushruta", relation="DESCRIBED_IN", label="Krimighna & Tikta Skandha"),
            GraphEdge(source="plant-neem", target="tk-tkdl", relation="CATALOGUED_IN", label="TKDL Monograph Nimba"),
            GraphEdge(source="plant-ashwagandha", target="tk-charaka", relation="DESCRIBED_IN", label="Balya & Rasayana"),
            GraphEdge(source="plant-ashwagandha", target="tk-tkdl", relation="CATALOGUED_IN", label="TKDL Monograph Aśvagandhā"),
            GraphEdge(source="plant-brahmi", target="tk-charaka", relation="DESCRIBED_IN", label="Medhya Rasayana (Cognitive)"),

            # Traditional Knowledge -> Patent & Prior Art Bar
            GraphEdge(source="tk-sushruta", target="pat-us-turmeric", relation="INVALIDATED_PRIOR_ART", label="Evidence submitted to USPTO"),
            GraphEdge(source="tk-tkdl", target="pat-ep-neem", relation="INVALIDATED_PRIOR_ART", label="Revoked by EPO in 2000"),
            GraphEdge(source="tk-tkdl", target="reg-sec3p", relation="ENFORCES_STATUTORY_BAR", label="Statutory Prior Art under 3(p)"),

            # Plant -> Patent & White Space
            GraphEdge(source="plant-turmeric", target="pat-snedds-curcumin", relation="INNOVATION_PATHWAY", label="Liposomal / Nano Carrier"),

            # Patent -> ABS
            GraphEdge(source="pat-snedds-curcumin", target="abs-nba-form3", relation="MANDATORY_COMPLIANCE", label="File Form III before grant"),
            GraphEdge(source="plant-turmeric", target="abs-nba-form1", relation="SUBJECT_TO_ABS", label="Access to Indian Bio-Resource"),
            GraphEdge(source="abs-nba-form3", target="abs-benefit-sharing", relation="TRIGGERS_ROYALTY", label="Benefit sharing payment to BMC"),

            # ABS & Plant -> Regulation
            GraphEdge(source="pat-snedds-curcumin", target="reg-sec3p", relation="GOVERNED_BY", label="Exempt from 3(p) via novel delivery"),
            GraphEdge(source="plant-turmeric", target="reg-rule158b", relation="LICENSED_UNDER", label="Classical / Proprietary ASU license"),
            GraphEdge(source="plant-turmeric", target="reg-ayurveda-aahar", relation="FOOD_CATEGORY", label="Ayurveda Aahar Schedule A"),
            GraphEdge(source="plant-ashwagandha", target="reg-us-fda-botanical", relation="EXPORT_PATHWAY", label="US FDA Botanical Drug NDA"),
            GraphEdge(source="plant-ashwagandha", target="reg-eu-thmpd", relation="EXPORT_PATHWAY", label="EU Herbal Registration")
        ]

        # Apply plant filter if provided
        if plant_filter and plant_filter.lower() != "all":
            pf = plant_filter.lower()
            filtered_nodes = [n for n in nodes if pf in n.label.lower() or n.type != "Plant"]
            filtered_node_ids = {n.id for n in filtered_nodes}
            filtered_edges = [e for e in edges if e.source in filtered_node_ids and e.target in filtered_node_ids]
            return KnowledgeGraphResponse(nodes=filtered_nodes, edges=filtered_edges)

        return KnowledgeGraphResponse(nodes=nodes, edges=edges)

knowledge_graph_service = KnowledgeGraphService()
