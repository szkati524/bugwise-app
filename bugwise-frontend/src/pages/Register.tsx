import { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom"; 
import { Bug, Mail, Lock, UserPlus, ArrowLeft, User, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
   
      const response = await axios.post("http://localhost:8081/api/auth/register", formData);
      setMessage("✅ " + response.data);
    } catch (error: any) {
      const errorMsg = error.response?.data || "Błąd połączenia z serwerem";
      setMessage("❌ " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-pattern flex items-center justify-center p-6">
      <div className="w-full max-w-md relative">
        
      
        <Link 
          to="/" 
          className="absolute -top-12 left-0 flex items-center gap-2 text-zinc-500 hover:text-lime-500 transition-colors font-bold uppercase text-[10px] tracking-[0.2em] group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Wróć do strony głównej
        </Link>

        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl">
          
        
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Stwórz konto</h2>
            <p className="text-zinc-500 text-sm mt-1">Dołącz do społeczności BugWise</p>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
          
            <div className="space-y-2">
              <Label className="text-zinc-400 ml-1 flex items-center gap-2 uppercase text-[10px] font-black tracking-[0.2em]">
                <User size={12} className="text-lime-500" /> Twój Nick
              </Label>
              <Input 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
                type="text" 
                placeholder="np. BugHunter99" 
                className="bg-zinc-950/50 border-zinc-800 h-14 rounded-2xl text-white focus:ring-2 focus:ring-lime-500/50 transition-all px-6"
              />
            </div>

          
            <div className="space-y-2">
              <Label className="text-zinc-400 ml-1 flex items-center gap-2 uppercase text-[10px] font-black tracking-[0.2em]">
                <Mail size={12} className="text-lime-500" /> Adres Email
              </Label>
              <Input 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                type="email" 
                placeholder="twoj@email.com" 
                className="bg-zinc-950/50 border-zinc-800 h-14 rounded-2xl text-white focus:ring-2 focus:ring-lime-500/50 transition-all px-6"
              />
            </div>

            
            <div className="space-y-2">
              <Label className="text-zinc-400 ml-1 flex items-center gap-2 uppercase text-[10px] font-black tracking-[0.2em]">
                <Lock size={12} className="text-lime-500" /> Hasło
              </Label>
              <Input 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                type="password" 
                placeholder="Minimum 8 znaków" 
                className="bg-zinc-950/50 border-zinc-800 h-14 rounded-2xl text-white focus:ring-2 focus:ring-lime-500/50 transition-all px-6"
              />
            </div>

            
            {message && (
              <p className={`text-xs font-bold text-center p-3 rounded-xl ${message.includes("✅") ? "bg-lime-500/10 text-lime-500" : "bg-red-500/10 text-red-500"}`}>
                {message}
              </p>
            )}

            <Button 
              disabled={loading}
              className="w-full bg-lime-600 hover:bg-lime-700 text-white font-black h-16 rounded-2xl gap-3 shadow-xl shadow-lime-900/20 text-lg mt-4 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Stwórz konto <UserPlus size={20} /></>}
            </Button>
          </form>

          
          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-zinc-500 text-sm">
              Masz już konto?
            </p>
            <Link to="/login">
              <button className="mt-2 text-white font-black flex items-center gap-2 mx-auto hover:text-lime-500 transition-colors group">
                Zaloguj się <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
          
        </div> 
      </div>
    </div>
  );
}
   