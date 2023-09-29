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
// 3. Status component
// 4. Hover button effects
// 5. Animations
// 6. Logic to icon wrapper
// 7. I18n

const App = () => {
  return (
    <div className={css.app}>
      <Header />

      <Routes>
        <Route
          path={ROUTES.ORG_PAGE}
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
