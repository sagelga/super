import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const EXTERNAL_REDIRECTS: Record<string, string> = {
    // blog, docs, learn are now served locally
};

const intlMiddleware = createMiddleware({
    locales: ["en", "th", "zh"],
    defaultLocale: "th",
    localePrefix: "as-needed",
    localeDetection: false,
});

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Strip locale prefix (e.g. /en/blog → /blog)
    const strippedPath = pathname.replace(/^\/(en|th|zh)/, "");

    for (const [prefix, destination] of Object.entries(EXTERNAL_REDIRECTS)) {
        if (strippedPath === prefix || strippedPath.startsWith(prefix + "/")) {
            const rest = strippedPath.slice(prefix.length);
            if (rest !== "" && !rest.startsWith("/")) continue;
            return NextResponse.redirect(destination + rest, 308);
        }
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
