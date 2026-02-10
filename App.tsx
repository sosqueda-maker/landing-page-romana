
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RealResults from './components/RealResults';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsapp from './components/FloatingWhatsapp';
import LeadModal from './components/LeadModal';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import Services, { MegaHairTypes } from './components/Services';
import PromotionModal from './components/PromotionModal';
import { supabase } from './supabase';
import { Lock, AlertCircle } from 'lucide-react';

// Usamos named imports do objeto React para garantir que o dispatcher esteja correto
const { useState, useEffect } = React;

type View = 'landing' | 'admin';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
  const [hasShownPromotion, setHasShownPromotion] = useState(false);
  const [currentView, setCurrentView] = useState<View>('landing');
  const [session, setSession] = useState<any>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const checkInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data?.session || null);
      } catch (err) {
        console.warn("Auth check ignored (offline or Supabase issue)");
      } finally {
        setIsAuthChecking(false);
      }
    };
    checkInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession && currentView === 'admin') {
        setCurrentView('landing');
      }
    });
    return () => subscription.unsubscribe();
  }, [currentView]);

  useEffect(() => {
    if (currentView !== 'landing') return;
    window.history.pushState({ entry: true }, "");
    const handlePopState = () => {
      if (!hasShownPromotion) {
        setIsPromotionModalOpen(true);
        setHasShownPromotion(true);
        window.history.pushState({ entry: true }, "");
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [hasShownPromotion, currentView]);

  const navigateTo = (view: View) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const closePromotionModal = () => setIsPromotionModalOpen(false);

  if (initError) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10 text-center">
        <AlertCircle size={48} className="text-rose-500 mb-4" />
        <h1 className="text-2xl font-black text-vet-primary uppercase">Ocorreu um problema</h1>
        <p className="text-slate-500 mt-2">{initError}</p>
        <button onClick={() => window.location.reload()} className="mt-6 btn-primary px-8 py-3 rounded-full">Recarregar</button>
      </div>
    );
  }

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-vet-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Autenticando...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'admin') {
    if (session) {
      return <AdminPanel session={session} onNavigate={navigateTo} />;
    }
    return (
      <div className="min-h-screen bg-vet-light flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-[30px] shadow-2xl max-w-md w-full text-center border border-vet-primary/10">
          <div className="bg-vet-primary w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
            <Lock size={36} />
          </div>
          <h1 className="text-3xl font-montserrat font-bold text-vet-primary mb-4 uppercase tracking-tighter">Área Restrita</h1>
          <button onClick={openAuthModal} className="w-full bg-vet-accent text-white py-4 rounded-xl font-bold text-lg">Acessar Admin</button>
          <button onClick={() => navigateTo('landing')} className="mt-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-vet-primary">Voltar para o site</button>
        </div>
        {isAuthModalOpen && <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} onSuccess={() => navigateTo('admin')} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-vet-primary selection:bg-vet-accent/20">
      <Header onCtaClick={openModal} />
      <main>
        <Hero onCtaClick={openModal} />
        <RealResults onCtaClick={openModal} />
        <MegaHairTypes />
        <About onCtaClick={openModal} />
        <Testimonials onCtaClick={openModal} />
        <Services />
        <Contact onCtaClick={openModal} />
      </main>
      <Footer onAdminClick={openAuthModal} />
      <FloatingWhatsapp onCtaClick={openModal} />
      {isModalOpen && <LeadModal isOpen={isModalOpen} onClose={closeModal} />}
      {isAuthModalOpen && <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} onSuccess={() => navigateTo('admin')} />}
      {isPromotionModalOpen && <PromotionModal isOpen={isPromotionModalOpen} onClose={closePromotionModal} onCtaClick={openModal} />}
    </div>
  );
};

export default App;
