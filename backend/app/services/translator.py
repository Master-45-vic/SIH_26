from typing import Dict, Any

class MultilingualService:
    """
    Multilingual support layer for English, Hindi (हिन्दी), and Tamil (தமிழ்).
    Provides localized terminology dictionaries and translation helpers.
    """
    
    DICTIONARY: Dict[str, Dict[str, str]] = {
        "Classical Medicine": {
            "Hindi": "शास्त्रीय औषधि (Classical Medicine)",
            "Tamil": "பாரம்பரிய மருந்து (Classical Medicine)"
        },
        "Proprietary Medicine": {
            "Hindi": "स्वामित्व/पेटेंट औषधि (Proprietary Medicine)",
            "Tamil": "தனியுரிம ஆயுர்வேத மருந்து (Proprietary Medicine)"
        },
        "Phytopharmaceutical": {
            "Hindi": "फाइटोफार्मास्युटिकल (Phytopharmaceutical)",
            "Tamil": "பைட்டோபார்மாசூட்டிகல் (Phytopharmaceutical)"
        },
        "Ayurveda-Aahar": {
            "Hindi": "आयुर्वेद आहार (Ayurveda-Aahar)",
            "Tamil": "ஆயுர்வேத ஆகாரம் (Ayurveda-Aahar)"
        },
        "Cosmetic": {
            "Hindi": "हर्बल प्रसाधन सामग्री (Cosmetic)",
            "Tamil": "மூலிகை அழகுசாதனம் (Cosmetic)"
        },
        "Patentability Score": {
            "Hindi": "पेटेंट योग्यता स्कोर",
            "Tamil": "காப்புரிமை சாத்தியக்கூறு மதிப்பீடு"
        },
        "TKDL Risk Score": {
            "Hindi": "पारंपरिक ज्ञान (TKDL) जोखिम स्कोर",
            "Tamil": "பாரம்பரிய அறிவு (TKDL) இடர் மதிப்பீடு"
        },
        "ABS Risk Score": {
            "Hindi": "जैव विविधता (ABS) अनुपालन जोखिम",
            "Tamil": "பல்லுயிர் (ABS) இணக்க இடர்"
        },
        "Commercialization Readiness Score": {
            "Hindi": "व्यावसायीकरण तैयारी स्कोर",
            "Tamil": "வணிகமயமாக்கல் தயார்நிலை மதிப்பீடு"
        },
        "Why this answer?": {
            "Hindi": "यह उत्तर क्यों? (नियामक तर्क)",
            "Tamil": "இந்த பதில் ஏன்? (ஒழுங்குமுறை காரணம்)"
        }
    }

    def localize_text(self, text: str, target_lang: str) -> str:
        lang = target_lang.capitalize()
        if lang in ["Hindi", "Tamil"]:
            if text in self.DICTIONARY and lang in self.DICTIONARY[text]:
                return self.DICTIONARY[text][lang]
        return text

multilingual_service = MultilingualService()
