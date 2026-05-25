import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css"; 
import { 
  User, LayoutDashboard, Bug, List, Trophy, 
  LogOut, Loader2, Play, CheckCircle2, XCircle, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState<any[]>([]); 
  const navigate = useNavigate();

  const [activeQuizQuestions, setActiveQuizQuestions] = useState<any[]>([]);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState({ good: 0, bad: 0 });
  const [quizFinished, setQuizFinished] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) { navigate("/login"); return; }

      try {
        const userResponse = await axios.get(`http://localhost:8083/api/auth/my-profile?email=${email}`);
        setUser(userResponse.data);

        const quizResponse = await axios.get(`http://localhost:8083/api/quiz/questions?email=${email}`);
        setQuizData(quizResponse.data);
      } catch (error) {
        console.error("Błąd pobierania danych dashboardu:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const shuffleArray = (array: any[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const startQuiz = (questions: any[]) => {
    if (!questions || questions.length === 0) return;
    
    setActiveQuizQuestions(questions);
    setIsQuizMode(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setQuizScore({ good: 0, bad: 0 });
    setQuizFinished(false);
    
    setShuffledOptions(shuffleArray(questions[0].options));
  };

  const startMegaMix = () => {
  
    const allQuestions = quizData.flatMap(insect => insect.templateQuestions || insect.questions || insect.questionDTOS || insect.questionsDto || []);
    if (allQuestions.length === 0) return;
    const shuffledQuestions = shuffleArray(allQuestions);
    startQuiz(shuffledQuestions);
  };

  const handleAnswerClick = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(option);
  };

  const submitAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;

    const currentQuestion = activeQuizQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    setQuizScore(prev => ({
      good: isCorrect ? prev.good + 1 : prev.good,
      bad: !isCorrect ? prev.bad + 1 : prev.bad
    }));

    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = async () => {
    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex < activeQuizQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
      setShuffledOptions(shuffleArray(activeQuizQuestions[nextIndex].options));
    } else {
      setQuizFinished(true);
      const email = localStorage.getItem("userEmail");
      if (email) {
        try {
          const res = await axios.post("http://localhost:8083/api/quiz/submit-results", {
            email: email,
            correctAnswers: quizScore.good,
            wrongAnswers: quizScore.bad
          });
          
          setUser((prev: any) => ({
            ...prev,
            goodAnswers: res.data.newGoodAnswers ?? (prev.goodAnswers + quizScore.good),
            badAnswers: res.data.newBadAnswers ?? (prev.badAnswers + quizScore.bad)
          }));
        } catch (error) {
          console.error("Nie udało się zapisać wyników quizu:", error);
        }
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen hero-pattern flex items-center justify-center">
      <Loader2 className="text-lime-500 animate-spin" size={48} />
    </div>
  );

  // Bezpieczne wyliczenie łącznej liczby pytań z mapowania templateQuestions
  const totalMegaQuestionsCount = quizData.flatMap(insect => insect.templateQuestions || insect.questions || insect.questionDTOS || insect.questionsDto || []).length;

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
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Twoje quizy" active onClick={() => setIsQuizMode(false)} />
          <SidebarItem icon={<Bug size={20} />} label="Wszystkie owady" onClick={() => navigate("/all-insects")} />
          <SidebarItem icon={<List size={20} />} label="Kategorie" onClick={() => navigate("/categories")} />
          <SidebarItem icon={<Trophy size={20} />} label="Ranking" />
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-white hover:bg-white/10 gap-3 rounded-xl transition-all font-bold">
            <LogOut size={20} /> Wyloguj się
          </Button>
        </div>
      </aside>

      <main className="flex-grow p-12 overflow-y-auto">
        {isQuizMode ? (
          <div className="max-w-3xl mx-auto py-6">
            {!quizFinished ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between text-sm font-bold text-zinc-400">
                  <span>Pytanie {currentQuestionIndex + 1} z {activeQuizQuestions.length}</span>
                  <div className="flex gap-4">
                    <span className="text-lime-500">Dobre: {quizScore.good}</span>
                    <span className="text-red-500">Złe: {quizScore.bad}</span>
                  </div>
                </div>

                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-lime-500 h-full transition-all duration-300" 
                    style={{ width: `${((currentQuestionIndex + 1) / activeQuizQuestions.length) * 100}%` }}
                  ></div>
                </div>

                <div className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-[2rem] shadow-xl">
                  <h2 className="text-3xl font-black text-white leading-snug">
                    {activeQuizQuestions[currentQuestionIndex]?.content}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {shuffledOptions.map((option, idx) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrectAnswer = option === activeQuizQuestions[currentQuestionIndex]?.correctAnswer;
                    
                    let btnStyle = "bg-zinc-900/30 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/50";
                    if (isSelected && !isAnswerSubmitted) btnStyle = "bg-lime-600/20 border-lime-500 text-lime-400 shadow-lg shadow-lime-500/5";
                    if (isAnswerSubmitted) {
                      if (isCorrectAnswer) btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-black";
                      else if (isSelected && !isCorrectAnswer) btnStyle = "bg-red-500/20 border-red-500 text-red-400 font-black";
                      else btnStyle = "bg-zinc-900/10 border-zinc-900 text-zinc-600 pointer-events-none";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerClick(option)}
                        disabled={isAnswerSubmitted}
                        className={`w-full text-left p-6 rounded-2xl border text-lg font-bold transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {isAnswerSubmitted && isCorrectAnswer && <CheckCircle2 className="text-emerald-500" size={24} />}
                        {isAnswerSubmitted && isSelected && !isCorrectAnswer && <XCircle className="text-red-500" size={24} />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  {!isAnswerSubmitted ? (
                    <Button 
                      disabled={!selectedAnswer} 
                      onClick={submitAnswer}
                      className="h-14 px-8 bg-lime-600 hover:bg-lime-500 disabled:opacity-30 disabled:hover:bg-lime-600 text-white font-black text-md rounded-xl shadow-lg shadow-lime-600/10"
                    >
                      Sprawdź odpowiedź
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNextQuestion}
                      className="h-14 px-8 bg-zinc-100 hover:bg-white text-zinc-950 font-black text-md rounded-xl shadow-lg flex items-center gap-2"
                    >
                      {currentQuestionIndex + 1 === activeQuizQuestions.length ? "Zakończ quiz" : "Następne pytanie"} 
                      <ArrowRight size={18} />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 space-y-6 bg-zinc-900/30 border border-zinc-800 rounded-[3rem] p-12 shadow-2xl">
                <Trophy className="mx-auto text-lime-500 animate-bounce" size={72} />
                <h2 className="text-4xl font-black text-white">Quiz ukończony!</h2>
                <p className="text-zinc-400 text-lg max-w-md mx-auto">
                  Świetna seria! Twoje punkty zostały automatycznie zaktualizowane i zapisane na Twoim profilu.
                </p>
                <div className="flex justify-center gap-8 py-4">
                  <div className="bg-zinc-900/80 px-8 py-4 rounded-2xl border border-zinc-800">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Prawidłowe</p>
                    <p className="text-4xl font-black text-emerald-400">+{quizScore.good}</p>
                  </div>
                  <div className="bg-zinc-900/80 px-8 py-4 rounded-2xl border border-zinc-800">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Błędne</p>
                    <p className="text-4xl font-black text-red-400">+{quizScore.bad}</p>
                  </div>
                </div>
                <Button 
                  onClick={() => setIsQuizMode(false)}
                  className="h-12 px-6 bg-lime-600 hover:bg-lime-500 text-white rounded-xl font-bold mt-4"
                >
                  Wróć do panelu głównego
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
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

            <div className="mt-16 max-w-5xl space-y-8">
              <h2 className="text-3xl font-black text-white tracking-tight">Twoje Treningi Wiedzy</h2>

              {quizData.length === 0 ? (
                <div className="p-16 border-2 border-dashed border-zinc-800/40 rounded-[3rem] flex flex-col items-center justify-center text-zinc-500">
                  <Bug size={48} className="opacity-20 mb-4" />
                  <p className="text-xl font-medium tracking-tight mb-2">Nie dodałeś jeszcze żadnych owadów do puli</p>
                  <Button onClick={() => navigate("/all-insects")} variant="link" className="text-lime-500 font-bold text-sm">
                    Przejdź do encyklopedii i dodaj owady za pomocą ikonki plusa (+)
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900 to-lime-950/20 border-2 border-lime-500/20 p-8 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-lime-500/40 transition-all shadow-xl">
                    <div className="space-y-2 text-center md:text-left">
                      <span className="text-xs font-black text-lime-500 uppercase tracking-widest bg-lime-500/10 px-3 py-1 rounded-full border border-lime-500/20">
                        Tryb Hardcore
                      </span>
                      <h3 className="text-3xl font-black text-white pt-2">Wielki Megamiks Owadów</h3>
                      <p className="text-zinc-400 text-sm max-w-xl font-medium">
                        Wylosuj pytania ze **wszystkich ({quizData.length})** Twoich zapisanych gatunków. Odpowiedzi oraz kolejność pytań zostaną całkowicie wymieszane!
                      </p>
                    </div>
                    <Button 
                      onClick={startMegaMix}
                      disabled={totalMegaQuestionsCount === 0}
                      className="h-14 px-8 bg-lime-500 hover:bg-lime-400 text-zinc-950 font-black text-md rounded-2xl shadow-lg shadow-lime-500/10 flex items-center gap-2 shrink-0 group-hover:scale-105 transition-transform"
                    >
                      <Play size={18} fill="currentColor" /> Uruchom Megamiks ({totalMegaQuestionsCount} pyt.)
                    </Button>
                  </div>

                  <div className="space-y-3 pt-4">
                    <h4 className="text-sm font-black text-zinc-500 uppercase tracking-widest">Trening dedykowany (Osobne zestawy):</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {quizData.map((insectData: any) => {
                        // Bezpieczne mapowanie pytań z priorytetem dla pola templateQuestions z backendu
                        const questions = insectData.templateQuestions || insectData.questions || insectData.questionDTOS || insectData.questionsDto || [];
                        const hasQuestions = questions.length > 0;

                        return (
                          <div 
                            key={insectData.id || insectData.insectId} 
                            className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl flex items-center justify-between group hover:border-zinc-700/60 transition-all"
                          >
                            <div>
                              <h5 className="font-black text-lg text-white group-hover:text-lime-500 transition-colors">
                                {insectData.commonName || "Owad"}
                              </h5>
                              <p className="text-xs text-zinc-500 font-bold">
                                Liczba pytań w zestawie: <span className="text-zinc-400">{questions.length}</span>
                              </p>
                            </div>
                            <button
                              onClick={() => startQuiz(questions)}
                              disabled={!hasQuestions}
                              title={hasQuestions ? "Rozpocznij ten quiz" : "Ten owad nie ma jeszcze przypisanych pytań"}
                              className="p-3 bg-zinc-950/80 border border-zinc-800 text-zinc-400 hover:text-lime-500 hover:border-lime-500/40 disabled:opacity-20 disabled:pointer-events-none rounded-xl transition-all duration-300 active:scale-95"
                            >
                              <Play size={16} fill="currentColor" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
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
          <div className={`${barClass} h-full w-[100%] shadow-lg transition-all duration-1000`}></div>
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