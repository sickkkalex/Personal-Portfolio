import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "it" : "en";
        i18n.changeLanguage(newLang);
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-sm font-medium hover:bg-transparent hover:text-foreground transition-colors"
        >
            {i18n.language === "en" ? "IT" : "EN"}
        </Button>
    );
};

export default LanguageSwitcher;
