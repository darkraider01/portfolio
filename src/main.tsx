import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { CommandProvider } from './contexts/CommandContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <CommandProvider>
          <App />
        </CommandProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
