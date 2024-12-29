import path from "path";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

import Groq from "groq-sdk";

import { loadEnv } from "@lib/env";
import { validateHooksArray } from "@lib/validations";
import { HookDetails } from "@lib/definitions";
import { isEnv } from "@lib/utils";

export async function GET(req: NextRequest) {
  // This action is only allowed in dev environments
  if (!isEnv().isDevelopment()) {
    return NextResponse.json(
      { err: "Not allowed to perform this action" },
      { status: 401 }
    );
  }

  // Check for the authorization SEED_SECRET
  const auth = req.headers.get("Authorization");

  const env = loadEnv();
  // Check for env errors
  if (
    typeof env.GROQ_API_KEY !== "string" ||
    typeof env.SEED_SECRET !== "string"
  ) {
    return NextResponse.json(env, { status: 400 });
  }

  const auth_key = auth?.split("Bearer ")[1];

  if (!auth || auth_key !== env.SEED_SECRET) {
    return NextResponse.json(
      { err: "Not allowed to perform this action" },
      { status: 401 }
    );
  }

  const groq = new Groq({ apiKey: env.GROQ_API_KEY as string });

  // Use Groq AI to generate mock hook data

  const json_format_example = `{"useToggle": {
    "code": "import { useState } from 'react';\n\nfunction useToggle(initialValue = false) {\n  const [state, setState] = useState(initialValue);\n\n  const toggle = () => setState((prev) => !prev);\n\n  return [state, toggle];\n}",
    "desc": "Toggle a boolean value"
}, "useDebouncedCallback": {
    "code": "import { useState } from 'react';\n\nfunction useToggle(initialValue = false) {\n  const [state, setState] = useState(initialValue);\n\n  const toggle = () => setState((prev) => !prev);\n\n  return [state, toggle];\n}",
    "desc": "Toggle a boolean value"
}}`;
  const msg = `Provide a JSON array of custom React hooks. The format should strictly be: ${json_format_example}  . Do not include any additional text, explanations, or headings. Only return the JSON data in the exact format specified.`;

  const result = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "",
      },
    ],
    model: "llama3-70b-8192",
  });

  // Extract the generated content
  const content = result.choices[0]?.message?.content;

  if (!content) {
    return NextResponse.json(
      { error: "Failed to generate content with Groq AI" },
      { status: 500 }
    );
  }

  // Parse the content to JSON
  let hooks: HookDetails;
  try {
    hooks = JSON.parse(content);
  } catch (error) {
    return NextResponse.json(
      { error: "Generated content is not valid JSON" },
      { status: 500 }
    );
  }

  // Validate the shape of the data using zod
  const isValidData = validateHooksArray(hooks);
  if (!isValidData) {
    return NextResponse.json(
      { error: "Generated content does not match the expected Hook shape" },
      { status: 500 }
    );
  }

  // Save the JSON to the file system
  try {
    const filePath = path.join(process.cwd(), "app", "data", "hooks.json");
    await writeFile(filePath, JSON.stringify(hooks, null, 2), "utf8");
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save hooks.json file" },
      { status: 500 }
    );
  }

  // Return the generated JSON
  return NextResponse.json(hooks);
}
