import { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorPage from 'App/pages/ErrorPage';
import OrgsPage from 'App/pages/OrgsPage';
import RepoPage from 'App/pages/RepoPage';

import Container from 'components/Container';
import Header from 'components/Header';

import { ROUTES } from 'config/routes';
import { TOrg } from 'entities/org';
import { TOrgRepo } from 'entities/repo';
import { getData } from 'utils/fetchData';

import css from './App.module.scss';

const App = () => {
  const [org, setOrgRepo] = useState<TOrg | null>(null);
  const [repos, setRepos] = useState<TOrgRepo[]>([]);
  const [orgError, setOrgError] = useState<string>('');

  const [orgName, setOrgName] = useState('');

  const handleRepos = useCallback((repos: TOrgRepo[]) => {
    setRepos(repos);
  }, []);

  const changeOrgName = useCallback((name: string) => {
    setOrgName(name);
  }, []);

  useEffect(() => {
    if (orgName) {
      getData<TOrg>('orgs/ktsstudio').then((response) => {
        if (response.isError) {
          setOrgError("Can't load org");
        } else {
          setOrgRepo(response.data);
        }
      });
    }
  }, [orgName]);

  return (
    <div className={css.app}>
      <Header />

      {orgError && <div>{orgError}</div>}

      <Routes>
        <Route
          path={ROUTES.ORGS_PAGE}
          element={
            <Container>
              <OrgsPage org={org} repos={repos} handleRepos={handleRepos} changeOrgName={changeOrgName} />
            </Container>
          }
        />
        <Route
          path={`${ROUTES.REPO_PAGE}/:id`}
          element={
            <Container>
              <RepoPage orgName={orgName} repos={repos} />
            </Container>
          }
        />
        <Route path={ROUTES.ERROR_PAGE} element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
