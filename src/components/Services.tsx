import { Palette, Code, PenTool } from "lucide-react";
import ServiceCard from "./ServiceCard";

const Services = () => {
    const services = [
        {
            icon: Palette,
            title: "Web Design",
            description: "Creazione di design splendidi e incentrati sull'utente che privilegiano semplicità e funzionalità. Ogni pixel ha uno scopo.",
        },
        {
            icon: Code,
            title: "Sviluppo Web",
            description: "Costruzione di siti web veloci, reattivi e accessibili utilizzando tecnologie moderne. Codice pulito che scala.",
        },
        {
            icon: PenTool,
            title: "Graphic Design",
            description: "Creazione di identità visive e materiali di marca che comunicano chiaramente e lasciano impressioni durature.",
        },
    ];

    return (
        <section className="py-24 lg:py-32 border-t border-border bg-background">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="mb-16">
                    <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                        Cosa Faccio
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                        Servizi
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
