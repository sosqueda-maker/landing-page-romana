
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("Romana Studio: Iniciando aplicação...");

const renderApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  try {
    // Verificação de segurança para evitar erro de dispatcher nulo (useState)
    if (!React || typeof React.useState !== 'function') {
      throw new Error("Falha crítica: O Singleton do React não foi carregado corretamente.");
    }

    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Romana Studio: Renderização concluída.");
  } catch (err) {
    console.error("Erro na renderização:", err);
    rootElement.innerHTML = `
      <div style="padding: 40px; color: #8B5E5E; text-align: center; font-family: sans-serif;">
        <h1 style="font-size: 24px; margin-bottom: 10px;">Erro de Inicialização</h1>
        <p style="opacity: 0.7;">O sistema não pôde ser iniciado devido a um conflito de bibliotecas.</p>
        <pre style="background: #fdf7f7; padding: 15px; border-radius: 10px; margin-top: 20px; font-size: 11px; display: inline-block; text-align: left;">${err instanceof Error ? err.message : String(err)}</pre>
      </div>
    `;
  }
};

// Executa a inicialização
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
