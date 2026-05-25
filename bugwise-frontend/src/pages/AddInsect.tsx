import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  User, LayoutDashboard, Bug, List, Trophy, 
  LogOut, Plus, Trash2, FileText, MapPin, Tag, Shield, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import "../App.css";

interface QuestionForm {
  content: string;
  options: string[];
  correctAnswer: string;
}

export function AddInsect() {
  const navigate = useNavigate();

  // Stany formularza zgodne z polami InsectDTO
  const [commonName, setCommonName] = useState("");
  const [latinName, setLatinName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [description, setDescription] = useState("");
  const [orderName, setOrderName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [habitatName, setHabitatName] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Zbieramy link URL jako tekst
  const [tags, setTags] = useState("");
  const [isProtected, setIsProtected] = useState(false);
  const [dangerLevel, setDangerLevel] = useState("Niski"); // display name
  const [dangerLevelCode, setDangerLevelCode] = useState("LOW"); // kod walidowany przez @Size

  // Stan dynamicznej listy pytań
  const [questions, setQuestions] = useState<QuestionForm[]>([
    { content: "", options: ["", "", "", ""], correctAnswer: "" }
  ]);

  // Dynamiczne zarządzanie pytaniami
  const addQuestion = () => {
    setQuestions([...questions, { content: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...questions];
    updated[index].content = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    if (updated[qIndex].correctAnswer === updated[qIndex].options[oIndex]) {
      updated[qIndex].correctAnswer = value;
    }
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (qIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = value;
    setQuestions(updated);
  };

  // Funkcja wysyłająca dane do backendu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Parsowanie tagów do tablicy stringów
    const tagsArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "");

    // 2. Budowanie struktury DTO dokładnie pod rekord javowy
    const insectDTO = {
      commonName: commonName,
      latinName: latinName,
      englishName: englishName || null,
      description: description,
      orderName: orderName,
      familyName: familyName,
      habitatName: habitatName,
      imageUrls: [imageUrl], // Twoje DTO oczekuje listy URLi: List<String>
      tags: tagsArray,
      isProtected: isProtected,
      dangerLevel: dangerLevel,
      dangerLevelCode: dangerLevelCode,
      templateQuestions: questions.map(q => ({
        content: q.content,
        options: q.options,
        correctAnswer: q.correctAnswer
      })) // nazwa pola w rekordzie to templateQuestions
    };

    try {
      // Wywołanie Twojego @PostMapping kontrolera
      const response = await axios.post("http://localhost:8083/api/insects", insectDTO);
      
      if (response.status === 201 || response.status === 200) {
        alert("Owada pomyślnie dodano do bazy danych BugWise!");
        navigate("/all-insects");
      }
    } catch (error: any) {
      console.error("Błąd podczas dodawania owada:", error);
      alert(`Nie udało się zapisać owada: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen hero-pattern text-zinc-100 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-lime-600/95 backdrop-blur-md flex flex-col shadow-2xl border-r border-white/10 sticky top-0 h-screen z-20">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-white/20 p-2 rounded-lg"><Bug className="text-white fill-white" size={24} /></div>
          <span className="text-xl font-black tracking-tighter text-white italic uppercase">BugWise</span>
        </div>
        <nav className="flex-grow p-4 space-y-2 mt-4">
          <SidebarItem icon={<User size={20} />} label="Mój profil" onClick={() => navigate("/my-profile")} />
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Twoje quizy" onClick={() => navigate("/dashboard")} />
          <SidebarItem icon={<Bug size={20} />} label="Wszystkie owady" onClick={() => navigate("/all-insects")} />
          <SidebarItem icon={<List size={20} />} label="Kategorie" onClick={() => navigate("/categories")} />
          <SidebarItem icon={<Trophy size={20} />} label="Ranking" onClick={() => navigate("/ranking")} />
          <SidebarItem icon={<Plus size={20} />} label="Dodaj owada" active />
        </nav>
        <div className="p-4 border-t border-white/10">
          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-3 rounded-xl transition-all font-bold">
            <LogOut size={20} /> Wyloguj się
          </Button>
        </div>
      </aside>

      {/* GŁÓWNY PANEL */}
      <main className="flex-grow p-12 overflow-y-auto">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-2 text-lime-500 font-bold uppercase tracking-[0.3em] text-xs">
            <div className="h-px w-8 bg-lime-500"></div> Panel Zarządzania Bazą Danych
          </div>
          <h1 className="text-6xl font-black text-white tracking-tight leading-none">
            Dodaj Nowego <span className="text-lime-500">Owada</span>
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8 pb-24">
          
          {/* SEKCJA 1: TAKSONOMIA */}
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
              <FileText className="text-lime-500" size={24} /> Dane podstawowe i taksonomia
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400">Nazwa zwyczajowa (PL) *</label>
                <input type="text" required placeholder="np. Biedronka siedmiokropka" value={commonName} onChange={(e) => setCommonName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 focus:outline-none focus:border-lime-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400">Nazwa łacińska *</label>
                <input type="text" required placeholder="np. Coccinella septempunctata" value={latinName} onChange={(e) => setLatinName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 italic focus:outline-none focus:border-lime-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400">Nazwa angielska</label>
                <input type="text" placeholder="np. Seven-spot ladybird" value={englishName} onChange={(e) => setEnglishName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 focus:outline-none focus:border-lime-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400">Rząd (Order) *</label>
                <input type="text" required placeholder="np. Chrząszcze (Coleoptera)" value={orderName} onChange={(e) => setOrderName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 focus:outline-none focus:border-lime-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400">Rodzina (Family) *</label>
                <input type="text" required placeholder="np. Biedronkowate" value={familyName} onChange={(e) => setFamilyName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 focus:outline-none focus:border-lime-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400">Środowisko (Habitat) *</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4.5 text-zinc-600" size={18} />
                  <input type="text" required placeholder="np. Pola, ogrody" value={habitatName} onChange={(e) => setHabitatName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 pl-12 text-zinc-100 focus:outline-none focus:border-lime-500 transition-colors" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400">Opis owada (maks. 2000 znaków) *</label>
              <textarea rows={4} maxLength={2000} required placeholder="Wpisz szczegółowy opis..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 focus:outline-none focus:border-lime-500 transition-colors resize-none" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400">Tagi (rozdzielone przecinkami, min. jeden) *</label>
              <div className="relative">
                <Tag className="absolute left-4 top-4.5 text-zinc-600" size={18} />
                <input type="text" required placeholder="np. drapieżnik, pożyteczny, chrząszcz" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 pl-12 text-zinc-100 focus:outline-none focus:border-lime-500 transition-colors" />
              </div>
            </div>
          </div>

          {/* SEKCJA 2: WARUNKI I ZAGROŻENIA */}
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400 flex items-center gap-2">
                <Shield size={16} className="text-lime-500" /> Ochrona gatunkowa
              </label>
              <div className="flex items-center h-14 bg-zinc-950 border border-zinc-800 rounded-xl px-4">
                <input type="checkbox" id="protected" checked={isProtected} onChange={(e) => setIsProtected(e.target.checked)} className="w-5 h-5 accent-lime-500 rounded cursor-pointer" />
                <label htmlFor="protected" className="ml-3 font-bold text-sm text-zinc-300 cursor-pointer select-none">Gatunek chroniony</label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400 flex items-center gap-2">
                <AlertTriangle size={16} className="text-lime-500" /> Poziom zagrożenia *
              </label>
              <select value={dangerLevel} onChange={(e) => setDangerLevel(e.target.value)} className="w-full h-14 bg-zinc-950 border border-zinc-800 rounded-xl px-4 text-zinc-300 font-bold focus:outline-none focus:border-lime-500">
                <option value="Brak">Brak zagrożenia</option>
                <option value="Niski">Niski (np. ukąszenie boli)</option>
                <option value="Średni">Średni (jad / silny odczyn)</option>
                <option value="Wysoki">Wysoki (niebezpieczny)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400">Kod zagrożenia (1-10 znaków) *</label>
              <input type="text" required placeholder="np. LOW, MED, NONE" value={dangerLevelCode} onChange={(e) => setDangerLevelCode(e.target.value)} className="w-full h-14 bg-zinc-950 border border-zinc-800 rounded-xl px-4 text-zinc-100 font-bold uppercase focus:outline-none focus:border-lime-500" />
            </div>
          </div>

          {/* SEKCJA 3: LINK DO GRAPHICS */}
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl space-y-4">
            <label className="text-sm font-bold text-zinc-400 block">Link URL do zdjęcia owada (wymagany min. jeden) *</label>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input type="url" required placeholder="https://example.com/insect.png" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 text-sm focus:outline-none focus:border-lime-500" />
              {imageUrl && (
                <div className="w-20 h-14 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden shrink-0 flex items-center justify-center">
                  <img src={imageUrl} alt="Podgląd" className="w-full h-full object-cover" onError={(e)=>{(e.target as HTMLElement).style.display='none'}} />
                </div>
              )}
            </div>
          </div>

          {/* SEKCJA 4: GENERATOR PYTAŃ (templateQuestions) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-white tracking-tight">Pytania testowe do bazy</h2>
              <Button type="button" onClick={addQuestion} className="bg-zinc-900 border border-zinc-800 hover:border-lime-500/50 text-lime-500 font-bold px-4 h-11 rounded-xl flex items-center gap-2 transition-all"><Plus size={16} /> Dodaj pytanie</Button>
            </div>

            {questions.map((q, qIndex) => (
              <div key={qIndex} className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl space-y-6 relative">
                {questions.length > 1 && (
                  <button type="button" onClick={() => removeQuestion(qIndex)} className="absolute top-6 right-6 p-2 text-zinc-600 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                )}
                <div className="space-y-2">
                  <span className="text-xs font-black text-lime-500 uppercase tracking-widest bg-lime-500/10 px-3 py-1 rounded-full border border-lime-500/20">Pytanie #{qIndex + 1}</span>
                  <input type="text" required placeholder="Treść pytania" value={q.content} onChange={(e) => handleQuestionChange(qIndex, e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white font-black text-lg mt-2 focus:outline-none focus:border-lime-500" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((option, oIndex) => (
                    <div key={oIndex} className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-500">Opcja {["A", "B", "C", "D"][oIndex]}</label>
                      <input type="text" required placeholder={`Wpisz opcję`} value={option} onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)} className="w-full bg-zinc-950/50 border border-zinc-800/80 rounded-xl p-4 text-sm font-bold text-zinc-300 focus:outline-none focus:border-lime-500" />
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-bold text-zinc-400">Wskaż poprawną odpowiedź:</label>
                  <select required value={q.correctAnswer} onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-300 font-bold focus:outline-none focus:border-lime-500">
                    <option value="" disabled>-- Wybierz poprawną odpowiedź --</option>
                    {q.options.map((option, oIndex) => (
                      <option key={oIndex} value={option} disabled={!option}>{option ? `Opcja ${["A", "B", "C", "D"][oIndex]}: ${option}` : ""}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" className="h-16 px-10 bg-lime-600 hover:bg-lime-500 text-white font-black text-md rounded-2xl shadow-lg transition-transform active:scale-95">
              Zapisz owada i opublikuj w bazie
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active = false, onClick }: any) {
  return (
    <button type="button" onClick={onClick} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-200 group ${active ? "bg-white text-lime-600 shadow-xl" : "text-white/70 hover:bg-white/10"}`}>
      {icon} <span className="tracking-tight text-md">{label}</span>
    </button>
  );
}