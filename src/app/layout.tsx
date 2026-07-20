import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { TrackingPixels } from "@/components/TrackingPixels";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "MisiMinda — Matematik & Sains Seronok Untuk Kanak-Kanak",
  description:
    "Platform pembelajaran Matematik & Sains yang seru dan interaktif untuk kanak-kanak Malaysia, umur 2-12 tahun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <TrackingPixels />
        {children}
      </body>
    </html>
  );
}
