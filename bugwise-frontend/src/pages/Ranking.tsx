import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, LayoutDashboard, Bug, List, Trophy, 
  LogOut, Medal, ArrowUp, ArrowDown, Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import "../App.css"; 


interface RankingUser {
  id: string;
  username: string;
  goodAnswers: number;
  badAnswers: number;
  totalPoints: number;
  positionChange: "up" | "down" | "stable";
}

export function Ranking() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState<RankingUser[]>([]);

 
  useEffect(() => {
    const mockData: RankingUser[] = [
      { id: "1", username: "AntMaster99", goodAnswers: 342, badAnswers: 12, totalPoints: 342, positionChange: "stable" },
      { id: "2", username: "BeetleJuice", goodAnswers: 290, badAnswers: 45, totalPoints: 290, positionChange: "up" },
      { id: "3", username: "MantisToboggan", goodAnswers: 285, badAnswers: 30, totalPoints: 285, positionChange: "down" },
      { id: "4", username: "WaspWhisperer", goodAnswers: 190, badAnswers: 8, totalPoints: 190, positionChange: "up" },
      { id: "5", username: "ButterflyEffect", goodAnswers: 120, badAnswers: 40, totalPoints: 120, positionChange: "stable" },
      { id: "6", username: "CaterpillarGuy", goodAnswers: 95, badAnswers: 50, totalPoints: 95, positionChange: "down" },
    ];
    
    setLeaderboard(mockData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

 
  const renderTrend = (change: "up" | "down" | "stable") => {
    if (change === "up") return <ArrowUp size={16} className="text-emerald-400" />;
    if (change === "down") return <ArrowDown size={16} className="text-red-400" />;
    return <Minus size={16} className="text-zinc-500" />;
  };

  
  const renderMedal = (index: number) => {
    if (index === 0) return <Medal size={24} className="text-amber-400 fill-amber-400/20" />;
    if (index === 1) return <Medal size={24} className="text-zinc-300 fill-zinc-300/20" />;
    if (index === 2) return <Medal size={24} className="text-amber-600 fill-amber-600/20" />;
    return <span className="text-zinc-500 font-bold w-6 text-center">{index + 1}</span>;
  };

  return (
    <div className="flex min-h-screen hero-pattern text-zinc-100 font-sans">
      
     
      <aside className="w-64 bg-lime-600/95 backdrop-blur-md flex flex-col shadow-2xl border-r border-white/10 sticky top-0 h-screen z-20">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-white/20 p-2 rounded-lg">
            <Bug className="text-white fill-white" size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white italic uppercase">BugWise</span>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4">
          <SidebarItem icon={<User size={20} />} label="Mój profil" onClick={() => navigate("/my-profile")} />
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Twoje quizy" onClick={() => navigate("/dashboard")} />
          <SidebarItem icon={<Bug size={20} />} label="Wszystkie owady" onClick={() => navigate("/all-insects")} />
          <SidebarItem icon={<List size={20} />} label="Kategorie" onClick={() => navigate("/categories")} />
          <SidebarItem icon={<Trophy size={20} />} label="Ranking" active />
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
            Rywalizacja Społeczności
          </div>
          <h1 className="text-6xl font-black text-white tracking-tight leading-none">
            Globalny <span className="text-lime-500">Ranking</span>
          </h1>
        </header>

  
        <div className="max-w-5xl space-y-6">
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
            
           
            <div className="grid grid-cols-12 px-8 py-5 border-b border-zinc-800 text-xs font-black uppercase tracking-wider text-zinc-500">
              <div className="col-span-2 flex items-center gap-2">Pozycja</div>
              <div className="col-span-4">Użytkownik</div>
              <div className="col-span-2 text-center text-emerald-500">Dobre odp.</div>
              <div className="col-span-2 text-center text-red-500">Złe odp.</div>
              <div className="col-span-2 text-right text-lime-500">Suma PKT</div>
            </div>

           
            <div className="divide-y divide-zinc-800/60">
              {leaderboard.map((player, index) => {
                const isTop3 = index < 3;
                
                return (
                  <div 
                    key={player.id} 
                    className={`grid grid-cols-12 px-8 py-6 items-center transition-all hover:bg-zinc-800/20 ${
                      isTop3 ? "bg-gradient-to-r from-lime-500/5 to-transparent" : ""
                    }`}
                  >
               
                    <div className="col-span-2 flex items-center gap-3">
                      {renderMedal(index)}
                      {renderTrend(player.positionChange)}
                    </div>

                
                    <div className="col-span-4 flex items-center gap-3">
                      <div className={`p-2 rounded-xl border ${
                        isTop3 ? "bg-lime-500/10 border-lime-500/30 text-lime-400" : "bg-zinc-950 border-zinc-800 text-zinc-400"
                      }`}>
                        <User size={16} />
                      </div>
                      <span className={`font-bold tracking-tight text-lg ${isTop3 ? "text-white" : "text-zinc-300"}`}>
                        {player.username}
                      </span>
                    </div>

                
                    <div className="col-span-2 text-center font-bold text-emerald-400 text-md">
                      {player.goodAnswers}
                    </div>

              
                    <div className="col-span-2 text-center font-bold text-red-400/80 text-md">
                      {player.badAnswers}
                    </div>

                  
                    <div className="col-span-2 text-right flex items-baseline justify-end gap-1">
                      <span className="text-2xl font-black text-white">{player.totalPoints}</span>
                      <span className="text-zinc-600 font-bold text-xs uppercase italic">pkt</span>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </main>

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