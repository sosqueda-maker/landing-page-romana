
import React from 'react';
import { MessageCircle, Check } from 'lucide-react';

const specializations = [
  {
    name: "Loiro Perolado",
    desc: "Técnica de clareamento preservando a saúde do fio com marcas premium.",
    icon: "✨"
  },
  {
    name: "Morena Iluminada",
    desc: "Contraste sutil e elegante para iluminar seu rosto com naturalidade.",
    icon: "🌟"
  },
  {
    name: "Correção de Cor",
    desc: "Expertise em reverter tons indesejados e devolver o brilho real.",
    icon: "🎨"
  }
];

const Plans: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
  return (
    <section id="saude" className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-montserrat font-black text-vet-primary uppercase tracking-tighter">
            Especialista em <br />
            <span className="text-vet-accent italic underline decoration-vet-accent/20">Mechas & Loiros.</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">Não é apenas cor, é arte. Utilizamos as melhores marcas do mundo como Loreal, Wella e London para garantir o resultado dos seus sonhos.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {specializations.map((item, i) => (
             <div 
              key={i} 
              className="group p-10 rounded-5xl border-2 border-slate-50 transition-all duration-500 flex flex-col items-center text-center relative hover:border-vet-accent/30 hover:shadow-2xl bg-vet-light"
             >
                <div className="text-4xl mb-6">{item.icon}</div>
                <h4 className="font-montserrat font-black text-vet-primary text-2xl uppercase tracking-tighter mb-4">
                  {item.name}
                </h4>
                <p className="text-slate-500 text-sm font-medium italic leading-relaxed">
                  {item.desc}
                </p>
             </div>
          ))}
        </div>

        <div className="mt-16 lg:mt-20 max-w-5xl mx-auto">
          <div className="bg-vet-primary p-12 lg:p-20 rounded-5xl text-white relative overflow-hidden card-shadow border-4 border-vet-accent/20">
             <div className="absolute top-0 right-0 w-64 h-64 bg-vet-accent/10 rounded-full blur-[80px]" />
             <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                   <h4 className="text-3xl lg:text-4xl font-montserrat font-black uppercase tracking-tighter leading-tight">
                     Pronta para sua <span className="text-vet-accent">transformação?</span>
                   </h4>
                   <p className="text-slate-400 font-medium">Nossa equipe está pronta para avaliar seu fio e indicar a melhor técnica.</p>
                </div>
                <button 
                  onClick={onCtaClick}
                  className="bg-vet-accent text-white hover:bg-white hover:text-vet-primary px-12 py-6 rounded-full font-black text-sm tracking-widest uppercase transition-all shadow-2xl flex items-center justify-center gap-3"
                >
                  <MessageCircle size={20} fill="currentColor" />
                  Agendar pelo Whats
                </button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;
