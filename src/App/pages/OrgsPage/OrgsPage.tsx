import { observer } from 'mobx-react-lite';
import { StoreContext } from 'providers';
import { FC, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Pagination from 'components/Pagination';
import Text from 'components/Text';

import usePagination from 'hooks/usePagination';

import useStores from 'providers/RootStoreProvider/useStores';

import NavInputs from './components/NavInputs';
import OrgsList from './components/OrgsList';
import css from './OrgsPage.module.scss';

const REPO_PER_PAGE = 9;

const OrgsPage: FC = () => {
  const {
    github: {
      org,
      orgRepos,
      orgReposLength,
      orgType,
      orgError,
      loadingReposList,
      errorReposList,
      setOrgName,
      setOrgType,
      getReposData,
    },
  } = useStores();

  const { offset, paginationNums, totalPagesCount, onChange, handleOffsetToStart } = usePagination(
    orgReposLength,
    REPO_PER_PAGE,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (org) {
      getReposData(REPO_PER_PAGE, offset);
      setSearchParams({ offset: offset + '', per_page: REPO_PER_PAGE + '', type: orgType });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [org, offset]);

  const error = orgError && <div className={css.orgs__error}>{orgError}</div>;

  return (
    <section className={css.orgs}>
      <header className={css.orgs__header}>
        <Text tag="h2" view="title">
          List organization repositories
        </Text>
        <Text mt="24px" tag="p" view="p-20" color="secondary">
          Lists repositories for the specified organization
        </Text>
      </header>

      <NavInputs setOrgName={setOrgName} setOrgType={setOrgType} handleOffsetToStart={handleOffsetToStart} />
      {error}

      <OrgsList
        orgType={orgType}
        orgRepos={orgRepos}
        orgReposLength={orgReposLength}
        loadingReposList={loadingReposList}
        errorReposList={errorReposList}
      />

      <Pagination
        offset={offset}
        paginationNums={paginationNums}
        onChange={onChange}
        totalPagesCount={totalPagesCount}
      />
    </section>
  );
};

export default observer(OrgsPage);
