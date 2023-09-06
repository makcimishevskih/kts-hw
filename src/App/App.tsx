import './App.scss';

// import { ROUTES } from '../routes/routes';

import { Route, Routes } from 'react-router-dom';

import Providers from 'providers/Providers';

import Header from 'components/Header';
import OrgsPage from 'App/pages/OrgsPage';
import ProductPage from 'App/pages/ProductPage';

function App() {
  return (
    <div className="app">
      <Header />

      <div className="container">
        <Providers>
          <Routes>
            <Route path={'/'} element={<OrgsPage />} />
            <Route path={'product/:id'} element={<ProductPage />} />
          </Routes>
        </Providers>
      </div>
    </div>
  );
}

export default App;
