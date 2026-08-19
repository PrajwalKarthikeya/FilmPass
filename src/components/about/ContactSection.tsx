"use client";

import { motion } from "framer-motion";
import { Terminal, Hash, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";

const contacts = [
  { name: "GitHub", icon: Terminal, link: "#", desc: "View source and contribute" },
  { name: "Twitter/X", icon: Hash, link: "#", desc: "Follow for updates" },
  { name: "Email", icon: Mail, link: "#", desc: "Partnerships & support" },
  { name: "Feedback", icon: MessageSquare, link: "#", desc: "Request a feature" },
];

export function ContactSection() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4 md:px-8">
      <div className="mb-12">
        <h2 className="font-display text-3xl font-bold mb-2">Get in Touch</h2>
        <div className="w-12 h-[2px] bg-white/20" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {contacts.map((contact, i) => {
          const Icon = contact.icon;
          return (
            <motion.div
              key={contact.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link href={contact.link} className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col items-start hover:border-[#D4AF37]/30 group transition-colors block">
                <Icon className="w-6 h-6 text-gray-500 mb-4 group-hover:text-[#D4AF37] transition-colors" />
                <h3 className="font-bold text-lg mb-1">{contact.name}</h3>
                <p className="text-xs text-gray-400">{contact.desc}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
