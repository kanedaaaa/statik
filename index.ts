import generateHTML from "./core/html.ts";

const checkPath = async (path: string) => {
  try {
    await Deno.stat(path);
    return true;
  } catch (err: any) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }

    throw err;
  }
};
const run = async () => {
  const path = "input.statik";

  if (!(await checkPath(path))) {
    console.error("Path Error: wrong path provided");
    return;
  }

  const html = await generateHTML(path);

  console.log(html);
};

run();
