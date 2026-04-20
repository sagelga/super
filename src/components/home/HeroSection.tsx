import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import HeroScrollIndicator from "./HeroScrollIndicator";

const HeroSection: React.FC = () => {
    const t = useTranslations("home");
    const nameParts = t("hero.name").split(" ");

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
            {/* Outer ring — brand-blue dot orbits clockwise */}
            <div className="pointer-events-none absolute top-1/2 right-16 hidden h-[32rem] w-[32rem] -translate-y-1/2 lg:block">
                <div className="orbit-cw relative h-full w-full rounded-full border border-accent/10">
                    <span className="absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/80 shadow-[0_0_14px_rgba(59,74,140,0.6)]" />
                </div>
            </div>
            {/* Middle ring — static */}
            <div className="pointer-events-none absolute top-1/2 right-32 hidden h-80 w-80 -translate-y-1/2 rounded-full border border-accent/15 lg:block" />
            {/* Inner ring — amber dot orbits counter-clockwise */}
            <div className="pointer-events-none absolute top-1/2 right-48 hidden h-48 w-48 -translate-y-1/2 lg:block">
                <div className="orbit-ccw relative h-full w-full rounded-full border border-brand/25">
                    <span className="absolute top-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(201,148,58,0.6)]" />
                </div>
            </div>

            <div className="container mx-auto px-8 pt-24 pb-20 lg:px-16">
                <div className="max-w-5xl">
                    {/* Eyebrow with signature amber rule growing in beside it */}
                    <div className="enter enter-d1 mb-6 flex items-center gap-4">
                        <span className="eyebrow tracking-[0.25em]">
                            Portfolio
                        </span>
                        <span className="grow-rule h-px w-[60px] flex-shrink-0 bg-accent/60" />
                    </div>

                    {/* Name — large display serif, with amber period flourish */}
                    <h1 className="enter enter-d2 font-display mb-10 text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.88] font-bold tracking-tight text-cream">
                        {nameParts[0]}
                        <br />
                        <span className="text-muted">
                            {nameParts.slice(1).join(" ")}
                        </span>
                        <span className="text-accent">.</span>
                    </h1>

                    {/* Role — serif italic, muted-readable for AA contrast */}
                    <p className="enter enter-d3 mb-4 font-serif text-xl text-muted-readable italic lg:text-2xl">
                        {t("hero.title")}
                    </p>

                    {/* Disciplines — middot separators, tracked */}
                    <p className="enter-fade enter-d4 mb-16 font-sans text-sm tracking-[0.2em] text-muted uppercase">
                        Salesforce · Full-Stack · Data · Teaching
                    </p>

                    {/* Primary + secondary CTA */}
                    <div className="enter enter-d5 flex flex-wrap items-center gap-2">
                        <Link
                            href="#projects"
                            className="group hover:bg-brand-700 inline-flex items-center gap-3 rounded-sm bg-brand px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
                            className="inline-flex items-center gap-3 rounded-sm border border-cream/30 px-6 py-3 text-sm font-medium tracking-wide text-cream transition-colors duration-200 hover:border-accent hover:text-accent"
                        >
                            {t("hero.secondary_cta")}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <HeroScrollIndicator />
        </section>
    );
};

export default HeroSection;
