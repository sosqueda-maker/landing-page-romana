
import React from 'react';
import { X, Gift, ArrowRight } from 'lucide-react';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCtaClick: () => void;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ isOpen, onClose, onCtaClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-vet-primary/95 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-slate-400 hover:text-vet-primary p-2 z-50 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-10 text-center">
          <div className="w-20 h-20 bg-vet-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-vet-accent animate-bounce">
            <Gift size={40} />
          </div>
          
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-vet-accent mb-2">Oferta Exclusiva</h2>
          <h3 className="text-3xl font-montserrat font-black text-vet-primary uppercase tracking-tighter leading-tight mb-4">
            Sua beleza não <br />pode esperar!
          </h3>
          
          <div className="bg-vet-light p-6 rounded-2xl mb-8 border border-vet-accent/10">
            <p className="text-slate-600 font-medium mb-1 italic">Vimos que você quer transformar seu visual.</p>
            <p className="text-vet-primary font-black text-xl uppercase tracking-tighter">
              Ganhe <span className="text-emerald-600 text-3xl">10% OFF</span> na <br />sua primeira visita hoje!
            </p>
          </div>

          <button 
            onClick={() => {
              onCtaClick();
              onClose();
            }}
            className="w-full btn-primary py-6 rounded-full font-black text-white text-xs tracking-widest uppercase flex items-center justify-center gap-3 shadow-2xl"
          >
            QUERO MEU DESCONTO AGORA
            <ArrowRight size={18} />
          </button>
          
          <button 
            onClick={onClose}
            className="mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-vet-accent transition-colors"
          >
            Não, prefiro pagar valor integral
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
