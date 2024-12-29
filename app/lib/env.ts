import "server-only";
import { Env, EnvError, envSchema } from "./definitions";

export function loadEnv(): Env | EnvError {
  // Load the current values from the environment
  const env: Partial<Env> = {
    GROQ_API_KEY: process.env.GROQ_API_KEY || undefined,
    SEED_SECRET: process.env.SEED_SECRET || undefined,
    HOST_URL: process.env.NEXT_PUBLIC_HOST_URL || undefined,
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
