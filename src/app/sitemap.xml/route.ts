import { NextResponse } from "next/server";
import { getBlogPosts, getAllSlugs } from "@/lib/content";

export const dynamic = "force-static";

const BASE_URL = "https://sagelga.com";
const LOCALES = ["en", "th", "zh"];

function langPrefix(lang: string) {
    return lang === "th" ? "" : `/${lang}`;
}

// basePath = path WITHOUT lang prefix (e.g. "/blog", "/blog/my-post")
function hreflangAlts(basePath: string) {
    return LOCALES.map(
        (l) =>
            `<xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}${langPrefix(l)}${basePath}"/>`,
    ).join("");
}

function urlEntry(
    loc: string,
    basePath: string,
    lastmod: string,
    priority: string,
    changefreq: string,
    includeHreflang = true,
) {
    return `  <url>
    <loc>${BASE_URL}${loc || "/"}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${includeHreflang ? hreflangAlts(basePath || "/") : ""}
  </url>`;
}

export async function GET() {
    const now = new Date().toISOString();
    const urls: string[] = [];

    // Routes with [lang] variants
    const i18nRoutes = [
        { path: "", priority: "1.0", changefreq: "daily" },
        { path: "/blog", priority: "0.9", changefreq: "weekly" },
        { path: "/docs", priority: "0.8", changefreq: "weekly" },
        { path: "/learn", priority: "0.8", changefreq: "weekly" },
        { path: "/gallery", priority: "0.6", changefreq: "monthly" },
        { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
        { path: "/terms-of-service", priority: "0.3", changefreq: "yearly" },
    ];

    for (const lang of LOCALES) {
        for (const route of i18nRoutes) {
            const loc = `${langPrefix(lang)}${route.path}` || "/";
            urls.push(
                urlEntry(loc, route.path || "/", now, route.priority, route.changefreq),
            );
        }
    }

    // Routes WITHOUT lang variants (not under [lang])
    const rootRoutes = [
        { path: "/home/certifications", priority: "0.5", changefreq: "monthly" },
        { path: "/home/experience", priority: "0.5", changefreq: "monthly" },
        { path: "/home/projects", priority: "0.5", changefreq: "monthly" },
        { path: "/home/volunteering", priority: "0.5", changefreq: "monthly" },
    ];

    for (const route of rootRoutes) {
        urls.push(urlEntry(route.path, route.path, now, route.priority, route.changefreq, false));
    }

    // Blog posts
    const posts = getBlogPosts();
    for (const post of posts) {
        const basePath = `/blog/${post.slug}`;
        const lastmod = post.date ? new Date(post.date).toISOString() : now;
        for (const lang of LOCALES) {
            const loc = `${langPrefix(lang)}${basePath}`;
            urls.push(urlEntry(loc, basePath, lastmod, "0.8", "monthly"));
        }
    }

    // Docs pages
    const docSlugs = getAllSlugs("docs");
    for (const slugParts of docSlugs) {
        const basePath = `/docs/${slugParts.join("/")}`;
        for (const lang of LOCALES) {
            const loc = `${langPrefix(lang)}${basePath}`;
            urls.push(urlEntry(loc, basePath, now, "0.6", "monthly"));
        }
    }

    // Learn pages
    const learnSlugs = getAllSlugs("learn");
    for (const slugParts of learnSlugs) {
        const basePath = `/learn/${slugParts.join("/")}`;
        for (const lang of LOCALES) {
            const loc = `${langPrefix(lang)}${basePath}`;
            urls.push(urlEntry(loc, basePath, now, "0.7", "monthly"));
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
