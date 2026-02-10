
import React from 'react';
import { ShieldCheck, Award, Sparkles } from 'lucide-react';

const About: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
  return (
    <section id="sobre" className="py-16 lg:py-20 bg-vet-primary text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
      
      <div className="container mx-auto px-6 pt-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-white font-black uppercase tracking-[0.4em] text-xs opacity-90">A Especialista</h2>
              <h3 className="text-4xl lg:text-6xl font-montserrat font-black leading-tight text-white">
                Romana Instituto <br />de Beleza.
              </h3>
            </div>
            
            <p className="text-white/90 font-medium text-lg leading-relaxed italic">
              "A melhor em colocação de mega hair de Brasília e região!" – Com mais de 20 anos de experiência e um olhar clínico para a beleza, Romana dedica sua vida a transformar a auto estima de suas clientes. Localizada no coração de Águas Claras, somos referência por unir técnicas avançadas, profissionalismo e a seleção dos melhores cabelos naturais do Brasil.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 border border-white/30">
                  <Sparkles className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider mb-1 text-white">Mega Hair Premium</h4>
                  <p className="text-xs text-white/60">Técnicas variadas para o caimento perfeito.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 border border-white/30">
                  <ShieldCheck className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider mb-1 text-white">Qualidade Garantida</h4>
                  <p className="text-xs text-white/60">Uso exclusivo das melhores marcas mundiais.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={onCtaClick}
              className="bg-white text-vet-primary hover:bg-vet-accent hover:text-white px-12 py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-2xl"
            >
              Agendar Avaliação
            </button>
          </div>

          <div className="relative">
            <div className="rounded-5xl overflow-hidden border-[10px] border-white/5 shadow-2xl">
              <img 
                src="/img/espaco.png" 
                alt="Ambiente Romana Studio" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-4xl shadow-2xl text-vet-primary hidden sm:block">
              <Award size={32} className="text-vet-accent" />
              <p className="text-2xl font-black mt-2 leading-none text-vet-primary">20+ anos</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Transformando Vidas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 bg-white" style={{ clipPath: 'polygon(50% 0, 0 100%, 100% 100%)' }} />
    </section>
  );
};

export default About;
