from typing import List, Optional, Tuple
from ..schemas import CitationSource, VerificationReport

class EvidenceVerificationEngine:
    """
    Verifies retrieved legal evidence before final answer generation.
    Enforces statutory guardrails, confidence scoring, and escalation triggers.
    """
    CONFIDENCE_THRESHOLD = 0.60  # If below 60%, escalate to human expert

    def verify_evidence(
        self,
        query: str,
        citations: List[CitationSource],
        target_jurisdiction: str
    ) -> VerificationReport:
        # Check 1: Source Availability
        source_available = len(citations) > 0

        # Check 2: Correct Jurisdiction (Zero tolerance for mixing India vs International)
        jurisdiction_matched = True
        if source_available:
            for cit in citations:
                if cit.jurisdiction.lower() != target_jurisdiction.lower():
                    jurisdiction_matched = False
                    break

        # Check 3: Document Version validity
        version_valid = True
        if source_available:
            for cit in citations:
                if not cit.version or "repealed" in cit.version.lower():
                    version_valid = False

        # Calculate Confidence Score based on evidence strength
        if not source_available:
            confidence_score = 0.35
        elif not jurisdiction_matched:
            confidence_score = 0.20
        else:
            top_score = citations[0].relevance_score if citations else 0.0
            # Normalize confidence based on top citation relevance and statutory coverage
            avg_score = sum(c.relevance_score for c in citations) / len(citations)
            confidence_score = round(min(0.98, max(0.40, (top_score * 0.6 + avg_score * 0.4))), 2)

        # Determine if human expert escalation is required
        requires_human = False
        warning_message = None
        recommended_expert = None
        escalation_reason = None

        if confidence_score < self.CONFIDENCE_THRESHOLD or not source_available or not jurisdiction_matched:
            requires_human = True
            warning_message = "Unable to verify confidently. Please consult a human expert."
            
            # Smart determination of expert type based on query semantics
            q_lower = query.lower()
            if any(k in q_lower for k in ["abs", "biodiversity", "nba", "sbb", "form iii", "benefit sharing", "access"]):
                recommended_expert = "ABS Officer / National Biodiversity Authority Legal Advisor"
                escalation_reason = "ABS compliance ambiguity or novel foreign-collaboration biological resource utilization."
            elif any(k in q_lower for k in ["patent", "claim", "infringement", "section 3(p)", "section 3(d)", "fer", "pct"]):
                recommended_expert = "Registered Patent Attorney (Ayurveda / Biotechnology Specialist)"
                escalation_reason = "Complex patentability barrier or Section 3(p)/3(d) prior art objection requiring claim drafting."
            else:
                recommended_expert = "AYUSH Regulatory Consultant / Drug Licensing Expert"
                escalation_reason = "Regulatory ambiguity regarding Rule 158-B manufacturing license or FSSAI crossover boundary."

        is_verified = (confidence_score >= self.CONFIDENCE_THRESHOLD) and source_available and jurisdiction_matched

        return VerificationReport(
            is_verified=is_verified,
            confidence_score=confidence_score,
            source_available=source_available,
            jurisdiction_matched=jurisdiction_matched,
            version_valid=version_valid,
            warning_message=warning_message,
            requires_human_expert=requires_human,
            recommended_expert=recommended_expert,
            escalation_reason=escalation_reason
        )

evidence_verifier = EvidenceVerificationEngine()
