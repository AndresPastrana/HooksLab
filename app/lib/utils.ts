import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Environment } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isEnv = () => {
  const currentEnv = process.env.NODE_ENV;

  return {
    isDevelopment: () => currentEnv === Environment.Development,
    isProduction: () => currentEnv === Environment.Production,
    isTest: () => currentEnv === Environment.Test,
  };
};
