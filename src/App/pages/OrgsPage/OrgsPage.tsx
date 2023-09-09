import css from './OrgsPage.module.scss';
import { FC, useEffect, useState } from 'react';

import { TOrgRepo, TOrg, geTOrgRepos } from 'utils/fetchData';

import Text from 'components/Text';
import OrgsList from './components/OrgsList';
import NavInputs from './components/NavInputs';
import Pagination from './components/Pagination';

interface OrganisationsPageProps {
  list: TOrgRepo[];
  // org: TOrg;
}
const OrganisationsPage: FC<OrganisationsPageProps> = ({ list }) => {
  // const [orgName, seTOrgRepoName] = useState('');
  // const [orgType, seTOrgRepoType] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reposList, setReposList] = useState<TOrgRepo[]>([]);

  const perPage = 9;
  const amount = Math.ceil(reposList.length / perPage);

  const handlerCurrentPage = (n: number) => {
    console.log(n);
    // if (currentPage !== 1) {
    setCurrentPage(n);
    // }
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

  useEffect(() => {
    geTOrgRepos().then(setReposList);
  }, []);

  const listOnPage = reposList.slice(currentPage === 1 ? 0 : (currentPage - 1) * perPage, perPage * currentPage);
  // console.log(listAll.length, listOnPage.length, amount);

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

      <NavInputs />
      <OrgsList list={listOnPage} />

      {/* REFACTOR AND CREATE PAGES */}
      {/* <Pagination pages={org?.public_repos} /> */}
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
export default OrganisationsPage;
