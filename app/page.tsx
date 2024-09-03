import { Suspense } from "react";

import { getHookCode } from "@lib/data";
import {
  Contrib,
  Footer,
  Header,
  Search,
  SearchResults,
  SearchResultsWrapper,
} from "@ui/home";
import { SearchResultsSkeleton } from "@ui/skeletons";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    page?: string;
  };
}) {
  const { page = 1, q = "" } = searchParams || {};

  const dirInfo = await getHookCode("useDebounce");
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white">
        <Header />
        <main className="container mx-auto px-4 py-8 md:py-12">
          <Search placeholder="Search invoices..." />

          {/*Hooks  */}

          <Suspense
            key={q + page + 1}
            fallback={
              <SearchResultsWrapper>
                <SearchResultsSkeleton />
              </SearchResultsWrapper>
            }
          >
            <SearchResults query={q} />
          </Suspense>

          {/* Contrib */}
          <Contrib />
        </main>

        {/* Footer */}
        <Footer />
        {/* Dialog */}
      </div>
    </>
  );
}