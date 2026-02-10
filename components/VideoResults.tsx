
import React, { useState } from 'react';
import { Play, Sparkles, ArrowRight, Youtube } from 'lucide-react';

interface YouTubeVideoProps {
  videoId: string;
  title: string;
  placeholderImg: string;
}

const YouTubeCard: React.FC<YouTubeVideoProps> = ({ videoId, title, placeholderImg }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // URL de embed sem quebras de linha e com parâmetros de correção:
  // autoplay=1 + mute=1 é a combinação obrigatória para browsers permitirem o play automático.
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&rel=0&playsinline=1&modestbranding=1&enablejsapi=1`;

  return (
    <div className="relative aspect-[9/16] w-full bg-slate-100 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl group border border-slate-100">
      {!isLoaded ? (
        <div 
          className="relative w-full h-full cursor-pointer"
          onClick={() => setIsLoaded(true)}
        >
          {/* Thumbnail Local de Capa */}
          <img 
            src={placeholderImg} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay de Interação */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* Botão de Play Estilizado */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-5 bg-white/30 backdrop-blur-xl rounded-full border border-white/40 text-white shadow-2xl transition-all group-hover:scale-110 active:scale-95">
              <Play size={40} fill="currentColor" />
            </div>
          </div>

          {/* Badge de "Em Movimento" */}
          <div className="absolute top-6 left-6 px-4 py-2 bg-vet-accent/90 backdrop-blur-md rounded-full shadow-lg">
            <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Ver Resultado
            </span>
          </div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 text-white/80">
              <Youtube size={16} />
              <span className="text-[9px] font-bold uppercase tracking-widest">YouTube Video</span>
            </div>
          </div>
        </div>
      ) : (
        /* Iframe com permissões explícitas de autoplay */
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  );
};

const VideoResults: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
  // IDs do YouTube (Videos que permitem incorporação)
  const videos = [
    {
      id: "94T55Cm6GZ4", 
      title: "Transformação Mega Hair Romana 1",
      placeholder: "/img/galeria1.png"
    },
    {
      id: "Lp4Yh8_with_id_2", 
      title: "Movimento e Naturalidade",
      placeholder: "/img/galeria2.png"
    },
    {
      id: "vN40L6n_with_id_3", 
      title: "Acabamento Premium",
      placeholder: "/img/galeria3.png"
    }
  ];

  return (
    <section id="movimento" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header da Seção */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-vet-accent/10 px-5 py-2 rounded-full border border-vet-accent/10">
            <Sparkles size={14} className="text-vet-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-vet-primary">Clientes Satisfeitas</span>
          </div>
          
          <p className="text-slate-500 font-medium text-sm md:text-base italic max-w-xl mx-auto px-4 pt-4">
            Leveza ao tocar, naturalidade ao se mover, confiança ao se olhar.
          </p>
        </div>

        {/* Grade de Vídeos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-20 max-w-6xl mx-auto">
          {videos.map((video, idx) => (
            <YouTubeCard 
              key={idx}
              videoId={video.id}
              title={video.title}
              placeholderImg={video.placeholder}
            />
          ))}
        </div>

        {/* CTA de Conversão */}
        <div className="text-center px-4">
          <div className="max-w-xl mx-auto mb-10 p-6 bg-vet-light rounded-4xl border border-vet-accent/10">
            <p className="text-slate-600 font-medium italic text-sm mb-2">
              "A naturalidade é a nossa maior assinatura."
            </p>
            <p className="text-[10px] font-black text-vet-primary uppercase tracking-[0.2em]">Equipe Romana</p>
          </div>

          <button
            onClick={onCtaClick}
            className="w-full sm:w-auto bg-vet-primary text-white hover:bg-vet-accent px-12 py-6 rounded-full font-black text-sm tracking-[0.2em] uppercase shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4 group mx-auto"
          >
            QUERO ESSA TRANSFORMAÇÃO
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="mt-6 flex items-center justify-center gap-2 text-emerald-600">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             <p className="text-[10px] font-black uppercase tracking-widest">Avaliação técnica individual Gratuita</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoResults;
