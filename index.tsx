
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("Romana Studio App Initializing...");

const init = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Could not find root element to mount to");
    return;
  }

  try {
    if (!React || !React.useState) {
      throw new Error("React not properly loaded via importmap. Check network tab for esm.sh availability.");
    }
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("App rendered successfully.");
  } catch (err) {
    console.error("Rendering failed:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    rootElement.innerHTML = `
      <div style="padding: 40px; color: #8B5E5E; text-align: center; font-family: sans-serif; background: #fdf7f7; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <h1 style="font-size: 24px; margin-bottom: 10px;">Erro de Inicialização</h1>
        <p style="margin-bottom: 20px; opacity: 0.8;">Não foi possível iniciar o Romana Studio.</p>
        <pre style="background: white; padding: 20px; border-radius: 15px; font-size: 11px; text-align: left; max-width: 90%; overflow: auto; border: 1px solid #eee;">${errorMessage}</pre>
        <button onclick="location.reload()" style="margin-top: 20px; padding: 12px 24px; background: #8B5E5E; color: white; border: none; border-radius: 30px; cursor: pointer; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Tentar Novamente</button>
      </div>
    `;
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
