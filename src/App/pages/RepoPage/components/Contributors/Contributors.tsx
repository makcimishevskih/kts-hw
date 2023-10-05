import classNames from 'classnames';
import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';
import Status from 'components/Status';
import Text from 'components/Text';

import useScrollIntoView from 'hooks/useScrollIntoView';
import { TContributorModel } from 'store/models/repo';

import css from './Contributors.module.scss';

type IContributorsProps = {
  contributors: TContributorModel[];
  error: string;
  loading: boolean;
};

const MAX_CONTRIBUTORS_LENGTH = 6;

const Contributors: FC<IContributorsProps> = ({ contributors, error, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('repoPage');
  const { myRef, scrollIntoView } = useScrollIntoView<HTMLDivElement>('start');

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
    scrollIntoView();
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
      {contributors.length > MAX_CONTRIBUTORS_LENGTH && (
        <Button onClick={toggleIsOpen} className={css.contributors__isOpenButton}>
          {isOpen ? t('button.Hide') : t('button.Show')}
        </Button>
      )}
    </div>
  );
};
export default Contributors;
