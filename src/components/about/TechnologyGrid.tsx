"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "Next.js", desc: "The React framework for the web. Chosen for its unparalleled performance, App Router architecture, and seamless Server Component integration." },
  { name: "React", desc: "The library for web and native user interfaces. Provides the robust component-driven architecture needed for a highly interactive platform." },
  { name: "TypeScript", desc: "Strongly typed programming language that builds on JavaScript. Ensures type safety and highly reliable data structures across the application." },
  { name: "Tailwind CSS", desc: "Utility-first CSS framework. Enables rapid development of the bespoke luxury aesthetic and complex glassmorphism effects without heavy stylesheets." },
  { name: "Framer Motion", desc: "Production-ready animation library. Powers the tactile microinteractions, 3D hover physics, and cinematic scroll reveals." },
  { name: "TMDB API", desc: "The Movie Database. Provides the comprehensive, high-quality metadata and imagery required to build out the global cinema archive." },
  { name: "Supabase", desc: "The open source Firebase alternative. Chosen for its scalable PostgreSQL database to securely manage user profiles, tickets, and vaults." },
  { name: "Vercel", desc: "The Frontend Cloud. Provides edge-network deployment, ensuring the platform remains blazingly fast for cinephiles anywhere in the world." },
];

export function TechnologyGrid() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
      <div className="mb-16 text-center">
        <h2 className="font-display text-4xl font-bold mb-4">The Technology</h2>
        <p className="text-gray-400 font-light max-w-2xl mx-auto">FilmPass is built on a modern, highly optimized stack designed to deliver a premium, app-like experience on the web.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {technologies.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-colors flex flex-col h-full"
          >
            <h3 className="font-display text-2xl font-bold mb-4 text-white">{tech.name}</h3>
            <p className="text-gray-400 font-light leading-relaxed flex-1">{tech.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
