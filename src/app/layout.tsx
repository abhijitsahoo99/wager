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
  openGraph: {
    title: "Wager",
    description:
      "Wager is a fun betting platform where you create private betting groups, set milestones and the one who achieve the milestone first takes the entire pot",
    images: [
      {
        url: "/assets/wager.png", // Make sure to add this image in your public folder
        width: 1200,
        height: 630,
        alt: "Wager is a fun betting platform where you create private betting groups, set milestones and the one who achieve the milestone first takes the entire pot",
      },
    ],
    locale: "en_US",
    type: "website",
    siteName: "Wager",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wager",
    description:
      "Wager is a fun betting platform where you create private betting groups, set milestones and the one who achieve the milestone first takes the entire pot",
    images: ["/assets/wager.png"],
  },
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
