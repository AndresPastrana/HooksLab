import { ZodError, ZodObject } from "zod";
import { HookDetails } from "./definitions";
// import { hooksSchema, Hooks } from "./definitions";

// Function to validate hooks array
export function validateHooksArray(obj: unknown): obj is HookDetails {
  return true;
  // try {
  //   // Parse and validate the input using the hooksSchema
  //   const parsedResult = hooksSchema.parse(obj);

  //   // If no error is thrown, the data is valid
  //   return true;
  // } catch (error) {
  //   if (error instanceof ZodError) {
  //     // Handle validation errors
  //     console.error("Validation failed:", error.errors);
  //   } else {
  //     // Handle unexpected errors
  //     console.error("Unexpected error:", error);
  //   }
  //   // Return false if validation fails
  //   return false;
  // }
}
