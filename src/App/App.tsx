import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import ErrorPage from 'App/pages/ErrorPage';
import OrgsPage from 'App/pages/OrgsPage';
import RepoPage from 'App/pages/RepoPage';

import Container from 'components/Container';
import Header from 'components/Header';

import { ROUTES } from 'config/routes';

import useLocalStore from 'hooks/useLocalStore';

import GitHubOrgStore from 'store/GitHubOrgStore';
import GitHubReposStore from 'store/GitHubReposStore';

import css from './App.module.scss';

const App = () => {
  const { orgType, orgName, orgError, setOrgName, setOrgType, getOrgData } = useLocalStore<GitHubOrgStore>(
    () => new GitHubOrgStore(),
  );

  const {
    orgRepos,
    orgReposLength,
    errorReposList,
    loadingReposList,
    readme,
    languages,
    contributors,
    errorsRepo,
    loadersRepo,
    getReposData,
    findRepoById,
    getFullRepoData,
  } = useLocalStore<GitHubReposStore>(() => new GitHubReposStore());

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
              <OrgsPage
                getReposData={getReposData}
                orgName={orgName}
                orgType={orgType}
                orgError={orgError}
                setOrgName={setOrgName}
                setOrgType={setOrgType}
                orgReposLength={orgReposLength}
                orgRepos={orgRepos}
                loadingReposList={loadingReposList}
                errorReposList={errorReposList}
              />
            </Container>
          }
        />
        <Route
          path={`${ROUTES.REPO_PAGE}/:id`}
          element={
            <Container>
              <RepoPage
                orgName={orgName}
                contributors={contributors}
                languages={languages}
                readme={readme}
                errorsRepo={errorsRepo}
                loadersRepo={loadersRepo}
                findRepoById={findRepoById}
                getFullRepoData={getFullRepoData}
              />
            </Container>
          }
        />
        <Route path={ROUTES.ERROR_PAGE} element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default observer(App);
