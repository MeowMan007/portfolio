import type { Metadata } from "next";
import { Inter, Caveat, Patrick_Hand, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "../components/ThemeProvider";
import { BackToTop } from "../components/BackToTop";
import { LoadingScreen } from "../components/LoadingScreen";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  weight: "400",
  variable: "--font-patrick-hand",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arshalsaifi.dev"),
  title: "Arshal Saifi | Full-Stack Developer & GenAI Engineer",
  description:
    "Interactive handcrafted notebook portfolio of Arshal Saifi, a Full-Stack Developer & GenAI Engineer specializing in React, FastAPI, LangChain, LangGraph, and Agentic AI systems.",
  openGraph: {
    title: "Arshal Saifi | Full-Stack Developer & GenAI Engineer",
    description: "Explore my handcrafted notebook portfolio, projects, and skills.",
    url: "https://arshalsaifi.dev",
    siteName: "Arshal Saifi Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${caveat.variable} ${patrickHand.variable} ${playfair.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans min-h-screen text-ink-dark dark:text-ink-light selection:bg-highlighter-yellow/30 dark:selection:bg-neon-pink/30">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LoadingScreen />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
