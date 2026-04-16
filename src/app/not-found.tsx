import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import GameSection from "@/components/games/GameSection";

export default async function NotFound() {
    const locale = await getLocale();
    const t = await getTranslations({ locale, namespace: "common" });
    const homeHref = locale === "th" ? "/" : `/${locale}`;

    return (
        <div className="container mx-auto px-8 py-20 lg:px-16">
            {/* Section marker */}
            <p className="enter enter-fade mb-8 select-none font-serif text-[11px] uppercase tracking-[0.28em] text-muted/50">
                § Error
            </p>

            {/* 404 numeral — large amber serif anchor */}
            <div className="enter enter-d1 overflow-hidden">
                <p
                    aria-hidden="true"
                    className="select-none font-serif leading-[0.88] tracking-[-0.02em] text-accent"
                    style={{ fontSize: "clamp(6rem, 20vw, 11rem)" }}
                >
                    404
                </p>
            </div>

            {/* Animated rule with title embedded */}
            <div className="mt-4 mb-10 flex items-center gap-4">
                <div className="grow-rule h-px flex-1 bg-rim" />
                <span className="enter enter-d2 shrink-0 font-sans text-[10px] uppercase tracking-[0.32em] text-muted/45">
                    {t("not_found.title")}
                </span>
                <div className="h-px w-10 bg-accent/20" />
            </div>

            {/* Description + back link */}
            <div className="max-w-sm">
                <p className="enter enter-d3 font-sans text-sm leading-relaxed text-muted">
                    {t("not_found.description")}
                </p>

                <Link
                    href={homeHref}
                    className="group enter enter-d4 mt-7 inline-flex items-center gap-2 font-sans text-sm text-accent transition-colors duration-150 hover:text-cream"
                >
                    <span className="transition-transform duration-150 group-hover:-translate-x-0.5">
                        ←
                    </span>
                    <span>{t("not_found.go_home")}</span>
                </Link>
            </div>

            {/* Games section */}
            <div className="enter enter-d5 mt-20">
                <div className="mb-8 flex items-center gap-3">
                    <div className="h-px w-5 bg-accent/30" />
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-muted/50">
                        {t("games.eyebrow")}
                    </p>
                    <div className="h-px flex-1 bg-rim" />
                </div>
                <GameSection />
            </div>
        </div>
    );
}
