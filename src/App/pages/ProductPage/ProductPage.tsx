import { FC, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import link from 'assets/link.svg';
import Text from 'components/Text';
import ArrowBackIcon from 'components/icons/ArrowBackIcon';

import { decodeFromUint8Array } from 'utils/encode';
import { getContributors, getLanguages, TContributor, TOrgRepo, TReadme, getReadme, TOrg } from 'utils/fetchData';
import { randomRGBColor } from 'utils/randomRGBColor';

import css from './ProductPage.module.scss';

interface IProductPageProps {
  list: TOrgRepo[];
  org: TOrg | null;
}

const README_FILE_NAME = 'README.md';

const ProductPage: FC<IProductPageProps> = ({ list }) => {
  const [contributors, setContributors] = useState<TContributor[]>([]);
  const [readme, setReadme] = useState<TReadme | null>(null);
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [languages, setLanguages] = useState<Record<string, number> | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const goToBack = () => {
    navigate(-1);
  };
  const { id } = useParams();
  const product = list.find((el) => String(el.id) === id);

  useEffect(() => {
    (async () => {
      if (product) {
        const requests = [
          getContributors(product.contributors_url),
          getLanguages(product.languages_url),
          getReadme(product.contents_url, README_FILE_NAME),
        ];
        const [contributors, languages, readme] = await Promise.all(requests);
        setContributors(contributors);
        setLanguages(languages);
        setReadme(readme);
        setReadmeContent(decodeFromUint8Array(readme.content));
      }
    })();
  }, [product]);

  const renderSubs = [
    { count: product?.stargazers_count, text: 'stars' },
    { count: product?.watchers_count, text: 'warnings' },
    { count: product?.forks_count, text: 'forks' },
  ].map(({ count, text }) => (
    <Text key={text} tag="li" view="p-14" weight="bold" color="secondary">
      {count} <span>{text}</span>
    </Text>
  ));

  const langValues: number[] | null = languages && Object.values(languages);
  const oneLanguagesSum = langValues && langValues.reduce((acc, count) => acc + count, 0) / 100;
  const languagesWithPercent =
    languages &&
    Object.entries(languages).map(([name, count]) => ({
      name,
      percent: +(count / oneLanguagesSum).toFixed(1),
      color: randomRGBColor(),
    }));

  return (
    <div className={css.product}>
      <header className={css.product__header}>
        <ArrowBackIcon width="32" height="32" handler={goToBack} color="accent" />
        <img src={product?.owner.avatar_url} width="40" height="40" alt="repo-avatar" />
        <Text tag="h2" view="title">
          {product?.name}
        </Text>
      </header>

      <Link className={css.product__homepage} to={product?.homepage || location.pathname}>
        <img width="16px" height="16px" src={link} alt="link-logo" />
        {product?.homepage ? (
          <>
            <Text tag="p" view="p-16" weight="bold" stylesProps={{ color: 'red' }}>
              {product?.homepage}
            </Text>
          </>
        ) : (
          'no link'
        )}
      </Link>

      <ul className={css.product__tags}>
        {product?.topics.map((el: string) => (
          <li key={el.toString()} className={css.product__tag}>
            {el}
          </li>
        ))}
      </ul>

      <ul className={css.product__subs}>{renderSubs}</ul>

      <div className={css.product__info}>
        <div className={css.contributors}>
          <Text tag="h4">
            <Text weight="bold" view="p-18" tag="span">
              Contributors
            </Text>
            <Text tag="span">{contributors.length}</Text>
          </Text>

          <ul className={css.contributors__list}>
            {contributors.map((cont) => (
              <li key={cont.node_id} className={css.contributors__item}>
                <img width="32" height="32" src={cont.avatar_url} alt="avatar" />
                <Text tag="h4" view="p-16" weight="bold">
                  {cont.login}
                </Text>
                <Text tag="h4" view="p-16" color="secondary">
                  {cont.node_id}
                </Text>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.product__languages}>
          <Text tag="h4" weight="bold" view="p-18">
            Languages
          </Text>

          <div className={css.languages__range}>
            {languagesWithPercent &&
              languagesWithPercent.map(({ name, percent, color }) => (
                <div
                  className={css.range__item}
                  key={name}
                  style={{ width: `${percent}%`, backgroundColor: color }}
                ></div>
              ))}
          </div>

          <ul className={css.languages__list}>
            {languagesWithPercent &&
              languagesWithPercent.map(({ name, percent, color }) => (
                <li key={name} className={css.languages__item}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <circle cx="4" cy="4" r="4" fill={color} />
                  </svg>

                  <Text color="primary" tag="p">
                    {name}
                    <span>{percent}%</span>
                  </Text>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className={css.product__readme}>
        <Text tag="h5" view="p-12" weight="bold" stylesProps={{ padding: 'var(--space-m)' }}>
          {readme?.name}
        </Text>

        <pre className={css.content}>{readmeContent}</pre>
      </div>
    </div>
  );
};
export default ProductPage;
