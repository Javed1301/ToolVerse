"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Upload, FileVideo, CheckCircle2, AlertCircle } from "lucide-react";

export default function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const router = useRouter();
  const maxFileSize = 70 * 1024 * 1024; // 70MB

  // Handle Drag Events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile.type.startsWith("video/")) {
             setFile(droppedFile);
        } else {
            alert("Please upload a video file");
        }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > maxFileSize) {
      alert("File size exceeds 70MB limit");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      await axios.post("/api/video-upload", formData);
      router.push("/home");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Upload New Video</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Title Input */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Video Title</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full focus:input-primary transition-all"
            placeholder="Enter a catchy title"
            required
          />
        </div>

        {/* Description Input */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Description</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered h-24 focus:textarea-primary transition-all"
            placeholder="What is this video about?"
          />
        </div>

        {/* Drag & Drop Zone */}
        <div 
            className={`relative border-2 border-dashed rounded-xl p-10 transition-all duration-300 text-center
            ${dragActive ? 'border-primary bg-primary/10' : 'border-base-300 hover:border-primary/50'}
            ${file ? 'bg-base-200 border-success' : ''}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input 
                type="file" 
                accept="video/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
            />
            
            <div className="flex flex-col items-center justify-center gap-4 pointer-events-none">
                {file ? (
                    <>
                        <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center text-success">
                            <CheckCircle2 size={32} />
                        </div>
                        <div>
                            <p className="font-bold text-lg">{file.name}</p>
                            <p className="text-sm text-base-content/60">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                    </>
                ) : (
                    <>
                         <div className="w-16 h-16 rounded-full bg-base-300 flex items-center justify-center">
                            <Upload size={32} className="text-base-content/50"/>
                        </div>
                        <div>
                            <p className="font-bold text-lg">Click or Drag video here</p>
                            <p className="text-sm text-base-content/60">MP4, MOV, AVI up to 70MB</p>
                        </div>
                    </>
                )}
            </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full btn-lg"
          disabled={!file || isUploading}
        >
          {isUploading ? (
            <>
              <span className="loading loading-spinner"></span>
              Compressing & Uploading...
            </>
          ) : (
            <>
                <FileVideo className="mr-2"/>
                Start Compression
            </>
          )}
        </button>
      </form>
    </div>
  );
}