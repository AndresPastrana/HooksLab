"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import { useActiveHook, useFetch } from "@/app/hooks/app.hooks";
import { Copy } from "lucide-react";
import { useEffect } from "react";

export const BtnCopyCode = ({ text }: { text: string }) => {
  return (
    <button
      className="absolute top-4 right-4 bg-blue-800 hover:bg-blue-700 text-white p-2 rounded-md"
      onClick={() => {
        navigator.clipboard.writeText(text);
      }}
    >
      <Copy className="h-4 w-4" />
    </button>
  );
};

export const Code = () => {
  // Every time the modal open or close  this component will re render

  const { active, setActiveHook } = useActiveHook();
  if (!active) {
    return null;
  }
  if (active?.code) {
    return <p>{active.code}</p>;
  }

  const { data, error, loading } = useFetch<{ code: string }>(
    `http://localhost:3000/hooks?name=${active?.name as string}`
  );

  useEffect(() => {
    console.log("Running efect");

    if (data?.code && active) {
      setActiveHook({ ...active, code: data.code });
    }
  }, [active?.name, data?.code]);

  // Loading State
  if (loading && !data && !error && active) {
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

  // Success State with fetched data

  if (active?.code) {
    return (
      <div className=" rounded-md overflow-x-auto w-full max-w-full relative">
        <code className="text-sm text-blue-200 whitespace-pre">
          <BtnCopyCode text="Hola" />
          <SyntaxHighlighter
            language="typescript" // Use "javascript" if the code is JavaScript
            style={dracula} // You can choose other styles if preferred
            className="bg-blue-900/30  w-full max-w-full"
          >
            {JSON.stringify(active.code)}
          </SyntaxHighlighter>
        </code>
      </div>
    );
  }
};
