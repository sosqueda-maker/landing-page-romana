
import React from 'react';

const Logo: React.FC<{ className?: string; light?: boolean }> = ({ className = "h-12", light = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Imagem da Logo vindo da pasta img */}
      <img 
        src="/img/logo.png" 
        alt="Romana Instituto de Beleza" 
        className="h-full w-auto object-contain"
      />
      
      <div className="flex flex-col items-start gap-0">
        <span className={`font-serif text-2xl tracking-[0.1em] leading-none ${light ? 'text-white' : 'text-vet-primary'}`}>
          ROMANA
        </span>
        <span className={`text-[8px] font-sans font-bold uppercase tracking-[0.3em] ${light ? 'text-white/80' : 'text-vet-primary'}`}>
          INSTITUTO DE BELEZA
        </span>
      </div>
    </div>
  );
};

export default Logo;
