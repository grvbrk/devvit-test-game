// @ts-expect-error
import './index.css';

// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { PageContextProvider } from './hooks/usePage';
import GameSettingsProvider from './hooks/useGameConfig';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <PageContextProvider>
    <GameSettingsProvider>
      <App />
    </GameSettingsProvider>
  </PageContextProvider>
  // </StrictMode>
);
