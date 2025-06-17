import parse from "./statik.ts";

const generateHTML = async () => {
  const statik = await Deno.readTextFile("input.txt");

  console.log(statik)

  const tree = parse(statik);

  if (!tree) {
    return;
  }

  console.log(tree)
  exploreTree(tree);
};

const exploreTree = (tree: any[]) => {
  for (const item of tree) {
    if (item.children.length > 0) {
      console.log(`<${item.tag}>`);
      exploreTree(item.children);
      console.log(`</${item.tag}>`);
    } else {
      console.log(`<${item.tag}>${item.content}</${item.tag}>`);
    }
  }
};

generateHTML();
