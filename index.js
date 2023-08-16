import { SKIP, visit } from "unist-util-visit";

const htmlEntities = str => 
  str.replace(/([<>{}])/g, match => ({ 
    '<': '&lt;', 
    '>': '&gt;',
    '{': '&#123;',
    '}': '&#125;'
  }[match]));

const plugin = () => tree => {
    visit(tree, {type: "text"}, (node,index,parent) => {
        parent.children[index] = { type: "text", value: htmlEntities(node.value)}
        return SKIP;
        // let escaped = htmlEntities(toText(node, { whitespace: "pre"}));
        // parent.children[index] = { type: "text", value: escaped}
    })
}

export default plugin
