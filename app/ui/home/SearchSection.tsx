"use client";
import { ChangeEvent } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Search as Icon } from "lucide-react";

import { Input } from "@ui/shared/input";
import { useDebounceCallback } from "@hooks/useDebounceCallback";

export const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const userInpunt = e.target.value;
    const urlQueryParams = new URLSearchParams(searchParams);
    if (userInpunt) {
      urlQueryParams.set("q", userInpunt);
    } else {
      urlQueryParams.delete("q");
    }

    router.replace(`${pathname}?${urlQueryParams.toString()}`);
  };
  const { debouncedCallback } = useDebounceCallback(handleSearch, 400);

  return (
    <section className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">
        Supercharge Your React Apps
      </h2>
      <p className="text-xl text-blue-200 mb-6">
        Discover and use cutting-edge custom hooks for your next project
      </p>
      <div className="relative max-w-md mx-auto">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <Input
          className="w-full pl-10 pr-4 py-2 bg-blue-900/50 border-blue-700 focus:border-teal-400 focus:ring-teal-400 text-white placeholder-blue-400"
          defaultValue={searchParams.get("q") || ""}
          onChange={debouncedCallback}
          placeholder={placeholder}
        />
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
      </div>
    </section>
  );
};
