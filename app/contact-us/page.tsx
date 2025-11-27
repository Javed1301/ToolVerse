"use client";

import Navbar from "@/components/Navbar";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        alert('Error sending message.');
      }
    } catch (error) {
      alert('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // 1. CHANGED: Uses base-100 (bg) and base-content (text) for theming
    <div className="min-h-screen bg-base-100 text-base-content selection:bg-primary/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid md:grid-cols-2 gap-12">
        
        {/* Left Side: Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Get in touch
          </h1>
          <p className="opacity-70 text-lg mb-8">
            Have a suggestion for a new tool? Found a bug? 
            Or just want to say hi? I'd love to hear from you.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 opacity-80">
              {/* Uses Primary Color */}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm opacity-70">Email me at</p>
                <p className="font-medium">support@toolverse.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 opacity-80">
              {/* Uses Secondary Color */}
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm opacity-70">Location</p>
                <p className="font-medium">Student Campus, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        {/* Uses base-200 for the card background */}
        <div className="bg-base-200 border border-base-300 p-8 rounded-2xl shadow-sm">
            {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
                        <Send className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="opacity-70">Thanks for reaching out. I'll get back to you soon.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-sm text-primary hover:underline"
                    >
                      Send another message
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium opacity-70 mb-2">Your Name</label>
                      <input 
                          type="text" 
                          name="name" 
                          required
                          // Uses base-100 for input bg
                          className="w-full bg-base-100 border border-base-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                          placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium opacity-70 mb-2">Email Address</label>
                      <input 
                          type="email" 
                          name="email"
                          required
                          className="w-full bg-base-100 border border-base-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                          placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium opacity-70 mb-2">Message</label>
                      <textarea 
                          rows={4}
                          name="message"
                          required
                          className="w-full bg-base-100 border border-base-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                          placeholder="I have an idea for a new tool..."
                      ></textarea>
                    </div>
                    
                    {/* Bot protection */}
                    <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn btn-primary font-bold py-3 rounded-lg flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                </form>
            )}
        </div>

      </main>
    </div>
  );
}