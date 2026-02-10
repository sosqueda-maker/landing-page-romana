
import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle, Smartphone } from 'lucide-react';
import { supabase } from '../supabase';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('leads').insert([{ 
        name, 
        whatsapp, 
        status: 'Novo Lead' 
      }]);
      
      if (error) throw error;
      setSubmitted(true);
      setTimeout(() => {
        window.location.href = `https://api.whatsapp.com/send/?phone=5561985303010&text=Olá Romana! Vim pelo site e gostaria de agendar uma avaliação. Meu nome é ${name}`;
      }, 1500);
    } catch (err) {
      alert('Erro ao processar. Tente o contato direto: (61) 98530-3010.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-vet-primary w-full max-w-xl rounded-[2.5rem] md:rounded-5xl shadow-2xl overflow-hidden animate-in zoom-in duration-500 my-auto border border-white/10">
        <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white p-2 z-50 transition-colors">
          <X size={24} className="md:w-7 md:h-7" />
        </button>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/5 bg-vet-accent p-8 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-[-20px] left-[-20px] w-32 h-32 bg-white opacity-10 rounded-full blur-2xl" />
             <div className="relative z-10">
               <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Smartphone size={24} className="md:w-8 md:h-8 text-white" />
               </div>
               <h3 className="text-2xl md:text-3xl font-montserrat font-black uppercase tracking-tighter leading-tight mb-2 text-white">
                 Chame no <br className="hidden lg:block" />Whats.
               </h3>
               <p className="text-white/70 text-[9px] font-bold uppercase tracking-widest">Atendimento VIP.</p>
             </div>
          </div>

          <div className="lg:w-3/5 p-8 md:p-12">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-white/80 ml-1 block">Seu Nome</label>
                  <input 
                    required 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Ex: Ana Souza" 
                    className="w-full px-5 py-4 rounded-xl bg-white border-2 border-transparent focus:border-white focus:bg-white focus:outline-none font-bold text-vet-primary transition-all placeholder:text-slate-300 text-sm shadow-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-white/80 ml-1 block">WhatsApp</label>
                  <input 
                    required 
                    type="tel" 
                    value={whatsapp} 
                    onChange={e => setWhatsapp(e.target.value)} 
                    placeholder="(61) 00000-0000" 
                    className="w-full px-5 py-4 rounded-xl bg-white border-2 border-transparent focus:border-white focus:bg-white focus:outline-none font-bold text-vet-primary transition-all placeholder:text-slate-300 text-sm shadow-sm" 
                  />
                </div>
                
                <button 
                  disabled={loading} 
                  className="w-full bg-white text-vet-primary hover:bg-vet-accent hover:text-white py-5 rounded-full font-black text-[11px] tracking-widest uppercase flex items-center justify-center gap-3 shadow-2xl disabled:opacity-50 transition-all"
                >
                  {loading ? 'Redirecionando...' : (
                    <>
                      Agendar Agora
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-white" />
                </div>
                <h4 className="text-2xl font-montserrat font-black text-white uppercase tracking-tighter">Pronto!</h4>
                <p className="text-white/60 text-sm font-medium mt-2">Você será redirecionada...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadModal;
