import { Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TicketCTA() {
  return (
    <section className="relative my-24 rounded-3xl overflow-hidden glass-panel border border-white/10 p-12 md:p-16 flex flex-col items-center text-center">
      {/* Decorative Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-inner">
          <Ticket className="w-8 h-8 text-accent" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-6">
          Ready for tonight's screening?
        </h2>
        
        <p className="text-lg md:text-xl text-secondary mb-10">
          Generate your personalized, collectible cinema ticket for this movie. Perfect for your digital scrapbook or printing.
        </p>
        
        <Button size="lg" className="bg-accent text-background hover:bg-white text-base px-10 py-6 font-display uppercase tracking-widest group relative overflow-hidden shadow-[0_0_40px_rgba(229,184,105,0.3)] hover:shadow-[0_0_60px_rgba(229,184,105,0.5)] transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
          <Ticket className="w-5 h-5 mr-3" />
          Generate Ticket
        </Button>
      </div>
    </section>
  );
}
