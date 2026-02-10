
import React from 'react';

const brands = ["Loreal", "Senscience", "London", "Braer", "Robert", "Wella", "Adcos"];

const salaoServices = [
  { 
    title: 'Mechas & Loiros', 
    image: '/img/servico1.png',
    desc: 'Especialista em Mechas, Loiras e Morenas Iluminadas com técnicas avançadas.' 
  },
  { 
    title: 'Estética Facial', 
    image: '/img/servico2.png',
    desc: 'Peeling, Limpeza de pele profunda e tratamentos Adcos.' 
  },
  { 
    title: 'Micropigmentação', 
    image: '/img/servico3.png',
    desc: 'Micro Labial e Sobrancelhas para realçar sua expressão natural.' 
  },
  { 
    title: 'Olhos e Delineador', 
    image: '/img/servico4.png',
    desc: 'Destaque seu olhar com técnicas precisas de delineado' 
  },
  { 
    title: 'Alongamento & Spa', 
    image: '/img/servico5.png',
    desc: 'Alongamento de unhas e o exclusivo Spa dos Pés para relaxamento total.' 
  },
  { 
    title: 'Manicure e Pedicure', 
    image: '/img/servico6.png',
    desc: 'Cuidado essencial com cuticulagem perfeita e esmaltação de longa duração.' 
  },
  { 
    title: 'Alisamentos', 
    image: '/img/servico7.png',
    desc: 'Realinhamento, Selante e Progressivas de alta performance.' 
  },
  { 
    title: 'Depilação', 
    image: '/img/servico8.png',
    desc: 'Depilação Corporal e Facial com técnicas profissionais e cera suave.' 
  },
  { 
    title: 'Cortes', 
    image: '/img/servico9.png',
    desc: 'Cortes modernos e personalizados para valorizar seu rosto e estilo.' 
  },
  { 
    title: 'Penteados e Maquiagem', 
    image: '/img/servico10.png',
    desc: 'Produção completa para festas, eventos e noivas com acabamento de luxo.' 
  }
];

export const MegaHairTypes: React.FC = () => {
  const types = [
    { title: 'Fita Adesiva', desc: 'Praticidade e naturalidade com aplicação rápida e acabamento invisível.' },
    { title: 'Queratina', desc: 'Fixação segura fio a fio para um resultado duradouro e natural.' },
    { title: 'Entrelaçamento', desc: 'Volume e comprimento sem cola, preservando a saúde dos fios.' },
    { title: 'Tic-tac', desc: 'Transformação imediata para ocasiões especiais, sem compromisso.' },
    { title: 'Nó Italiano', desc: 'Técnica premium com máxima discrição, leveza e conforto.' },
  ];

  return (
    <section id="mega-hair-tipos" className="py-16 lg:py-20 bg-white relative">
      <style>{`
        @keyframes tech-scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .tech-card-overlay {
          background: linear-gradient(to bottom, transparent, rgba(139, 94, 94, 0.05), transparent);
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
          animation: tech-scan 4s linear infinite;
        }
        .hud-corner {
          position: absolute;
          width: 15px;
          height: 15px;
          border-color: rgba(139, 94, 94, 0.2);
          transition: all 0.3s ease;
        }
        .group:hover .hud-corner {
          border-color: rgba(139, 94, 94, 0.6);
          width: 25px;
          height: 25px;
        }
      `}</style>
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-5xl font-montserrat font-black text-vet-primary uppercase tracking-tighter">Nossas Técnicas</h2>
          <p className="text-slate-500 mt-2 font-medium italic">Alta tecnologia aplicada ao alongamento capilar</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {types.map((type, idx) => (
            <div key={idx} className="bg-vet-light rounded-[2rem] border border-vet-accent/10 hover:border-vet-accent transition-all group shadow-sm hover:shadow-xl overflow-hidden flex flex-col relative min-h-[220px] justify-center text-center">
               <div className="tech-card-overlay" />
               <div className="p-10 relative z-10">
                 {/* HUD Corners */}
                 <div className="hud-corner top-4 left-4 border-t-2 border-l-2" />
                 <div className="hud-corner bottom-4 right-4 border-b-2 border-r-2" />
                 
                 <h4 className="font-montserrat font-black text-vet-primary uppercase tracking-tighter text-xl mb-4 group-hover:text-vet-accent transition-colors">{type.title}</h4>
                 <p className="text-slate-500 text-sm font-medium italic leading-relaxed">{type.desc}</p>
                 
                 <div className="mt-6 h-1 w-0 bg-vet-accent/30 mx-auto transition-all duration-700 group-hover:w-1/2" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services: React.FC = () => {
  return (
    <section id="servicos" className="py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-4xl lg:text-6xl font-montserrat font-black text-vet-primary uppercase tracking-tighter">Serviços do Salão</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium italic">Inovação e cuidado premium para sua beleza</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {salaoServices.map((item, idx) => (
            <div 
              key={idx}
              className="rounded-5xl bg-vet-light flex flex-col overflow-hidden border border-white hover:shadow-2xl transition-all duration-500 group relative"
            >
              <div className="h-64 overflow-hidden relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-vet-primary/10 group-hover:bg-transparent transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-vet-light to-transparent" />
              </div>
              
              <div className="p-10 flex flex-col items-center text-center space-y-4 relative">
                {/* HUD Corners for Service Cards */}
                <div className="hud-corner top-6 left-6 border-t-2 border-l-2 opacity-0 group-hover:opacity-100" />
                <div className="hud-corner bottom-6 right-6 border-b-2 border-r-2 opacity-0 group-hover:opacity-100" />
                
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-vet-accent/20 group-hover:bg-vet-accent transition-all duration-500" />
                
                <h4 className="font-montserrat font-black text-vet-primary text-2xl uppercase tracking-tight transition-all duration-300 group-hover:text-vet-accent">
                  {item.title}
                </h4>
                <p className="text-slate-600 text-sm font-medium italic leading-relaxed">
                  {item.desc}
                </p>
                
                <div className="pt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-2 h-2 rounded-full bg-vet-accent animate-pulse" />
                  <div className="w-20 h-[1px] bg-vet-accent/30 self-center" />
                  <div className="w-2 h-2 rounded-full bg-vet-accent animate-pulse delay-75" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-16 border-t border-slate-100">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Protocolos de Excelência</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
             {brands.map(brand => (
               <span key={brand} className="text-2xl font-montserrat font-black text-vet-primary tracking-tighter uppercase cursor-default">{brand}</span>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
