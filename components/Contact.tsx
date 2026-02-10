
import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

interface ContactProps {
  onCtaClick?: () => void;
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

const Contact: React.FC<ContactProps> = ({ onCtaClick }) => {
  return (
    <section id="localiza" className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-4xl lg:text-6xl font-montserrat font-black text-vet-primary uppercase tracking-tighter leading-tight">
            Nossa <br /><span className="text-vet-accent">Localização</span>
          </h2>
          <p className="text-slate-500 font-medium">Estamos em Águas Claras, prontos para te receber com todo carinho.</p>
        </div>

        <div className="w-full h-[500px] rounded-[60px] overflow-hidden shadow-2xl border-[12px] border-vet-light mb-8">
          <iframe 
             src="https://maps.google.com/maps?q=Av.%20Jequitib%C3%A1%2C%20885%20-%20loja%2001%20-%20%C3%81guas%20Claras%2C%20Bras%C3%ADlia%20-%20DF%2C%2071929-054&t=m&z=17&output=embed&iwloc=near" 
             width="100%" 
             height="100%" 
             style={{ border: 0 }} 
             allowFullScreen 
             loading="lazy" 
             title="Localização Romana Studio"
          ></iframe>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-10 bg-vet-light rounded-4xl border border-slate-100 flex flex-col items-center text-center">
             <MapPin className="text-vet-accent mb-4" size={32} />
             <h4 className="font-black text-sm uppercase tracking-widest mb-2">Endereço</h4>
             <p className="text-xs text-slate-500 font-bold">Av. Jequitibá, 885 - Loja 01 – Águas Claras, Brasília – DF</p>
          </div>
          <div className="p-10 bg-vet-light rounded-4xl border border-slate-100 flex flex-col items-center text-center">
             <Phone className="text-vet-accent mb-4" size={32} />
             <h4 className="font-black text-sm uppercase tracking-widest mb-2">WhatsApp</h4>
             <p className="text-xs text-slate-500 font-bold">(61) 98530-3010</p>
          </div>
          <div className="p-10 bg-vet-light rounded-4xl border border-slate-100 flex flex-col items-center text-center">
             <Clock className="text-vet-accent mb-4" size={32} />
             <h4 className="font-black text-sm uppercase tracking-widest mb-2">Horário</h4>
             <p className="text-xs text-slate-500 font-bold">Terça a Sábado<br/>9h às 19h</p>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 flex justify-center">
           <button 
             onClick={onCtaClick}
             className="bg-vet-accent text-white hover:bg-vet-primary px-12 py-6 rounded-full font-black text-sm tracking-[0.2em] uppercase transition-all shadow-2xl flex items-center gap-3 active:scale-95"
           >
             <WhatsAppIcon size={24} />
             Fale Conosco
           </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
