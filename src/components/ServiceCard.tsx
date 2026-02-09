import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
    return (
        <div className="group p-8 border border-border bg-background hover:bg-secondary/50 transition-all duration-300 hover-lift">
            <div className="mb-6">
                <Icon
                    size={32}
                    strokeWidth={1.5}
                    className="text-foreground group-hover:scale-110 transition-transform duration-300"
                />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default ServiceCard;
