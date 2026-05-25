import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"; 
import { 
  User, LayoutDashboard, Bug, List, Trophy, 
  LogOut, Loader2, Trees, Home, ShieldAlert, Sparkles,
  ArrowLeft, ArrowRight, Plus, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Pomocnicza funkcja przypisująca ikony na podstawie nazwy habitatu
const getCategoryIcon = (name: string) => {
  const normalized = name.toLowerCase();
  if (normalized.includes("las") || normalized.includes("leśn")) return <Trees size={32} />;
  if (normalized.includes("dom") || normalized.includes("mieszkan") || normalized.includes("synantrop")) return <Home size={32} />;
  if (normalized.includes("chronion") || normalized.includes("zagroż")) return <ShieldAlert size={32} />;
  return <Sparkles size={32} />;
};

export function Categories() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [savedInsectIds, setSavedInsectIds] = useState<number[]>([]);
  
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const fetchData = async () => {
    if (!email) { navigate("/login"); return; }
    
    try {
      // 1. Pobieramy profil użytkownika
      const userResponse = await axios.get(`http://localhost:8083/api/auth/my-profile?email=${email}`);
      setUser(userResponse.data);

      // 2. Pobieramy zapisane ID owadów dla quizu
      const savedIdsResponse = await axios.get(`http://localhost:8083/api/quiz/saved-ids?email=${email}`);
      setSavedInsectIds(savedIdsResponse.data);

      // 3. Pobieramy wszystkie owady
      const insectsResponse = await axios.get("http://localhost:8083/api/insects");
      const allInsects = insectsResponse.data;

      // 4. Dynamiczne grupowanie po strukturze obiektów (insect.habitat?.name)
      const habitatMap: { [key: string]: any[] } = {};
      allInsects.forEach((insect: any) => {
        const habitatName = insect.habitat?.name || "Inne Środowiska";
        if (!habitatMap[habitatName]) {
          habitatMap[habitatName] = [];
        }
        habitatMap[habitatName].push(insect);
      });

      const dynamicCategories = Object.keys(habitatMap).map((name, index) => ({
        id: index + 1,
        name: name,
        count: habitatMap[name].length,
        description: `Gatunki owadów powiązane ze środowiskiem: ${name.toLowerCase()}.`,
        insects: habitatMap[name]
      }));

      setCategories(dynamicCategories);
    } catch (error) {
      console.error("Błąd pobierania danych kategorii:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const toggleInsectInQuiz = async (insectId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Zatrzymuje propagację kliknięcia w plusik
    if (!email || !insectId) return;

    try {
      if (savedInsectIds.includes(insectId)) {
        setSavedInsectIds(savedInsectIds.filter(item => item !== insectId));
      } else {
        setSavedInsectIds([...savedInsectIds, insectId]);
      }

      await axios.post("http://localhost:8083/api/quiz/toggle", {
        email: email,
        insectId: insectId
      });
    } catch (error) {
      console.error("Błąd przełączania statusu quizu:", error);
    }
  };

  if (loading) return (
    <div className="min-h-screen hero-pattern flex items-center justify-center">
      <Loader2 className="text-lime-500 animate-spin" size={48} />
    </div>
  );

  const activeCategoryData = categories.find(cat => cat.name === selectedCategory);
  const filteredInsects = activeCategoryData ? activeCategoryData.insects : [];

  return (
    <div className="flex min-h-screen hero-pattern text-zinc-100 font-sans">
      
      {/* PANEL BOCZNY (Sidebar) */}
      <aside className="w-64 bg-lime-600/95 backdrop-blur-md flex flex-col shadow-2xl border-r border-white/10 sticky top-0 h-screen z-20">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-white/20 p-2 rounded-lg"><Bug className="text-white fill-white" size={24} /></div>
          <span className="text-xl font-black tracking-tighter text-white italic uppercase">BugWise</span>
        </div>
        <nav className="flex-grow p-4 space-y-2 mt-4">
          <SidebarItem icon={<User size={20} />} label="Mój profil" onClick={() => navigate("/my-profile")} />
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Twoje quizy" onClick={() => navigate("/dashboard")} />
          <SidebarItem icon={<Bug size={20} />} label="Wszystkie owady" onClick={() => navigate("/all-insects")} />
          <SidebarItem icon={<List size={20} />} label="Kategorie" active onClick={() => setSelectedCategory(null)} />
          <SidebarItem icon={<Trophy size={20} />} label="Ranking" onClick={() => navigate("/ranking")} />
        </nav>
        <div className="p-4 border-t border-white/10">
          <Button onClick={() => { localStorage.removeItem("userEmail"); navigate("/login"); }} variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-3 rounded-xl transition-all font-bold">
            <LogOut size={20} /> Wyloguj się
          </Button>
        </div>
      </aside>

      {/* GŁÓWNY PANEL */}
      <main className="flex-grow p-12 overflow-y-auto">
        
        {/* WIDOK 1: LISTA KATEGORII HABITATÓW */}
        {!selectedCategory ? (
          <>
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-2 text-lime-500 font-bold uppercase tracking-[0.3em] text-xs">
                <div className="h-px w-8 bg-lime-500"></div> Podział Środowiskowy
              </div>
              <h1 className="text-6xl font-black text-white tracking-tight leading-none">
                Bazy & <span className="text-lime-500">Habitaty</span>
              </h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
              {categories.map((cat) => (
                <div 
                  key={cat.id} 
                  onClick={() => setSelectedCategory(cat.name)}
                  className="group bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl transition-all cursor-pointer hover:border-lime-500/40 hover:bg-zinc-900/60"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="bg-lime-500/10 border border-lime-500/20 p-5 rounded-2xl text-lime-500 group-hover:bg-lime-500 group-hover:text-black transition-all">
                      {getCategoryIcon(cat.name)}
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-black text-white">{cat.count}</p>
                      <p className="text-xs font-black uppercase text-zinc-500 tracking-wider">Gatunków</p>
                    </div>
                  </div>

                  <h3 className="text-3xl font-black text-white tracking-tight group-hover:text-lime-500 transition-colors mb-3">
                    {cat.name}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                    {cat.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          
          /* WIDOK 2: LISTA OWADÓW W KATEGORII (WYGLĄD JAK W ALLINSECTS) */
          <>
            <header className="mb-12 space-y-4">
              <button 
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 text-zinc-400 hover:text-lime-500 font-bold text-sm transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Wróć do kategorii
              </button>
              <div>
                <div className="flex items-center gap-4 mb-2 text-lime-500 font-bold uppercase tracking-[0.3em] text-xs">
                  <div className="h-px w-8 bg-lime-500"></div> Przeglądasz środowisko
                </div>
                <h1 className="text-5xl font-black text-white tracking-tight">
                  Kategoria: <span className="text-lime-500">{selectedCategory}</span>
                </h1>
                <p className="text-zinc-400 mt-2 text-sm font-medium">
                  Znaleziono {filteredInsects.length} gatunków zakwalifikowanych do tej sekcji.
                </p>
              </div>
            </header>

            {/* SIATKA Z KARTAMI OWADÓW IDENTYCZNA JAK W ALLINSECTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
              {filteredInsects.map((insect: any) => {
                const currentId = insect.id || insect.ID;
                const isAdded = savedInsectIds.includes(currentId);

                const displayName = insect.commonName || insect.commonname || insect.name || "Nieznany owad";
                const displayLatin = insect.latinName || insect.latinname || "";
                const displayEnglish = insect.englishName || insect.englishname || "";
                const displayDesc = insect.description || "Brak opisu.";
                const displayHabitat = insect.habitat?.name || insect.habitat?.commonName || "Ogólne";
                const questionsCount = insect.templateQuestions?.length || insect.questions?.length || 0;

                return (
                  <div 
                    key={currentId} 
                    className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-8 rounded-[2rem] shadow-2xl flex flex-col justify-between group hover:border-lime-500/30 transition-all relative overflow-hidden"
                  >
                    <div>
                      {/* Górna sekcja (Badge i przycisk plusa) */}
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
                          onClick={(e) => toggleInsectInQuiz(currentId, e)}
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

                      {/* Tytuły i Opis */}
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

                    {/* Przycisk przejścia do detali sparowany z InsectDetails */}
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
          </>
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