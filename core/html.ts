import { Node, parse } from "./statik.ts";

let generatedHTML = "";

const generateHTML = async (statikPath: string) => {
  const statik = await Deno.readTextFile(statikPath);

  const tree = parse(statik);

  if (!tree) {
    return;
  }

  const head = `
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your Page Title</title>
</head>
  `;

  generatedHTML = generatedHTML.concat(
    `
<!DOCTYPE html>
<html lang=en>
${head} 
<body>
`,
  );

  exploreTree(tree);

  generatedHTML = generatedHTML.concat(
    `
</body>
</html
    `,
  );

  await Deno.writeTextFile("./build/index.html", generatedHTML);
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
