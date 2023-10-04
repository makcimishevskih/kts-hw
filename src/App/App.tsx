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

const App = () => {
  return (
    <div className={css.app}>
      <Header />
      <Suspense fallback={<Loader size="xl" />}>
        <Container>
          <Routes>
            <Route path={ROUTES.orgs.mask} element={<OrgsPage />} />
            <Route path={ROUTES.orgs.repo.mask} element={<RepoPage />} />
            <Route path={ROUTES.error.mask} element={<ErrorPage />} />
          </Routes>
        </Container>
      </Suspense>
    </div>
  );
};

export default App;
