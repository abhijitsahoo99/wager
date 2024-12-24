import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers/provider";

const publicPixel = localFont({
  src: "../../public/public-pixel/PublicPixel.ttf",
  variable: "--font-public-pixel",
});

export const metadata: Metadata = {
  title: "Wager",
  description:
    " Create and join betting pools with your friends for life's biggest moments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${publicPixel.className} bg-[#EFC95F]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
