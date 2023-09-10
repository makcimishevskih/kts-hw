import './App.scss';

import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from 'App/pages/ErrorPage';
import OrgsPage from 'App/pages/OrgsPage';
import ProductPage from 'App/pages/ProductPage';
import Header from 'components/Header';
import { ROUTES } from 'routes/routes';
import { geTOrgRepos, geTOrg, TOrgRepo, TOrg } from 'utils/fetchData';

const App = () => {
  const [org, seTOrgRepo] = useState<TOrg | null>(null);
  const [list, setState] = useState<TOrgRepo[]>([]);

  useEffect(() => {
    geTOrg('ktsstudio').then(seTOrgRepo);
    geTOrgRepos('ktsstudio').then(setState);
  }, []);

  return (
    <div className="app">
      <Header />

      <div className="container">
        <Routes>
          <Route path={ROUTES.ORGS_PAGE} element={<OrgsPage list={list} org={org} />} />
          <Route path={`${ROUTES.PRODUCT_PAGE}/:id`} element={<ProductPage list={list} org={org} />} />
          <Route path={ROUTES.ERROR_PAGE} element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
