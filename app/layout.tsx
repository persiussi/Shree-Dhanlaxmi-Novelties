import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shree Dhanlaxmi Novelties",
  description: "Stationery, gifts, school supplies and novelty items website for Shree Dhanlaxmi Novelties.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
