"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SeatPickerProps {
  selectedSeat: string;
  onSeatSelect: (seat: string) => void;
}

export function SeatPicker({ selectedSeat, onSeatSelect }: SeatPickerProps) {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const cols = Array.from({ length: 20 }, (_, i) => i + 1);

  const [takenSeats, setTakenSeats] = useState<Set<string>>(new Set());

  // Generate random taken seats only on client to avoid hydration mismatch
  useEffect(() => {
    const taken = new Set<string>();
    for (let i = 0; i < 40; i++) {
      const r = rows[Math.floor(Math.random() * rows.length)];
      const c = cols[Math.floor(Math.random() * cols.length)];
      taken.add(`${r}${c}`);
    }
    setTakenSeats(taken);
  }, []);

  return (
    <div className="w-full bg-black/40 rounded-2xl p-6 border border-white/5 shadow-inner overflow-hidden">
      <div className="mb-8 relative w-full h-8 flex items-center justify-center">
        <div className="absolute w-[80%] h-full border-t-4 border-white/20 rounded-[50%] blur-[1px] shadow-[0_-10px_20px_rgba(255,255,255,0.1)]" />
        <span className="text-xs uppercase tracking-widest text-muted mt-6">Screen</span>
      </div>

      <div className="overflow-x-auto hide-scrollbar pb-4">
        <div className="min-w-max flex flex-col gap-2">
          {rows.map((row) => (
            <div key={row} className="flex items-center gap-4">
              <span className="w-4 text-xs font-medium text-muted text-right">{row}</span>
              <div className="flex gap-2">
                {cols.map((col) => {
                  const seatId = `${row}${col}`;
                  const isTaken = takenSeats.has(seatId);
                  const isSelected = selectedSeat === seatId;
                  
                  // Add realistic aisle gap
                  const isAisle = col === 5 || col === 15;

                  return (
                    <div key={seatId} className={cn("flex", isAisle && "mr-6")}>
                      <button
                        disabled={isTaken}
                        onClick={() => onSeatSelect(seatId)}
                        className={cn(
                          "w-6 h-6 rounded-t-lg rounded-b-sm transition-all duration-300 relative group",
                          isTaken 
                            ? "bg-white/5 cursor-not-allowed" 
                            : isSelected 
                              ? "bg-accent shadow-[0_0_10px_rgba(229,184,105,0.5)]" 
                              : "bg-white/20 hover:bg-white/40 cursor-pointer"
                        )}
                        aria-label={`Seat ${seatId}`}
                      >
                        {isSelected && (
                          <motion.div 
                            layoutId="selectedSeat" 
                            className="absolute inset-0 border-2 border-accent rounded-t-lg rounded-b-sm pointer-events-none"
                          />
                        )}
                        {/* Tooltip on hover */}
                        {!isTaken && !isSelected && (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                            {seatId}
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
              <span className="w-4 text-xs font-medium text-muted">{row}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex justify-center gap-8 text-xs text-muted">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-white/20" /> Available
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-accent" /> Selected
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-t-sm bg-white/5" /> Taken
        </div>
      </div>
    </div>
  );
}
