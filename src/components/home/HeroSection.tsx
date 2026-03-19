import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

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
            {/* Decorative rings */}
            <div className="absolute top-1/2 right-20 hidden h-72 w-72 -translate-y-1/2 rounded-full border border-brand/20 lg:block" />
            <div className="absolute top-1/2 right-32 hidden h-48 w-48 -translate-y-1/2 rounded-full border border-accent/10 lg:block" />

            <div className="container mx-auto px-8 pt-24 pb-20 lg:px-16">
                <div className="max-w-5xl">
                    {/* Label */}
                    <p className="enter enter-d1 mb-6 font-mono text-xs tracking-[0.35em] text-accent uppercase">
                        Portfolio · sagelga.com
                    </p>

                    {/* Name — large display serif */}
                    <h1 className="enter enter-d2 font-display mb-14 text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.88] font-bold tracking-tight text-cream">
                        {nameParts[0]}
                        <br />
                        <span className="text-muted">
                            {nameParts.slice(1).join(" ")}
                        </span>
                    </h1>

                    {/* Role with amber rule */}
                    <div className="enter enter-d3 mb-5 flex items-center gap-4">
                        <span className="grow-rule h-px w-10 flex-shrink-0 bg-accent" />
                        <p className="text-lg tracking-wide text-cream">
                            {t("hero.title")}
                        </p>
                    </div>

                    {/* Disciplines */}
                    <p className="enter-fade enter-d4 mb-16 font-mono text-sm tracking-widest text-muted">
                        Salesforce · Full-Stack · Data · Teaching
                    </p>

                    {/* Social links */}
                    <div className="enter enter-d5 flex flex-wrap gap-8">
                        <Link
                            href="https://www.linkedin.com/in/kunanon/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-accent"
                        >
                            <i className="devicon-linkedin-plain text-base transition-colors group-hover:text-accent" />
                            LinkedIn
                            <span className="text-xs opacity-50 transition-opacity group-hover:opacity-100">
                                ↗
                            </span>
                        </Link>
                        <Link
                            href="https://github.com/sagelga"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-accent"
                        >
                            <i className="devicon-github-plain text-base transition-colors group-hover:text-accent" />
                            GitHub
                            <span className="text-xs opacity-50 transition-opacity group-hover:opacity-100">
                                ↗
                            </span>
                        </Link>
                        <Link
                            href="https://www.salesforce.com/trailblazer/sagelga"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-accent"
                        >
                            <i className="devicon-salesforce-plain text-base transition-colors group-hover:text-accent" />
                            Trailblazer
                            <span className="text-xs opacity-50 transition-opacity group-hover:opacity-100">
                                ↗
                            </span>
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
