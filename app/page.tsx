"use client";

import { Spotlight } from "@/components/ui/spotlight-new";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";

// Dynamically import react-pdf components to avoid hydration errors
const PDFViewer = dynamic(() => import("@/components/PDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-neutral-400">Loading PDF viewer...</div>
    </div>
  ),
});

export default function Home() {
  const [bibNo, setBibNo] = useState("");
  const [showPDF, setShowPDF] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bibNo) return;

    setLoading(true);
    try {
      // Get the public URL for the BIB
      const { data } = supabase.storage
        .from("bibs")
        .getPublicUrl(`${bibNo}.pdf`);

      if (data?.publicUrl) {
        // Check if the file exists
        const response = await fetch(data.publicUrl, { method: 'HEAD' });
        if (response.ok) {
          setShowPDF(true);
        } else {
          alert("BIB not found. Please check your BIB number and try again.");
        }
      } else {
        alert("BIB not found. Please check your BIB number and try again.");
      }
    } catch (err) {
      console.error("Error checking BIB:", err);
      alert("Error checking BIB. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowPDF(false);
  };

  const handleBibChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove spaces and capitalize first letter if it exists
    const formattedValue = value
      .replace(/\s+/g, '') // Remove all spaces
      .replace(/^[a-z]/, (letter) => letter.toUpperCase()); // Capitalize first letter
    
    setBibNo(formattedValue);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden fixed inset-0 bg-black bg-grid-white/[0.2] relative flex items-center justify-center">
      {/* Modified gradient for cherry-magenta mix */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-gradient-to-b from-rose-600/50 via-pink-600/30 to-transparent"></div>
      <div className="relative z-10 w-full h-full">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="rgb(244, 63, 94)" // Changed to rose-500 for bright cherry red
        />
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="w-[400px] max-h-[90vh] space-y-6 bg-black/30 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/10 shadow-[0_0_1000px_0_rgba(0,0,0,0.3)] relative">
            {!showPDF ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 text-center">
                  <h1 className="text-2xl sm:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                    GIGABYTE Presents
                  </h1>
                  <h2 className="text-xl sm:text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                    RunRise Nation Noboborsho Run 1432
                  </h2>
                  <p className="text-neutral-300 text-lg">BIB Download</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bib" className="text-neutral-200">
                      Enter Your BIB No
                    </Label>
                    <Input
                      id="bib"
                      value={bibNo}
                      onChange={handleBibChange}
                      placeholder="Enter your BIB number"
                      type="text"
                      className="text-center bg-black/50 border-white/10 text-white placeholder:text-neutral-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-br from-neutral-50 to-neutral-400 text-black font-semibold h-10 rounded-md transition-all hover:opacity-90 hover:scale-[0.98] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Checking..." : "Get BIB"}
                  </button>
                </div>
              </form>
            ) : (
              <PDFViewer 
                bibNo={bibNo.trim().replace(/\s+/g, '')} 
                onBack={handleBack}
              />
            )}

            <div className="absolute -bottom-20 left-0 right-0 text-center">
              <p className="text-white/20 text-sm mix-blend-overlay">
                A{" "}
                <a 
                  href="https://www.facebook.com/hasin.innit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/30 transition-colors underline underline-offset-2"
                >
                  Hasin Raiyan
                </a>
                {" "}Creation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
