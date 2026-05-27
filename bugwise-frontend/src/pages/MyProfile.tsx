import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; //  Naprawiony import
import "../App.css"; 
import { 
  User, LayoutDashboard, Bug, Trophy, LogOut, 
  Mail, Calendar, KeyRound, Loader2, ShieldAlert, List, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function MyProfile() {
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
       
        const response = await axios.get(`http://localhost:8083/api/auth/my-profile?email=${email}`);
        setUser(response.data);
      } catch (error) {
        console.error("Błąd pobierania danych profilu:", error);
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
      
      
      <aside className="w-64 bg-lime-600/95 backdrop-blur-md flex flex-col shadow-2xl border-r border-white/10 sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-white/20 p-2 rounded-lg">
            <Bug className="text-white fill-white" size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white italic uppercase">BugWise</span>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4">
          <SidebarItem icon={<User size={20} />} label="Mój profil" active onClick={() => navigate("/my-profile")} />
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Twoje quizy" onClick={() => navigate("/dashboard")} />
          <SidebarItem icon={<Bug size={20} />} label="Wszystkie owady" onClick={() => navigate("/all-insects")} />
          <SidebarItem icon={<List size={20} />} label="Kategorie" onClick={() => navigate("/categories")} />
          <SidebarItem icon={<Trophy size={20} />} label="Ranking" onClick={() => navigate("/ranking")} />
      
          <SidebarItem icon={<Plus size={20} />} label="Dodaj owada" onClick={() => navigate("/add-insect")} />
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-3 rounded-xl transition-all font-bold">
            <LogOut size={20} /> Wyloguj się
          </Button>
        </div>
      </aside>

  
      <main className="flex-grow p-12 overflow-y-auto">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-2 text-lime-500 font-bold uppercase tracking-[0.3em] text-xs">
            <div className="h-px w-8 bg-lime-500"></div>
            Ustawienia Konta
          </div>
          <h1 className="text-6xl font-black text-white tracking-tight leading-none">
            Twój <span className="text-lime-500">Profil</span>
          </h1>
        </header>

        <div className="max-w-3xl bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-10 rounded-[3rem] shadow-2xl space-y-8">
          
         
          <div className="flex items-center gap-6 pb-6 border-b border-zinc-800/60">
            <div className="bg-lime-500/10 p-6 rounded-2xl border border-lime-500/20 text-lime-500">
              <User size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">{user?.username}</h2>
              <p className="text-zinc-500 text-sm">Status: Użytkownik aktywny</p>
            </div>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileInfoField 
              icon={<Mail className="text-lime-500" size={20} />} 
              label="Adres E-mail" 
              value={user?.email || "Brak danych"} 
            />
            <ProfileInfoField 
              icon={<Calendar className="text-lime-500" size={20} />} 
              label="Konto utworzone" 
              value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Dawno temu"} 
            />
          </div>

         
          <div className="pt-6 border-t border-zinc-800/60 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bug size={18} className="text-lime-500" /> Baza danych owadów
            </h3>
            <div className="bg-zinc-950/40 border border-zinc-800/60 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-zinc-200">Kreator Atlasu Owadów</p>
                <p className="text-xs text-zinc-500 mt-0.5">Dodawaj nowe gatunki, przypisuj habitaty oraz twórz dedykowane pytania testowe.</p>
              </div>
              <Button 
                onClick={() => navigate("/add-insect")}
                className="bg-lime-600 hover:bg-lime-500 text-white font-bold rounded-xl px-5 py-5 transition-all flex items-center gap-2 shadow-lg shadow-lime-600/10 shrink-0 w-full sm:w-auto justify-center"
              >
                <Plus size={18} /> Dodaj owada
              </Button>
            </div>
          </div>

   
          <div className="pt-6 border-t border-zinc-800/60 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <KeyRound size={18} className="text-lime-500" /> Bezpieczeństwo
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => navigate("/change-password")}
                variant="outline" className="border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl px-6 py-5 font-bold transition-all"
              >
                Zmień hasło
              </Button>
              <Button 
                onClick={() => navigate("/change-email")} 
                variant="outline" 
                className="border-zinc-800 bg-zinc-950/40 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl px-6 py-5 font-bold transition-all"
              >
                Zmień e-mail
              </Button>
              <Button variant="ghost" className="text-red-500 hover:bg-red-500/10 hover:text-red-400 rounded-xl px-6 py-5 font-bold transition-all gap-2">
                <ShieldAlert size={18} /> Usuń konto
              </Button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function ProfileInfoField({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-zinc-950/40 border border-zinc-800/60 p-5 rounded-2xl flex items-center gap-4">
      <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800">
        {icon}
      </div>
      <div>
        <p className="text-xs font-black text-zinc-500 uppercase tracking-wider">{label}</p>
        <p className="text-md font-bold text-zinc-200 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-200 group ${
        active ? "bg-white text-lime-600 shadow-xl" : "text-white/70 hover:bg-white/10"
      }`}
    >
      {icon}
      <span className="tracking-tight text-md">{label}</span>
    </button>
  );
}