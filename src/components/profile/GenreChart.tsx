"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { mockGenreData } from "@/lib/mock-profile";
import { motion } from "framer-motion";

export function GenreChart() {
  return (
    <div className="glass-panel p-8 rounded-3xl border border-white/5 h-[400px] flex flex-col">
      <h3 className="font-display text-2xl font-bold mb-2">Genre Fingerprint</h3>
      <p className="text-sm text-gray-400 mb-6">Your cinematic DNA across {mockGenreData.length} genres.</p>
      
      <div className="flex-1 relative flex items-center justify-center">
        
        {/* Center decorative element */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-32 h-32 rounded-full border border-[#D4AF37]/20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md">
            <span className="font-display font-bold text-3xl">DNA</span>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] mt-1">Verified</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mockGenreData}
              cx="50%"
              cy="50%"
              innerRadius={85}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationBegin={0}
              animationDuration={1500}
            >
              {mockGenreData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  style={{ filter: "drop-shadow(0px 0px 8px rgba(0,0,0,0.5))" }}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(10,10,10,0.9)', 
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                fontFamily: 'var(--font-inter)'
              }}
              itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              formatter={(value: any) => [`${value}%`, 'Distribution']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {mockGenreData.map((genre) => (
          <div key={genre.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: genre.color }} />
            <span className="text-xs text-gray-300 font-medium">{genre.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
