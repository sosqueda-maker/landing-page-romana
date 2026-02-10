
import React from 'react';
import { Sparkles } from 'lucide-react';

const Gallery: React.FC = () => {
  const results = [
    {
      image: "/img/galeria1.png",
      label: "Mega Hair Premium"
    },
    {
      image: "/img/galeria2.png",
      label: "Loiro Iluminado"
    },
    {
      image: "/img/galeria3.png",
      label: "Técnica Invisível"
    }
  ];

  return (
    <section id="galeria" className="pt-10 pb-20 lg:pt-16 lg:pb-32 bg-white relative overflow-hidden">
      {/* Decorativo de Fundo */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-vet-accent/5 rounded-full blur-[150px] -z-10 translate-x-1/3 -translate-y-1/3" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center md:items-start mb-12 md:mb-20 gap-6 text-center md:text-left">
          <div className="space-y-4 md:space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-3 bg-vet-light px-4 py-1.5 rounded-full border border-vet-accent/10">
              <Sparkles size={14} className="text-vet-accent" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-vet-primary">Resultados Reais</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-montserrat font-black text-vet-primary uppercase tracking-tighter leading-tight">
              Resgatando <br />
              <span className="text-vet-accent italic relative">Autoestima</span> <br />
              <span className="text-3xl md:text-5xl lg:text-6xl">com Mega Hair.</span>
            </h2>
          </div>
        </div>

        {/* Grade de 3 Cards Grandes (Apenas Imagem, sem animações de hover) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {results.map((item, idx) => (
            <div 
              key={idx} 
              className="relative bg-white rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl transition-shadow duration-500"
            >
              {/* Container da Imagem 1:1 (1080x1080) - Sem Zoom no Hover */}
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.label} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-300 font-bold text-[9px] uppercase tracking-[0.4em] mb-4">
            Excelência técnica em cada fio colocado
          </p>
          <div className="flex justify-center gap-3">
            {[1,2,3].map(i => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${i === 1 ? 'w-8 bg-vet-accent' : 'w-2 bg-vet-accent/20'}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
