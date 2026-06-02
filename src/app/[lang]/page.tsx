import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "../../components/home/HeroSection";
import AboutMe from "../../components/home/AboutMe";
import SkillsList from "../../components/home/SkillsList";
import ProjectShowcase from "../../components/home/ProjectShowcase";
import ExperienceSection from "../../components/home/ExperienceSection";
import CertificationsSection from "../../components/home/CertificationsSection";
import VolunteeringSection from "../../components/home/VolunteeringSection";
import BlogPreviewSection from "../../components/home/BlogPreviewSection";
import GalleryPreviewSection from "../../components/home/GalleryPreviewSection";
import LearnPreviewSection from "../../components/home/LearnPreviewSection";
import SectionSkeleton from "../../components/common/SectionSkeleton";
import { getBlogPosts } from "../../lib/content";
import { getLearnTopics } from "../../lib/content";
import { getDocProjects } from "../../lib/content";
import { GALLERY_ITEMS } from "../../data/galleryItems";
import { BASE_URL } from "@/lib/config";
const LOCALES = ["en", "th", "zh"] as const;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const t = await getTranslations({ locale: lang, namespace: "metadata" });
    const canonical = lang === "th" ? BASE_URL : `${BASE_URL}/${lang}`;
    const title = t("title");
    const description = t("description");

    return {
        title,
        description,
        alternates: {
            canonical,
            languages: Object.fromEntries(
                LOCALES.map((l) => [
                    l,
                    l === "th" ? BASE_URL : `${BASE_URL}/${l}`,
                ]),
            ),
        },
        openGraph: {
            type: "website",
            url: canonical,
            title,
            description,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

async function BlogPreviewSkeleton() {
    const posts = (await getBlogPosts()).slice(0, 3);
    return <BlogPreviewSection posts={posts} />;
}

async function LearnPreviewSkeleton() {
    const topics = await getLearnTopics();
    return <LearnPreviewSection topics={topics} />;
}

async function ProjectShowcaseSkeleton() {
    const t = await getTranslations("home");
    const projects = t.raw("projects") as Array<{
        title: string;
        description: string;
        stack?: string[];
        githubLink?: string;
        demoLink?: string;
        docsSlug?: string;
    }>;
    const docProjects = (await getDocProjects()).sort(
        (a, b) => b.pageCount - a.pageCount,
    );
    return <ProjectShowcase projects={projects} docProjects={docProjects} />;
}

export default async function Home() {
    const galleryItems = GALLERY_ITEMS.slice(0, 6);

    return (
        <main>
            <HeroSection />
            <AboutMe />
            <SkillsList />
            <Suspense fallback={<SectionSkeleton variant="generous" />}>
                <ProjectShowcaseSkeleton />
            </Suspense>
            <ExperienceSection />
            <CertificationsSection />
            <VolunteeringSection />
            <Suspense fallback={<SectionSkeleton variant="generous" />}>
                <BlogPreviewSkeleton />
            </Suspense>
            <GalleryPreviewSection items={galleryItems} />
            <Suspense fallback={<SectionSkeleton variant="generous" />}>
                <LearnPreviewSkeleton />
            </Suspense>
        </main>
    );
}
