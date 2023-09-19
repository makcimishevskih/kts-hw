import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import Text from 'components/Text';

import { TOrgReposModel } from 'store/models/repo';

import css from './Subs.module.scss';

interface ISubsProps {
  repo: TOrgReposModel | null;
}

const Subs: FC<ISubsProps> = ({ repo }) => {
  const renderSubs =
    repo &&
    [
      { count: repo.stargazersCount || 0, text: 'stars', className: css.stars },
      { count: repo.watchersCount || 0, text: 'watchers', className: css.watchers },
      { count: repo.forksCount || 0, text: 'forks', className: css.forks },
    ].map(({ count, text, className }) => (
      <Text className={classNames(css.subs__tag, className)} key={text} tag="li" view="p-14" color="secondary">
        <span className={css.subs__count}>{count}</span>
        <span className={css.subs__text}>{text}</span>
      </Text>
    ));

  return <ul className={css.subs}>{renderSubs}</ul>;
};
export default observer(Subs);
