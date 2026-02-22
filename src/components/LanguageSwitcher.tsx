import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language.startsWith("en") ? "it" : "en";
        i18n.changeLanguage(newLang);
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
            aria-label="Toggle language"
        >
            <Languages size={18} />
            <span className="uppercase">{i18n.language.split("-")[0] === "en" ? "IT" : "EN"}</span>
        </Button>
    );
};

export default LanguageSwitcher;
