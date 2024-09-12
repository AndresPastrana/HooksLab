"use server";
import path from "path";
import { readFile } from "fs/promises";
import { Hook } from "@lib/definitions";

export async function loadHooks(term: string = "") {
  try {
    const DATA_PATH = path.join(process.cwd(), "app/data/hooks.json");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Read the hooks json file and
    const result = await readFile(DATA_PATH, { encoding: "utf-8" });
    const parsedResults: Hook[] = JSON.parse(result);

    // Filter the results based on the search term
    const filteredResults = term
      ? parsedResults.filter(({ name, description }) => {
          const searchRegExp = new RegExp(term, "i");
          return searchRegExp.test(name) || searchRegExp.test(description);
        })
      : parsedResults;

    return filteredResults.length > 6
      ? filteredResults.slice(0, 6)
      : filteredResults;
  } catch (error) {
    console.log("Error loading hooks info: ", error);
    throw error;
  }
}
