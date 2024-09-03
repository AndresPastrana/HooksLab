import { Button } from "@ui/shared/button";

export const Header = () => {
  return (
    <header className="p-4 md:p-6 border-b border-blue-800">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 mb-4 sm:mb-0">
          Hooklab
        </h1>
        <nav>
          <Button
            variant="ghost"
            className="text-teal-400 hover:text-teal-300 hover:bg-blue-800/50 mr-2"
          >
            Docs
          </Button>
          <Button
            variant="ghost"
            className="text-teal-400 hover:text-teal-300 hover:bg-blue-800/50"
          >
            GitHub
          </Button>
        </nav>
      </div>
    </header>
  );
};
