import { NextResponse } from "next/server";
import { getBlogPosts, getAllSlugs } from "@/lib/content";

export const dynamic = "force-static";

const BASE_URL = "https://sagelga.com";
const LOCALES = ["en", "th", "zh"];

function langPrefix(lang: string) {
    return lang === "th" ? "" : `/${lang}`;
}

function hreflangAlts(path: string) {
    return LOCALES.map(
        (l) =>
            `<xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}${langPrefix(l)}${path}"/>`,
    ).join("");
}

function urlEntry(
    path: string,
    lastmod: string,
    priority: string,
    changefreq: string,
) {
    return `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${hreflangAlts(path)}
  </url>`;
}

export async function GET() {
    const now = new Date().toISOString();
    const urls: string[] = [];

    // Static routes
    const staticRoutes = [
        { path: "", priority: "1.0", changefreq: "daily" },
        { path: "/blog", priority: "0.9", changefreq: "weekly" },
        { path: "/docs", priority: "0.8", changefreq: "weekly" },
        { path: "/learn", priority: "0.8", changefreq: "weekly" },
        {
            path: "/home/certifications",
            priority: "0.6",
            changefreq: "monthly",
        },
        { path: "/home/experience", priority: "0.6", changefreq: "monthly" },
        { path: "/home/projects", priority: "0.6", changefreq: "monthly" },
        { path: "/home/volunteering", priority: "0.6", changefreq: "monthly" },
    ];

    for (const lang of LOCALES) {
        for (const route of staticRoutes) {
            const path = `${langPrefix(lang)}${route.path}`;
            urls.push(
                urlEntry(path || "/", now, route.priority, route.changefreq),
            );
        }
    }

    // Blog posts
    const posts = getBlogPosts();
    for (const post of posts) {
        for (const lang of LOCALES) {
            const path = `${langPrefix(lang)}/blog/${post.slug}`;
            const lastmod = post.date ? new Date(post.date).toISOString() : now;
            urls.push(urlEntry(path, lastmod, "0.8", "monthly"));
        }
    }

    // Docs pages
    const docSlugs = getAllSlugs("docs");
    for (const slugParts of docSlugs) {
        const path = `/docs/${slugParts.join("/")}`;
        for (const lang of LOCALES) {
            const langPath = `${langPrefix(lang)}${path}`;
            urls.push(urlEntry(langPath, now, "0.6", "monthly"));
        }
    }

    // Learn pages
    const learnSlugs = getAllSlugs("learn");
    for (const slugParts of learnSlugs) {
        const path = `/learn/${slugParts.join("/")}`;
        for (const lang of LOCALES) {
            const langPath = `${langPrefix(lang)}${path}`;
            urls.push(urlEntry(langPath, now, "0.7", "monthly"));
        }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, s-maxage=3600",
        },
    });
}
