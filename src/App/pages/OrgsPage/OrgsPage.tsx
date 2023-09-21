import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import Pagination from 'components/Pagination';
import Text from 'components/Text';

import useLocalStore from 'hooks/useLocalStore';

import { useQueryParamsStoreInit } from 'hooks/useQueryParams';
import PaginationStore from 'store/PaginationStore';

import { TOrgReposModel } from 'store/models/repo';
import { TTypes } from 'store/models/types';

import NavInputs from './components/NavInputs';
import OrgReposList from './components/OrgReposList';

import css from './OrgsPage.module.scss';

const ITEM_PER_PAGE = 9;

type OrgPageProps = {
  orgName: string;
  orgType: TTypes;
  orgError: string;
  setOrgName: (name: string) => void;
  setOrgType: (type: TTypes) => void;
  getReposData: (orgName: string, orgType: TTypes, item: number, offset: number) => void;
  orgRepos: TOrgReposModel[];
  orgReposLength: number;
  errorReposList: string;
  loadingReposList: boolean;
};

const OrgsPage: FC<OrgPageProps> = ({
  orgName,
  orgType,
  orgError,
  setOrgName,
  setOrgType,
  orgRepos,
  getReposData,
  orgReposLength,
  errorReposList,
  loadingReposList,
}) => {
  const navigate = useNavigate();
  useQueryParamsStoreInit();

  const { isFirstPage, isLastPage, offset, paginationNums, totalPagesCount, onChange, handleOffsetToStart, setOrgLen } =
    useLocalStore<PaginationStore>(() => new PaginationStore(ITEM_PER_PAGE));

  useEffect(() => {
    if (orgName) {
      getReposData(orgName, orgType, ITEM_PER_PAGE, offset);

      navigate({
        search: `?name=${orgName}&type=${orgType}&offset=${offset}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, orgName, orgType]);

  useEffect(() => {
    setOrgLen(orgReposLength);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgReposLength]);

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

      <OrgReposList orgRepos={orgRepos} errorReposList={errorReposList} loadingReposList={loadingReposList} />

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
