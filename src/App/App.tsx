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
// 1. Status component
// 2. Logic to icon wrapper
// 3. i18n
// 4. 404 page

const App = () => {
  return (
    <div className={css.app}>
      <Header />

      <Suspense fallback={<Loader size="xl" />}>
        <Routes>
          <Route path={ROUTES.error.mask} element={<ErrorPage />} />
          <Route
            path={ROUTES.orgs.mask}
            element={
              <Container>
                <OrgsPage />
              </Container>
            }
          />
          <Route
            path={ROUTES.orgs.repo.mask}
            element={
              <Container>
                <RepoPage />
              </Container>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
