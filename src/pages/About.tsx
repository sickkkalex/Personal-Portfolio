import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
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

const experience = [
    {
        period: "2026 — Present",
        title: "UNIBA - IT",
        description:
            "Studying IT at the University Aldo Moro in Bari.",
    },
    {
        period: "2023 — Present",
        title: "Web Designer/Developer",
        description:
            "Designing and developing websites for clients as a freelancer.",
    },
    {
        period: "2021-2026",
        title: "Secondary School - IT Science",
        description:
            "Studying IT and technological subject at school and doing projects and exames.",
    },
    {
        period: "2018-2020",
        title: "Graphic Designer for 'Oxygen', a Gaming eSport",
        description:
            "Designing custom graphics and layouts for the social media pages and players. ",
    },
];

const About = () => {
    return (
        <Layout>
            <section className="min-h-screen pt-32 pb-24 lg:pb-32 px-6 lg:px-12">
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="mb-16">
                        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4 fade-in-up">
                            About
                        </p>
                        <h1 className="text-5xl lg:text-7xl font-bold text-foreground fade-in-up-delay-1">
                            The Story
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
                                Less is more.
                            </h2>
                            <div className="space-y-6 text-muted-foreground leading-relaxed">
                                <p>
                                    I’m Alessio Saulli, a multi-disciplinary creative based in Bari, Italy,
                                    on a mission to make the digital world less complicated and a lot more beautiful.
                                </p>
                                <p>
                                    With over 5 years of experience spanning web design, development, and graphics,
                                    I thrive at the intersection of logical code and pixel-perfect aesthetics.
                                    My philosophy is simple: great design should be invisible.
                                    I believe a product truly works only when the user doesn’t have to stop
                                    and think about how to use it. To me, minimalism isn’t just an aesthetic
                                    it’s a strategy to cut through the noise and deliver results.
                                </p>
                                <p>
                                    I enjoy collaborating with forward-thinking, tech-driven companies
                                    that view innovation as an opportunity rather than a headache.
                                    When I’m not optimizing lines of code or refining layouts,
                                    you’ll find me capturing the Apulian coastline through my lens or diving into design theory.
                                    Or, more likely, figuring out how to make my next creative challenge feel completely seamless.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="mb-24">
                        <h2 className="text-2xl font-bold mb-8 text-foreground">
                            Skills & Tools
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
                            Experience
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
