"use client";

import { Spotlight } from "@/components/ui/spotlight-new";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import dynamic from "next/dynamic";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedBibNo = bibNo.trim().replace(/\s+/g, ''); // Remove all spaces
    if (cleanedBibNo) {
      setShowPDF(true);
    }
  };

  const handleBack = () => {
    setShowPDF(false);
  };

  // Clean spaces as user types
  const handleBibChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, ''); // Remove spaces while typing
    setBibNo(value);
  };

  return (
    <div className="h-screen w-screen overflow-hidden fixed inset-0 bg-black bg-grid-white/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-10 w-full h-full">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
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
                    className="w-full bg-gradient-to-br from-neutral-50 to-neutral-400 text-black font-semibold h-10 rounded-md transition-all hover:opacity-90 hover:scale-[0.98] active:scale-[0.97]"
                  >
                    Get BIB
                  </button>
                </div>
              </form>
            ) : (
              <PDFViewer 
                bibNo={bibNo.trim().replace(/\s+/g, '')} 
                onBack={handleBack}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
