"use client";

import { Search, Filter } from "lucide-react";

export function PassportSearch() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 mb-12">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-500" />
        </div>
        <input 
          type="text" 
          placeholder="Search passports (e.g., Nolan, Japan, Horror)..." 
          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-transparent transition-all glass-panel"
        />
      </div>
      
      <div className="flex gap-2">
        <select className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 appearance-none cursor-pointer glass-panel hidden sm:block">
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="locked">Locked</option>
        </select>
        
        <button className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-colors flex items-center gap-2 glass-panel">
          <Filter className="w-5 h-5" />
          <span className="hidden sm:block">Filters</span>
        </button>
      </div>
    </div>
  );
}
