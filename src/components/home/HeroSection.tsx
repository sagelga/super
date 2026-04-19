import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const HeroSection: React.FC = () => {
    const t = useTranslations("home");
    const nameParts = t("hero.name").split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    return (
        <section className="relative flex min-h-screen items-center overflow-hidden bg-canvas">
            {/* Decorative dot grid — right side */}
            <div
                className="pointer-events-none absolute top-0 right-0 h-full w-[55%]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(201,148,58,0.12) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />
            {/* Concentric rings */}
            <div className="pointer-events-none absolute top-1/2 right-16 hidden h-[32rem] w-[32rem] -translate-y-1/2 rounded-full border border-accent/10 lg:block" />
            <div className="pointer-events-none absolute top-1/2 right-32 hidden h-80 w-80 -translate-y-1/2 rounded-full border border-accent/15 lg:block" />
            <div className="pointer-events-none absolute top-1/2 right-48 hidden h-48 w-48 -translate-y-1/2 rounded-full border border-brand/25 lg:block" />
            {/* Accent orbit dot */}
            <div className="pointer-events-none absolute top-[calc(50%-16rem)] right-16 hidden h-3 w-3 rounded-full bg-brand/80 shadow-[0_0_14px_rgba(59,74,140,0.6)] lg:block" />
            <div className="pointer-events-none absolute top-[calc(50%+10rem)] right-[19.5rem] hidden h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(201,148,58,0.6)] lg:block" />

            <div className="container mx-auto px-8 pt-24 pb-20 lg:px-16">
                <div className="max-w-5xl">
                    {/* Multilingual greeting with trailing rule */}
                    <div className="enter enter-d1 mb-10 flex items-center gap-4">
                        <p className="font-display text-lg italic text-accent sm:text-xl">
                            {t("hero.greeting")}
                        </p>
                        <span className="grow-rule h-px w-16 flex-shrink-0 bg-accent/40" />
                    </div>

                    {/* Name — large display serif with amber terminator */}
                    <h1 className="enter enter-d2 font-display mb-12 text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.88] font-bold tracking-tight text-cream">
                        {firstName}
                        {lastName && (
                            <>
                                <br />
                                {lastName}
                            </>
                        )}
                        <span className="text-accent">.</span>
                    </h1>

                    {/* Italic serif tagline */}
                    <p className="enter-fade enter-d3 font-display mb-10 max-w-2xl text-xl leading-relaxed italic text-cream/85 sm:text-2xl">
                        {t("hero.tagline")}
                    </p>

                    {/* Disciplines */}
                    <p className="enter-fade enter-d4 mb-12 font-sans text-xs tracking-[0.32em] text-muted uppercase">
                        Salesforce · Full-Stack · Data · Teaching
                    </p>

                    {/* Primary + secondary CTA */}
                    <div className="enter enter-d5 flex flex-wrap items-center gap-2">
                        <Link
                            href="#projects"
                            className="group inline-flex items-center gap-3 rounded-sm bg-brand px-6 py-3 text-sm font-medium tracking-wide text-cream transition-colors duration-200 hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                            {t("hero.primary_cta")}
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                            >
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                        <Link
                            href="#about"
                            className="inline-flex items-center gap-3 rounded-sm px-6 py-3 text-sm font-medium tracking-wide text-cream transition-colors duration-200 hover:text-accent"
                        >
                            {t("hero.secondary_cta")}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="enter-fade enter-d6 absolute bottom-10 left-8 flex items-center gap-3 lg:left-16">
                <div className="h-14 w-px bg-gradient-to-b from-muted/60 to-transparent" />
                <span className="text-xs tracking-[0.3em] text-muted uppercase [writing-mode:vertical-rl]">
                    Scroll
                </span>
            </div>
        </section>
    );
};

export default HeroSection;
