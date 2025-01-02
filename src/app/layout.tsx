import type { Metadata } from "next";

import { auth } from "@/auth";
import { Nunito } from "next/font/google";

import { cn } from "@/lib/utils";
import { EdgeStoreProvider } from "@/lib/edgestore";

import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { QueryProvider } from "@/components/providers/query-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Notion",
  description: "Notion is a note-taking app that allows you to create, organize, and share notes with others.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-white")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NuqsAdapter>
              <QueryProvider>
                <EdgeStoreProvider>
                  <ModalProvider />
                  <ToastProvider />
                  {children}
                </EdgeStoreProvider>
              </QueryProvider>
            </NuqsAdapter>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
