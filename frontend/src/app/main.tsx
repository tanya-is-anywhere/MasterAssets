import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from '../features/auth/model/AuthContext';
import { App } from './App';

import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="auto">
      <AuthProvider>
        <App />
      </AuthProvider>
    </MantineProvider>
  </StrictMode>,
);
