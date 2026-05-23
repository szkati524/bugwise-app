import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"; 
import { 
  User, LayoutDashboard, Bug, List, Trophy, 
  MessageSquare, LogOut, Search, Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8081/api/auth/my-profile?email=${email}`);
        setUser(response.data);
      } catch (error) {
        console.error("Błąd pobierania danych:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  if (loading) return (
    <div className="min-h-screen hero-pattern flex items-center justify-center">
      <Loader2 className="text-lime-500 animate-spin" size={48} />
    </div>
  );

  return (
    <div className="flex min-h-screen hero-pattern text-zinc-100 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-lime-600/95 backdrop-blur-md flex flex-col shadow-2xl border-r border-white/10 sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-white/20 p-2 rounded-lg">
            <Bug className="text-white fill-white" size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white italic uppercase">BugWise</span>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4">
          <SidebarItem icon={<User size={20} />} label="Mój profil" />
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Twoje quizy" active />
          <SidebarItem icon={<Bug size={20} />} label="Wszystkie owady" />
          <SidebarItem icon={<Trophy size={20} />} label="Ranking" />
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-3 rounded-xl transition-all font-bold">
            <LogOut size={20} /> Wyloguj się
          </Button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-grow p-12 overflow-y-auto">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-2 text-lime-500 font-bold uppercase tracking-[0.3em] text-xs">
            <div className="h-px w-8 bg-lime-500"></div>
            Panel Użytkownika
          </div>
          <h1 className="text-6xl font-black text-white tracking-tight leading-none">
            Witaj, <span className="text-lime-500">{user?.username}</span>!
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        
          <StatCard 
            title="Dobrze odpowiedziałeś" 
            value={user?.goodAnswers || 0} 
            color="lime" 
            icon={<Trophy size={40} />} 
          />
          <StatCard 
            title="Źle odpowiedziałeś" 
            value={user?.badAnswers || 0} 
            color="red" 
          />
        </div>

        
        <div className="mt-12 p-16 border-2 border-dashed border-zinc-800/40 rounded-[3rem] flex flex-col items-center justify-center text-zinc-500 group hover:border-zinc-700 transition-colors">
           <div className="bg-zinc-900 p-6 rounded-full mb-6 group-hover:scale-110 transition-transform">
             <Search size={48} className="opacity-20 group-hover:opacity-50 transition-opacity" />
           </div>
           <p className="text-xl font-medium tracking-tight">Twoja historia quizów jest pusta</p>
        </div>
      </main>
    </div>
  );
}


function StatCard({ title, value, color, icon }: any) {
  const colorClass = color === "lime" ? "text-lime-500" : "text-red-500";
  const barClass = color === "lime" ? "bg-lime-500" : "bg-red-500";
  
  return (
    <div className={`relative group bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-10 rounded-[2rem] shadow-2xl transition-all hover:border-${color}-500/50`}>
      {icon && <div className={`absolute top-6 right-8 ${colorClass} opacity-20 group-hover:opacity-100 transition-opacity`}>{icon}</div>}
      <p className={`text-sm uppercase font-black ${colorClass} tracking-widest mb-4`}>{title}</p>
      <div className="flex items-baseline gap-3">
          <p className="text-8xl font-black text-white">{value}</p>
          <p className="text-zinc-600 font-bold text-2xl uppercase italic">pkt</p>
      </div>
      <div className="w-full bg-zinc-800/50 h-3 mt-8 rounded-full overflow-hidden">
          <div className={`${barClass} h-full w-[10%] shadow-lg transition-all duration-1000`}></div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: any) {
  return (
    <button className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-200 group ${
      active ? "bg-white text-lime-600 shadow-xl" : "text-white/70 hover:bg-white/10"
    }`}>
      {icon}
      <span className="tracking-tight text-md">{label}</span>
    </button>
  );
}