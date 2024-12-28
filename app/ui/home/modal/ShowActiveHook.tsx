"use client";
import React, { useEffect, useMemo } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@ui/shared/dialog";
import { Check, Copy } from "lucide-react";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useActiveHook, useFetch } from "@/app/hooks/app.hooks";
import { Description } from "@/app/ui/home/modal/Description";
import { ActiveHook } from "@/app/context/ActiveHookContext";

const BtnCopyCode = ({ text }: { text: string }) => {
  const { active } = useActiveHook();
  return (
    <button
      className="absolute top-4 right-4 bg-blue-800 hover:bg-blue-700 text-white p-2 rounded-md"
      onClick={() => {
        navigator.clipboard.writeText(active?.code || "");
      }}
    >
      <Copy className="h-4 w-4" />
    </button>
  );
};

const ModalHeader = () => {
  const { active, setActiveHook } = useActiveHook();

  return (
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold text-teal-400">
        {active?.name}
      </DialogTitle>
      <Description />
    </DialogHeader>
  );
};

const ModalContent = () => {
  const { active, setActiveHook } = useActiveHook();
  if (!active) {
    return null;
  }
  console.log("Rendering");

  const { data, error, loading } = useFetch<{ code: string }>(
    `http://localhost:3000/hooks?name=${active?.name as string}`
  );

  useEffect(() => {
    if (data?.code) {
      setActiveHook((prev) => {
        const prev_as_active = prev as ActiveHook;
        return { ...prev_as_active, code: data.code };
      });
    }
  }, [active?.name, data?.code]);

  // Loading State
  if (loading && !data && !error) {
    return <h1 className="text-white text-4xl">Loading......</h1>;
  }
  // Error State
  if (error && !loading && !data) {
    return (
      <div>
        <h1>Error</h1>
        <p>{JSON.stringify(error)}</p>
      </div>
    );
  }

  // Successful state
  if (active.code) {
    return (
      <div className="relative w-full mt-4">
        <div className=" rounded-md overflow-x-auto w-full max-w-full relative">
          <code className="text-sm text-blue-200 whitespace-pre">
            <BtnCopyCode text="Hola" />
            <SyntaxHighlighter
              language="typescript" // Use "javascript" if the code is JavaScript
              style={dracula} // You can choose other styles if preferred
              className="bg-blue-900/30  w-full max-w-full"
            >
              {active.code}
            </SyntaxHighlighter>
          </code>
        </div>
      </div>
    );
  }
};

const ShowActiveHook = () => {
  // Consume the useActive Hook here
  const { active, setActiveHook } = useActiveHook();
  if (!active) {
    return null;
  }

  return (
    <Dialog open={!!active} onOpenChange={() => setActiveHook(null)}>
      <DialogContent
        className="bg-gray-900 text-white border border-blue-800 w-full max-w-xl mx-auto rounded-lg"
        style={{ width: "90%", maxWidth: "800px" }}
      >
        <ModalHeader />
        <ModalContent />
      </DialogContent>
    </Dialog>
  );
};

export default ShowActiveHook;
