import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import { useFetch } from "@/app/hooks/app.hooks";

export const Code = ({ hookName }: { hookName: string }) => {
  if (!hookName) {
    return;
  }
  const { data, error, loading } = useFetch<string>(
    `http://localhost:3001/hooks?name=${hookName}`
  );

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

  // Success State with fetched data
  if (data) {
    return (
      <div className=" rounded-md overflow-x-auto w-full max-w-full relative">
        <code className="text-sm text-blue-200 whitespace-pre">
          <SyntaxHighlighter
            language="typescript" // Use "javascript" if the code is JavaScript
            style={dracula} // You can choose other styles if preferred
            className="bg-blue-900/30  w-full max-w-full"
          >
            {data}
          </SyntaxHighlighter>
        </code>
      </div>
    );
  }

  return null;
};
