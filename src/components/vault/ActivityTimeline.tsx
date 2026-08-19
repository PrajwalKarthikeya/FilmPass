"use client";

import { motion } from "framer-motion";
import { Plus, Ticket, Trophy } from "lucide-react";

export function ActivityTimeline({ tickets }: { tickets?: any[] }) {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-3xl border border-white/5 h-full flex flex-col items-center justify-center text-center">
        <p className="text-gray-400 text-sm">No recent activity. Start collecting to fill your timeline!</p>
      </div>
    );
  }

  // Create timeline events from tickets (taking top 5)
  const activities = tickets.slice(0, 5).map(t => ({
    id: t.id,
    type: "generated",
    title: `Generated ticket for ${t.title}`,
    date: t.created_at ? new Date(t.created_at).toLocaleDateString() : t.date,
    icon: Ticket
  }));

  return (
    <div className="glass-panel p-8 rounded-3xl border border-white/5 h-full">
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-white/10 before:to-transparent">
        {activities.map((activity, i) => {
          const Icon = activity.icon;
          return (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-[#0A0A0A] group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl relative z-10 ml-0 md:ml-0">
                <Icon className="w-3 h-3 text-gray-500 group-hover:text-[#D4AF37] transition-colors" />
              </div>
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-white/5 bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors shadow-sm ml-4 md:ml-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono">{activity.date}</span>
                </div>
                <p className="text-sm text-gray-300">{activity.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
