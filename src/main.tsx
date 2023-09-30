import './styles/index.scss';
import 'config/configureMobX';
import 'regenerator-runtime';
import './i18n.js';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from 'App/App';
import Providers from 'providers/Providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
