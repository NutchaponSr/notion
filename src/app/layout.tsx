import { auth } from "@/auth";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { QueryProvider } from "@/components/providers/query-provider";
import { ToastProvider } from "@/components/providers/toast-provider";

import "./globals.css";
import { ModalProvider } from "@/components/providers/modal-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${geistSans.className} antialiased`}>
          <NuqsAdapter>
            <QueryProvider>
              <ModalProvider />
              <ToastProvider />
              {children}
            </QueryProvider>
          </NuqsAdapter>
        </body>
      </html>
    </SessionProvider>
  );
}
