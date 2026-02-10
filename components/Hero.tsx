
import React from 'react';
import { CheckCircle, Users, Award } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.604 6.04L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.635 0 12.032-5.396 12.036-12.031a11.772 11.772 0 00-3.417-8.456" />
  </svg>
);

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const stats = [
    { label: "ANOS DE EXPERIÊNCIA", value: "20+", icon: <Award size={14} /> },
    { label: "Clientes Reais", value: "+500", icon: <Users size={14} /> }
  ];

  return (
    <section className="relative pt-28 pb-12 lg:pt-48 lg:pb-20 bg-white overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-vet-accent/5 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-vet-accent/10 px-4 py-2 rounded-full border border-vet-accent/20">
                <CheckCircle size={14} className="text-vet-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-vet-primary">Romana Instituto de Beleza</span>
              </div>

              <h1 className="text-4xl lg:text-7xl font-montserrat font-extrabold text-vet-primary leading-[1.1] tracking-tighter">
                Mega Hair e Aplique <br className="hidden md:block" />
                de Cabelo em <span className="text-vet-accent italic">Brasília.</span>
              </h1>
              
              <p className="text-slate-600 font-medium text-lg leading-relaxed max-w-xl">
                Referência em Mega Hair em Brasília, com técnicas naturais e exclusivas. Cuidamos de cada detalhe para elevar sua autoestima com segurança, naturalidade e acabamento impecável.
              </p>

              {/* Track Records Reduzido - Posicionado antes do CTA */}
              <div className="flex flex-wrap gap-8 py-6 border-y border-slate-50">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-vet-light flex items-center justify-center text-vet-primary group-hover:bg-vet-primary group-hover:text-white transition-colors duration-300">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-xl font-montserrat font-black text-vet-primary leading-none">{stat.value}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <button 
                  onClick={onCtaClick}
                  className="btn-primary flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase shadow-xl"
                >
                  <WhatsAppIcon size={22} />
                  Agendar Agora
                </button>
                
                <div className="flex items-center gap-4 px-6 border-l-2 border-slate-100">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-vet-light overflow-hidden">
                        <img src={`/img/avatar${i}.png`} alt="Cliente" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-black text-vet-primary leading-none">4.9 / 5.0</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Nota Google</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative z-10 w-full max-w-[480px] animate-float">
              <img 
                src="/img/hero.png" 
                alt="Romana Mega Hair Expert" 
                className="w-full h-auto drop-shadow-2xl rounded-[3rem] border-8 border-white"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl hidden md:flex items-center gap-3 border border-slate-50">
                 <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                    <CheckCircle size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-vet-primary">Qualidade Premium</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Cabelos 100% Humanos</p>
                 </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-vet-accent/5 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
