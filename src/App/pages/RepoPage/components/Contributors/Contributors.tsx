import { FC } from 'react';
import Text from 'components/Text';
import { TContributor } from 'entities/repo';
import css from './Contributors.module.scss';

interface IContributorsProps {
  contributors: TContributor[];
  error: string;
}

const Contributors: FC<IContributorsProps> = ({ contributors, error }) => {
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

      <div className={css.error}>{error}</div>

      {!contributors.length && <div className={css.emptyContributors}>No conributors yet</div>}

      <ul className={css.contributors__list}>
        {contributors.map((cont) => (
          <li key={cont.node_id} className={css.contributors__item}>
            <img className={css.contributors__avatar} width="32" height="32" src={cont.avatar_url} alt="avatar" />
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
  );
};
export default Contributors;
