import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

import css from './Container.module.scss';

type TContainerProps = PropsWithChildren<{
  className?: string;
}>;

const Container: FC<TContainerProps> = ({ className, children }) => {
  const cnContainer = classNames(css.container, className);
  return <div className={cnContainer}>{children}</div>;
};
export default Container;
