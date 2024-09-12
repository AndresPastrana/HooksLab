"use client";
import React from "react";
import { useActiveHook } from "@/app/hooks/app.hooks";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@ui/shared/dialog";

import { Description } from "@/app/ui/home/modal/Description";
import { Code } from "@/app/ui/home/modal/Code";

const ShowActiveHook = () => {
  // Consume the useActive Hook here
  const { active, setActiveHook } = useActiveHook();

  return (
    <Dialog open={!!active} onOpenChange={() => setActiveHook(null)}>
      <DialogContent
        className="bg-gray-900 text-white border border-blue-800 w-full max-w-xl mx-auto rounded-lg"
        style={{ width: "90%", maxWidth: "800px" }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-teal-400">
            {active}
          </DialogTitle>
          <Description />
        </DialogHeader>
        <div className="relative w-full mt-4">
          <Code hookName={active as string} />
          {/* Copy Button */}
          {/* Uncomment when ready */}
          {/* <button
            className="absolute top-2 right-2 bg-blue-800 hover:bg-blue-700 text-white p-2 rounded-md"
            onClick={() => {
              navigator.clipboard.writeText(active); 
              console.log("Code copied to clipboard");
            }}
          >
            {false ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">Copy code</span>
          </button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowActiveHook;
