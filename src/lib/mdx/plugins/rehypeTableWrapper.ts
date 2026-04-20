import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root as HastRoot, Element } from "hast";

const rehypeTableWrapper: Plugin<[], HastRoot> = () => (tree) => {
  visit(tree, "element", (node: Element, index, parent) => {
    if (
      node.tagName === "table" &&
      parent &&
      "children" in parent &&
      typeof index === "number"
    ) {
      const wrapper: Element = {
        type: "element",
        tagName: "div",
        properties: { className: ["my-6", "overflow-x-auto"] },
        children: [node],
      };
      (parent as HastRoot).children[index] = wrapper;
    }
  });
};

export default rehypeTableWrapper;
