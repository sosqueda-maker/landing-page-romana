
import React from 'react';
import { Sparkles, Users, Award } from 'lucide-react';

const stats = [
  {
    label: "Transformações Realizadas",
    value: "+3000",
    icon: <Sparkles size={32} />
  },
  {
    label: "Anos no Mega Hair",
    value: "+7",
    icon: <Award size={32} />
  },
  {
    label: "Clientes Satisfeitas",
    value: "+500",
    icon: <Users size={32} />
  }
];

const TrackRecords: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <style>{`
        @keyframes scan {
          0% { top: -10%; opacity: 0; }
          50% { opacity: 0.5; }
          100% { top: 110%; opacity: 0; }
        }
        .tech-scan-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #8B5E5E, transparent);
          animation: scan 3s linear infinite;
          z-index: 5;
        }
      `}</style>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="relative p-8 rounded-4xl bg-vet-light border border-vet-accent/10 shadow-lg overflow-hidden group"
            >
              <div className="tech-scan-line" />
              <div className="relative z-10 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-vet-primary shadow-inner mb-2">
                  {stat.icon}
                </div>
                <div>
                  <h4 className="text-5xl lg:text-6xl font-montserrat font-black text-vet-primary leading-none tracking-tighter">
                    {stat.value}
                  </h4>
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-vet-primary/60 mt-3">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrackRecords;
