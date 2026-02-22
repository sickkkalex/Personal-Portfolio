import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import portraitImage from "@/assets/me.jpg";

const skills = [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Figma",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Java", "C++", "Python", "Framer",
    "Node.js",
];

const About = () => {
    const { t } = useTranslation();

    const experience = [
        {
            period: t("about.exp1_period"),
            title: t("about.exp1_title"),
            description: t("about.exp1_desc"),
        },
        {
            period: t("about.exp2_period"),
            title: t("about.exp2_title"),
            description: t("about.exp2_desc"),
        },
        {
            period: t("about.exp3_period"),
            title: t("about.exp3_title"),
            description: t("about.exp3_desc"),
        },
        {
            period: t("about.exp4_period"),
            title: t("about.exp4_title"),
            description: t("about.exp4_desc"),
        },
    ];

    return (
        <Layout>
            <section className="min-h-screen pt-32 pb-24 lg:pb-32 px-6 lg:px-12">
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="mb-16">
                        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4 fade-in-up">
                            {t("about.tag")}
                        </p>
                        <h1 className="text-5xl lg:text-7xl font-bold text-foreground fade-in-up-delay-1">
                            {t("about.title")}
                        </h1>
                    </div>

                    {/* Bio Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
                        {/* Portrait */}
                        <div className="fade-in-up-delay-2">
                            <div className="aspect-[3/4] overflow-hidden">
                                <img
                                    src={portraitImage}
                                    alt="Alessio Saulli"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>

                        {/* Bio Text */}
                        <div className="flex flex-col justify-center fade-in-up-delay-3">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
                                {t("about.motto")}
                            </h2>
                            <div className="space-y-6 text-muted-foreground leading-relaxed">
                                <p>{t("about.bio_p1")}</p>
                                <p>{t("about.bio_p2")}</p>
                                <p>{t("about.bio_p3")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="mb-24">
                        <h2 className="text-2xl font-bold mb-8 text-foreground">
                            {t("about.skills_title")}
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill) => (
                                <Badge
                                    key={skill}
                                    variant="outline"
                                    className="px-4 py-2 text-sm font-medium border-border text-foreground hover:bg-secondary transition-colors"
                                >
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-8 text-foreground">
                            {t("about.exp_title")}
                        </h2>
                        <div className="space-y-0">
                            {experience.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 py-8 border-t border-border"
                                >
                                    <p className="text-sm text-muted-foreground font-medium">
                                        {item.period}
                                    </p>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-foreground">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default About;
