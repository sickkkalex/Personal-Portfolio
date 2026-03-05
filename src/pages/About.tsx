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

const About = () => {
    const experience = [
        {
            period: "2026 — Presente",
            title: "UNIBA - Informatica",
            description: "Studente di Informatica presso l'Università degli Studi di Bari Aldo Moro.",
        },
        {
            period: "2023 — Presente",
            title: "Web Designer/Sviluppatore",
            description: "Progettazione e sviluppo di siti web per clienti come freelance.",
        },
        {
            period: "2021-2026",
            title: "Scuola Superiore - Informatica",
            description: "Studio di informatica e materie tecnologiche, realizzazione di progetti ed esami.",
        },
        {
            period: "2018-2020",
            title: "Graphic Designer per 'Oxygen', eSport",
            description: "Progettazione di grafiche personalizzate e layout per pagine social e giocatori.",
        },
    ];

    return (
        <Layout>
            <section className="min-h-screen pt-32 pb-24 lg:pb-32 px-6 lg:px-12">
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="mb-16">
                        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4 fade-in-up">
                            Chi Sono
                        </p>
                        <h1 className="text-5xl lg:text-7xl font-bold text-foreground fade-in-up-delay-1">
                            La Storia
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
                                Il meno è più.
                            </h2>
                            <div className="space-y-6 text-muted-foreground leading-relaxed">
                                <p>Sono Alessio Saulli, un creativo multidisciplinare con base a Bari, Italia, con la missione di rendere il mondo digitale meno complicato e molto più bello.</p>
                                <p>Con oltre 5 anni di esperienza tra web design, sviluppo e grafica, prospero all'intersezione tra codice logico ed estetica pixel-perfect. La mia filosofia è semplice: il grande design dovrebbe essere invisibile. Credo che un prodotto funzioni davvero solo quando l'utente non deve fermarsi a pensare a come usarlo. Per me, il minimalismo non è solo un'estetica—è una strategia per superare il rumore e fornire risultati.</p>
                                <p>Mi piace collaborare con aziende orientate al futuro e guidate dalla tecnologia che vedono l'innovazione come un'opportunità piuttosto che un problema. Quando non sto ottimizzando linee di codice o perfezionando layout, mi troverai a catturare la costa pugliese attraverso il mio obiettivo o a immergermi nella teoria del design. O, più probabilmente, a capire come rendere la mia prossima sfida creativa completamente fluida.</p>
                            </div>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="mb-24">
                        <h2 className="text-2xl font-bold mb-8 text-foreground">
                            Capacità e Strumenti
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
                            Esperienza
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
