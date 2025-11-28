"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { ImageIcon, FileVideo, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

// --- Configuration ---
const SOCIAL_FORMATS = {
  "Instagram Square": { aspectRatio: "1/1", label: "1:1" },
  "Instagram Portrait": { aspectRatio: "4/5", label: "4:5" },
  "Facebook Story": { aspectRatio: "9/16", label: "9:16" },
  "Twitter Header": { aspectRatio: "3/1", label: "3:1" },
  "LinkedIn Banner": { aspectRatio: "4/1", label: "4:1" },
};

// --- Components ---

const ResizerPreview = ({ isHovered }: { isHovered: boolean }) => {
  const [formatIndex, setFormatIndex] = useState(0);
  const formats = Object.values(SOCIAL_FORMATS);

  useEffect(() => {
    if (!isHovered) {
      setFormatIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setFormatIndex((prev) => (prev + 1) % formats.length);
    }, 800);
    return () => clearInterval(interval);
  }, [isHovered, formats.length]);

  const currentFormat = formats[formatIndex];

  return (
    // CHANGED: bg-gray-900 -> bg-base-300 (Inner preview area)
    <div className="w-full h-48 bg-base-300 rounded-t-xl flex items-center justify-center p-6 overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <motion.div
        initial={false}
        animate={{
          aspectRatio: isHovered ? currentFormat.aspectRatio : "16/9",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        // CHANGED: border-white/10 -> border-base-100/20
        className="w-full max-w-[180px] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-2xl relative flex items-center justify-center border border-base-100/20 z-10"
      >
        <ImageIcon className="text-white/80 w-8 h-8" />
        
        <motion.div 
            key={currentFormat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 bg-base-100 text-xs font-bold px-2 py-1 rounded-full border border-base-200 shadow-sm"
        >
            {isHovered ? currentFormat.label : "Original"}
        </motion.div>
      </motion.div>
    </div>
  );
};

const CompressionPreview = ({ isHovered }: { isHovered: boolean }) => {
  return (
    // CHANGED: bg-gray-900 -> bg-base-300
    <div className="w-full h-48 bg-base-300 rounded-t-xl flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="flex items-center gap-4 z-10">
            <motion.div
                animate={{ 
                    scale: isHovered ? 0.8 : 1,
                    opacity: isHovered ? 0.5 : 1
                }}
                className="w-20 h-24 bg-base-100 rounded-lg flex flex-col items-center justify-center border border-base-200 shadow-sm"
            >
                <FileVideo className="text-base-content/50 w-8 h-8 mb-2" />
                <span className="text-[10px] opacity-60">120 MB</span>
            </motion.div>

            <ArrowRight className="text-base-content/30 w-5 h-5" />

            <motion.div
                initial={{ scale: 0.5, opacity: 0.5 }}
                animate={{ 
                    scale: isHovered ? 1.1 : 0.8,
                    opacity: isHovered ? 1 : 0.5,
                    borderColor: isHovered ? "#10b981" : "transparent"
                }}
                className="w-16 h-20 bg-base-100 rounded-lg flex flex-col items-center justify-center border border-base-200 relative shadow-sm"
            >
                {isHovered && (
                    <motion.div 
                        layoutId="sparkle"
                        className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold"
                    >
                        ✓
                    </motion.div>
                )}
                <FileVideo className={`w-6 h-6 mb-1 ${isHovered ? 'text-emerald-500' : 'text-base-content/50'}`} />
                <span className={`text-[10px] ${isHovered ? 'text-emerald-500' : 'opacity-60'}`}>
                    15 MB
                </span>
            </motion.div>
        </div>
    </div>
  );
};

const ServiceCard = ({ 
    title, 
    description, 
    href, 
    previewComponent: Preview 
}: { 
    title: string; 
    description: string; 
    href: string; 
    previewComponent: React.ElementType 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { userId } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (!userId) {
      router.push("/sign-in");
    } else {
      router.push(href);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // CHANGED: bg-gray-900 -> bg-base-200
      // CHANGED: border-gray-800 -> border-base-300
      className="group relative bg-base-200 border border-base-300 hover:border-primary/50 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full max-w-sm"
    >
      <Preview isHovered={isHovered} />

      <div className="p-6">
        {/* CHANGED: text-white -> text-base-content */}
        <h3 className="text-xl font-bold text-base-content mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {/* CHANGED: text-gray-400 -> opacity-70 */}
        <p className="text-base-content/70 text-sm leading-relaxed mb-4">
          {description}
        </p>
        
        <div className="flex items-center text-sm font-medium text-base-content/50 group-hover:text-primary transition-colors">
          <span>Try {title}</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---

export default function LandingPage() {
  return (
    // 1. CHANGED: bg-black -> bg-base-100
    // 2. CHANGED: text-white -> text-base-content
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col items-center justify-center p-8">
      <Navbar />
      
      {/* Hero Header */}
      <div className="text-center max-w-2xl mb-16 pt-20">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
          Media Tools for Creators
        </h1>
        <p className="text-base-content/70 text-lg">
          Smart, fast, and secure tools to optimize your workflow. 
          Select a tool below to get started.
        </p>
      </div>

      {/* The Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        <ServiceCard
          title="Smart Video Compression"
          description="Reduce file size by up to 90% without losing visible quality. Perfect for WhatsApp, Email, and Discord sharing."
          href="/video-upload"
          previewComponent={CompressionPreview}
        />

        <ServiceCard
          title="Social Media Resizer"
          description="Automatically crop and resize your images for Instagram, Twitter, LinkedIn and more. Supports all aspect ratios."
          href="/social-share"
          previewComponent={ResizerPreview}
        />

      </div>
    </div>
  );
}