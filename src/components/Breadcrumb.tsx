"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const Breadcrumb: React.FC = () => {
    const pathname = usePathname();
    const t = useTranslations("common");
    const locales = ["en", "th", "zh"];
    const allSegments = pathname.split("/").filter((segment) => segment !== "");
    const localePrefix = locales.includes(allSegments[0])
        ? "/" + allSegments[0]
        : "";
    const pathSegments = allSegments.filter(
        (segment) => !locales.includes(segment),
    );

    const displayNameMap: { [key: string]: string } = {
        home: t("nav.home"),
        blog: t("nav.blog"),
        gallery: t("nav.gallery"),
        docs: t("nav.docs"),
        experience: t("nav.experience"),
        certifications: t("nav.certifications"),
        volunteering: t("nav.volunteering"),
        projects: t("nav.projects"),
        contact: t("nav.contact"),
        "privacy-policy": t("nav.privacy_policy"),
        "terms-of-service": t("nav.terms_of_service"),
    };

    return (
        <nav
            className="border-b border-rim bg-surface px-8 py-3 lg:px-16"
            aria-label="Breadcrumb"
        >
            <ol className="flex items-center gap-1 font-sans text-xs">
                <li>
                    <Link
                        href="/"
                        className="text-muted transition-colors duration-200 hover:text-accent"
                    >
                        {t("nav.home")}
                    </Link>
                </li>
                {pathSegments.map((segment, index) => {
                    const href =
                        localePrefix +
                        "/" +
                        pathSegments.slice(0, index + 1).join("/");
                    const isLast = index === pathSegments.length - 1;
                    const displayName =
                        displayNameMap[segment] ||
                        segment
                            .replace(/-/g, " ")
                            .split(" ")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(" ");

                    return (
                        <li
                            key={href}
                            className="flex items-center gap-1"
                            aria-current={isLast ? "page" : undefined}
                        >
                            <span className="text-muted/60">›</span>
                            {isLast ? (
                                <span className="text-text">
                                    {displayName}
                                </span>
                            ) : (
                                <Link
                                    href={href}
                                    className="text-muted transition-colors duration-200 hover:text-accent"
                                >
                                    {displayName}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
