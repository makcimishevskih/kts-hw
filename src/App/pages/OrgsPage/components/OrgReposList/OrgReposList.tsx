import { useTransition, animated } from '@react-spring/web';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Card from 'components/Card';
import Status from 'components/Status';

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
  const { t, i18n } = useTranslation('repoPage');

  const transitions = useTransition(orgRepos, {
    from: { transform: 'translateY(100vw)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(0%)' },
    delay: 200,
  });

  const reposList = transitions(
    (style, { id, name, description, createdAt, owner: { avatarUrl }, stargazersCount }: TOrgReposModel) => (
      <animated.div key={id} style={style}>
        <Link to={ROUTES.orgs.repo.createRoute(orgName, name)}>
          <Card
            captionSlot={
              <>
                <span className={css.stars}>{stargazersCount || 0}</span>
                <span className={css.date}>
                  {t('updated')} {getFormattedDate(createdAt, i18n.language === 'en' ? 'en-GB' : 'ru-RU')}
                </span>
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
        <Status isLoading={loadingReposList} errorMessage={errorReposList} isEmpty={reposListLen === 0}>
          {t('reposlist.no-data-repos-list')}
        </Status>
      ) : (
        <ul className={css.repos__list}>{!errorReposList && !loadingReposList && reposList}</ul>
      )}
    </>
  );
};

export default observer(OrgReposList);
