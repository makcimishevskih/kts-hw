import classNames from 'classnames';
import { FC } from 'react';

import { useTranslation } from 'react-i18next';
import Text from 'components/Text';

import css from './Subs.module.scss';

interface ISubsProps {
  forksCount: number;
  watchersCount: number;
  stargazersCount: number;
}

const Subs: FC<ISubsProps> = ({ forksCount, watchersCount, stargazersCount }) => {
  const { t } = useTranslation('repoPage');

  const renderSubs = [
    { count: stargazersCount || 0, name: 'stars', className: css.stars },
    { count: watchersCount || 0, name: 'watchers', className: css.watchers },
    { count: forksCount || 0, name: 'forks', className: css.forks },
  ].map(({ count, name, className }) => (
    <Text className={classNames(css.subs__tag, className)} key={name} tag="li" view="p-14" color="secondary">
      <span className={css.subs__count}>{count}</span>
      <span className={css.subs__text}>{t(`subs.${name}_interval`, { postProcess: 'interval', count })}</span>
    </Text>
  ));

  return <ul className={css.subs}>{renderSubs}</ul>;
};

export default Subs;
