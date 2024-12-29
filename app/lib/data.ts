"use server";
import path from "path";
import { readFile } from "fs/promises";
import { HookDetails } from "@lib/definitions";

export async function loadHooks(term: string = "") {
  try {
    const DATA_PATH = path.join(process.cwd(), "app/data/hooks.json");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Read the hooks json file and
    const result = await readFile(DATA_PATH, { encoding: "utf-8" });
    const parsedResults: HookDetails = JSON.parse(result);

    // RegExp search term
    const searchRegExp = new RegExp(term, "i");

    // Get all the keys and parsed to a lowercase string and preserved the original name
    const hooks_name_lowercased = Object.keys(parsedResults).map((name) => {
      return { original_name: name, lowercase_name: name.toLowerCase() };
    });

    const results = hooks_name_lowercased
      .filter(({ lowercase_name }) => {
        return searchRegExp.test(lowercase_name);
      })
      .map(({ original_name }) => {
        return { [original_name]: parsedResults[original_name] };
      });
    return results;
  } catch (error) {
    console.log("Error loading hooks info: ", error);
    throw error;
  }
}
