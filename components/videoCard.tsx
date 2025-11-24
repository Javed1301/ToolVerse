"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import { Video } from "@prisma/client";
import { Download, Clock, FileUp, FileDown, PlayCircle } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { filesize } from "filesize";

dayjs.extend(relativeTime);

interface VideoCardProps {
  video: Video;
  onDownload: (url: string, title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const getThumbnailUrl = useCallback((publicId: string) => {
    return getCldImageUrl({
      src: publicId,
      width: 400,
      height: 225,
      crop: "fill",
      gravity: "auto",
      format: "jpg",
      quality: "auto",
      assetType: "video",
    });
  }, []);

  const getFullVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 1920,
      height: 1080,
    });
  }, []);

  const getPreviewVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 400,
      height: 225,
      rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"],
    });
  }, []);

  const formatSize = useCallback((sizeInBytes: number) => {
    return filesize(sizeInBytes);
  }, []);

  const formatDuration = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const compressionPercentage = Math.round(
    (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
  );

  return (
    <div
      className="card bg-base-100 shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 border border-base-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className="relative aspect-video bg-base-300">
        {isHovered && !previewError ? (
          <video
            src={getPreviewVideoUrl(video.publicId)}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
            onError={() => setPreviewError(true)}
          />
        ) : (
          <img
            src={getThumbnailUrl(video.publicId)}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <Clock size={12} />
          {formatDuration(video.duration)}
        </div>
      </figure>

      <div className="card-body p-5">
        <div className="flex justify-between items-start">
            <h2 className="card-title text-lg font-bold line-clamp-1 text-base-content">
            {video.title}
            </h2>
            <div className={`badge badge-sm ${compressionPercentage > 0 ? 'badge-accent' : 'badge-ghost'}`}>
                {compressionPercentage > 0 ? `-${compressionPercentage}%` : '0%'}
            </div>
        </div>
        
        <p className="text-sm text-base-content/70 line-clamp-2 min-h-[2.5rem]">
          {video.description || "No description provided."}
        </p>

        {/* File Size Stats */}
        <div className="grid grid-cols-2 gap-2 my-2 bg-base-200/50 p-2 rounded-lg text-xs">
            <div className="flex flex-col">
                <span className="text-base-content/50 flex items-center gap-1"><FileUp size={12}/> Original</span>
                <span className="font-mono">{formatSize(Number(video.originalSize))}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-base-content/50 flex items-center gap-1"><FileDown size={12}/> Compressed</span>
                <span className="font-mono text-accent">{formatSize(Number(video.compressedSize))}</span>
            </div>
        </div>

        <div className="card-actions justify-between items-center mt-2">
            <span className="text-xs text-base-content/50">
                {dayjs(video.createdAt).fromNow()}
            </span>
            <button
                className="btn btn-primary btn-sm gap-2"
                onClick={() => onDownload(getFullVideoUrl(video.publicId), video.title)}
            >
                <Download size={16} />
                Download
            </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;