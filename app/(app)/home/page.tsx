"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VideoCard from "@/components/videoCard"; // Ensure casing matches your file
import { Video } from "@prisma/client";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get("/api/videos");
      if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title}.mp4`);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-base-300 pb-5">
        <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Dashboard
            </h1>
            <p className="text-base-content/60 mt-2">Manage your compressed video assets</p>
        </div>
      </div>

      {/* Content */}
      {error && (
        <div className="alert alert-error">
            <span>{error}</span>
        </div>
      )}

      {videos.length === 0 && !error ? (
        <div className="text-center py-20 opacity-50">
          <p className="text-xl">No videos found</p>
          <p className="text-sm">Upload a video to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} onDownload={handleDownload} />
          ))}
        </div>
      )}
    </div>
  );
}