import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"; 
import { 
  User, LayoutDashboard, Bug, List, Trophy, 
  LogOut, Search, Loader2, ArrowRight, Plus, Check 
} from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AllInsects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [insects, setInsects] = useState<any[]>([]);
  const [savedInsectIds, setSavedInsectIds] = useState<number[]>([]); 
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) { navigate("/login"); return; }
      
      try {
        
        const userResponse = await axios.get(`http://localhost:8083/api/auth/my-profile?email=${email}`);
        setUser(userResponse.data);
        
      
        const insectsResponse = await axios.get("http://localhost:8083/api/insects");
        console.log("=== DIAGNOSTYKA BUGWISE ===");
        console.log("Surowe dane owadów z backendu:", insectsResponse.data);
        setInsects(insectsResponse.data);
        
       
        const savedIdsResponse = await axios.get(`http://localhost:8083/api/quiz/saved-ids?email=${email}`);
        console.log("Zapisane ID owadów dla quizu:", savedIdsResponse.data);
        setSavedInsectIds(savedIdsResponse.data);

      } catch (error) {
        console.error("Błąd pobierania danych z API:", error);
      } finally { 
        setLoading(false); 
      }
    };
    
    fetchData();
  }, [navigate]);

  const toggleInsectInQuiz = async (id: number) => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    try {
      if (savedInsectIds.includes(id)) {
        setSavedInsectIds(savedInsectIds.filter(item => item !== id));
      } else {
        setSavedInsectIds([...savedInsectIds, id]);
      }

      await axios.post("http://localhost:8083/api/quiz/toggle", {
        email: email,
        insectId: id
      });
    } catch (error) {
      console.error("Błąd podczas przełączania plusika:", error);
      const savedIdsResponse = await axios.get(`http://localhost:8083/api/quiz/saved-ids?email=${email}`);
      setSavedInsectIds(savedIdsResponse.data);
    }
  };

  const filteredInsects = insects
    .filter(insect => {
      const name = insect.commonName || insect.commonname || insect.name || "";
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      const nameA = a.commonName || a.commonname || a.name || "";
      const nameB = b.commonName || b.commonname || b.name || "";
      return nameA.localeCompare(nameB);
    });

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
          <div className="bg-white/20 p-2 rounded-lg"><Bug className="text-white fill-white" size={24} /></div>
          <span className="text-xl font-black tracking-tighter text-white italic uppercase">BugWise</span>
        </div>
        <nav className="flex-grow p-4 space-y-2 mt-4">
          <SidebarItem icon={<User size={20} />} label="Mój profil" onClick={() => navigate("/my-profile")} />
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Twoje quizy" onClick={() => navigate("/dashboard")} />
          <SidebarItem icon={<Bug size={20} />} label="Wszystkie owady" active />
          <SidebarItem icon={<List size={20} />} label="Kategorie" onClick={() => navigate("/categories")} />
          <SidebarItem icon={<Trophy size={20} />} label="Ranking" onClick={() => navigate("/ranking")} />
        </nav>
        <div className="p-4 border-t border-white/10">
          <Button onClick={() => { localStorage.removeItem("userEmail"); navigate("/login"); }} variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-3 rounded-xl transition-all font-bold">
            <LogOut size={20} /> Wyloguj się
          </Button>
        </div>
      </aside>

      
      <main className="flex-grow p-12 overflow-y-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2 text-lime-500 font-bold uppercase tracking-[0.3em] text-xs">
              <div className="h-px w-8 bg-lime-500"></div> Encyklopedia
            </div>
            <h1 className="text-6xl font-black text-white tracking-tight leading-none">
              Wszystkie <span className="text-lime-500">Owady</span>
            </h1>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <Input 
              type="text" 
              placeholder="Szukaj owada..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-zinc-900/50 border-zinc-800 h-12 rounded-xl pl-12 text-white focus:ring-2 focus:ring-lime-500/50 transition-all"
            />
          </div>
        </header>

        {filteredInsects.length === 0 ? (
          <div className="text-center text-zinc-500 mt-20 italic">
            Nie znaleziono żadnego owada spełniającego kryteria. Mamy {insects.length} owadów w pamięci stanu.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            {filteredInsects.map((insect) => {
              const currentId = insect.id || insect.ID;
              const isAdded = savedInsectIds.includes(currentId);
              
              const displayName = insect.commonName || insect.commonname || insect.name || "Nieznany owad";
              const displayLatin = insect.latinName || insect.latinname || "";
              const displayEnglish = insect.englishName || insect.englishname || "";
              const displayDesc = insect.description || "Brak opisu.";
              const displayHabitat = insect.habitat?.name || insect.habitat?.commonName || "Ogólne";
              
              
              const questionsCount = insect.templateQuestions?.length || insect.questions?.length || 0;

              return (
                <div key={currentId} className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-8 rounded-[2rem] shadow-2xl flex flex-col justify-between group hover:border-lime-500/30 transition-all relative overflow-hidden">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        <span className="text-xs font-black uppercase text-lime-500 bg-lime-500/10 px-3 py-1 rounded-full border border-lime-500/20">
                          {displayHabitat}
                        </span>
                        <span className="text-xs font-medium text-zinc-400 bg-zinc-800/50 px-2.5 py-1 rounded-full border border-zinc-700/30">
                          Pytania: {questionsCount}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => toggleInsectInQuiz(currentId)}
                        title={isAdded ? "Usuń z puli testowej" : "Dodaj do swoich quizów"}
                        className={`p-2.5 rounded-xl border transition-all duration-300 active:scale-95 z-10 ${
                          isAdded 
                            ? "bg-lime-500 border-lime-400 text-black shadow-lg shadow-lime-500/20" 
                            : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-lime-500 hover:border-lime-500/40"
                        }`}
                      >
                        {isAdded ? <Check size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
                      </button>
                    </div>

                    <h3 className="text-2xl font-black text-white group-hover:text-lime-500 transition-colors">
                      {displayName}
                    </h3>
                    <p className="text-xs text-zinc-500 italic font-medium mb-4">
                      {displayLatin} {displayEnglish ? `(${displayEnglish})` : ""}
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                      {displayDesc}
                    </p>
                  </div>

                  <Button 
                    variant="link" 
                    onClick={() => navigate(`/insects/${currentId}`)}
                    className="text-lime-500 hover:text-lime-400 p-0 h-auto justify-start mt-6 font-bold gap-2 group-hover:translate-x-1 transition-transform"
                  >
                    Zobacz szczegóły <ArrowRight size={16} />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
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