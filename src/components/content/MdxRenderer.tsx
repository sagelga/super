import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import Admonition from "./Admonition";
import { remarkAdmonitions } from "@/lib/remark-admonitions";
import type { ComponentPropsWithoutRef } from "react";

interface MdxRendererProps {
    source: string;
}

const components = {
    Admonition,
    // Style native img to be responsive
    img: (props: ComponentPropsWithoutRef<"img">) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            loading="lazy"
            decoding="async"
            {...props}
            alt={props.alt ?? ""}
            className="mx-auto my-6 block h-auto max-w-full rounded-md"
        />
    ),
    // Open external links in new tab
    a: (props: ComponentPropsWithoutRef<"a">) => {
        const isExternal = props.href?.startsWith("http");
        return (
            <a
                {...props}
                {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
            />
        );
    },
    // Styled table wrapper for horizontal scroll on mobile
    table: (props: ComponentPropsWithoutRef<"table">) => (
        <div className="my-6 overflow-x-auto">
            <table {...props} />
        </div>
    ),
};

export default function MdxRenderer({ source }: MdxRendererProps) {
    return (
        <div className="prose max-w-none">
            <MDXRemote
                source={source}
                options={{
                    mdxOptions: {
                        remarkPlugins: [
                            remarkGfm,
                            remarkDirective,
                            remarkAdmonitions,
                        ],
                        rehypePlugins: [
                            rehypeSlug,
                            [
                                rehypeAutolinkHeadings,
                                {
                                    behavior: "append",
                                    properties: {
                                        className: ["anchor"],
                                        ariaLabel: "Link to section",
                                    },
                                },
                            ],
                            [
                                rehypePrettyCode,
                                {
                                    theme: {
                                        dark: "github-dark-dimmed",
                                        light: "github-light",
                                    },
                                    keepBackground: false,
                                },
                            ],
                        ],
                    },
                }}
                components={components}
            />
        </div>
    );
}
