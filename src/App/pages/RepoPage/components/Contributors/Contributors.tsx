import classNames from 'classnames';
import { FC, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';
import Status from 'components/Status';
import Text from 'components/Text';

import { TContributorModel } from 'store/models/repo';

import css from './Contributors.module.scss';

type IContributorsProps = {
  contributors: TContributorModel[];
  error: string;
  loading: boolean;
};
// const c = [
//   { id: 5640, login: 'ryanking', contributions: 62, avatarUrl: 'https://avatars.githubusercontent.com/u/5640?v=4' },
//   { id: 598, login: 'jmhodges', contributions: 22, avatarUrl: 'https://avatars.githubusercontent.com/u/598?v=4' },
//   { id: 16057, login: 'cgs', contributions: 14, avatarUrl: 'https://avatars.githubusercontent.com/u/16057?v=4' },
//   { id: 206, login: 'sprsquish', contributions: 13, avatarUrl: 'https://avatars.githubusercontent.com/u/206?v=4' },
//   { id: 1407, login: 'freels', contributions: 9, avatarUrl: 'https://avatars.githubusercontent.com/u/1407?v=4' },
//   {
//     id: 134712,
//     login: 'ryangreenberg',
//     contributions: 7,
//     avatarUrl: 'https://avatars.githubusercontent.com/u/134712?v=4',
//   },
//   { id: 2911, login: 'mperham', contributions: 6, avatarUrl: 'https://avatars.githubusercontent.com/u/2911?v=4' },
//   {
//     id: 4485051,
//     login: 'fluxusfrequency',
//     contributions: 5,
//     avatarUrl: 'https://avatars.githubusercontent.com/u/4485051?v=4',
//   },
//   { id: 335, login: 'bitbckt', contributions: 5, avatarUrl: 'https://avatars.githubusercontent.com/u/335?v=4' },
//   { id: 10308, login: 'sferik', contributions: 3, avatarUrl: 'https://avatars.githubusercontent.com/u/10308?v=4' },
//   {
//     id: 63777,
//     login: 'caniszczyk',
//     contributions: 3,
//     avatarUrl: 'https://avatars.githubusercontent.com/u/63777?v=4',
//   },
//   {
//     id: 1243633,
//     login: 'mikesea',
//     contributions: 2,
//     avatarUrl: 'https://avatars.githubusercontent.com/u/1243633?v=4',
//   },
//   {
//     id: 22655472,
//     login: 'dschofie',
//     contributions: 2,
//     avatarUrl: 'https://avatars.githubusercontent.com/u/22655472?v=4',
//   },
//   {
//     id: 13109210,
//     login: 'connormurray7',
//     contributions: 1,
//     avatarUrl: 'https://avatars.githubusercontent.com/u/13109210?v=4',
//   },
//   { id: 80635, login: 'mheffner', contributions: 1, avatarUrl: 'https://avatars.githubusercontent.com/u/80635?v=4' },
//   { id: 252, login: 'vangberg', contributions: 1, avatarUrl: 'https://avatars.githubusercontent.com/u/252?v=4' },
//   {
//     id: 682290,
//     login: 'ivmaykov',
//     contributions: 1,
//     avatarUrl: 'https://avatars.githubusercontent.com/u/682290?v=4',
//   },
// ];
const Contributors: FC<IContributorsProps> = ({ contributors, error, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const myRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation('repoPage');

  const scrollTo = useCallback(
    () =>
      myRef.current &&
      myRef.current.scrollIntoView({
        block: 'start',
      }),
    [myRef],
  );

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
    scrollTo();
  }, []);

  const cnList = classNames(css.contributors__list, isOpen && css.open);

  return (
    <div className={css.contributors} ref={myRef}>
      <Text tag="h4" className={css.contributors__title}>
        <Text className={css.contributors__text} weight="bold" view="p-18" tag="span">
          {t('contributors.contributors-title')}
        </Text>
        <Text className={css.contributors__badge} tag="span">
          {contributors.length}
        </Text>
      </Text>

      {!contributors.length || loading || error ? (
        <Status isLoading={loading} errorMessage={error} isEmpty={!contributors.length}>
          {t('contributors.no-data-contributors')}
        </Status>
      ) : (
        <ul className={cnList}>
          {contributors.map((cont) => (
            <li key={cont.id} className={css.contributors__item}>
              <div className={css.info}>
                <img className={css.info__avatar} width="32" height="32" src={cont.avatarUrl} alt="avatar" />
                <Text tag="h4" view="p-16" weight="bold">
                  {cont.login}
                </Text>
              </div>
              <Text tag="h4" view="p-16" color="secondary">
                {t('contributors.contributions_interval', { postProcess: 'interval', count: cont.contributions })}
              </Text>
            </li>
          ))}
        </ul>
      )}
      {contributors.length > 6 && (
        <Button onClick={toggleIsOpen} className={css.contributors__isOpenButton}>
          {isOpen ? t('button.Hide') : t('button.Show')}
        </Button>
      )}
    </div>
  );
};
export default Contributors;
