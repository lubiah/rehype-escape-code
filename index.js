import { visitParents, SKIP } from "unist-util-visit-parents";

const htmlEntities = str => 
  str.replace(/([<>{}])/g, match => ({ 
    '<': '&lt;', 
    '>': '&gt;',
    '{': '&#123;',
    '}': '&#125;'
  }[match]));

const plugin = () => tree => {
    visitParents(tree, {type: "text"}, (node,ancestors) => {
      if (!ancestors.some(x => x.tagName === "code")) return;
        const parent = ancestors.at(-1);
        const childIndex = parent.children.findIndex(x => x === node);
        parent.children[childIndex] = { type: "text", value: htmlEntities(node.value)}
        return SKIP;
      
    })
}

export default plugin
