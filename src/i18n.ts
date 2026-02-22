import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: {
            "hero.title": "Alessio Saulli —",
            "hero.subtitle1": "Crafting digital",
            "hero.subtitle2": "experiences from",
            "hero.subtitle3": "Bari, Italy.",
            "hero.creative": "Multi-disciplinary Creative",
            "hero.button": "Let's Talk",
            "index.cta.title": "Have a project in mind?",
            "index.cta.text": "Let's collaborate and bring your vision to life with thoughtful design and clean code.",
            "index.cta.button": "Get in Touch",
            "footer.rights": "All rights reserved.",
            "nav.portfolio": "Portfolio",
            "nav.about": "About",
            "nav.services": "Services",
            "services.tag": "What I Do",
            "services.title": "Services",
            "services.web_design.title": "Web Design",
            "services.web_design.desc": "Creating beautiful, user-centered designs that prioritize simplicity and functionality. Every pixel serves a purpose.",
            "services.web_dev.title": "Web Development",
            "services.web_dev.desc": "Building fast, responsive, and accessible websites using modern technologies. Clean code that scales.",
            "services.graphic_design.title": "Graphic Design",
            "services.graphic_design.desc": "Crafting visual identities and brand materials that communicate clearly and leave lasting impressions.",
            "projects.tag": "Featured Work",
            "projects.title": "Selected Projects",
            "projects.view_all": "View All",
            "projects.view_all_projects": "View All Projects",
            "projects.ecommerce": "E-Commerce Platform",
            "projects.brand": "Brand Identity",
            "projects.mobile": "Mobile App UI",
        },
    },
    it: {
        translation: {
            "hero.title": "Alessio Saulli —",
            "hero.subtitle1": "Creazione di",
            "hero.subtitle2": "esperienze digitali",
            "hero.subtitle3": "da Bari, Italia.",
            "hero.creative": "Creativo Multidisciplinare",
            "hero.button": "Parliamo",
            "index.cta.title": "Hai un progetto in mente?",
            "index.cta.text": "Collaboriamo per dare vita alla tua visione con un design curato e codice pulito.",
            "index.cta.button": "Contattami",
            "footer.rights": "Tutti i diritti riservati.",
            "nav.portfolio": "Portfolio",
            "nav.about": "Chi sono",
            "nav.services": "Servizi",
            "services.tag": "Cosa Faccio",
            "services.title": "Servizi",
            "services.web_design.title": "Web Design",
            "services.web_design.desc": "Creazione di design splendidi e incentrati sull'utente che privilegiano semplicità e funzionalità. Ogni pixel ha uno scopo.",
            "services.web_dev.title": "Sviluppo Web",
            "services.web_dev.desc": "Costruzione di siti web veloci, reattivi e accessibili utilizzando tecnologie moderne. Codice pulito che scala.",
            "services.graphic_design.title": "Graphic Design",
            "services.graphic_design.desc": "Creazione di identità visive e materiali di marca che comunicano chiaramente e lasciano impressioni durature.",
            "projects.tag": "Lavori In Primo Piano",
            "projects.title": "Progetti Selezionati",
            "projects.view_all": "Vedi Tutti",
            "projects.view_all_projects": "Vedi Tutti i Progetti",
            "projects.ecommerce": "Piattaforma E-Commerce",
            "projects.brand": "Identità di Marca",
            "projects.mobile": "Interfaccia App Mobile",
        },
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
