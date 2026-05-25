import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { Bug, Mail, Lock, LogIn, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

 
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      
      const response = await axios.post("http://localhost:8083/api/auth/login", {
        email: "admin@bugwise.com",
        password: "admin123",
      });

      
      console.log("Zalogowano:", response.data);
      localStorage.setItem("userEmail", email); 
      
      navigate("/dashboard");
    } catch (err: any) {
  
      const message = err.response?.data || "Błąd połączenia z serwerem";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-pattern flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        
        
        <div className="flex flex-col items-center mb-10">
          <div className="bg-lime-600 p-4 rounded-3xl shadow-[0_0_30px_rgba(132,204,22,0.3)] mb-4 transition-transform hover:scale-110">
            <Bug className="text-white fill-white" size={40} />
          </div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">BugWise</h1>
          <p className="text-zinc-500 font-medium mt-2 text-center">Witaj z powrotem, entomologu!</p>
        </div>

       
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl">
          <form className="space-y-6" onSubmit={handleLogin}>
            
   
            <div className="space-y-2">
              <Label className="text-zinc-400 ml-1 flex items-center gap-2 uppercase text-[10px] font-black tracking-[0.2em]">
                <Mail size={12} className="text-lime-500" /> Adres Email
              </Label>
              <Input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="twoj@email.com" 
                className="bg-zinc-950/50 border-zinc-800 h-14 rounded-2xl text-white focus:ring-2 focus:ring-lime-500/50 transition-all px-6"
              />
            </div>

           
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <Label className="text-zinc-400 flex items-center gap-2 uppercase text-[10px] font-black tracking-[0.2em]">
                  <Lock size={12} className="text-lime-500" /> Hasło
                </Label>
                <button type="button" className="text-[11px] text-lime-500/70 hover:text-lime-500 transition-colors font-bold uppercase tracking-tighter">
                  Zapomniałeś?
                </button>
              </div>
              <Input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="bg-zinc-950/50 border-zinc-800 h-14 rounded-2xl text-white focus:ring-2 focus:ring-lime-500/50 transition-all px-6"
              />
            </div>

           
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold p-3 rounded-xl text-center">
                {error}
              </div>
            )}

           
            <Button 
              disabled={loading}
              className="w-full bg-lime-600 hover:bg-lime-700 text-white font-black h-16 rounded-2xl gap-3 shadow-xl shadow-lime-900/20 text-lg mt-4 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>Zaloguj się <LogIn size={20} /></>
              )}
            </Button>
          </form>

        
          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-zinc-500 text-sm">
              Nie masz jeszcze konta?
            </p>
            <Link to="/register">
              <button className="mt-2 text-white font-black flex items-center gap-2 mx-auto hover:text-lime-500 transition-colors group">
                Zarejestruj się za darmo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        
        <div className="text-center mt-8">
          <Link to="/">
            <button className="text-zinc-600 hover:text-zinc-400 text-xs font-bold uppercase tracking-widest transition-colors">
              Strona główna
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}