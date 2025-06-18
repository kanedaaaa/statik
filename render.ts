import parse from "./statik.ts";

let generatedHTML = "";

const generateHTML = async () => {
  const statik = await Deno.readTextFile("input.txt");

  const tree = parse(statik);

  if (!tree) {
    return;
  }

  exploreTree(tree);

  console.log(generatedHTML);
};

const exploreTree = (tree: any[]) => {
  for (const item of tree) {
    if (item.children.length > 0) {
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

generateHTML();
