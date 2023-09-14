import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import Loader from 'components/Loader';
import Pagination from 'components/Pagination';
import Text from 'components/Text';

import { TOrg } from 'entities/org';
import { TOrgRepo } from 'entities/repo';
import usePagination from 'hooks/usePagination';
import OrgStore from 'store/OrgStore/OrgStore';

import NavInputs from './components/NavInputs';
import OrgsList from './components/OrgsList';
import css from './OrgsPage.module.scss';

type OrganisationsPageProps = {
  // org: TOrg | null;
  // repos: TOrgRepo[];
  // changeOrgName: (name: string) => void;
};

const REPO_PER_PAGE = 9;

const OrgsPage: FC<OrganisationsPageProps> = observer(() => {
  const { offset, paginationNums, totalPagesCount, onChange } = usePagination(
    OrgStore.org?.public_repos,
    REPO_PER_PAGE,
  );

  useEffect(() => {
    if (OrgStore.org) {
      OrgStore.getReposData(REPO_PER_PAGE, offset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OrgStore.org, offset]);

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

      <div className={css.orgs__status}>
        {OrgStore.loadingReposList && !OrgStore.errorReposList && <Loader color="accent" size="l" />}
        {OrgStore.errorReposList && <div className={css.error}>{OrgStore.errorReposList}</div>}
      </div>

      {OrgStore.org ? (
        <OrgsList repos={OrgStore.orgRepos} />
      ) : (
        <div className={css.orgs__empty}>Please type organization</div>
      )}

      <Pagination
        offset={offset}
        paginationNums={paginationNums}
        onChange={onChange}
        totalPagesCount={totalPagesCount}
      />
    </section>
  );
});
export default OrgsPage;

// const OrgsPage: FC<OrganisationsPageProps> = observer(({ org, repos, changeOrgName, handleRepos }) => {
//   const { offset, paginationNums, totalPagesCount, onChange } = usePagination(org?.public_repos, REPO_PER_PAGE);
//   const [orgReposError, setOrgReposError] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (org) {
//       setLoading(true);
//       getData<TOrgRepo[]>(`orgs/${org.login}/repos?per_page=${REPO_PER_PAGE}&page=${offset}`).then((response) => {
//         if (response.isError) {
//           setOrgReposError("Can't load org repositories");
//         } else {
//           handleRepos(response.data);
//           setLoading(false);
//         }
//       });
//     }
//   }, [org, offset, handleRepos]);

//   return (
//     <section className={css.orgs}>
//       {orgReposError && <div>{orgReposError}</div>}
//       <header className={css.orgs__header}>
//         <Text tag="h2" view="title">
//           List organization repositories
//         </Text>
//         <Text mt="24px" tag="p" view="p-20" color="secondary">
//           Lists repositories for the specified organization
//         </Text>
//       </header>

//       <NavInputs changeOrgName={changeOrgName} />

//       <div className={css.orgs__status}>
//         {loading && !orgReposError && <Loader color="accent" size="l" />}
//         {orgReposError && <div className={css.error}>{orgReposError}</div>}
//       </div>

//       {org ? <OrgsList repos={repos} /> : <div className={css.orgs__empty}>Please type organization</div>}

//       <Pagination
//         offset={offset}
//         paginationNums={paginationNums}
//         onChange={onChange}
//         totalPagesCount={totalPagesCount}
//       />
//     </section>
//   );
// });
// export default OrgsPage;
