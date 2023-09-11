import { FC, useEffect, useState } from 'react';
import Text from 'components/Text';
import { decodeFromUint8Array } from 'utils/encode';

import { TOrgRepo, geTOrgRepos, TOrg } from 'utils/fetchData';

import NavInputs from './components/NavInputs';
import OrgsList from './components/OrgsList';
import Pagination from './components/Pagination';
import css from './OrgsPage.module.scss';

interface OrganisationsPageProps {
  list: TOrgRepo[];
  org: TOrg | null;

  changeOrgName: (name: string) => void;
}

const OrgsPage: FC<OrganisationsPageProps> = ({ org, changeOrgName }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reposList, setReposList] = useState<TOrgRepo[]>([]);

  const perPage = 9;
  const amount = Math.ceil(reposList.length / perPage);

  useEffect(() => {
    if (org) {
      geTOrgRepos(org?.login).then(setReposList);
    }
  }, [org]);

  const handlerCurrentPage = (n: number) => {
    setCurrentPage(n);
  };
  const handlerPrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage((n) => n - 1);
    }
  };
  const handlerNextPage = () => {
    if (currentPage !== amount) {
      setCurrentPage((n) => n + 1);
    }
  };

  const listOnPage = reposList.slice(currentPage === 1 ? 0 : (currentPage - 1) * perPage, perPage * currentPage);

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

      <NavInputs changeOrgName={changeOrgName} />
      {org ? (
        <OrgsList list={listOnPage} />
      ) : (
        <div style={{ textAlign: 'center', marginTop: 30 }}>Please type organization</div>
      )}

      <Pagination
        perPage={perPage}
        pagesCount={amount}
        currentPage={currentPage}
        reposAmount={reposList.length}
        handlerPrevPage={handlerPrevPage}
        handlerNextPage={handlerNextPage}
        handlerCurrentPage={handlerCurrentPage}
      />
    </section>
  );
};
export default OrgsPage;
