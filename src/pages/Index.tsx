import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FeaturedWork from "@/components/FeaturedWork";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Index = () => {
    const { t } = useTranslation();
    return (
        <Layout>
            <Hero />
            <Services />
            <FeaturedWork />

            {/* CTA Section */}
            <section className="py-24 lg:py-32 border-t border-border bg-background">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground">
                        {t("index.cta.title")}
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        {t("index.cta.text")}
                    </p>
                    <Button
                        variant="default"
                        size="lg"
                        className="group bg-foreground text-background hover:bg-foreground/90"
                        onClick={() =>
                            (window.location.href = "mailto:hello@alessiosaulli.com")
                        }
                    >
                        <span>{t("index.cta.button")}</span>
                        <ArrowRight
                            size={16}
                            className="ml-2 group-hover:translate-x-1 transition-transform"
                        />
                    </Button>
                </div>
            </section>
        </Layout>
    );
};

export default Index;
