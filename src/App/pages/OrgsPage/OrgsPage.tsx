import css from './OrgsPage.module.scss';
import { FC } from 'react';

import { TOrgs } from 'utils/fetchData';

import Text from 'components/Text';
import OrgsList from './components/OrgsList';
import NavInputs from './components/NavInputs';
import Pagination from './components/Pagination';
interface OrganisationsPageProps {
  list: TOrgs[];
}
const OrganisationsPage: FC<OrganisationsPageProps> = ({ list }) => {
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
      <OrgsList list={list} />
      <Pagination />
    </section>
  );
};
export default OrganisationsPage;
