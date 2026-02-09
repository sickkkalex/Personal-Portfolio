import { Palette, Code, PenTool } from "lucide-react";
import ServiceCard from "./ServiceCard";

const services = [
    {
        icon: Palette,
        title: "Web Design",
        description:
            "Creating beautiful, user-centered designs that prioritize simplicity and functionality. Every pixel serves a purpose.",
    },
    {
        icon: Code,
        title: "Web Development",
        description:
            "Building fast, responsive, and accessible websites using modern technologies. Clean code that scales.",
    },
    {
        icon: PenTool,
        title: "Graphic Design",
        description:
            "Crafting visual identities and brand materials that communicate clearly and leave lasting impressions.",
    },
];

const Services = () => {
    return (
        <section className="py-24 lg:py-32 border-t border-border bg-background">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="mb-16">
                    <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                        What I Do
                    </p>
                    <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                        Services
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
