import { Palette, Code, PenTool } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { useTranslation } from "react-i18next";

const Services = () => {
    const { t } = useTranslation();

    const services = [
        {
            icon: Palette,
            title: t("services.web_design.title"),
            description: t("services.web_design.desc"),
        },
        {
            icon: Code,
            title: t("services.web_dev.title"),
            description: t("services.web_dev.desc"),
        },
        {
            icon: PenTool,
            title: t("services.graphic_design.title"),
            description: t("services.graphic_design.desc"),
        },
    ];

    return (
        <section className="py-24 lg:py-32 border-t border-border bg-background">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="mb-16">
                    <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                        {t("services.tag")}
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                        {t("services.title")}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
                    {services.map((service, index) => (
                        <div
                            key={service.title}
                            className="fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <ServiceCard {...service} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
