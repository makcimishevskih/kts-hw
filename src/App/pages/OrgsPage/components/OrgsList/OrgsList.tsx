import css from './OrgsList.module.scss';

import Card from 'components/Card';
import { FC } from 'react';
import { TOrgs } from 'utils/fetchData';

interface IOrgsListProps {
  list: TOrgs[];
}

const OrgsList: FC<IOrgsListProps> = ({ list }) => {
  return (
    <ul className={css.orgsList}>
      {list.map((el) => (
        <Card
          key={el.id}
          captionSlot={
            <>
              <span>{el.stargazers_count}</span>
              {'    '}
              <span>{el.updated_at}</span>
            </>
          }
          title={el.name}
          image={el.owner.avatar_url}
          subtitle={el.description}
        ></Card>
      ))}
    </ul>
  );
};

export default OrgsList;
