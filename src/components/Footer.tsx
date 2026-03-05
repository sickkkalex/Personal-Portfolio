import { Github, Linkedin, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation();

    const socialLinks = [
        { icon: Linkedin, href: "https://www.linkedin.com/in/alessio-saulli-07b189399/?originalSubdomain=it", label: "LinkedIn" },
        { icon: Github, href: "https://github.com/saullialessio", label: "GitHub" },
        { icon: Instagram, href: "https://www.instagram.com/alexssdesign_", label: "Instagram" },
    ];

    return (
        <footer className="border-t border-border bg-background">
            <div className="container mx-auto px-6 lg:px-12 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Copyright */}
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} Alessio Saulli. {t("footer.rights")}
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-6">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                                aria-label={social.label}
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
