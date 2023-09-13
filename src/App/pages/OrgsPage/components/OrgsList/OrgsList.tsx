import { FC, memo } from 'react';

import { Link } from 'react-router-dom';
import Card from 'components/Card';
import { TOrgRepo } from 'entities/repo';
import { getFormattedDate } from 'utils/formatDate';

import css from './OrgsList.module.scss';

interface IOrgsListProps {
  repos: TOrgRepo[];
}

const OrgsList: FC<IOrgsListProps> = ({ repos }) => {
  return (
    <ul className={css.orgsList}>
      {repos.map(({ id, name, description, created_at, owner, stargazers_count }) => (
        <Link key={id} to={`/repo/${id}`}>
          <Card
            captionSlot={
              <>
                <span className={css.stars}>{stargazers_count || 0}</span>
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

export default memo(OrgsList);
