type TagTypes = "h1" | "p" | "ul" | "li";

type Node = { tag: string; content: string; children: Node[] | null };
const Stack: { node: Node; indent: number }[] = [];
const Root: Node[] = []

const isTag = (tag: string): tag is TagTypes => {
  return ["h1", "p", "ul", "li"].includes(tag);
};

const parse = async () => {
  const statik = await Deno.readTextFile("input.txt");
  const code = statik.split("\n");

  for (const line of code) {
    const match = line.match(/^(\s*)(\w+)\s*(.*)$/);

    if (match) {
      const indent = match[1].length;
      const tag = match[2];
      const content = match[3];

      if (!isTag(tag)) {
        console.error("tag error");
        return;
      }

      const node: Node = { tag, content, children: [] };

      const last = Stack.at(-1);

      if (!last) {
        Root.push(node)
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
          newLast.node.children?.push(node); // has a parent
        } else {
          Root.push(node)
        }

        Stack.push({ node, indent }); // is a sibling
      }
    }
  }
};

const test = async () => {
  await parse();
  console.log(Root);
};

test();
