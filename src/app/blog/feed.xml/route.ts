import { NextResponse } from "next/server";
import { getBlogPosts, getAuthors } from "@/lib/content";
import { BASE_URL } from "@/lib/config";

export const dynamic = "force-static";

export async function GET() {
    const posts = getBlogPosts();
    const authors = getAuthors();
    const now = new Date().toUTCString();

    const items = posts
        .map((post) => {
            const authorInfo = post.authors?.[0]
                ? authors[post.authors[0]]
                : null;
            const authorName = authorInfo?.name ?? "Kunanon Srisuntiroj";
            const pubDate = post.date ? new Date(post.date).toUTCString() : now;
            return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${authorName}</author>
      ${post.tags?.map((t) => `<category>${t}</category>`).join("\n      ") ?? ""}
      ${post.image ? `<enclosure url="${post.image}" type="image/jpeg" length="0"/>` : ""}
    </item>`;
        })
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kunanon Srisuntiroj — Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Thoughts on technology, software development, and life.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

    return new NextResponse(xml, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, s-maxage=3600",
        },
    });
}
