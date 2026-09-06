"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 transition-all duration-300",
        scrolled ? "bg-black/40 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="flex-1">
        <Link href="/" className="text-2xl font-display font-semibold tracking-wide text-white">
          FILMPASS
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-secondary">
        <Link href="/" className="text-white hover:text-accent transition-colors relative group">Home<span className="absolute left-0 -bottom-1 w-full h-0.5 bg-accent/30 transition-all duration-300 group-hover:bg-accent group-hover:w-full"></span></Link>
        <Link href="/vault" className="hover:text-white transition-colors relative group">Vault<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span></Link>
        <Link href="/vault#collections" className="hover:text-white transition-colors relative group">Collections<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span></Link>
        <Link href="/screening" className="hover:text-white transition-colors relative group">Theatres<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span></Link>
        <Link href="/passports" className="hover:text-white transition-colors relative group">Passport<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span></Link>
        <Link href="/profile" className="hover:text-white transition-colors relative group">Profile<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span></Link>
        <Link href="/about" className="hover:text-white transition-colors relative group">About<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span></Link>
      </div>

      <div className="flex-1 flex justify-end items-center space-x-6">
        <Link href="/search" className="group text-secondary hover:text-white transition-colors" aria-label="Search movies">
          <Search className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
        </Link>
        
        {user ? (
          <div className="flex items-center gap-4">
            <Link href="/profile" className="w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-colors flex items-center justify-center bg-white/5">
              {user.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-gray-400" />
              )}
            </Link>
            <button onClick={handleLogout} className="group text-secondary hover:text-white transition-colors" aria-label="Logout" title="Logout">
              <LogOut className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <Link href="/login" className="text-secondary hover:text-white transition-colors flex items-center gap-2" aria-label="Login to your account">
            <User className="w-5 h-5" aria-hidden="true" />
            <span className="hidden md:inline text-sm font-medium">Login</span>
          </Link>
        )}
      </div>
    </motion.nav>
  );
}
