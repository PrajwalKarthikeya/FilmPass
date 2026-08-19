"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { ExtendedMovieDetails } from "@/lib/tmdb";
import { HighResTicket } from "./HighResTicket";
import { ExportPanel } from "./ExportPanel";

interface TicketBuilderProps {
  movie: ExtendedMovieDetails;
  theatre: string;
  date: string;
  time: string;
  screen: string;
  seat: string;
  style: string;
  serial: string;
}

export function TicketBuilder(props: TicketBuilderProps) {
  const [animating, setAnimating] = useState(true);
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 11-step build animation sequence
    const sequence = [
      400,  // 1: Paper fades in
      300,  // 2: Borders print
      300,  // 3: Poster appears
      300,  // 4: Title types in
      300,  // 5: Theatre info
      400,  // 6: Date/Time/Seat
      200,  // 7: Collector edition
      300,  // 8: Serial prints
      200,  // 9: QR fades in
      300,  // 10: Badge stamps
      0     // 11: Final
    ];

    let currentTimeout: NodeJS.Timeout;
    
    const runSequence = (index: number) => {
      if (index >= sequence.length) {
        setAnimating(false);
        return;
      }
      setStep(index + 1);
      currentTimeout = setTimeout(() => runSequence(index + 1), sequence[index]);
    };

    runSequence(0);

    return () => clearTimeout(currentTimeout);
  }, []);

  const handleDownloadPNG = async () => {
    const node = document.getElementById("export-ticket");
    if (!node) return;

    try {
      // 4000px width target, node is 600px wide. 4000 / 600 ≈ 6.66 pixelRatio
      const dataUrl = await toPng(node, {
        pixelRatio: 7,
        cacheBust: true,
        style: { transform: 'scale(1)', transformOrigin: 'top left' }
      });
      
      const link = document.createElement("a");
      link.download = `filmpass-${props.serial}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export PNG:", err);
    }
  };

  const handleDownloadPDF = async () => {
    const node = document.getElementById("export-ticket");
    if (!node) return;

    try {
      // Render to image first for perfect styling capture
      const dataUrl = await toPng(node, { pixelRatio: 4, cacheBust: true });
      
      // A4 size: 210 x 297 mm
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Node is 600px wide. Let's scale it to fit nicely on A4 width with margins.
      // 600px * 1.5 ratio ≈ 900px height.
      const imgProps = pdf.getImageProperties(dataUrl);
      const imgRatio = imgProps.height / imgProps.width;
      
      const targetWidth = 140; // mm
      const targetHeight = targetWidth * imgRatio;
      
      const x = (pdfWidth - targetWidth) / 2;
      const y = (pdfHeight - targetHeight) / 2;

      pdf.addImage(dataUrl, 'PNG', x, y, targetWidth, targetHeight);
      pdf.save(`filmpass-${props.serial}.pdf`);
    } catch (err) {
      console.error("Failed to export PDF:", err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `My Cinema Ticket: ${props.movie.title}`,
        text: `Check out my unique collectible cinema ticket for ${props.movie.title}!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      
      {/* Background Particles & Spotlights */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] flex flex-col md:flex-row items-center md:items-start justify-center gap-12">
        
        {/* Ticket Container */}
        <div ref={containerRef} className="relative perspective-1000">
          
          <AnimatePresence>
            {animating && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-accent/80 font-mono text-sm tracking-widest uppercase flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Preparing your collectible...
              </motion.div>
            )}
          </AnimatePresence>

          {/* The High-Res Ticket wrapped in Framer Motion for entrance */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ 
              opacity: step >= 1 ? 1 : 0, 
              y: step >= 1 ? 0 : 50,
              rotateX: step >= 11 ? 0 : 20,
              filter: step >= 11 ? 'blur(0px)' : 'blur(4px)'
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="group preserve-3d"
          >
            {/* 3D floating effect when not animating */}
            <motion.div
              animate={animating ? {} : { y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="pointer-events-none transition-transform duration-700 ease-out group-hover:rotate-x-12 group-hover:-rotate-y-12">
                <HighResTicket {...props} />
                
                {/* Visual Overlay to simulate printing steps over the HighResTicket */}
                {animating && (
                  <motion.div 
                    className="absolute inset-0 bg-[#0A0A0A] z-50 origin-bottom"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: step >= 2 ? 0 : 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Export Panel fades in at the very end */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: step >= 11 ? 1 : 0, x: step >= 11 ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={!animating ? "pointer-events-auto" : "pointer-events-none"}
        >
          <ExportPanel 
            onDownloadPNG={handleDownloadPNG}
            onDownloadPDF={handleDownloadPDF}
            onShare={handleShare}
          />
        </motion.div>

      </div>

      {/* Skip Animation Button */}
      <AnimatePresence>
        {animating && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setStep(11)}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-muted hover:text-white transition-colors border-b border-transparent hover:border-white pb-1 z-50"
          >
            Skip Animation
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
