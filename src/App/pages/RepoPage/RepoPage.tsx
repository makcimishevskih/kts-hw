import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import link from 'assets/link.svg';

import Text from 'components/Text';
import ArrowBackIcon from 'components/icons/ArrowBackIcon';
import useStores from 'providers/RootStoreProvider/useStores';
import { TOrgRepos } from 'store/types/entities/repo';

import Contributors from './components/Contributors';
import Languages from './components/Languages';
import Readme from './components/Readme';
import Subs from './components/Subs';
import Tags from './components/Tags';

import css from './RepoPage.module.scss';

type TRepoPageProps = {
  orgName: string;
  getFullRepoData: (filename: string) => void;
  findRepoById: (id: string) => TOrgRepos | null;
};

const FILE_NAME = 'README.md';

const RepoPage: FC<TRepoPageProps> = ({ findRepoById, orgName, getFullRepoData }) => {
  const {
    github: { contributors, languages, readme, errorsRepo, loadersRepo },
  } = useStores();

  const navigate = useNavigate();

  const goToBack = useCallback(() => {
    navigate(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { id } = useParams();

  const repo: TOrgRepos | null = (id && findRepoById(id)) || null;

  useEffect(() => {
    if (repo && orgName) {
      getFullRepoData(FILE_NAME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgName, repo]);

  return (
    <div className={css.repo}>
      <header className={css.repo__header}>
        <ArrowBackIcon width="32" height="32" onClick={goToBack} color="accent" />
        <img src={repo?.owner.avatar_url} width="40" height="40" alt="repo-avatar" />
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
          <div className={css.homepage__empty}>Don&apos;t have a link</div>
        )}
      </div>

      {repo && <Tags tags={repo.topics} />}

      <Subs repo={repo} />

      <div className={css.repo__info}>
        <Contributors contributors={contributors} error={errorsRepo.contributors} loading={loadersRepo.contributors} />
        <Languages languages={languages} error={errorsRepo.languages} loading={loadersRepo.languages} />
      </div>
      <Readme readme={readme} error={errorsRepo.readme} loading={loadersRepo.readme} />
    </div>
  );
};

export default observer(RepoPage);
