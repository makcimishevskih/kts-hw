import css from './OrgsList.module.scss';

import Card from 'components/Card';
import { FC } from 'react';
import { TOrgRepo } from 'utils/fetchData';
import { getFormattedDate } from 'utils/formatDate';

interface IOrgsListProps {
  list: TOrgRepo[];
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
              <span>Updated {getFormattedDate(el.created_at)}</span>
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
