import './App.scss';

import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from 'App/pages/ErrorPage';
import OrgsPage from 'App/pages/OrgsPage';
import ProductPage from 'App/pages/ProductPage';
import Header from 'components/Header';
import { ROUTES } from 'routes/routes';
import { geTOrgRepos, geTOrg, TOrgRepo, TOrg } from 'utils/fetchData';

// ШРИФТ
const App = () => {
  const [org, seTOrgRepo] = useState<TOrg | null>(null);
  const [list, setState] = useState<TOrgRepo[]>([]);

  // BUTTON PRESS FOR SEARCHING
  // const [orgName, setOrgName] = useState('ktsstudio'); // input
  const [orgName, setOrgName] = useState(''); // input

  const changeOrgName = (name: string) => {
    setOrgName(name);
  };

  console.log(org);

  useEffect(() => {
    if (orgName) {
      // geTOrg('ktsstudio').then(seTOrgRepo);
      // geTOrgRepos('ktsstudio').then(setState);
      geTOrg(orgName).then(seTOrgRepo);
      geTOrgRepos(orgName).then(setState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgName]);

  return (
    <div className="app">
      <Header />

      <div className="container">
        <Routes>
          <Route
            path={ROUTES.ORGS_PAGE}
            element={<OrgsPage list={list} org={org} changeOrgName={changeOrgName} handleOrg={() => {}} />}
          />
          <Route path={`${ROUTES.PRODUCT_PAGE}/:id`} element={<ProductPage list={list} org={org} />} />
          <Route path={ROUTES.ERROR_PAGE} element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
