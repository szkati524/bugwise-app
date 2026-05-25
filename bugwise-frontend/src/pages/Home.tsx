import { Link } from "react-router-dom"; 
import "../App.css"; 
import { Button } from "@/components/ui/button";
import { Bug, LogIn, UserPlus, ArrowRight } from "lucide-react";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col hero-pattern selection:bg-lime-500/30">
      
     
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Bug className="text-lime-500 fill-lime-500/20" size={32} />
          <span className="text-2xl font-black tracking-tighter text-white italic uppercase">BUGWISE</span>
        </div>

        <div className="flex items-center gap-4 text-white">
          
          <Link to="/login">
            <Button variant="ghost" className="hover:bg-white/10 font-bold transition-colors">
              <LogIn className="mr-2" size={18} /> Zaloguj się
            </Button>
          </Link>

        
          <Link to="/register">
            <Button className="bg-lime-600 hover:bg-lime-700 text-white font-black shadow-lg shadow-lime-900/20 transition-all hover:scale-105 active:scale-95">
              <UserPlus className="mr-2" size={18} /> Zarejestruj się
            </Button>
          </Link>
        </div>
      </nav>

    
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-500 text-xs font-black uppercase tracking-[0.2em] animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
          </span>
          Eksploruj świat entomologii
        </div>

        <h1 className="text-7xl md:text-8xl font-black text-white tracking-tight mb-6 leading-[0.9]">
          Twoja cyfrowa <br />
          <span className="text-lime-500 text-shadow-glow italic">baza owadów.</span>
        </h1>

        <p className="text-xl text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
          Zdobądź wiedzę na temat polskich owadów. <br />
          Zostań certyfikowanym entomologiem i stań się prawdziwym specjalistą!
        </p>

        
        <Link to="/login">
          <Button size="lg" className="h-20 px-16 text-xl font-black bg-white text-black hover:bg-lime-500 hover:text-white transition-all duration-300 rounded-full shadow-2xl group">
            Zacznij przygodę 
            <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
          </Button>
        </Link>
      </main>

     
      <footer className="p-8 text-center text-zinc-600 text-xs font-bold uppercase tracking-widest">
        &copy; 2026 BugWise Project &bull; Created by Sebastian Szkatuła.
      </footer>
    </div>
  );
}