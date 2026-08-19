"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { question: "Is this real ticket booking?", answer: "No. FilmPass is a platform for generating digital, highly collectible memorabilia. We do not sell real tickets to actual screenings." },
  { question: "Can I print my tickets?", answer: "Yes! While designed for the digital Cinema Vault, all tickets can be exported as high-resolution PNG or PDF files perfect for physical printing and framing." },
  { question: "How are movies sourced?", answer: "All movie metadata, posters, and backdrops are sourced in real-time from TMDB (The Movie Database), ensuring our catalog is always up to date." },
  { question: "Is this free?", answer: "Yes. FilmPass is a completely free, open-source project created out of love for cinema." },
  { question: "How do Cinema Passports work?", answer: "Passports are unlocked by generating tickets that meet specific criteria (e.g., generating 12 tickets for Christopher Nolan films). They act as themed collections and guides to discover more films." },
  { question: "Can I upload custom theatres?", answer: "Currently, you can select from a curated list of iconic theatres. Custom theatre uploads are planned for a future update." },
  { question: "Will social features be added?", answer: "We are actively exploring Version 2 of FilmPass, which will include optional social features like public profiles, following friends, and sharing collections, while maintaining our minimalist aesthetic." },
  { question: "Can I suggest features?", answer: "Absolutely! We'd love to hear your ideas. You can reach out to us on GitHub or via our Feedback form." }
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 max-w-3xl mx-auto px-4 md:px-8">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl font-bold mb-4">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="glass-panel border border-white/5 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-white/5 transition-colors"
            >
              <span className="font-display font-bold text-lg">{faq.question}</span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="p-6 pt-0 text-gray-400 font-light leading-relaxed border-t border-white/5 mt-2">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
