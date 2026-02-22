import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import projectWeb1 from "@/assets/project-web-1.jpg";
import projectGraphic1 from "@/assets/project-graphic-1.jpg";
import projectWeb2 from "@/assets/project-web-2.jpg";

const FeaturedWork = () => {
    const { t } = useTranslation();

    const featuredProjects = [
        {
            id: "1",
            title: t("projects.ecommerce"),
            category: t("services.web_design.title"),
            image: projectWeb1,
        },
        {
            id: "2",
            title: t("projects.brand"),
            category: t("services.graphic_design.title"),
            image: projectGraphic1,
        },
        {
            id: "3",
            title: t("projects.mobile"),
            category: t("services.web_dev.title"),
            image: projectWeb2,
        },
    ];

    return (
        <section className="py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex items-end justify-between mb-16">
                    <div>
                        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                            {t("projects.tag")}
                        </p>
                        <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                            {t("projects.title")}
                        </h2>
                    </div>
                    <Link
                        to="/portfolio"
                        className="hidden md:flex items-center gap-2 text-foreground hover:opacity-70 transition-opacity group"
                    >
                        <span className="text-sm font-medium">{t("projects.view_all")}</span>
                        <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </Link>
                </div>

                <div className="space-y-8">
                    {featuredProjects.map((project, index) => (
                        <Link
                            key={project.id}
                            to={`/portfolio/${project.id}`}
                            className="group block"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="relative overflow-hidden aspect-[16/9] lg:aspect-[21/9] image-reveal">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/70 transition-all duration-500 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                                        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                                            {project.category}
                                        </p>
                                        <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                                            {project.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <Link
                    to="/portfolio"
                    className="md:hidden flex items-center justify-center gap-2 text-foreground mt-12 hover:opacity-70 transition-opacity group"
                >
                    <span className="text-sm font-medium">{t("projects.view_all_projects")}</span>
                    <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                    />
                </Link>
            </div>
        </section>
    );
};

export default FeaturedWork;
