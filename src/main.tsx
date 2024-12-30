import { createRoot } from 'react-dom/client';
import { Layout } from '@/components/Layout';
import { StrictMode } from 'react';
import '@/styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout />
  </StrictMode>,
);
