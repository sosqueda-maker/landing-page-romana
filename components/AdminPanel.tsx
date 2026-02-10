
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { 
  LogOut, RefreshCw, Search, Trash2, MessageCircle, 
  Clock, ChevronDown, Users, Loader2, BarChart3, ExternalLink,
  Target, AlertCircle, Ban, Zap, FileDown, Calendar, FilterX
} from 'lucide-react';
import Logo from './Logo';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AdminPanelProps {
  session: any;
  onNavigate: (view: 'landing' | 'admin') => void;
}

const statusOptions = [
  { value: 'Novo Lead', label: 'Novo Lead', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  { value: 'Em Atendimento', label: 'Em Atendimento', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
  { value: 'Consulta Marcada', label: 'Consulta Marcada', color: 'bg-vet-accent/10 text-vet-primary border-vet-accent/20' },
  { value: 'Desistente', label: 'Desistente', color: 'bg-rose-500/10 text-rose-600 border-rose-500/20' },
];

const AdminPanel: React.FC<AdminPanelProps> = ({ session, onNavigate }) => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (!error) setLeads(data || []);
    setLoading(false);
  };

  const updateLeadStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    }
    setUpdatingId(null);
  };

  const deleteLead = async (id: string) => {
    if (confirm('Deseja realmente excluir este registro?')) {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (!error) fetchLeads();
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const filtered = leads.filter(l => {
    const matchesSearch = (l.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (l.whatsapp || '').includes(searchTerm);
    
    const leadDate = new Date(l.created_at).toISOString().split('T')[0];
    const matchesStartDate = startDate ? leadDate >= startDate : true;
    const matchesEndDate = endDate ? leadDate <= endDate : true;

    return matchesSearch && matchesStartDate && matchesEndDate;
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Data", "Nome", "WhatsApp", "Status"];
    const tableRows: any[] = [];

    filtered.forEach(lead => {
      const leadData = [
        new Date(lead.created_at).toLocaleDateString('pt-BR'),
        lead.name,
        lead.whatsapp,
        lead.status || 'Novo Lead'
      ];
      tableRows.push(leadData);
    });

    doc.setFontSize(18);
    doc.text("Relatório de Leads - Romana Studio", 14, 20);
    doc.setFontSize(10);
    doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 28);
    doc.text(`Filtro: ${startDate || 'Início'} até ${endDate || 'Fim'}`, 14, 34);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: { fillStyle: 'F', fillColor: [139, 94, 94] }
    });

    doc.save(`leads_romana_${new Date().getTime()}.pdf`);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
  };

  const totalLeads = leads.length;
  const novoLeadCount = leads.filter(l => (l.status || 'Novo Lead') === 'Novo Lead').length;
  const emAtendimentoCount = leads.filter(l => l.status === 'Em Atendimento').length;
  const consultaMarcadaCount = leads.filter(l => l.status === 'Consulta Marcada').length;
  const desistenteCount = leads.filter(l => l.status === 'Desistente').length;
  const conversaoRate = totalLeads ? Math.round((consultaMarcadaCount / totalLeads) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#F0F4F3] flex flex-col font-sans text-vet-primary">
      {/* Navigation */}
      <nav className="bg-vet-primary px-4 md:px-8 py-4 flex justify-between items-center shadow-2xl relative z-20">
        <div className="flex items-center gap-4 md:gap-10">
          <Logo className="h-10" light />
          <div className="hidden lg:flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
             <button onClick={() => onNavigate('landing')} className="hover:text-white flex items-center gap-2 transition-colors">
               <ExternalLink size={14} /> Site Público
             </button>
             <span className="opacity-20">|</span>
             <span className="text-vet-accent">CRM ROMANA v2.5</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={exportToPDF}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-vet-accent text-white rounded-full font-bold text-[10px] hover:bg-white hover:text-vet-primary transition-all border border-white/10"
          >
            <FileDown size={14} /> Exportar PDF
          </button>
          <button 
            onClick={() => supabase.auth.signOut()} 
            className="flex items-center gap-2 px-4 md:px-6 py-2 bg-white/5 text-white rounded-full font-bold text-[10px] md:text-xs hover:bg-rose-500 transition-all border border-white/10"
          >
            <LogOut size={14} /> Sair
          </button>
        </div>
      </nav>

      <main className="p-4 md:p-8 lg:p-12 flex-grow container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8 md:mb-12">
          <div className="space-y-2">
             <h2 className="text-2xl md:text-4xl font-montserrat font-black text-vet-primary uppercase tracking-tighter">
               Gestão de <span className="text-vet-accent">Clientes.</span>
             </h2>
             <p className="text-slate-400 font-bold text-[9px] md:text-xs uppercase tracking-[0.3em]">Painel Operacional Romana Studio</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
             <button 
                onClick={fetchLeads} 
                disabled={loading}
                className="btn-primary flex-1 sm:flex-none px-6 py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Sincronizar
              </button>
              <button 
                onClick={exportToPDF}
                className="flex sm:hidden items-center justify-center p-4 bg-vet-accent text-white rounded-xl shadow-xl"
              >
                <FileDown size={20} />
              </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6 mb-8 md:mb-12">
          {[
            { label: 'Total Geral', val: totalLeads, icon: <Users />, color: 'bg-vet-primary' },
            { label: 'Novos Leads', val: novoLeadCount, icon: <Zap />, color: 'bg-emerald-600' },
            { label: 'Em Atendimento', val: emAtendimentoCount, icon: <Clock />, color: 'bg-amber-500' },
            { label: 'Marcadas', val: consultaMarcadaCount, icon: <Target />, color: 'bg-vet-accent' },
            { label: 'Desistentes', val: desistenteCount, icon: <Ban />, color: 'bg-rose-500' },
            { label: 'Conversão', val: conversaoRate + '%', icon: <BarChart3 />, color: 'bg-indigo-600' }
          ].map((stat, i) => (
            <div key={i} className={`${stat.color} p-4 md:p-6 rounded-3xl text-white shadow-lg flex flex-col justify-between min-h-[120px] md:min-h-[140px] relative overflow-hidden group`}>
               <div className="absolute right-[-5px] bottom-[-5px] opacity-10 scale-110 group-hover:rotate-12 transition-transform duration-500">
                  {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 64 })}
               </div>
               <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] opacity-70 relative z-10">{stat.label}</p>
               <h3 className="text-2xl md:text-3xl font-black relative z-10">{stat.val}</h3>
            </div>
          ))}
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-[2rem] md:rounded-5xl shadow-2xl overflow-hidden border border-slate-100 mb-8">
          <div className="p-4 md:p-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-5 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="text" 
                  placeholder="Nome ou WhatsApp..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-vet-accent outline-none font-bold text-xs md:text-sm text-vet-primary transition-all"
                />
              </div>
              
              <div className="lg:col-span-3 relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-vet-accent outline-none font-bold text-[10px] md:text-xs text-vet-primary transition-all"
                />
              </div>

              <div className="lg:col-span-3 relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input 
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-vet-accent outline-none font-bold text-[10px] md:text-xs text-vet-primary transition-all"
                />
              </div>

              <div className="lg:col-span-1">
                 <button 
                  onClick={resetFilters}
                  className="w-full h-[54px] flex items-center justify-center bg-slate-100 text-slate-400 rounded-xl hover:bg-rose-50 hover:text-rose-500 transition-colors"
                  title="Limpar Filtros"
                 >
                   <FilterX size={20} />
                 </button>
              </div>
            </div>
          </div>

          {/* Table View (Desktop Only) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/50 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th className="px-6 md:px-10 py-4 md:py-6">Entrada</th>
                  <th className="px-6 md:px-10 py-4 md:py-6">Informações</th>
                  <th className="px-6 md:px-10 py-4 md:py-6">Status Atual</th>
                  <th className="px-6 md:px-10 py-4 md:py-6 text-center">Ação</th>
                  <th className="px-6 md:px-10 py-4 md:py-6 text-right">Gestão</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.length > 0 ? filtered.map(l => (
                  <tr key={l.id} className="hover:bg-vet-light/50 transition-colors group">
                    <td className="px-6 md:px-10 py-6 md:py-8 text-[10px] font-bold text-slate-400">
                      {new Date(l.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 md:px-10 py-6 md:py-8">
                      <p className="text-sm md:text-base font-black text-vet-primary uppercase tracking-tighter">{l.name}</p>
                      <p className="text-[10px] md:text-xs font-bold text-vet-accent">{l.whatsapp}</p>
                    </td>
                    <td className="px-6 md:px-10 py-6 md:py-8">
                      <div className="relative w-full max-w-[180px] md:max-w-[220px]">
                        <select
                          value={l.status || 'Novo Lead'}
                          onChange={(e) => updateLeadStatus(l.id, e.target.value)}
                          disabled={updatingId === l.id}
                          className={`appearance-none w-full pl-3 pr-8 py-2 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest border-2 transition-all outline-none cursor-pointer ${
                            statusOptions.find(o => o.value === (l.status || 'Novo Lead'))?.color
                          }`}
                        >
                          {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value} className="bg-white text-slate-900 font-sans uppercase font-bold">{opt.label}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                          {updatingId === l.id ? <Loader2 size={12} className="animate-spin text-vet-primary" /> : <ChevronDown size={12} />}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 md:px-10 py-6 md:py-8 text-center">
                      <a 
                        href={`https://wa.me/${String(l.whatsapp).replace(/\D/g,'')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg md:rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                      >
                        <MessageCircle size={14} fill="currentColor" /> Chat
                      </a>
                    </td>
                    <td className="px-6 md:px-10 py-6 md:py-8 text-right">
                       <button 
                         onClick={() => deleteLead(l.id)}
                         className="text-slate-200 hover:text-rose-500 p-2 transition-colors rounded-lg hover:bg-rose-50"
                       >
                         <Trash2 size={18} />
                       </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-10 py-20 text-center">
                       <div className="flex flex-col items-center gap-4 text-slate-300">
                          <AlertCircle size={40} />
                          <p className="font-bold uppercase tracking-widest text-[10px]">Nenhum registro encontrado</p>
                       </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Card View (Mobile Only) */}
          <div className="md:hidden p-4 space-y-4">
            {filtered.length > 0 ? filtered.map(l => (
              <div key={l.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col gap-4">
                 <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        {new Date(l.created_at).toLocaleDateString('pt-BR')}
                      </p>
                      <h4 className="text-lg font-black text-vet-primary uppercase tracking-tighter">{l.name}</h4>
                      <p className="text-xs font-bold text-vet-accent">{l.whatsapp}</p>
                    </div>
                    <button 
                       onClick={() => deleteLead(l.id)}
                       className="p-2 text-rose-500 bg-rose-50 rounded-lg"
                    >
                       <Trash2 size={16} />
                    </button>
                 </div>

                 <div className="relative">
                    <select
                      value={l.status || 'Novo Lead'}
                      onChange={(e) => updateLeadStatus(l.id, e.target.value)}
                      disabled={updatingId === l.id}
                      className={`appearance-none w-full px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border-2 transition-all outline-none ${
                        statusOptions.find(o => o.value === (l.status || 'Novo Lead'))?.color
                      }`}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt.value} value={opt.value} className="bg-white text-slate-900">{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
                 </div>

                 <a 
                    href={`https://wa.me/${String(l.whatsapp).replace(/\D/g,'')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg"
                  >
                    <MessageCircle size={16} fill="currentColor" /> Iniciar Atendimento
                  </a>
              </div>
            )) : (
              <div className="py-12 text-center text-slate-300">
                <p className="text-xs font-bold uppercase">Sem registros</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
