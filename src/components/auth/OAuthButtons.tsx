"use client";

import { createClient } from "@/lib/supabase/client";

export function OAuthButtons() {
  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });
  };

  const handleGithubLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });
  };

  return (
    <div className="w-full space-y-3">
      <button 
        onClick={handleGoogleLogin}
        className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors flex items-center justify-center gap-3 text-sm font-medium"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
          <path d="M12.0003 10.5126V13.7997H18.7303C18.4357 15.6565 16.8906 17.0706 14.8876 17.471C12.1963 18.0094 9.53931 16.1432 9.17646 13.4323C8.81362 10.7214 10.7424 8.28318 13.4533 7.92033C14.7302 7.74936 15.986 8.1691 16.9205 9.04944L19.2625 6.70739C17.4812 5.04259 14.9352 4.09337 12.2471 4.39868C8.01258 4.87974 4.70773 8.35824 4.4172 12.5975C4.05389 17.8997 8.54911 22.3949 13.8513 22.0316C17.4691 21.7832 20.3705 19.3332 21.285 15.8672C21.6738 14.3942 21.6881 12.8277 21.3252 11.3547H12.0003V10.5126Z" fill="currentColor"/>
          <path d="M12 4.19995C14.1 4.19995 15.9 4.89995 17.3 6.09995L20.2 3.19995C18 1.19995 15.1 0 12 0C7.3 0 3.2 2.7 1.2 6.79995L4.6 9.39995C5.4 6.39995 8.4 4.19995 12 4.19995Z" fill="#EA4335" />
          <path d="M23.6 12.3C23.6 11.5 23.5 10.7 23.4 9.89995H12V14.6H18.5C18.2 16.1 17.3 17.4 16 18.2L19.5 20.9C21.5 19 22.7 16.4 23.1 13.4C23.3 12.8 23.4 12.5 23.6 12.3Z" fill="#4285F4" />
          <path d="M4.60002 14.6L1.20002 17.2C3.20002 21.3 7.30002 24 12 24C15.2 24 18.1 22.9 20.2 20.9L16.7 18.2C15.4 19.1 13.8 19.6 12 19.6C8.40002 19.6 5.40002 17.4 4.60002 14.6Z" fill="#34A853" />
          <path d="M5.4 10.5C5.2 11 5.1 11.5 5.1 12C5.1 12.5 5.2 13 5.4 13.5L2 16.1C1.3 14.9 0.900002 13.5 0.900002 12C0.900002 10.5 1.3 9.10001 2 7.90001L5.4 10.5Z" fill="#FBBC05" />
        </svg>
        Continue with Google
      </button>

      <button 
        onClick={handleGithubLogin}
        className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors flex items-center justify-center gap-3 text-sm font-medium"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
        Continue with GitHub
      </button>
    </div>
  );
}
