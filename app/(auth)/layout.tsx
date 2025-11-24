import React from 'react'
import ThemeToggle from '@/components/ThemeToggle'; // Adjust path if your toggle is elsewhere

export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 relative overflow-hidden">
        {/* Absolute Theme Toggle at top right for easy access */}
        <div className="absolute top-6 right-6 z-50">
            <ThemeToggle />
        </div>

        {/* Decorative Background Elements (Cyberpunk Glow) */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

        {/* Brand Header */}
        <div className="mb-8 text-center z-10">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
                ToolVerse
            </h1>
            <p className="text-base-content/60">AI-Powered Video & Image Suite</p>
        </div>

        {/* The Auth Form Container */}
        <div className="w-full max-w-md z-10">
            {children}
        </div>
      </div>
    )
  }