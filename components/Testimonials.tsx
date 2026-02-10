
import React from 'react';
import { Star, Quote, MessageCircle } from 'lucide-react';

const reviews = [
  {
    author: "Beatriz Aguiar",
    text: "A melhor em colocação de mega hair de Brasília e região! Sou cliente a mais ou menos 7 anos e não largo por nada! Equipe maravilhosa, pé e mão das meninas impecável também! Amo, amo. Resgatou a minha auto estima.",
    source: "Google Reviews"
  },
  {
    author: "Fernanda Collares",
    text: "A Romana cuida do meu cabelo desde que cheguei aqui e não troco por nada! Além de ser super talentosa, ela tem um cuidado incrível com cada detalhe inclusive com meu aplique, que nunca esteve tão bem cuidado. É daquelas profissionais que fazem tudo com carinho, atenção e muita paciência. Me sinto sempre acolhida e confiante nas mãos dela. Recomendo de coração! 💇‍♀️✨",
    source: "Local Guide"
  },
  {
    author: "Paloma Araujo",
    text: "Experiência única. Romana é extremamente paciente e profissional. Conseguiu transformar a minha auto estima.",
    source: "Google Reviews"
  },
  {
    author: "Lucy Silva",
    text: "O atendimento maravilhoso, a cabeleireira a todo tempo atenciosa, chegar de surpresa e fui atendida, ambiente onde vc se sente em casa.",
    source: "Google Reviews"
  },
  {
    author: "Patricia Calixto",
    text: "Genteeee, tinha 2 rabos de aplique e Romana os comprou para agora levantar a auto estima das sua clientes... Agradeço a preferência!",
    source: "Google Reviews"
  },
  {
    author: "Sheyla Sousa",
    text: "Excelente atendimento, profissionais atenciosas, super indico. Espaço maravilhoso!",
    source: "Local Guide"
  },
  {
    author: "Kaline Pereira",
    text: "Tudo lindo e maravilhoso, ameiii! O melhor lugar para cuidar dos cabelos em Águas Claras.",
    source: "Google Reviews"
  }
];

export default function Testimonials({ onCtaClick }: { onCtaClick?: () => void }) {
  return (
    <section id="depoimentos" className="py-16 lg:py-20 bg-vet-light overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="flex justify-center items-center gap-3 mb-2">
             <div className="flex text-vet-accent">
                {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
             </div>
             <span className="font-bold text-vet-primary">5.0 / 5.0</span>
          </div>
          <h2 className="text-vet-accent font-black uppercase tracking-[0.4em] text-xs">O Sucesso Romana</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {reviews.slice(0, 4).map((review, idx) => (
            <div 
              key={idx} 
              className="bg-white p-10 rounded-4xl border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-500 group relative"
            >
              <Quote className="absolute top-6 right-6 text-vet-accent/10" size={40} />
              <p className="text-slate-600 font-medium italic mb-12 leading-relaxed text-sm relative z-10">
                "{review.text}"
              </p>
              <div className="mt-auto">
                <h4 className="font-montserrat font-black text-vet-primary text-lg leading-none mb-1 uppercase tracking-tighter">
                  {review.author}
                </h4>
                <p className="text-[10px] font-bold text-vet-accent uppercase tracking-widest">{review.source}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
           <button 
             onClick={onCtaClick}
             className="btn-primary flex items-center gap-3 px-12 py-5 rounded-full font-black text-sm tracking-widest uppercase shadow-2xl"
           >
             <MessageCircle size={22} fill="white" />
             Quero transformar meu visual
           </button>
        </div>
      </div>
    </section>
  );
}
