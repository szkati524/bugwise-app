import "./App.css"; 
import { Button } from "@/components/ui/button";
import { Bug, LogIn, UserPlus } from "lucide-react";

function App() {
  return (
   
    <div className="min-h-screen flex flex-col hero-pattern selection:bg-lime-500/30">
      
    
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Bug className="text-lime-500" size={32} />
          <span className="text-2xl font-black tracking-tighter text-white">BUGWISE</span>
        </div>

        <div className="flex items-center gap-4 text-white">
          <Button variant="ghost" className="hover:bg-white/10">
            <LogIn className="mr-2" size={18} /> Zaloguj się
          </Button>
          <Button className="bg-lime-600 hover:bg-lime-700 font-bold">
            <UserPlus className="mr-2" size={18} /> Zarejestruj się
          </Button>
        </div>
      </nav>

      
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-7xl md:text-8xl font-black text-white tracking-tight mb-6">
          Twoja cyfrowa <br />
          <span className="text-lime-500 text-shadow-glow">baza owadów.</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-xl mx-auto mb-10">
          Zdobądź wiedzę na temat polskich owadów.
          Stań się prawdziwym specjalistą!!!
        </p>
        <Button size="lg" className="h-16 px-12 text-lg font-bold bg-white text-black hover:scale-105 transition-transform rounded-full">
          Zacznij przygodę
        </Button>
      </main>

    </div>
  );
}

export default App;