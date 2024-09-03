import { z } from "zod";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Env, EnvError, envSchema } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function loadEnv(): Env | EnvError {
  // Load the current values from the environment
  const env: Partial<Env> = {
    GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  };

  // Validate the environment values
  const valid = envSchema.safeParse(env);

  if (valid.success) {
    return valid.data;
  }

  // Iterate over the Zod issues and return each env var as a key with corresponding error messages
  const errors: EnvError = valid.error.issues.reduce<EnvError>((acc, issue) => {
    const key = issue.path[0] as string;
    if (acc[key]) {
      acc[key].push(issue.message);
    } else {
      acc[key] = [issue.message];
    }
    return acc;
  }, {});

  return errors;
}
