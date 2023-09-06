import css from './OrgsPage.module.scss';
import { FC, useEffect } from 'react';

// import { TOrgs } from 'utils/fetchData';

import Text from 'components/Text';
import OrgsList from './components/OrgsList';
import NavInputs from './components/NavInputs';

const OrganisationsPage: FC = () => {
  // const [state, setState] = useState<TOrgs[]>([]);

  useEffect(() => {
    // getOrgs().then(setState);
    // { name, id, full_name, description, updated_at,  stargazers_count }
  }, []);

  return (
    <section className={css.orgs}>
      <header className={css.orgs__header}>
        <Text mt="40px" stylesProps={{ marginTop: '40px' }} tag="h2" view="title">
          List organization repositories
        </Text>
        <Text mt="24px" tag="p" view="p-20" color="secondary">
          Lists repositories for the specified organization
        </Text>
      </header>

      <NavInputs />

      <OrgsList />
      <div>PAGINATION</div>
    </section>
  );
};
export default OrganisationsPage;
