import "../App.css";
import { 
  User, LayoutDashboard, Bug, List, Trophy, 
  MessageSquare, LogOut, Camera, Mail, Lock, FileText, ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Profile() {
  const stats = {
    nick: "Odkrywca123",
    email: "kontakt@bugwise.pl"
  };

  return (
    <div className="flex min-h-screen hero-pattern text-zinc-100">
      
    
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
        <div className="max-w-4xl">
          
          
          <section className="flex flex-col md:flex-row items-center gap-8 mb-10 bg-zinc-900/40 p-8 rounded-[2rem] border border-zinc-800 backdrop-blur-sm shadow-xl">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-lime-500 flex items-center justify-center text-black text-4xl font-black shadow-lg overflow-hidden transition-transform group-hover:scale-105">
                <User size={48} />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white">
                  <Camera size={24} />
                </div>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-black text-white italic tracking-tight">Twoje Konto</h1>
              <p className="text-zinc-500 font-medium">Przeglądaj swoje dane i dbaj o bezpieczeństwo profilu.</p>
            </div>
          </section>

          
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-[2.5rem] shadow-2xl overflow-hidden">
            
           
            <ProfileRow 
              icon={<User className="text-lime-500" size={20} />} 
              label="Nazwa użytkownika" 
              value={stats.nick} 
              buttonLabel="Zmień nick"
            />

           
            <ProfileRow 
              icon={<Mail className="text-lime-500" size={20} />} 
              label="Adres Email" 
              value={stats.email} 
              buttonLabel="Zmień email"
            />

            
            <div className="p-8 flex items-center justify-between border-b border-white/5 hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="bg-zinc-950/50 p-3 rounded-xl">
                  <Lock className="text-lime-500" size={20} />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm font-bold uppercase tracking-wider">Bezpieczeństwo</p>
                  <p className="text-xl font-bold text-white tracking-widest">••••••••••</p>
                </div>
              </div>
              <Button className="bg-zinc-800 hover:bg-lime-600 text-white font-bold px-6 rounded-xl transition-all group-hover:scale-105">
                Zmień hasło
              </Button>
            </div>

            
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-zinc-950/50 p-3 rounded-xl">
                  <FileText className="text-lime-500" size={20} />
                </div>
                <p className="text-xl font-bold text-white">O Tobie</p>
              </div>
              <textarea 
                className="w-full bg-zinc-950/30 border border-zinc-800 rounded-2xl p-4 h-32 focus:outline-none focus:ring-2 focus:ring-lime-500/50 transition-all text-sm text-zinc-300 resize-none"
                placeholder="Napisz coś o swojej pasji..."
              ></textarea>
              <Button className="bg-lime-600 hover:bg-lime-700 text-white font-black px-10 h-12 rounded-xl shadow-lg shadow-lime-900/20">
                Zapisz opis
              </Button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}


function ProfileRow({ icon, label, value, buttonLabel }: { icon: React.ReactNode, label: string, value: string, buttonLabel: string }) {
  return (
    <div className="p-8 flex items-center justify-between border-b border-white/5 hover:bg-white/5 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="bg-zinc-950/50 p-3 rounded-xl">
          {icon}
        </div>
        <div>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-wider">{label}</p>
          <p className="text-xl font-bold text-white">{value}</p>
        </div>
      </div>
      
     
      <Button className="bg-zinc-800 hover:bg-lime-600 text-white font-bold px-6 rounded-xl transition-all group-hover:scale-105 flex gap-2">
        {buttonLabel} <ChevronRight size={16} />
      </Button>
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