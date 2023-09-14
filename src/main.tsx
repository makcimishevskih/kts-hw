import './styles/index.scss';
import 'config/configureMobX';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from 'App/App';
import Providers from 'providers/Providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
