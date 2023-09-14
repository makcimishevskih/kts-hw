import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorPage from 'App/pages/ErrorPage';
import OrgsPage from 'App/pages/OrgsPage';
import RepoPage from 'App/pages/RepoPage';

import Container from 'components/Container';
import Header from 'components/Header';

import { ROUTES } from 'config/routes';
// import { TOrg } from 'entities/org';
// import { TOrgRepo } from 'entities/repo';
// import { getData } from 'utils/fetchData';

import OrgStore from 'store/OrgStore/OrgStore';
import css from './App.module.scss';

// "Фильтрация по типу репозитория:
// Для реализации необходимо воспользоваться
//  параметром type в методе получения списка репозиториев"

const App = observer(() => {
  useEffect(() => {
    if (OrgStore.orgName) {
      OrgStore.getOrgData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OrgStore.orgName]);

  return (
    <div className={css.app}>
      <Header />

      {OrgStore.orgError && <div>{OrgStore.orgError}</div>}

      <Routes>
        <Route
          path={ROUTES.ORGS_PAGE}
          element={
            <Container>
              {/* <OrgsPage org={org} repos={repos} handleRepos={handleRepos} changeOrgName={changeOrgName} /> */}
              <OrgsPage />
            </Container>
          }
        />
        <Route
          path={`${ROUTES.REPO_PAGE}/:id`}
          element={
            <Container>
              {/* <RepoPage orgName={orgName} repos={repos} /> */}
              <RepoPage />
            </Container>
          }
        />
        <Route path={ROUTES.ERROR_PAGE} element={<ErrorPage />} />
      </Routes>
    </div>
  );
});

export default App;
