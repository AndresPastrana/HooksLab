import { z } from "zod";

export const HooksSchema = z.object({
  name: z.string(),
  description: z.string(),
});

// Define a Zod schema for the environment variables
export const envSchema = z.object({
  GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),
});

// Define the schema for a single Hook
export const hookSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

// Define the schema for an array of Hooks
export const hooksSchema = z.array(hookSchema);

// Define TypeScript types based on the schema
export type Env = z.infer<typeof envSchema>; // TS type
export type EnvError = Record<string, string[]>;
export type Hook = {
  name: string;
  description: string;
};

export type Hooks = Hook[];
