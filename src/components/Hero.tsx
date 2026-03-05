import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Hero = () => {
    const { t } = useTranslation();
    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    return (
        <section className="min-h-screen flex flex-col justify-center relative px-6 lg:px-12 pt-20">
            <div className="container mx-auto">
                <div className="max-w-5xl">
                    <p className="text-sm uppercase tracking-widest text-muted-foreground mb-6 slide-in-left">
                        {t("hero.creative")}
                    </p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight text-foreground">
                        <span className="block stagger-1">{t("hero.title")}</span>
                        <span className="text-muted-foreground">
                            <span className="block stagger-2">{t("hero.subtitle1")}</span>
                            <span className="block stagger-3">{t("hero.subtitle2")}</span>
                            <span className="block stagger-4">{t("hero.subtitle3")}</span>
                        </span>
                    </h1>

                    {/* Decorative line */}
                    <div className="w-24 h-[2px] bg-foreground mt-10 mb-8 line-expand"></div>

                    <div className="fade-in-up-delay-3">
                        <Button
                            variant="outline"
                            size="lg"
                            className="group border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                            onClick={() => window.location.href = "mailto:hello@alessiosaulli.com"}
                        >
                            <span>{t("hero.button")}</span>
                            <ArrowDown
                                size={16}
                                className="ml-2 group-hover:translate-y-1 transition-transform"
                            />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <button
                onClick={scrollToContent}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
                aria-label="Scroll down"
            >
                <ArrowDown size={24} />
            </button>
        </section>
    );
};

export default Hero;

