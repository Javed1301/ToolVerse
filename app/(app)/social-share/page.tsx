"use client";

import React, { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";
import { Download, Image as ImageIcon, RefreshCw, Upload } from "lucide-react";

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Facebook Story (9:16)": { width: 1080, height: 1920, aspectRatio: "9:16" },
  "Twitter Post (16:9)": { width: 1024, height: 512, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "YouTube Thumbnail (16:9)": { width: 1280, height: 720, aspectRatio: "16:9" },
  "LinkedIn Banner (4:1)": { width: 1584, height: 396, aspectRatio: "4:1" },
};

type SocialFormat = keyof typeof socialFormats;

export default function SocialShare() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (uploadedImage) setIsTransforming(true);
  }, [selectedFormat, uploadedImage]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      setUploadedImage(data.publicId);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;
    fetch(imageRef.current.src)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="container mx-auto p-4 h-full">
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        
        {/* Left: Controls */}
        <div className="lg:w-1/3 flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Social Studio</h1>
                <p className="text-base-content/60">Resize and format images for any platform.</p>
            </div>

            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm uppercase tracking-wider opacity-70">1. Upload</h2>
                    <div className="form-control">
                        <label className="btn btn-outline border-dashed border-2 h-20 flex-col gap-2 hover:border-primary hover:text-primary">
                            <Upload size={24}/>
                            <span>{isUploading ? "Uploading..." : "Select Image"}</span>
                            <input type="file" onChange={handleFileUpload} className="hidden" disabled={isUploading}/>
                        </label>
                    </div>

                    {uploadedImage && (
                        <>
                            <div className="divider"></div>
                            <h2 className="card-title text-sm uppercase tracking-wider opacity-70">2. Format</h2>
                            <div className="form-control">
                                <select
                                    className="select select-bordered w-full"
                                    value={selectedFormat}
                                    onChange={(e) => setSelectedFormat(e.target.value as SocialFormat)}
                                >
                                    {Object.keys(socialFormats).map((format) => (
                                        <option key={format} value={format}>{format}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="card-actions justify-end mt-6">
                                <button className="btn btn-primary w-full" onClick={handleDownload}>
                                    <Download size={18} className="mr-2"/>
                                    Download Result
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>

        {/* Right: Preview Area */}
        <div className="lg:w-2/3 bg-base-200 rounded-2xl border-2 border-dashed border-base-300 flex items-center justify-center relative overflow-hidden min-h-[400px] lg:min-h-screen">
            {!uploadedImage ? (
                <div className="text-center opacity-40">
                    <ImageIcon size={64} className="mx-auto mb-4"/>
                    <p className="text-xl font-semibold">Preview Area</p>
                    <p>Upload an image to see the transformation</p>
                </div>
            ) : (
                <div className="relative p-8 max-w-full max-h-full flex items-center justify-center">
                    {isTransforming && (
                        <div className="absolute inset-0 flex items-center justify-center bg-base-200/80 z-10">
                            <span className="loading loading-infinity loading-lg text-primary"></span>
                        </div>
                    )}
                    <CldImage
                        width={socialFormats[selectedFormat].width}
                        height={socialFormats[selectedFormat].height}
                        src={uploadedImage}
                        sizes="100vw"
                        alt="transformed image"
                        crop="fill"
                        aspectRatio={socialFormats[selectedFormat].aspectRatio}
                        gravity="auto"
                        ref={imageRef}
                        onLoad={() => setIsTransforming(false)}
                        className="rounded-lg shadow-2xl max-w-full max-h-[80vh] object-contain"
                    />
                </div>
            )}
        </div>
      </div>
    </div>
  );
}