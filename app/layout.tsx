"use client";
import { inter } from "@ui/fonts";
import "@ui/global.css";
import { ActiveHookProvider } from "./context/ActiveHookContext";
import { Toaster } from "./ui/shared/sonner";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {<ActiveHookProvider>{children}</ActiveHookProvider>}
        <Toaster
          toastOptions={{
            classNames: {
              icon: "text-teal-400 bg-blue-500",
              toast: "bg-gray-900 text-white border border-blue-800",
            },
          }}
        />
      </body>
    </html>
  );
}
