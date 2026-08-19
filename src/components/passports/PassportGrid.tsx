"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PassportCard } from "./PassportCard";
import { mockPassports } from "@/lib/mock-passports";

export function PassportGrid({ userProgress }: { userProgress?: any[] }) {
  const router = useRouter();

  // Merge static passport definitions with user progress
  const passportsWithProgress = mockPassports.map(passport => {
    const progressRecord = userProgress?.find(p => p.passport_id === passport.id);
    return {
      ...passport,
      progress: progressRecord ? progressRecord.progress_count : 0,
      status: progressRecord ? progressRecord.status : "in-progress"
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
      {passportsWithProgress.map((passport, i) => (
        <motion.div
          key={passport.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <PassportCard 
            passport={passport as any} 
            onClick={() => router.push(`/passports/${passport.id}`)} 
          />
        </motion.div>
      ))}
    </div>
  );
}
