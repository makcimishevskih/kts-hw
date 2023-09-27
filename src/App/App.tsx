import { Route, Routes } from 'react-router-dom';

import ErrorPage from 'App/pages/ErrorPage';
import OrgsPage from 'App/pages/OrgsPage';
import RepoPage from 'App/pages/RepoPage';

import Container from 'components/Container';
import Header from 'components/Header';

import { ROUTES } from 'config/routes';

import css from './App.module.scss';

// Checklist:
// 1. Optimize requests
// 2. Reorg store
// 3. Replace @imports to @import forward
// 4. Status component
// 5. Hover button effects
// 6. MB animations
// 7. logic to icon wrapper

const App = () => {
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
          path={`${ROUTES.REPO_PAGE}/:orgName/:repoName`}
          element={
            <Container>
              <RepoPage />
            </Container>
          }
        />
        <Route path={ROUTES.ERROR_PAGE} element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
