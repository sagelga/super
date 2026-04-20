import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { toHtml } from "hast-util-to-html";
import type { Root as HastRoot } from "hast";

import { convertAdmonitionJsx } from "@/lib/mdx/admonitionConfig";
import rehypeExternalLinks from "@/lib/mdx/plugins/rehypeExternalLinks";
import rehypeLazyImages from "@/lib/mdx/plugins/rehypeLazyImages";
import rehypeTableWrapper from "@/lib/mdx/plugins/rehypeTableWrapper";

interface MdxRendererProps {
  source: string;
}

export default async function MdxRenderer({ source }: MdxRendererProps) {
  const processedSource = convertAdmonitionJsx(source);

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: {
        className: ["anchor"],
        ariaLabel: "Link to section",
      },
    })
    .use(rehypeExternalLinks)
    .use(rehypeLazyImages)
    .use(rehypeTableWrapper);

  const mdast = processor.parse(processedSource);
  const hast = (await processor.run(mdast)) as HastRoot;
  const html = toHtml(hast, { allowDangerousHtml: true });

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
