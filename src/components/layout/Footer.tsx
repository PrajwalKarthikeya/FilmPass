import Link from "next/link";
import { Globe, Mail, Link as LinkIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-12 md:py-20 px-6 md:px-16 mt-32">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-4 max-w-sm">
          <Link href="/" className="text-2xl font-display font-semibold tracking-wide text-white">
            FILMPASS
          </Link>
          <p className="text-secondary text-sm leading-relaxed">
            The premium digital cinema experience. Create, customize, and collect beautiful cinematic tickets for the movies you love.
          </p>
        </div>

        <div className="flex gap-12 md:gap-24">
          <div className="space-y-4">
            <h4 className="font-medium text-white">Explore</h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li><Link href="#" className="hover:text-white transition-colors">Collections</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Theatres</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} FilmPass. All rights reserved. <br className="md:hidden" />
          Data provided by TMDB.
        </p>
        <div className="flex gap-4 text-muted">
          <a href="#" className="hover:text-white transition-colors">
            <Globe className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <LinkIcon className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
