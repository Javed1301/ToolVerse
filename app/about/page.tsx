"use client";

import Navbar from "@/components/Navbar";
import { Code2, Globe, ShieldCheck, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    // 1. CHANGED: bg-black -> bg-base-100 (Adapts to theme)
    // 2. CHANGED: text-white -> text-base-content (Adapts to theme)
    <div className="min-h-screen bg-base-100 text-base-content selection:bg-primary/30">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            We Build Tools for Creators
          </h1>
          <p className="text-xl opacity-70 leading-relaxed">
            ToolVerse started with a simple mission: Make powerful media tools accessible to everyone, for free, directly in the browser.
          </p>
        </div>

        {/* Mission Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          
          {/* Card 1 */}
          {/* CHANGED: bg-white/5 -> bg-base-200 (Card background) */}
          {/* CHANGED: border-white/10 -> border-base-300 */}
          <div className="p-6 rounded-2xl bg-base-200 border border-base-300 hover:border-primary/50 transition duration-300 shadow-sm">
            <Zap className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
            <p className="opacity-70">
              We don't rely on slow queues. Our hybrid C++ engine processes your files instantly.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-base-200 border border-base-300 hover:border-primary/50 transition duration-300 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Privacy First</h3>
            <p className="opacity-70">
              Your files are your business. We process them securely and delete them automatically after 24 hours.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-base-200 border border-base-300 hover:border-primary/50 transition duration-300 shadow-sm">
            <Globe className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Universal Access</h3>
            <p className="opacity-70">
              Whether you are a student, a YouTuber, or a developer, our tools are designed to work for you.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-base-200 border border-base-300 hover:border-primary/50 transition duration-300 shadow-sm">
            <Code2 className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Open Innovation</h3>
            <p className="opacity-70">
              Built using modern tech like Next.js, Docker, and FFmpeg to push the boundaries of web apps.
            </p>
          </div>
        </div>

        {/* Team Section */}
        {/* CHANGED: border-white/10 -> border-base-300 */}
        <div className="text-center border-t border-base-300 pt-16">
          <h2 className="text-2xl font-bold mb-4">Who is behind ToolVerse?</h2>
          <p className="opacity-70 max-w-2xl mx-auto">
            ToolVerse is built and maintained by <strong>Javed</strong>. 
            I am a student developer passionate about System Design, C++, and Web Technologies.
          </p>
        </div>

      </main>
    </div>
  );
}