
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onCtaClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCtaClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneNumber = "(61) 98530-3010";
  const phoneLink = "tel:+5561985303010";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 glass-header' : 'py-6 bg-white'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="/" className="flex items-center h-12 md:h-16">
          <Logo />
        </a>

        {/* Desktop Buttons */}
        <nav className="hidden lg:flex items-center gap-4">
          <a 
            href={phoneLink}
            className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-vet-primary text-vet-primary font-montserrat font-black text-[10px] uppercase tracking-widest hover:bg-vet-primary hover:text-white transition-all group"
          >
            <Phone size={14} className="group-hover:animate-bounce" />
            {phoneNumber}
          </a>
          <button 
            onClick={onCtaClick}
            className="btn-primary flex items-center gap-2 px-8 py-3.5 rounded-full font-montserrat font-black text-[10px] uppercase tracking-widest shadow-lg"
          >
            <MessageSquare size={14} />
            Entrar em Contato
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-vet-primary p-2" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[80px] bg-white z-40 p-8 flex flex-col gap-6 text-center animate-in fade-in slide-in-from-right duration-300">
          <div className="mt-12 space-y-4">
            <a 
              href={phoneLink}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-3 w-full py-5 rounded-full border-2 border-vet-primary text-vet-primary font-montserrat font-black text-xs uppercase tracking-widest active:bg-vet-primary active:text-white transition-colors"
            >
              <Phone size={18} />
              Ligar: {phoneNumber}
            </a>
            <button 
              onClick={() => { onCtaClick(); setIsMobileMenuOpen(false); }}
              className="btn-primary flex items-center justify-center gap-3 w-full py-5 rounded-full font-montserrat font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all"
            >
              <MessageSquare size={18} />
              Enviar Mensagem
            </button>
          </div>
          <p className="mt-auto text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em]">Atendimento de Terça a Sábado</p>
        </div>
      )}
    </header>
  );
};

export default Header;
