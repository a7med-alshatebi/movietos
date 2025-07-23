import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { WatchlistProvider } from "./contexts/WatchlistContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Discovery - Find Your Next Favorite Film",
  description: "Discover amazing movies, explore trending films, and find your next favorite watch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
      >
        <FavoritesProvider>
          <WatchlistProvider>
            <Navigation />
            {children}
          </WatchlistProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
