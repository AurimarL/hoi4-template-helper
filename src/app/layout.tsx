import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "hoi4 template Builder",
  description: "An hoi4 template Builder  Helper",
  authors: [
    {
      name: "Aurimar Lopes",
      url: "https://github.com/AurimarL",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen justify-center flex flex-col`}
      >
        {children}
        <footer className=" flex gap-2 justify-center text-center text-gray-400">
          <a
            href="https://github.com/AurimarL/hoi4-template-helper"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-green-300"
          >
            <GitHubLogoIcon className="w-4 h-4 mr-1" />
          </a>
          <a
            href="https://github.com/aurimarl"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-green-300"
          >
            by Aurimar Lopes
          </a>
        </footer>
      </body>
    </html>
  );
}
