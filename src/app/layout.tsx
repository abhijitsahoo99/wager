import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/provider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

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
      <body className={`${roboto.variable} ${publicPixel.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
