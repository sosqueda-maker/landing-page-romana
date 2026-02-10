
import React from 'react';

interface FloatingWhatsappProps {
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

const FloatingWhatsapp: React.FC<FloatingWhatsappProps> = ({ onCtaClick }) => {
  return (
    <div className="fixed bottom-10 right-10 z-[150]">
      <div className="relative group">
        <div className="absolute -inset-6 bg-[#25D366] rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
        <button 
          onClick={onCtaClick}
          className="relative bg-[#25D366] text-white w-20 h-20 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all animate-float border-4 border-white"
          aria-label="Agendar via WhatsApp"
        >
          <WhatsAppIcon size={36} className="text-white" />
          <span className="absolute -top-1 -right-1 flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-white shadow-sm"></span>
          </span>
        </button>
        
        <div className="absolute right-full mr-8 top-1/2 -translate-y-1/2 bg-white px-8 py-4 rounded-3xl shadow-2xl border border-slate-50 whitespace-nowrap hidden lg:flex animate-in fade-in slide-in-from-right-4 duration-500">
           <p className="font-montserrat font-black text-vet-primary text-sm uppercase tracking-tighter">Agende sua Avaliação! <span className="text-[#25D366] block text-[10px] tracking-widest mt-1 uppercase">Estamos Online</span></p>
           <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default FloatingWhatsapp;
