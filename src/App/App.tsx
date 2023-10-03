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
// 1. 404 page design
// 2. if to Many Contributors scroll or dropdown
// 3. Выделение текста цвет при темной теме

// COMMIT
// 1. delete: checkbox comp&styles, iconwrapper
// 2. fix: adaptive, ltl styles
// 3. masks to pathes

const App = () => {
  return (
    <div className={css.app}>
      <Header />

      <Suspense fallback={<Loader size="xl" />}>
        <Routes>
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
          <Route
            path={ROUTES.error.mask}
            element={
              <Container>
                <ErrorPage />
              </Container>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
