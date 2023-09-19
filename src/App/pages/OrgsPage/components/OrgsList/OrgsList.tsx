import { observer } from 'mobx-react-lite';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import Card from 'components/Card';
import Loader from 'components/Loader';

import { TOrgReposModel } from 'store/models/repo';
import { getFormattedDate } from 'utils/formatDate';

import css from './OrgsList.module.scss';

type OrgListProps = {
  orgRepos: TOrgReposModel[];
  orgReposLength: number;
  errorReposList: string;
  loadingReposList: boolean;
};

const OrgsList: FC<OrgListProps> = ({ loadingReposList, errorReposList, orgReposLength, orgRepos }) => {
  const loader = loadingReposList && !errorReposList && <Loader color="accent" size="xl" />;
  const error = errorReposList && !loadingReposList && <div className={css.repos__error}>Error:{errorReposList}</div>;
  const empty = !errorReposList && !loadingReposList && orgReposLength === 0 && (
    <div className={css.repos__empty}>Don&apos;t have any repo</div>
  );

  return (
    <>
      <div className={css.repos__status}>
        {loader}
        {error}
        {empty}
      </div>

      <ul className={css.repos__list}>
        {orgRepos.length !== 0 &&
          orgRepos.map(({ id, name, description, createdAt, owner: { avatarUrl }, stargazersCount }) => (
            <Link key={id} to={`/repo/${id}`}>
              <Card
                captionSlot={
                  <>
                    <span className={css.stars}>{stargazersCount || 0}</span>
                    <span className={css.date}>Updated {getFormattedDate(createdAt)}</span>
                  </>
                }
                title={name}
                image={avatarUrl}
                subtitle={description}
              />
            </Link>
          ))}
      </ul>
    </>
  );
};

export default memo(observer(OrgsList));
