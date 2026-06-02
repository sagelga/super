import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Section from "../common/Section";
import RevealOnScroll from "../common/RevealOnScroll";
import {
    AwardIcon,
    BookOpenIcon,
    GraduationCapIcon,
    SnowflakeIcon,
} from "../icons";
import "@/styles/devicons.css";

interface CertificationItem {
    title: string;
    issuer?: string;
    date?: string;
    url?: string;
    skills: string[];
}

type IssuerIcon =
    | { kind: "devicon"; className: string }
    | { kind: "lucide"; Component: React.ComponentType<{ size?: number }> };

interface Issuer {
    name: string;
    icon: IssuerIcon;
}

const inferIssuer = (cert: CertificationItem): Issuer => {
    const t = (cert.issuer ?? cert.title).toLowerCase();
    if (t.includes("aws") || t.includes("amazon"))
        return {
            name: "AWS",
            icon: {
                kind: "devicon",
                className: "devicon-amazonwebservices-plain",
            },
        };
    if (t.includes("google cloud") || t.includes("gcp"))
        return {
            name: "Google Cloud",
            icon: { kind: "devicon", className: "devicon-googlecloud-plain" },
        };
    if (t.includes("snowflake") || t.includes("data warehousing"))
        return {
            name: "Snowflake",
            icon: { kind: "lucide", Component: SnowflakeIcon },
        };
    if (
        t.includes("salesforce") ||
        t.includes("superbadge") ||
        t.includes("lightning") ||
        t.includes("marketing cloud") ||
        t.includes("flow ")
    )
        return {
            name: "Salesforce",
            icon: { kind: "devicon", className: "devicon-salesforce-plain" },
        };
    if (t.includes("databases for developers") || t.includes("oracle"))
        return {
            name: "Oracle Dev Gym",
            icon: { kind: "devicon", className: "devicon-oracle-plain" },
        };
    if (
        t.includes("mern") ||
        t.includes("react -") ||
        t.includes("complete guide") ||
        t.includes("complete salesforce certified")
    )
        return {
            name: "Udemy",
            icon: { kind: "lucide", Component: GraduationCapIcon },
        };
    if (t.includes("prompt engineering") || t.includes("generative ai"))
        return {
            name: "Coursera",
            icon: { kind: "lucide", Component: BookOpenIcon },
        };
    return {
        name: cert.issuer ?? "Certification",
        icon: { kind: "lucide", Component: AwardIcon },
    };
};

const IssuerSeal: React.FC<{ issuer: Issuer }> = ({ issuer }) => (
    <div
        aria-hidden="true"
        className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/5 text-accent transition-colors duration-200 group-hover:border-accent/70 group-hover:bg-accent/10"
    >
        {issuer.icon.kind === "devicon" ? (
            <i
                className={`${issuer.icon.className} text-[18px] leading-none`}
                style={{ color: "var(--color-accent)" }}
            />
        ) : (
            <issuer.icon.Component size={18} />
        )}
    </div>
);

const CertificationCard: React.FC<{
    cert: CertificationItem;
    issuedLabel: string;
}> = ({ cert, issuedLabel }) => {
    const issuer = inferIssuer(cert);

    const titleNode = (
        <h3 className="font-display text-[15px] leading-snug font-medium text-text transition-colors duration-200 group-hover:text-accent">
            {cert.title}
        </h3>
    );

    return (
        <div className="group relative bg-surface p-6 transition-colors duration-200 hover:bg-canvas">
            {/* amber corner flourish */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 h-10 w-10 bg-gradient-to-bl from-accent/15 to-transparent opacity-70 transition-opacity duration-200 group-hover:opacity-100"
            />
            {/* amber hairline top */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 h-px w-0 bg-accent/0 transition-all duration-300 group-hover:w-10 group-hover:bg-accent/60"
            />

            <div className="mb-4 flex items-start gap-3">
                <IssuerSeal issuer={issuer} />
                <div className="min-w-0 flex-1">
                    {cert.url ? (
                        <Link
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {titleNode}
                        </Link>
                    ) : (
                        titleNode
                    )}
                    <p className="mt-1.5 font-sans text-[10px] font-semibold tracking-[0.18em] text-accent/70 uppercase">
                        {issuer.name}
                        {cert.date && (
                            <span className="ml-2 font-normal tracking-normal text-muted-readable normal-case">
                                · {issuedLabel} {cert.date}
                            </span>
                        )}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill, i) => (
                    <span
                        key={i}
                        className="border border-rim px-2 py-0.5 font-sans text-xs text-muted transition-colors duration-200 group-hover:border-accent/30"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

const CertificationsSection: React.FC = async () => {
    const t = await getTranslations("home");
    const certifications = t.raw("certifications") as CertificationItem[];

    return (
        <Section
            id="certifications"
            title={t("certifications_section_title")}
            subtitle={`${certifications.length}`}
            headingVariant="minimal"
            spacing="compact"
        >
            <RevealOnScroll
                stagger
                className="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-rim md:grid-cols-2 lg:grid-cols-3"
            >
                {certifications.map((cert, index) => (
                    <CertificationCard
                        key={index}
                        cert={cert}
                        issuedLabel={t("issued_label")}
                    />
                ))}
            </RevealOnScroll>
        </Section>
    );
};

export default CertificationsSection;
