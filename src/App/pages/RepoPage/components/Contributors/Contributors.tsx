import { FC } from 'react';
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
  return (
    <div className={css.contributors}>
      <Text tag="h4" className={css.contributors__title}>
        <Text className={css.contributors__text} weight="bold" view="p-18" tag="span">
          Contributors
        </Text>
        <Text className={css.contributors__badge} tag="span">
          {contributors.length}
        </Text>
      </Text>

      <div className={css.contributors__status}>
        {error && <div className={css.contributors__status_error}>{error}</div>}
        {!loading && !error && !contributors.length && (
          <div className={css.contributors__status_empty}>No conributors yet</div>
        )}
        {loading && !error && <Loader color="accent" size="l" />}
      </div>

      <ul className={css.contributors__list}>
        {contributors.map((cont) => (
          <li key={cont.id} className={css.contributors__item}>
            <img className={css.contributors__avatar} width="32" height="32" src={cont.avatarUrl} alt="avatar" />
            <Text tag="h4" view="p-16" weight="bold">
              {cont.login}
            </Text>
            <Text tag="h4" view="p-16" color="secondary">
              contributions: {cont.contributions}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Contributors;
