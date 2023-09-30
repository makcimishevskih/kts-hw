import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorPage from 'App/pages/ErrorPage';
import OrgsPage from 'App/pages/OrgsPage';
import RepoPage from 'App/pages/RepoPage';

import Container from 'components/Container';
import Header from 'components/Header';

import Loader from 'components/Loader';
import { ROUTES } from 'config/routes';

import css from './App.module.scss';

// Checklist:
// 1. Optimize requests
// 2. Status component
// 3. Hover button effects
// 4. Animations
// 5. Logic to icon wrapper
// 6. I18n
// 7. 404 page

const App = () => {
  return (
    <div className={css.app}>
      <Header />

      <Suspense
        fallback={
          <div className={css.loaderWrapper}>
            <Loader size="xl" />
          </div>
        }
      >
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
      </Suspense>
    </div>
  );
};

export default App;
