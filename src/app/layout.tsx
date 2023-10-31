import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

import "simplebar-react/dist/simplebar.min.css";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iTools",
  description: "Your Ai Tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={cn(
            "min-h-screen font-sans text-white  bckg",
            inter.className
          )}
        >
          <Toaster />
          <Navbar />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </body>
      </Providers>
    </html>
  );
}
