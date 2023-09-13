import classNames from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import link from 'assets/link.svg';
import Text from 'components/Text';
import ArrowBackIcon from 'components/icons/ArrowBackIcon';
import { TOrg } from 'entities/org';
import { TOrgRepo, TReadme, TContributor, TLanguages } from 'entities/repo';
import { getData } from 'utils/fetchData';

import Contributors from './components/Contributors';
import Languages from './components/Languages';
import Readme from './components/Readme';
import Tags from './components/Tags';
import css from './RepoPage.module.scss';

type TRepoPageProps = {
  repos: TOrgRepo[];
  org: TOrg | null;
  orgName: string;
};

const FILE_NAME = 'README.md';

const RepoPage: FC<TRepoPageProps> = ({ orgName, repos }) => {
  const [contributors, setContributors] = useState<TContributor[]>([]);
  const [readme, setReadme] = useState<TReadme | null>(null);
  const [languages, setLanguages] = useState<TLanguages | null>(null);
  const [errors, setErrors] = useState({ contributors: '', readme: '', languages: '' });

  const navigate = useNavigate();
  const location = useLocation();

  const goToBack = useCallback(() => {
    navigate(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { id } = useParams();
  const repo = repos.find((el) => String(el.id) === id);

  useEffect(() => {
    if (repo && orgName) {
      const repoURL = `repos/${orgName}/${repo.name}`;

      getData<TContributor[]>(`${repoURL}/contributors`).then((response) => {
        if (response.isError) {
          setErrors((prev) => ({
            ...prev,
            contributors: "Can't load contributors",
          }));
        } else {
          setContributors(response.data);
        }
      });
      getData<TLanguages>(`${repoURL}/languages`).then((response) => {
        if (response.isError) {
          setErrors((prev) => ({
            ...prev,
            languages: "Can't load languages",
          }));
        } else {
          setLanguages(response.data);
        }
      });
      getData<TReadme>(`${repoURL}/contents/${FILE_NAME}`).then((response) => {
        if (response.isError) {
          setErrors((prev) => ({
            ...prev,
            readme: `Can't load ${FILE_NAME}`,
          }));
        } else {
          setReadme(response.data);
        }
      });
    }
  }, [orgName, repo]);

  const renderSubs = [
    { count: repo?.stargazers_count || 0, text: 'stars', className: css.stars },
    { count: repo?.watchers_count || 0, text: 'watchers', className: css.watchers },
    { count: repo?.forks_count || 0, text: 'forks', className: css.forks },
  ].map(({ count, text, className }) => (
    <Text className={classNames(css.subs__tag, className)} key={text} tag="li" view="p-14" color="secondary">
      <span className={css.subs__count}>{count}</span>
      <span className={css.subs__text}>{text}</span>
    </Text>
  ));

  return (
    <div className={css.repo}>
      <header className={css.repo__header}>
        <ArrowBackIcon width="32" height="32" onClick={goToBack} color="accent" />
        <img src={repo?.owner.avatar_url} width="40" height="40" alt="repo-avatar" />
        <Text tag="h2" view="title">
          {repo?.name}
        </Text>
      </header>

      <Link className={css.repo__homepage} to={repo?.homepage || location.pathname}>
        <img width="16px" height="16px" src={link} alt="link-logo" />
        {repo?.homepage ? (
          <Text tag="p" view="p-16" weight="bold" stylesProps={{ color: 'red' }}>
            {repo?.homepage}
          </Text>
        ) : (
          "Don't have a link"
        )}
      </Link>

      <Tags tags={repo?.topics} />

      <ul className={css.repo__subs}>{renderSubs}</ul>

      <div className={css.repo__info}>
        <Contributors contributors={contributors} error={errors.contributors} />
        <Languages languages={languages} error={errors.languages} />
      </div>

      <Readme readme={readme} error={errors.readme} />
    </div>
  );
};
export default RepoPage;
