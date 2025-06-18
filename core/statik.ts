type TagTypes = "h1" | "p" | "ul" | "li" | "title";

export type Node = { tag: string; content: string; children: Node[] | null };
const Stack: { node: Node; indent: number }[] = [];
const Root: Node[] = [];
let Title = "";

const isTag = (tag: string): tag is TagTypes => {
  return ["h1", "p", "ul", "li"].includes(tag);
};

const parse = (statik: string) => {
  const code = statik.split("\n");

  for (const [index, line] of code.entries()) {
    // ^(\s*)(\w+)\s*(.*?)\s*$ - could be better idk
    const match = line.match(/^(\s*)(\w+)\s*(.*)$/);

    if (match) {
      const indent = match[1].length;
      const tag = match[2];
      const content = match[3];

      if (indent % 2 !== 0) {
        console.error(`Indent Error: Each indent should be 2 spaces`);
        return;
      }

      if (index === 0 && tag !== "title") {
        console.error(`Tag Error: Title missing`);
        return;
      } else if (index === 0 && tag === "title") {
        Title = content;
        continue;
      }

      if (!isTag(tag)) {
        console.error(`Tag Error: ${tag} is not a valid tag`);
        return;
      }

      const node: Node = { tag, content, children: [] };

      const last = Stack.at(-1);

      if (last && indent > last.indent && indent - last.indent !== 2) {
        console.error(
          `Indent Error: Children should be exactly 2 spaces deeper than parent`,
        );
        return;
      }

      if (!last) {
        Root.push(node);
        Stack.push({ node, indent });
      } else if (indent > last.indent) {
        last.node.children?.push(node);
        Stack.push({ node, indent });
      } else {
        while (Stack.length && Stack.at(-1)!.indent >= indent) {
          Stack.pop();
        }

        const newLast = Stack.at(-1);
        if (newLast) {
          newLast.node.children?.push(node);
        } else {
          Root.push(node);
        }

        Stack.push({ node, indent });
      }
    }
  }

  return Root;
};

export { parse, Title };
