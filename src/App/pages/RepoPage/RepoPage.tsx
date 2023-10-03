import { observer } from 'mobx-react-lite';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, Link } from 'react-router-dom';

import link from 'assets/link.svg';

import PageUp from 'components/PageUp';
import Status from 'components/Status';
import Text from 'components/Text';
import ArrowBackIcon from 'components/icons/ArrowBackIcon';

import useLocalStore from 'hooks/useLocalStore';
import useScroll from 'hooks/useScroll';

import GitHubRepoStore from 'store/GitHubRepoStore';

import Contributors from './components/Contributors';
import Languages from './components/Languages';
import Readme from './components/Readme';
import Subs from './components/Subs';
import Tags from './components/Tags';

import css from './RepoPage.module.scss';

const RepoPage: FC = () => {
  const { t } = useTranslation('repoPage');

  const { isScrollVisible } = useScroll();

  const { orgName, repoName } = useParams();

  const { repo, repoLoading, repoError, readme, languages, contributors, errorsRepo, loadersRepo } =
    useLocalStore<GitHubRepoStore>(() => new GitHubRepoStore({ orgName: orgName, repoName: repoName }));

  const navigate = useNavigate();

  const goToBack = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <section className={css.repo}>
      {!repo ? (
        <Status
          className={css.emptyWidth}
          goTo={goToBack}
          isLoading={repoLoading}
          errorMessage={repoError}
          isEmpty={!repo}
          isBackButton={true}
        >
          {t('no-data-repo-page')}
        </Status>
      ) : (
        <>
          <header className={css.header}>
            <ArrowBackIcon width="32" height="32" onClick={goToBack} color="accent" />
            <img className={css.header__avatar} src={repo?.owner?.avatarUrl} width="40" height="40" alt="repo-avatar" />
            <Text tag="h2" view="subtitle">
              {repo?.name}
            </Text>
          </header>

          <div className={css.homepage}>
            <div className={css.homepage__imgWrapper}>
              <img className={css.homepage__img} width="20px" height="20px" src={link} alt="link-logo" />
            </div>

            {repo?.homepage ? (
              <Link className={css.homepage__link} to={repo.homepage} target="_blank">
                <Text className={css.homepage__text} tag="span" view="p-14" weight="bold">
                  {repo.homepage}
                </Text>
              </Link>
            ) : (
              <div className={css.homepage_empty}>{t('no-data-homepage')}</div>
            )}
          </div>

          <Tags tags={repo.topics} />
          <Subs
            forksCount={repo.forksCount}
            watchersCount={repo.watchersCount}
            stargazersCount={repo.stargazersCount}
          />

          <div className={css.repo__info}>
            <Contributors
              contributors={contributors}
              error={errorsRepo.contributors}
              loading={loadersRepo.contributors}
            />
            <Languages languages={languages} error={errorsRepo.languages} loading={loadersRepo.languages} />
          </div>
          <Readme readme={readme} error={errorsRepo.readme} loading={loadersRepo.readme} />
        </>
      )}

      <PageUp isScrollVisible={isScrollVisible} size={60} />
    </section>
  );
};

export default observer(RepoPage);
