import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root as HastRoot, Element } from "hast";

const rehypeLazyImages: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, "element", (node: Element) => {
    if (node.tagName === "img") {
      node.properties = node.properties ?? {};
      node.properties.loading = "lazy";
      node.properties.decoding = "async";
      const existing = (node.properties.className as string[]) ?? [];
      node.properties.className = [
        ...existing,
        "mx-auto",
        "my-6",
        "block",
        "h-auto",
        "max-w-full",
        "rounded-md",
      ];
    }
  });
};

export default rehypeLazyImages;
