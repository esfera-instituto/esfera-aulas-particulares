import "@/styles/globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}