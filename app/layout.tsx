import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
  title: "Project Explorer",
  description: "A Project Management Portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <NavBar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
