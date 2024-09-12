"use client";
import React from "react";

import { Code } from "lucide-react";
import { Button } from "@ui/shared";
import { useActiveHook } from "@/app/hooks/app.hooks";

export const ViewCode = ({ hookName }: { hookName: string }) => {
  const { setActiveHook } = useActiveHook();

  return (
    <Button
      onClick={() => setActiveHook(hookName)}
      variant="ghost"
      className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/50"
    >
      <Code className="mr-2 h-4 w-4" />
      View Code
    </Button>
  );
};
