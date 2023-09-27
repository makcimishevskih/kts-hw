import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Pagination from 'components/Pagination';
import Text from 'components/Text';

import useLocalStore from 'hooks/useLocalStore';

import GitHubOrgStore from 'store/GitHubOrgStore';
import PaginationStore from 'store/PaginationStore';

import NavInputs from './components/NavInputs';
import OrgReposList from './components/OrgReposList';

import css from './OrgsPage.module.scss';

const OrgsPage: FC = () => {
  const {
    orgName,
    orgError,
    orgRepos,
    orgReposLength,
    errorReposList,
    loadingReposList,
    reposFilterType,
    setReposFilterType,
    setOrgName,
    getReposData,
  } = useLocalStore<GitHubOrgStore>(() => new GitHubOrgStore());

  const [, setQueryParams] = useSearchParams();

  const {
    isFirstPage,
    isLastPage,
    offset,
    paginationNums,
    totalPagesCount,
    onChange,
    handleOffsetToStart,
    setReposLen,
    ITEM_PER_PAGE,
  } = useLocalStore<PaginationStore>(() => new PaginationStore(7));

  useEffect(() => {
    getReposData(ITEM_PER_PAGE, offset);
    setQueryParams(`?name=${orgName}&type=${reposFilterType}&offset=${offset}`);
  }, [offset, orgName, reposFilterType]);

  useEffect(() => {
    setReposLen(orgReposLength);
  }, [orgReposLength]);

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

      <NavInputs
        setOrgName={setOrgName}
        setReposFilterType={setReposFilterType}
        handleOffsetToStart={handleOffsetToStart}
      />

      {orgError && <div className={css.orgs_error}>{orgError}</div>}

      <OrgReposList
        orgName={orgName}
        orgRepos={orgRepos}
        errorReposList={errorReposList}
        loadingReposList={loadingReposList}
      />

      <Pagination
        offset={offset}
        onChange={onChange}
        isLastPage={isLastPage}
        isFirstPage={isFirstPage}
        paginationNums={paginationNums}
        totalPagesCount={totalPagesCount}
      />
    </section>
  );
};

export default observer(OrgsPage);
