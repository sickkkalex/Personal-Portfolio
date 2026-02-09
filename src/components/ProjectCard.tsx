import { Link } from "react-router-dom";

interface ProjectCardProps {
    id: string;
    title: string;
    category: string;
    image: string;
    tools?: string[];
    isLarge?: boolean;
}

const ProjectCard = ({ id, title, category, image, tools = [], isLarge = false }: ProjectCardProps) => {
    return (
        <Link
            to={`/portfolio/${id}`}
            className={`group block overflow-hidden bg-secondary ${
                isLarge ? "aspect-[4/3]" : "aspect-square"
            }`}
        >
            <div className="relative w-full h-full image-reveal">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/90 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-6">
                        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                            {category}
                        </p>
                        <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
                        {tools.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                                {tools.map((tool) => (
                                    <span
                                        key={tool}
                                        className="text-xs px-3 py-1 border border-border text-muted-foreground"
                                    >
                    {tool}
                  </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
