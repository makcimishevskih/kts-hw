import classNames from 'classnames';
import { FC } from 'react';

import Text from 'components/Text';

import css from './Subs.module.scss';

interface ISubsProps {
  forksCount: number;
  watchersCount: number;
  stargazersCount: number;
}

const Subs: FC<ISubsProps> = ({ forksCount, watchersCount, stargazersCount }) => {
  const renderSubs = [
    { count: stargazersCount || 0, text: 'stars', className: css.stars },
    { count: watchersCount || 0, text: 'watchers', className: css.watchers },
    { count: forksCount || 0, text: 'forks', className: css.forks },
  ].map(({ count, text, className }) => (
    <Text className={classNames(css.subs__tag, className)} key={text} tag="li" view="p-14" color="secondary">
      <span className={css.subs__count}>{count}</span>
      <span className={css.subs__text}>{text}</span>
    </Text>
  ));

  return <ul className={css.subs}>{renderSubs}</ul>;
};

export default Subs;
