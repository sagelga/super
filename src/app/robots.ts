import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/admin/"],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: ["/api/", "/admin/"],
            },
            {
                userAgent: "GPTBot",
                allow: "/",
                disallow: ["/api/", "/admin/"],
            },
            {
                userAgent: "ChatGPT-User",
                allow: "/",
                disallow: ["/api/", "/admin/"],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    };
}
