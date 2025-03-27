import type { Metadata } from "next";
import { GeistSans, GeistMono } from 'geist/font';
import "./globals.css";

export const metadata: Metadata = {
  title: "GIGABYTE Presents RunRise Nation Noboborsho Run 1432 - BIB Collection",
  description: "Retrieve your BIB easily for the RunRise Nation Noboborsho Run 1432. Simply enter your BIB number to download your official race BIB.",
  keywords: [
    "RunRise Nation",
    "Noboborsho Run",
    "BIB Collection",
    "Race BIB Download",
    "Marathon BIB",
    "Bangladesh Running Event",
    "GIGABYTE Run",
    "Sports Event",
    "Running Community"
  ],
  authors: [{ name: "RunRise Nation" }],
  openGraph: {
    title: "GIGABYTE Presents RunRise Nation Noboborsho Run 1432 - BIB Collection",
    description: "Retrieve your BIB easily for the RunRise Nation Noboborsho Run 1432. Simply enter your BIB number to download your official race BIB.",
    images: ['/nbbrsh.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/nbbrsh.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
