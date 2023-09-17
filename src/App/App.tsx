import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import ErrorPage from 'App/pages/ErrorPage';
import OrgsPage from 'App/pages/OrgsPage';
import RepoPage from 'App/pages/RepoPage';

import Container from 'components/Container';
import Header from 'components/Header';

import { ROUTES } from 'config/routes';

import useStores from 'providers/RootStoreProvider/useStores';

import css from './App.module.scss';

const App = () => {
  const {
    github: { orgName, findRepoById, getFullRepoData, getOrgData },
  } = useStores();

  useEffect(() => {
    if (orgName) {
      getOrgData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgName]);

  const navigate = useNavigate();

  useEffect(() => {
    navigate({ pathname: window.location.pathname });
  }, [navigate]);

  return (
    <div className={css.app}>
      <Header />

      <Routes>
        <Route
          path={ROUTES.ORGS_PAGE}
          element={
            <Container>
              <OrgsPage />
            </Container>
          }
        />
        <Route
          path={`${ROUTES.REPO_PAGE}/:id`}
          element={
            <Container>
              <RepoPage findRepoById={findRepoById} orgName={orgName} getFullRepoData={getFullRepoData} />
            </Container>
          }
        />
        <Route path={ROUTES.ERROR_PAGE} element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default observer(App);
