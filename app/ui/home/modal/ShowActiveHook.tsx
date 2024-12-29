"use client";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";
import { Check, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@ui/shared/dialog";
import { useActiveHook } from "@/app/hooks/app.hooks";
import { Description } from "@/app/ui/home/modal/Description";

const BtnCopyCode = ({ text }: { text?: string }) => {
  const { active } = useActiveHook();
  const [isCopied, setIsCopied] = useState(false);

  // Change the icon after a time
  useEffect(() => {
    let prev_timer: NodeJS.Timeout;
    if (isCopied) {
      prev_timer = setTimeout(() => setIsCopied(false), 4000);
    }
    return () => {
      if (prev_timer) {
        clearTimeout(prev_timer);
      }
    };
  }, [isCopied]);
  return (
    <button
      className="absolute top-4 right-4 bg-blue-800 hover:bg-blue-700 text-white p-2 rounded-md flex justify-between gap-2"
      onClick={() => {
        navigator.clipboard.writeText(active?.code || "");
        setIsCopied(true);
        toast.success("Code copied successfully");
      }}
      type="button"
    >
      {!isCopied && <Copy className="h-4 w-4" />}
      {isCopied && <Check className="h-4 w-4" />}
      {text && <p>{text}</p>}
    </button>
  );
};

const ModalHeader = () => {
  const { active } = useActiveHook();

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
  const { active } = useActiveHook();
  if (!active) {
    return null;
  }

  return (
    <div className="relative w-full mt-4">
      <div className=" rounded-md overflow-x-auto w-full max-w-full relative">
        <code className="text-sm text-blue-200 whitespace-pre">
          <BtnCopyCode />
          <SyntaxHighlighter
            language="typescript" // Use "javascript" if the code is JavaScript
            style={dracula} // You can choose other styles if preferred
            className="bg-blue-900/30  w-full max-w-full"
          >
            {active.code || ""}
          </SyntaxHighlighter>
        </code>
      </div>
    </div>
  );
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
        className=" bg-gray-900 text-white border border-blue-800 w-full max-w-xl mx-auto rounded-lg"
        style={{ width: "90%", maxWidth: "800px" }}
      >
        <ModalHeader />
        <ModalContent />
      </DialogContent>
    </Dialog>
  );
};

export default ShowActiveHook;
