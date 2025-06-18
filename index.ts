import generateHTML from "./core/html.ts";
import process from "node:process";

const checkPath = async (path: string) => {
  try {
    await Deno.stat(path);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }

    throw err;
  }
};
const run = async () => {
  const path = process.argv[2];

  if (!path) {
    console.error("Path Error: Path is missing");
    return;
  }
  if (!(await checkPath(path))) {
    console.error("Path Error: Wrong path provided");
    return;
  }

  await generateHTML(path);
  console.log("Done");
};

run();
