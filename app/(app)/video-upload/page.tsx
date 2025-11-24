"use client"
import React,{useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'


function VideoUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isUploading,setisUploading] = useState<boolean>(false)
  const router = useRouter()

  const maxFileSize = 70 * 1024 * 1024 // 70MB

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      alert('Please select a video file to upload.')
      return
    }
    if (file.size > maxFileSize) {
      //Add a notification here in place of alert
      alert('File size exceeds the 70MB limit.')
      return
    }

    setisUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('originalSize', file.size.toString())

    try {
        const response = await axios.post('/api/video-upload',formData);
        //check the response and notify user of success
        if(response.status === 200){
          //Add a notification here in place of alert you can use react Hot-toast
          alert('Video uploaded successfully!')
        }
        router.push("/")
    } catch (error) {
      console.log('Error uploading video:', error)
      //Add a notification here in place of alert
      alert('Error uploading video. Please try again.')
    }finally{
      setisUploading(false)
    }

  }

  return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Video File</span>
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="file-input file-input-bordered w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Video"}
            </button>
          </form>
        </div>
      );
}

export default VideoUpload