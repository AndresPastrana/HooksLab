import { z } from "zod";

// Define a Zod schema for the environment variables
export const envSchema = z.object({
  GROQ_API_KEY: z.string().min(10, "GROQ_API_KEY is required"),
  SEED_SECRET: z.string().min(10, "SEED_SECRET is required"),
  HOST_URL: z.string().min(10, "HOST_URL is required"),
});

// Define the schema for a single Hook
export const HookDetailsSchema = z.record(
  z.object({
    code: z.string(),
    desc: z.string(),
  })
);

// Define TypeScript types based on the schema
export type Env = z.infer<typeof envSchema>; // TS type
export type EnvError = Record<string, string[]>;
export type HookDetails = z.infer<typeof HookDetailsSchema>;
