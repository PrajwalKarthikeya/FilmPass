import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { OAuthButtons } from "@/components/auth/OAuthButtons";

export const metadata = {
  title: 'Login | FilmPass',
  description: 'Sign in to your Cinema Vault.',
};

export default function LoginPage() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center p-4 md:p-8 relative bg-[#050505]">
      {/* Cinematic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image 
          src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=2000"
          alt="Cinematic Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/30" />
      </div>

      <div className="relative z-10 w-full max-w-md glass-panel p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="font-display font-bold text-2xl tracking-tighter">FilmPass<span className="text-[#D4AF37]">.</span></span>
          </Link>
          <h1 className="font-display text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Enter your credentials to access your vault.</p>
        </div>

        <LoginForm />

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest font-mono">
            <span className="bg-[#121212] px-4 text-gray-500">Or</span>
          </div>
        </div>

        <OAuthButtons />

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/signup" className="text-[#D4AF37] hover:text-white font-bold transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
