import { useState } from "react";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import projectWeb1 from "@/assets/project-web-1.jpg";
import projectGraphic1 from "@/assets/project-graphic-1.jpg";
import projectWeb2 from "@/assets/project-web-2.jpg";

type FilterCategory = "all" | "web" | "graphic";

const projects = [
    {
        id: "1",
        title: "E-Commerce Platform",
        category: "Web Design",
        filter: "web" as const,
        image: projectWeb1,
        tools: ["React", "TypeScript", "Tailwind CSS", "Figma"],
    },
    {
        id: "2",
        title: "Brand Identity System",
        category: "Graphic Design",
        filter: "graphic" as const,
        image: projectGraphic1,
        tools: ["Adobe Illustrator", "Photoshop", "InDesign"],
    },
    {
        id: "3",
        title: "Mobile App UI",
        category: "Web Development",
        filter: "web" as const,
        image: projectWeb2,
        tools: ["React Native", "TypeScript", "Figma", "Node.js"],
    },
    {
        id: "4",
        title: "Corporate Website",
        category: "Web Design",
        filter: "web" as const,
        image: projectWeb1,
        tools: ["Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
        id: "5",
        title: "Logo Collection",
        category: "Graphic Design",
        filter: "graphic" as const,
        image: projectGraphic1,
        tools: ["Adobe Illustrator", "Photoshop"],
    },
    {
        id: "6",
        title: "SaaS Dashboard",
        category: "Web Development",
        filter: "web" as const,
        image: projectWeb2,
        tools: ["React", "TypeScript", "Supabase", "Recharts"],
    },
];

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

    const filters: { label: string; value: FilterCategory }[] = [
        { label: "All", value: "all" },
        { label: "Web", value: "web" },
        { label: "Graphic", value: "graphic" },
    ];

    const filteredProjects =
        activeFilter === "all"
            ? projects
            : projects.filter((project) => project.filter === activeFilter);

    return (
        <Layout>
            <section className="min-h-screen pt-32 pb-24 lg:pb-32 px-6 lg:px-12">
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="mb-16">
                        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4 fade-in-up">
                            Portfolio
                        </p>
                        <h1 className="text-5xl lg:text-7xl font-bold text-foreground fade-in-up-delay-1">
                            Selected Work
                        </h1>
                    </div>

                    {/* Filter */}
                    <div className="flex gap-8 mb-16 fade-in-up-delay-2">
                        {filters.map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => setActiveFilter(filter.value)}
                                className={`text-sm font-medium transition-all duration-300 link-underline ${
                                    activeFilter === filter.value
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-up-delay-3">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                {...project}
                                isLarge={index === 0 || index === 3}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Portfolio;
