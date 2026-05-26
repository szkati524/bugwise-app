import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  ArrowLeft, Bug, ShieldCheck, ShieldAlert, 
  MapPin, Layers, Tag, Loader2, Check, Plus, Edit 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function InsectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [insect, setInsect] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [savedInsectIds, setSavedInsectIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchInsectDetails = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) { navigate("/login"); return; }

      try {
        const response = await axios.get(`http://localhost:8083/api/insects/${id}`);
        setInsect(response.data);

        const savedIdsResponse = await axios.get(`http://localhost:8083/api/quiz/saved-ids?email=${email}`);
        setSavedInsectIds(savedIdsResponse.data);
      } catch (error) {
        console.error("Błąd ładowania szczegółów owada:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsectDetails();
  }, [id, navigate]);

  const toggleInsectInQuiz = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email || !insect) return;

    const currentId = insect.id;

    try {
      if (savedInsectIds.includes(currentId)) {
        setSavedInsectIds(savedInsectIds.filter(item => item !== currentId));
      } else {
        setSavedInsectIds([...savedInsectIds, currentId]);
      }

      await axios.post("http://localhost:8083/api/quiz/toggle", {
        email: email,
        insectId: currentId
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

  if (!insect) return (
    <div className="min-h-screen hero-pattern flex flex-col items-center justify-center text-zinc-400">
      <p className="text-xl italic mb-4">Nie znaleziono owada o podanym identyfikatorze.</p>
      <Button onClick={() => navigate("/all-insects")} className="bg-lime-600 hover:bg-lime-500 text-white rounded-xl font-bold">
        Powrót do encyklopedii
      </Button>
    </div>
  );

  const isAdded = savedInsectIds.includes(insect.id);
  const imageUrl = insect.imageUrls && insect.imageUrls.length > 0 
    ? insect.imageUrls[0] 
    : "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&q=80&w=1000";

  return (
    <div className="min-h-screen hero-pattern text-zinc-100 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-zinc-400 hover:text-lime-500 font-bold transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Wróć do listy
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-6 sticky top-6">
            <div className="relative aspect-[4/3] md:aspect-square bg-zinc-900 rounded-[2.5rem] border border-zinc-800 overflow-hidden shadow-2xl group">
              <img src={imageUrl} alt={insect.commonName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 p-6 rounded-3xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 font-medium flex items-center gap-2">
                  <ShieldCheck size={18} className="text-lime-500" /> Ochrona:
                </span>
                <span className={`text-sm font-black px-3 py-1 rounded-full border uppercase ${insect.isProtected ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-zinc-500 bg-zinc-800/30 border-zinc-700/50"}`}>
                  {insect.isProtected ? "Tak (Chroniony)" : "Nie chroniony"}
                </span>
              </div>
            </div>

            <Button 
              onClick={toggleInsectInQuiz}
              className={`w-full h-14 rounded-2xl border font-black text-md transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-lg ${
                isAdded ? "bg-lime-500 border-lime-400 text-black hover:bg-lime-400" : "bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-lime-500/40 hover:text-lime-500"
              }`}
            >
              {isAdded ? <><Check size={20} strokeWidth={3} /> Usuń z quizów</> : <><Plus size={20} strokeWidth={3} /> Dodaj do puli</>}
            </Button>

            <Button 
              onClick={() => navigate(`/insects/edit/${id}`)}
              className="w-full h-14 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center gap-2"
            >
              <Edit size={18} /> Edytuj informacje
            </Button>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-lime-500 font-black uppercase tracking-[0.2em] text-xs mb-2">
                <Bug size={14} /> Szczegóły gatunku
              </div>
              <h1 className="text-5xl font-black text-white tracking-tight leading-tight mb-2">{insect.commonName}</h1>
              <p className="text-lg text-zinc-500 italic font-medium">{insect.latinName}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-zinc-900/30 border border-zinc-800 p-5 rounded-2xl">
                <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><Layers size={12} /> Rząd</div>
                <div className="text-white font-black text-lg">{insect.orderName || "Brak"}</div>
              </div>
              <div className="bg-zinc-900/30 border border-zinc-800 p-5 rounded-2xl">
                <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><Layers size={12} /> Rodzina</div>
                <div className="text-white font-black text-lg">{insect.familyName || "Brak"}</div>
              </div>
              <div className="bg-zinc-900/30 border border-zinc-800 p-5 rounded-2xl">
                <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><MapPin size={12} /> Siedlisko</div>
                <div className="text-white font-black text-lg">{insect.habitatName || "Brak"}</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-black text-white">Opis gatunku</h3>
              <p className="text-zinc-400 text-md leading-relaxed">{insect.description || "Brak opisu."}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}