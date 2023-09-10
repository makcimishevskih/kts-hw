
import { FC } from 'react';

import { Link } from 'react-router-dom';
import Card from 'components/Card';
import { TOrgRepo } from 'utils/fetchData';
import { getFormattedDate } from 'utils/formatDate';

import css from './OrgsList.module.scss';

interface IOrgsListProps {
  list: TOrgRepo[];
}

const OrgsList: FC<IOrgsListProps> = ({ list }) => {
  return (
    <ul className={css.orgsList}>
      {list.map(({ id, name, description, created_at, owner, stargazers_count }) => (
        <Link key={id} to={`/product/${id}`}>
          <Card
            captionSlot={
              <>
                <span className={css.stars}>{stargazers_count}</span>
                <span className={css.date}>Updated {getFormattedDate(created_at)}</span>
              </>
            }
            title={name}
            image={owner.avatar_url}
            subtitle={description}
          />
        </Link>
      ))}
    </ul>
  );
};

export default OrgsList;
