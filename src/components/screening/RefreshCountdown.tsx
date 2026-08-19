"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export function RefreshCountdown() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Calculate next Monday at 00:00
      const nextRefresh = new Date();
      nextRefresh.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7 || 7));
      nextRefresh.setHours(0, 0, 0, 0);

      const difference = nextRefresh.getTime() - now.getTime();
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-mono text-white/70 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 w-max shadow-lg">
      <Clock className="w-3 h-3 text-[#D4AF37]" />
      <span>Refreshes in {timeLeft}</span>
    </div>
  );
}
