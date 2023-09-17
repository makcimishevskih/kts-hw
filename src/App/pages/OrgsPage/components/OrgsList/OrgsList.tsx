import { observer } from 'mobx-react-lite';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { TOrgRepos, TTypes } from 'store';
import Card from 'components/Card';
import Loader from 'components/Loader';

import { getFormattedDate } from 'utils/formatDate';

import css from './OrgsList.module.scss';

interface IOrgsListProps {
  orgType: TTypes;
  orgRepos: TOrgRepos[];
  orgReposLength: number;
  errorReposList: string;
  loadingReposList: boolean;
}

const OrgsList: FC<IOrgsListProps> = ({ loadingReposList, errorReposList, orgType, orgReposLength, orgRepos }) => {
  const loader = loadingReposList && !errorReposList && <Loader color="accent" size="xl" />;
  const error = errorReposList && !loadingReposList && <div className={css.repos__error}>Error:{errorReposList}</div>;
  const empty = errorReposList && !loadingReposList && <div className={css.repos__empty}>Don&apos;t have any repo</div>;

  return (
    <>
      <div className={css.repos__status}>
        {loader}
        {error}
        {empty}
      </div>

      {!loadingReposList && !errorReposList && !!orgRepos.length && (
        <>
          <div className={css.repos__count} style={{ fontSize: 24, textAlign: 'center', marginTop: 20 }}>
            Repos count: {orgReposLength} Type: {orgType}
          </div>

          <ul className={css.repos__list}>
            {orgRepos.length !== 0 &&
              orgRepos.map(({ id, name, description, created_at, owner, stargazers_count }) => (
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
        </>
      )}
    </>
  );
};

export default memo(observer(OrgsList));
