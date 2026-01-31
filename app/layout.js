import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";
import MusicPlayer from "@/components/ui/MusicPlayer";
import { promises as fs } from 'fs';
import path from 'path';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata = {
  title: "Save the Date | Premium Invitation",
  description: "A Celebration of Love & Milestones",
};

import { Toaster } from "@/components/ui/sonner";

async function getData() {
  try {
    const filePath = path.join(process.cwd(), 'lib/data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (e) {
    return { theme: 'wedding' }; // Fallback
  }
}

export default async function RootLayout({ children }) {
  const data = await getData();

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${greatVibes.variable}`}
        data-theme={data.theme}
      >
        {children}
        <MusicPlayer src={data.music} />
        <Toaster />
      </body>
    </html>
  );
}
