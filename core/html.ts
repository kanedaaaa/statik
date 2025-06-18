import { Node, parse } from "./statik.ts";

let generatedHTML = "";

const generateHTML = async (statikPath: string) => {
  const statik = await Deno.readTextFile(statikPath);

  const tree = parse(statik);

  if (!tree) {
    return;
  }

  exploreTree(tree);

  return generatedHTML;
};

const exploreTree = (tree: Node[]) => {
  for (const item of tree) {
    if (item.children && item.children.length > 0) {
      generatedHTML = generatedHTML.concat(
        `<${item.tag}>`,
        "\n",
      );
      exploreTree(item.children);
      generatedHTML = generatedHTML.concat(
        `</${item.tag}>`,
        "\n",
      );
    } else {
      generatedHTML = generatedHTML.concat(
        `<${item.tag}>${item.content}</${item.tag}>`,
        "\n",
      );
    }
  }
};

export default generateHTML;
