"use client";


import './Navigation.css';
import './Navigation.css';
import { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Film, Star, Heart, Bookmark } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/movies", label: "Movies", icon: Film },
    { href: "/movies/search", label: "Search", icon: Search },
    { href: "/movies/trending", label: "Trending", icon: Star },
    { href: "/favorites", label: "Favorites", icon: Heart },
    { href: "/watchlist", label: "Watchlist", icon: Bookmark },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold text-white">MovieDiscovery</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile actions: Back to Home + menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/"
              className="text-gray-300 hover:text-purple-400 p-2 rounded-full transition-colors"
              aria-label="Back to Home"
            >
              <Home size={22} />
            </Link>
            <Link
              href="/movies/search"
              className="text-gray-300 hover:text-purple-400 p-2 rounded-full transition-colors"
              aria-label="Search Movies"
            >
              <Search size={22} />
            </Link>
            <Link
              href="/favorites"
              className="text-gray-300 hover:text-purple-400 p-2 rounded-full transition-colors"
              aria-label="My Favorites"
            >
              <Heart size={22} />
            </Link>
            
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60">
          <div className="fixed top-0 right-0 w-64 h-full bg-gray-900 shadow-lg flex flex-col p-6 animate-slide-in-right">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold text-white">Menu</span>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-purple-600 text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setSidebarOpen(false)} />
        </div>
      )}
    </nav>
  );
}
