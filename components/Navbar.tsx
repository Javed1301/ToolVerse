"use client";

import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { userId } = useAuth();

  return (
    // 1. FIXED COLORS: Uses base-100/80 instead of black/50 so it adapts to light mode
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-base-300 bg-base-100/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* Uses Primary Theme Color */}
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary/80 transition-colors">
            <Sparkles className="w-5 h-5 text-primary-content" />
          </div>
          <span className="font-bold text-xl tracking-tight text-base-content">
            ToolVerse
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-base-content/70">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          {/* 2. FIXED TYPO: Changed contact-us to contact */}
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact Us
          </Link>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {userId ? (
            <div className="flex items-center gap-4">
              <Link 
                href="/home"
                className="hidden sm:block text-sm font-medium hover:text-primary transition"
              >
                Go to Dashboard
              </Link>
              {/* 3. FIXED DEPRECATION: Removed afterSignOutUrl */}
              <UserButton />
            </div>
          ) : (
            <>
              <Link 
                href="/sign-in"
                className="text-sm font-medium hover:text-primary transition hidden sm:block"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up"
                // Uses DaisyUI Button Styles
                className="btn btn-primary btn-sm rounded-full px-6"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}