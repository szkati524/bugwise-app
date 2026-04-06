import "../App.css";
import { 
  User, LayoutDashboard, Bug, List, Trophy, 
  MessageSquare, LogOut, Mail, Lock, CheckCircle2, ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ChangeEmail() {
  return (
    <div className="flex min-h-screen hero-pattern text-zinc-100 font-sans">
      
      {/* --- LEWE MENU (SIDEBAR) --- */}
      <aside className="w-64 bg-lime-600/95 backdrop-blur-md flex flex-col shadow-2xl border-r border-white/10 sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-white/20 p-2 rounded-lg text-white">
            <Bug fill="white" size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white italic uppercase">BugWise</span>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4">
          <SidebarItem icon={<User size={20} />} label="Mój profil" active />
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Twoje quizy" />
          <SidebarItem icon={<Bug size={20} />} label="Wszystkie owady" />
          <SidebarItem icon={<List size={20} />} label="Kategorie" />
          <SidebarItem icon={<Trophy size={20} />} label="Ranking" />
          <SidebarItem icon={<MessageSquare size={20} />} label="Chat" />
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-3 font-bold">
            <LogOut size={20} /> Wyloguj się
          </Button>
        </div>
      </aside>

      
      <main className="flex-grow p-12 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          
         
          <Button variant="ghost" className="mb-6 text-zinc-500 hover:text-lime-500 gap-2 p-0 h-auto font-bold transition-colors">
            <ArrowLeft size={18} /> Wróć do ustawień profilu
          </Button>

        
          <div className="flex items-center gap-6 mb-10 bg-zinc-900/20 p-6 rounded-3xl border border-zinc-800/50">
            <div className="w-20 h-20 rounded-full bg-lime-500 flex items-center justify-center text-black shadow-lg">
              <Mail size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white italic tracking-tight">Zmiana Email</h1>
              <p className="text-zinc-500 text-sm font-medium">Zaktualizuj swój adres do powiadomień i logowania.</p>
            </div>
          </div>

        
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl space-y-8">
            
           
            <div className="space-y-3">
              <Label className="text-zinc-400 ml-1 flex items-center gap-2 uppercase text-xs font-black tracking-widest">
                <Mail size={14} className="text-lime-500" /> Nowy Adres Email
              </Label>
              <Input 
                type="email" 
                placeholder="np. nowy-email@poczta.pl" 
                className="bg-zinc-950/50 border-zinc-800 h-14 rounded-2xl text-white focus:ring-2 focus:ring-lime-500/50 transition-all px-6 font-bold" 
              />
            </div>

           
            <div className="space-y-3">
              <Label className="text-zinc-400 ml-1 flex items-center gap-2 uppercase text-xs font-black tracking-widest">
                <Lock size={14} className="text-lime-500" /> Potwierdź Hasłem
              </Label>
              <Input 
                type="password" 
                placeholder="Wpisz swoje aktualne hasło" 
                className="bg-zinc-950/50 border-zinc-800 h-14 rounded-2xl text-white focus:ring-2 focus:ring-lime-500/50 transition-all px-6" 
              />
              <p className="text-[11px] text-zinc-600 ml-2 italic">Dla Twojego bezpieczeństwa zmiana emaila wymaga podania hasła.</p>
            </div>

         
            <div className="pt-4">
              <Button className="w-full bg-lime-600 hover:bg-lime-700 text-white font-black h-16 rounded-2xl gap-3 shadow-xl shadow-lime-900/20 text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]">
                <CheckCircle2 size={22} /> Zaktualizuj Email
              </Button>
            
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${
      active ? "bg-white text-lime-600 shadow-xl" : "text-white/70 hover:bg-white/10 hover:text-white"
    }`}>
      {icon}
      <span>{label}</span>
    </button>
  );
}