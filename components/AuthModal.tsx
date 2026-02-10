
import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2, UserPlus } from 'lucide-react';
import { supabase } from '../supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type AuthMode = 'login' | 'signup';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        setSuccess('Acesso autorizado!');
      } else {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        setSuccess('Conta criada com sucesso! Verifique seu e-mail ou faça login.');
        setMode('login');
      }

      if (mode === 'login') {
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 800);
      }
    } catch (err: any) {
      setError(err.message || 'Erro na autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-vet-primary/98 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-md rounded-5xl shadow-2xl overflow-hidden animate-in zoom-in duration-500">
        <div className="bg-vet-primary p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-vet-accent opacity-10 rounded-full blur-3xl" />
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/10">
            {mode === 'login' ? <Lock className="text-vet-accent" size={32} /> : <UserPlus className="text-vet-accent" size={32} />}
          </div>
          <h2 className="text-2xl font-montserrat font-black text-white uppercase tracking-tighter">
            {mode === 'login' ? 'Área Reservada' : 'Criar Conta Admin'}
          </h2>
          <p className="text-slate-400 text-[10px] mt-2 font-bold uppercase tracking-[0.4em]">Portal Administrativo Romana</p>
        </div>

        <div className="p-12 space-y-8">
          {error && (
            <div className="bg-rose-50 text-rose-500 p-5 rounded-2xl text-xs font-bold border border-rose-100 flex gap-3">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 p-5 rounded-2xl text-xs font-bold border border-green-100 flex gap-3">
              <CheckCircle2 size={18} className="flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}
          
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">E-mail Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-vet-primary focus:bg-white focus:outline-none font-bold text-vet-primary transition-all text-sm"
                  placeholder="admin@romanainstitutodebeleza.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-vet-primary focus:bg-white focus:outline-none font-bold text-vet-primary transition-all text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-6 rounded-full font-black text-white text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-2xl disabled:opacity-50"
            >
              {loading ? 'Processando...' : (mode === 'login' ? 'Acessar Painel' : 'Registrar Agora')}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="flex flex-col gap-4 text-center">
            <button 
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError(null);
                setSuccess(null);
              }}
              className="text-[10px] font-black text-vet-primary hover:text-vet-accent uppercase tracking-[0.2em] transition-colors"
            >
              {mode === 'login' ? 'Não tem uma conta? Registre-se aqui' : 'Já tem uma conta? Faça login'}
            </button>

            <button 
              onClick={onClose}
              className="text-[10px] font-black text-slate-400 hover:text-vet-primary uppercase tracking-[0.2em] transition-colors"
            >
              Voltar ao site público
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
