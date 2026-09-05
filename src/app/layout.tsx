import type { Metadata } from "next";
import "./globals.css";
import "./public-motion.css";

export const metadata: Metadata = {
  title: "Shishir Shetty | Software · Cloud · Data · AI",
  description:
    "Portfolio of Shishir Shetty — software development, cloud, data, AI/ML and generative AI.",
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