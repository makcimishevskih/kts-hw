import { useTransition, animated } from '@react-spring/web';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import Card from 'components/Card';
import Loader from 'components/Loader';
import { ROUTES } from 'config/routes';

import { TOrgReposModel } from 'store/models/repo';
import { getFormattedDate } from 'utils/formatDate';

import css from './OrgReposList.module.scss';

type OrgListProps = {
  orgName: string;
  orgRepos: TOrgReposModel[];
  errorReposList: string;
  loadingReposList: boolean;
};

const OrgReposList: FC<OrgListProps> = ({ orgName, loadingReposList, errorReposList, orgRepos }) => {
  const transitions = useTransition(orgRepos, {
    from: { transform: 'translateX(-100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(0%)' },
    delay: 100,
  });

  const reposList = transitions(
    (style, { id, name, description, createdAt, owner: { avatarUrl }, stargazersCount }: TOrgReposModel) => (
      <animated.div key={id} style={style}>
        <Link to={`${ROUTES.REPO_PAGE}/${orgName}/${name}`}>
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
      </animated.div>
    ),
  );

  return (
    <>
      <div className={css.repos__status}>
        {loadingReposList && !errorReposList && <Loader color="accent" size="xl" />}
        {errorReposList && !loadingReposList && <div className={css.repos__status_error}>Error:{errorReposList}</div>}
        {!errorReposList && !loadingReposList && !reposList && (
          <div className={css.repos__status_empty}>Don&apos;t have repos</div>
        )}
      </div>

      <ul className={css.repos__list}>{!errorReposList && !loadingReposList && reposList}</ul>
    </>
  );
};

export default observer(OrgReposList);
