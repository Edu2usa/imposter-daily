import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Imposter Daily",
  description: "Ten people described the secret word. One of them never knew it. Find the imposter. New round every day.",
  openGraph: { title: "Imposter Daily", description: "Nine knew the word. One bluffed. Can you spot the imposter?", type: "website" },
};
export const viewport: Viewport = { themeColor: "#0b0b12", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
