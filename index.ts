type TagTypes = "h1" | "p" | "ul" | "li";

type Node = { tag: string; content: string; children: Node[] | null };
const Stack: { node: Node; indent: number }[] = [];

const isTag = (tag: string): tag is TagTypes => {
  return ["h1", "p", "ul", "li"].includes(tag);
};

const parse = async () => {
  const statik = await Deno.readTextFile("input.txt");
  const code = statik.split("\n");

  for (const line of code) {
    const match = line.match(/^(\s*)(\w+)\s*(.*)$/);

    if (match) {
      const indent = match[1];
      const tag = match[2];
      const content = match[3];

      if (!isTag(tag)) {
        console.error("tag error");
      }

      const node: Node = { tag, content, children: null };
      Stack.push({ node, indent: indent.length });
    }
  }
};

const test = async () => {
  await parse();
  console.log(Stack);
};

test()
