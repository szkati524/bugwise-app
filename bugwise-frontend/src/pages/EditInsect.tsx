import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, Save, Trash2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EditInsect() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [insect, setInsect] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8083/api/insects/${id}`)
      .then(res => { setInsect(res.data); setLoading(false); })
      .catch(() => navigate("/all-insects"));
  }, [id, navigate]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8083/api/insects/${id}`, insect);
      navigate(`/insects/${id}`);
    } catch (e) { alert("Błąd zapisu!"); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-lime-500"><Loader2 className="animate-spin" size={48} /></div>;

  return (
    <div className="min-h-screen hero-pattern p-6 md:p-12 text-zinc-100 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-4xl font-black">Edycja: {insect.commonName}</h1>
        
        <div className="space-y-6 bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Nazwa zwyczajowa" value={insect.commonName} onChange={e => setInsect({...insect, commonName: e.target.value})} />
            <Input label="Nazwa łacińska" value={insect.latinName} onChange={e => setInsect({...insect, latinName: e.target.value})} />
            <Input label="Rząd" value={insect.orderName} onChange={e => setInsect({...insect, orderName: e.target.value})} />
            <Input label="Rodzina" value={insect.familyName} onChange={e => setInsect({...insect, familyName: e.target.value})} />
          </div>

          <textarea 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 h-32"
            value={insect.description} 
            onChange={e => setInsect({...insect, description: e.target.value})} 
            placeholder="Opis owada (do 2000 znaków)"
          />

      
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-bold border-b border-zinc-800 pb-2">Pytania quizowe</h2>
            {insect.templateQuestions?.map((q: any, qIdx: number) => (
              <div key={qIdx} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
                <Input placeholder="Treść pytania" value={q.content} onChange={e => {
                  const qs = [...insect.templateQuestions];
                  qs[qIdx].content = e.target.value;
                  setInsect({...insect, templateQuestions: qs});
                }} />
                
               
                <div className="grid grid-cols-2 gap-2">
                  {[0,1,2,3].map((optIdx) => (
                    <Input key={optIdx} placeholder={`Opcja ${optIdx+1}`} value={q.options?.[optIdx] || ""} onChange={e => {
                      const qs = [...insect.templateQuestions];
                      if (!qs[qIdx].options) qs[qIdx].options = [];
                      qs[qIdx].options[optIdx] = e.target.value;
                      setInsect({...insect, templateQuestions: qs});
                    }} />
                  ))}
                </div>
                <Button onClick={() => setInsect({...insect, templateQuestions: insect.templateQuestions.filter((_:any, i:number) => i !== qIdx)})} 
                        className="bg-red-900/20 text-red-500 w-full"><Trash2 size={16} className="mr-2"/> Usuń pytanie</Button>
              </div>
            ))}
            <Button onClick={() => setInsect({...insect, templateQuestions: [...(insect.templateQuestions || []), {content: '', options: ['','','','']}]})} 
                    className="w-full bg-lime-600"><Plus size={16} className="mr-2" /> Dodaj pytanie</Button>
          </div>

          <div className="flex gap-4 pt-8 border-t border-zinc-800">
            <Button onClick={handleUpdate} className="bg-lime-600 flex-1 font-bold"><Save className="mr-2" /> Zapisz zmiany</Button>
            <Button onClick={() => navigate(-1)} variant="ghost">Anuluj</Button>
          </div>
        </div>
      </div>
    </div>
  );
}