"use client";
import { inter } from "@ui/fonts";
import "@ui/global.css";
import { ActiveHookProvider } from "./context/ActiveHookContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {<ActiveHookProvider>{children}</ActiveHookProvider>}
      </body>
    </html>
  );
}
