import App from './App';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from '@/modules/react-query.tsx';
import { ThemeProvider } from '@/components/theme-provider.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
     <BrowserRouter>
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
     </ThemeProvider>
     </BrowserRouter>
    </QueryProvider>
  </StrictMode>,
)
