import { observer } from 'mobx-react-lite';
import { FC, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import link from 'assets/link.svg';

import Loader from 'components/Loader';
import Text from 'components/Text';
import ArrowBackIcon from 'components/icons/ArrowBackIcon';
import useLocalStore from 'hooks/useLocalStore';
import GitHubRepoStore from 'store/GitHubRepoStore';

import Contributors from './components/Contributors';
import Languages from './components/Languages';
import Readme from './components/Readme';
import Subs from './components/Subs';
import Tags from './components/Tags';

import css from './RepoPage.module.scss';

const RepoPage: FC = () => {
  const { orgName, repoName } = useParams();

  const navigate = useNavigate();

  const goToBack = useCallback(() => {
    navigate(-1);
  }, []);

  const { repo, repoLoading, repoError, readme, languages, contributors, errorsRepo, loadersRepo } =
    useLocalStore<GitHubRepoStore>(() => new GitHubRepoStore({ orgName: orgName, repoName: repoName }));

  return (
    <section className={css.repo}>
      <div className={css.repo__status}>
        {repoLoading && !repoError && <Loader color="accent" size="xl" />}
        {repoError && !repoLoading && <div className={css.languages__status_error}>{repoError}</div>}
        {!repoLoading && !repoError && !repo && (
          <div className={css.repo__status_empty}>
            <ArrowBackIcon width="32" height="32" onClick={goToBack} color="accent" />
            <div>
              <p>Don&apos;t have repo data</p>
              <p>click arrow button to go back</p>
            </div>
          </div>
        )}
      </div>

      {repo && (
        <>
          <header className={css.repo__header}>
            <ArrowBackIcon width="32" height="32" onClick={goToBack} color="accent" />
            <img src={repo?.owner?.avatarUrl} width="40" height="40" alt="repo-avatar" />
            <Text tag="h2" view="title">
              {repo?.name}
            </Text>
          </header>
          <div className={css.repo__homepage}>
            <img width="16px" height="16px" src={link} alt="link-logo" />
            {repo?.homepage ? (
              <Link className={css.homepage__link} to={repo?.homepage}>
                <Text tag="span" view="p-16" weight="bold">
                  {repo?.homepage}
                </Text>
              </Link>
            ) : (
              <div className={css.homepage__empty}>Don&apos;t have homepage</div>
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
    </section>
  );
};

export default observer(RepoPage);
