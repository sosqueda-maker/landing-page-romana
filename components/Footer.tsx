
import React from 'react';
import Logo from './Logo';
import { Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer id="contato" className="bg-vet-primary text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mb-24">
          
          <div className="space-y-8">
            <Logo className="h-16" light />
            <p className="text-white/70 font-medium italic text-sm leading-relaxed">
              Resgatando a sua auto estima com as melhores técnicas de Mega Hair e Mechas de Brasília.
            </p>
          </div>

          <div className="space-y-8">
            <h4 className="text-xl font-montserrat font-extrabold uppercase tracking-tighter border-b-2 border-white/20 pb-3 inline-block">
              Contato
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/90 font-bold text-base">
                 <Phone size={18} className="text-white" />
                 <span>(61) 98530-3010</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-xl font-montserrat font-extrabold uppercase tracking-tighter border-b-2 border-white/20 pb-3 inline-block">
              Endereço
            </h4>
            <div className="flex gap-3 text-white/90 font-bold leading-relaxed italic text-sm">
               <MapPin size={24} className="text-white flex-shrink-0" />
               <p>Av. Jequitibá, 885 - Loja 01 – Águas Claras, Brasília – DF</p>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
            © 2025 Romana Instituto de Beleza - Todos os direitos reservados.
          </p>
          <div className="flex gap-10 items-center">
            {onAdminClick && (
              <button 
                onClick={onAdminClick}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
              >
                Painel Interno
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
