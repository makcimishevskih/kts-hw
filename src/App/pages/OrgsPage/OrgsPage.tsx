import { FC, useEffect, useState } from 'react';
import Pagination from 'components/Pagination';
import Text from 'components/Text';

import { TOrg } from 'entities/org';
import { TOrgRepo } from 'entities/repo';
import usePagination from 'hooks/usePagination';
import { getData, getOrgRepos } from 'utils/fetchData';

import NavInputs from './components/NavInputs';
import OrgsList from './components/OrgsList';
import css from './OrgsPage.module.scss';

type OrganisationsPageProps = {
  repos: TOrgRepo[];
  org: TOrg | null;

  handleRepos: (repos: TOrgRepo[]) => void;
  changeOrgName: (name: string) => void;
};

const REPO_PER_PAGE = 9;

const OrgsPage: FC<OrganisationsPageProps> = ({ org, repos, changeOrgName, handleRepos }) => {
  const { offset, paginationNums, totalPagesCount, onChange } = usePagination(org?.public_repos, REPO_PER_PAGE);
  const [orgReposError, setOrgReposError] = useState('');
  useEffect(() => {
    if (org) {
      getData<TOrgRepo[]>(`orgs/${org.login}/repos?per_page=${REPO_PER_PAGE}&page=${offset}`).then((response) => {
        if (response.isError) {
          setOrgReposError("Can't load org repositories");
        } else {
          handleRepos(response.data);
        }
      });
    }
  }, [org, offset, handleRepos]);

  return (
    <section className={css.orgs}>
      {orgReposError && <div>{orgReposError}</div>}
      <header className={css.orgs__header}>
        <Text tag="h2" view="title">
          List organization repositories
        </Text>
        <Text mt="24px" tag="p" view="p-20" color="secondary">
          Lists repositories for the specified organization
        </Text>
      </header>

      <NavInputs changeOrgName={changeOrgName} />
      {org ? <OrgsList repos={repos} /> : <div className={css.emptyOrgList}>Please type organization</div>}

      <Pagination
        offset={offset}
        paginationNums={paginationNums}
        onChange={onChange}
        totalPagesCount={totalPagesCount}
      />
    </section>
  );
};
export default OrgsPage;
