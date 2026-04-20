import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root as HastRoot, Element } from "hast";

const rehypeExternalLinks: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, "element", (node: Element) => {
    if (
      node.tagName === "a" &&
      typeof node.properties?.href === "string" &&
      node.properties.href.startsWith("http")
    ) {
      node.properties.target = "_blank";
      node.properties.rel = ["noopener", "noreferrer"];
    }
  });
};

export default rehypeExternalLinks;
