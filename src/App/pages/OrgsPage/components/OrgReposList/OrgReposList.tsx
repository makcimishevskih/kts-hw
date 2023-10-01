import { useTransition, animated } from '@react-spring/web';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Card from 'components/Card';
import Loader from 'components/Loader';
import Text from 'components/Text';

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
  const { t } = useTranslation('repoPage');

  const transitions = useTransition(orgRepos, {
    from: { transform: 'translateX(-100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(0%)' },
  });

  const reposList = transitions(
    (style, { id, name, description, createdAt, owner: { avatarUrl }, stargazersCount }: TOrgReposModel) => (
      <animated.div key={id} style={style}>
        <Link to={ROUTES.orgs.repo.createRoute(orgName, name)}>
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

  const reposListLen = reposList.props.children.length;

  return (
    <>
      {reposListLen === 0 ? (
        <div className={css.repos__status}>
          {loadingReposList && !errorReposList && <Loader color="accent" size="xl" />}
          {errorReposList && !loadingReposList && <div className={css.repos__status_error}>Error:{errorReposList}</div>}
          {!errorReposList && !loadingReposList && (
            <div className={css.repos__status_empty}>
              <Text view="p-20" tag="p">
                {t('reposlist.no-data-repos-list')}
              </Text>
            </div>
          )}
        </div>
      ) : (
        <ul className={css.repos__list}>{!errorReposList && !loadingReposList && reposList}</ul>
      )}
    </>
  );
};

export default observer(OrgReposList);
