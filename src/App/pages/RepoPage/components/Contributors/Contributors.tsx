import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Loader from 'components/Loader';
import Text from 'components/Text';

import { TContributorModel } from 'store/models/repo';

import css from './Contributors.module.scss';

interface IContributorsProps {
  contributors: TContributorModel[];
  error: string;
  loading: boolean;
}

const Contributors: FC<IContributorsProps> = ({ contributors, error, loading }) => {
  const { t } = useTranslation('repoPage');

  return (
    <div className={css.contributors}>
      <Text tag="h4" className={css.contributors__title}>
        <Text className={css.contributors__text} weight="bold" view="p-18" tag="span">
          {t('contributors.contributors-title')}
        </Text>
        <Text className={css.contributors__badge} tag="span">
          {contributors.length}
        </Text>
      </Text>

      <div className={css.contributors__status}>
        {loading && !error && <Loader color="accent" size="l" />}
        {error && (
          <div className={css.contributors__status_error}>
            <Text view="p-20" tag="p">
              {error}
            </Text>
          </div>
        )}
        {!loading && !error && !contributors.length && (
          <div className={css.contributors__status_empty}>
            <Text view="p-20" tag="p">
              {t('contributors.no-data-contributors')}
            </Text>
          </div>
        )}
      </div>

      <ul className={css.contributors__list}>
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
    </div>
  );
};
export default Contributors;
