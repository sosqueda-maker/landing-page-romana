
import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface ResultCardProps {
  image: string;
  technique: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ image, technique }) => {
  return (
    <div className="w-full md:w-[450px] flex-shrink-0 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 flex flex-col group md:snap-center">
      {/* Container 1:1 (Quadrado) */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={image} 
          alt="Resultado de Procedimento" 
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 md:group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-8 text-center bg-white border-t border-slate-50">
        <p className="text-xs md:text-sm font-medium italic text-slate-600 leading-relaxed">
          "{technique}"
        </p>
        <div className="w-12 h-1 bg-vet-accent/20 mx-auto rounded-full mt-4" />
      </div>
    </div>
  );
};

const RealResults: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 20);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollState);
      window.addEventListener('resize', updateScrollState);
      updateScrollState();
      return () => {
        el.removeEventListener('scroll', updateScrollState);
        window.removeEventListener('resize', updateScrollState);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = 450; // Largura do card no desktop
      const gap = 32; // gap-8 = 32px
      const scrollAmount = cardWidth + gap;
      
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const results = [
    {
      image: "/img/galeria1.png",
      technique: "Profissional extremamente qualificada. Técnica impecável e resultado acima da média."
    },
    {
      image: "/img/galeria2.png",
      technique: "Romana domina o que faz. Dá para sentir a experiência e o cuidado em cada detalhe."
    },
    {
      image: "/img/galeria3.png",
      technique: "Atendimento excelente e uma capacidade técnica realmente diferenciada. Recomendo sem medo."
    }
  ];

  return (
    <section id="resultados" className="py-16 lg:py-20 bg-vet-light overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-vet-accent/10 px-5 py-2 rounded-full border border-vet-accent/10">
            <Sparkles size={14} className="text-vet-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-vet-primary">Galeria de Resultados</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-montserrat font-black text-vet-primary uppercase tracking-tighter leading-tight">
            Transformações <br />
            <span className="text-vet-accent italic underline decoration-vet-accent/20">Impressionantes.</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base italic max-w-xl mx-auto px-4">
            Veja como devolvemos a autoestima de nossas clientes com técnicas exclusivas.
          </p>
        </div>

        {/* Layout de Galeria Responsivo */}
        <div className="relative group max-w-6xl mx-auto mb-10">
          {/* Setas de Navegação (Desktop & Tablet apenas) */}
          <div className="hidden md:block">
            <button 
              onClick={() => scroll('left')}
              className={`absolute left-0 top-[40%] -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-vet-primary transition-all active:scale-90 hover:bg-vet-primary hover:text-white ${canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              aria-label="Ver anterior"
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className={`absolute right-0 top-[40%] translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-vet-primary transition-all active:scale-90 hover:bg-vet-primary hover:text-white ${canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              aria-label="Ver próximo"
            >
              <ChevronRight size={24} strokeWidth={3} />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex flex-col md:flex-row md:overflow-x-auto gap-8 no-scrollbar md:snap-x md:snap-mandatory scroll-smooth"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >
            {results.map((result, idx) => (
              <ResultCard 
                key={idx}
                image={result.image}
                technique={result.technique}
              />
            ))}
          </div>
        </div>

        {/* CTA de Conversão */}
        <div className="text-center px-4">
          <button 
            onClick={onCtaClick}
            className="w-full sm:w-auto bg-vet-primary text-white hover:bg-vet-accent px-12 py-6 rounded-full font-black text-sm tracking-[0.2em] uppercase shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4 group mx-auto"
          >
            Quero esse resultado agora
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center justify-center gap-2 mt-6 text-emerald-600">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             <p className="text-[10px] font-black uppercase tracking-widest">Agenda aberta para esta semana</p>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default RealResults;
