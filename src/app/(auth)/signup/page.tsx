import Image from "next/image";
import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata = {
  title: 'Create Account | FilmPass',
  description: 'Join FilmPass and build your Cinema Vault.',
};

export default function SignupPage() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center p-4 md:p-8 relative bg-[#050505]">
      {/* Cinematic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image 
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000"
          alt="Cinematic Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/30" />
      </div>

      <div className="relative z-10 w-full max-w-lg glass-panel p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="font-display font-bold text-2xl tracking-tighter">FilmPass<span className="text-[#D4AF37]">.</span></span>
          </Link>
          <h1 className="font-display text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-400 text-sm">Start building your digital cinema archive today.</p>
        </div>

        <SignupForm />

        <div className="mt-8 text-center space-y-4">
          <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-[#D4AF37] hover:text-white font-bold transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
