import { Zap, GitFork, Github } from "lucide-react";
import { Button } from "@ui/shared/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/shared/card";

export const Contrib = () => {
  return (
    <section className="bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-teal-900/50 rounded-lg p-8 mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-400">
        Contribute Your Hooks
      </h2>
      <p className="text-lg text-center text-blue-200 mb-8">
        Join the FutureHooks community and share your innovative custom hooks
        with developers worldwide.
      </p>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-blue-900/30 border-blue-800">
          <CardHeader>
            <CardTitle className="text-teal-400 flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              Create
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-200">
              Develop your custom hook and ensure it is well-documented and
              tested.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-blue-900/30 border-blue-800">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">
              <GitFork className="mr-2 h-5 w-5" />
              Fork
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-200">
              Fork the FutureHooks repository on GitHub and create a new branch
              for your hook.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-blue-900/30 border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center">
              <Github className="mr-2 h-5 w-5" />
              Submit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-200">
              Open a pull request with your new hook and wait for community
              feedback.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="text-center">
        <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
          Contribution Guidelines
        </Button>
      </div>
    </section>
  );
};
