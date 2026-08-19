"use client";

import { useState } from "react";
import { Download, Share2, BookmarkPlus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExportPanelProps {
  onDownloadPNG: () => void;
  onDownloadPDF: () => void;
  onShare: () => void;
}

export function ExportPanel({ onDownloadPNG, onDownloadPDF, onShare }: ExportPanelProps) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCopy = () => {
    onShare();
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mt-12 md:mt-0 md:ml-12 shrink-0">
      
      <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-2xl">
        <h3 className="text-sm font-display uppercase tracking-widest text-muted mb-6">Export Collectible</h3>
        
        <div className="flex flex-col gap-3">
          <Button onClick={onDownloadPNG} size="lg" className="w-full justify-start gap-3 bg-white text-black hover:bg-gray-200">
            <Download className="w-4 h-4" />
            Download High-Res PNG
          </Button>
          
          <Button onClick={onDownloadPDF} variant="outline" size="lg" className="w-full justify-start gap-3 border-white/20 hover:border-white hover:bg-transparent">
            <Download className="w-4 h-4" />
            Download Print PDF
          </Button>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-2xl">
        <h3 className="text-sm font-display uppercase tracking-widest text-muted mb-6">Actions</h3>
        
        <div className="flex flex-col gap-3">
          <Button onClick={handleCopy} variant="glass" size="lg" className="w-full justify-start gap-3">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
            {copied ? "Link Copied!" : "Share Ticket"}
          </Button>
          
          <Button onClick={handleSave} variant="glass" size="lg" className="w-full justify-start gap-3">
            {saved ? <Check className="w-4 h-4 text-green-400" /> : <BookmarkPlus className="w-4 h-4 text-accent" />}
            {saved ? "Saved to Vault" : "Save to Cinema Vault"}
          </Button>
        </div>
      </div>
      
    </div>
  );
}
