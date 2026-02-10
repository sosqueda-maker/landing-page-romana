
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Romana Studio - Inicialização em Produção
 * Transpilado via Babel Standalone.
 * Corrigido para evitar conflitos de Singleton do React.
 */

const startApp = () => {
  const container = document.getElementById('root');
  const splash = document.getElementById('splash');

  if (!container) return;

  try {
    // No React 19 ESM, as vezes o default export é o próprio objeto React
    const useStateAvailable = typeof React.useState === 'function';
    
    if (!useStateAvailable) {
      console.error("React.useState não encontrado no objeto React importado.", React);
      throw new Error("Falha ao carregar os hooks do React. Verifique o console.");
    }

    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    // Esconde o splash após a renderização inicial
    if (splash) {
      setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => splash.remove(), 500);
      }, 500);
    }
    
    console.log("Romana Studio: Aplicação iniciada.");
  } catch (error) {
    console.error("Erro na montagem da aplicação:", error);
    if (splash) splash.remove();
    container.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: sans-serif; color: #8B5E5E;">
        <h2 style="font-weight: 900;">ERRO DE INICIALIZAÇÃO</h2>
        <p style="font-size: 13px; opacity: 0.7;">Não foi possível carregar a biblioteca React corretamente.</p>
        <div style="margin-top: 20px; background: #f8f8f8; padding: 15px; border-radius: 10px; font-size: 11px; color: #333;">
          ${error.message}
        </div>
        <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #8B5E5E; color: white; border: none; border-radius: 20px; cursor: pointer; font-weight: bold;">Tentar Novamente</button>
      </div>
    `;
  }
};

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  startApp();
} else {
  document.addEventListener('DOMContentLoaded', startApp);
}
