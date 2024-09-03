import React, { PropsWithChildren } from "react";
import { Hook } from "@lib/definitions";
import { Code, Star, GitFork } from "lucide-react";
import { getHookCode, loadHooks } from "@lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/shared/card";
import { Button } from "@ui/shared/button";

const ResultItem = ({ hook }: { hook: Hook }) => {
  const handleLoadHookCode = async () => {
    const code = await getHookCode(hook.name);
    alert(code);
  };
  return (
    <Card
      key={hook.name + hook.description}
      className="bg-blue-900/30 border-blue-800 hover:border-teal-400 transition-colors duration-300"
    >
      <CardHeader>
        <CardTitle className="text-teal-400">{hook.name}</CardTitle>
        <CardDescription className="text-blue-300">
          {hook.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <Button
          variant="ghost"
          className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/50"
          // onClick={() => setSelectedHook(hook)}
        >
          <Code className="mr-2 h-4 w-4" />
          View Code
        </Button>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/50"
          >
            <Star className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-green-400 hover:text-green-300 hover:bg-green-900/50"
          >
            <GitFork className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export function NoResultsFound() {
  return (
    <div className="col-span-full text-center py-8 flex-col justify-center items-center">
      <p className="text-lg font-semibold text-gray-400">No hooks found</p>
      <p className="text-sm text-gray-500 text-center">
        Try adjusting your search or filter to find what you're looking for.
      </p>
    </div>
  );
}

export const SearchResultsWrapper = ({ children }: PropsWithChildren) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {children}
    </section>
  );
};

export const SearchResults = async ({ query }: { query: string }) => {
  const h = await loadHooks(query);
  return h.length > 0 ? (
    <SearchResultsWrapper>
      {h.map((hook) => (
        <ResultItem key={crypto.randomUUID()} hook={hook} />
      ))}
    </SearchResultsWrapper>
  ) : (
    <NoResultsFound />
  );
};
