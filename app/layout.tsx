import type { Metadata } from "next";
import { Archivo, Courier_Prime, Libre_Caslon_Text, Oswald } from "next/font/google";
import "./globals.css";

// Wide grotesk for titles, typewriter for documents/taglines, roman serif for prose,
// condensed sans for poster billing blocks.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-display" });
const courier = Courier_Prime({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-type" });
const caslon = Libre_Caslon_Text({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});
const oswald = Oswald({ subsets: ["latin"], variable: "--font-billing" });

const description =
  "The portfolio of Gurnoor Singh, Software Engineer — told as a film in seven pages.";

export const metadata: Metadata = {
  title: "Gurnoor Singh — Software Engineer",
  description,
  openGraph: {
    title: "Gurnoor Singh — Software Engineer",
    description,
    type: "website",
    images: ["/images/gurnoor.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${courier.variable} ${caslon.variable} ${oswald.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
