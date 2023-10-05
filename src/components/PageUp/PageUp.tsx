import classNames from 'classnames';
import { FC } from 'react';

import ArrowDownIcon from 'components/icons/ArrowDownIcon';

import scrollTo from 'utils/scrollTo';

import css from './PageUp.module.scss';

type IPageUpProps = {
  isScrollVisible: boolean;
  size: number;
};

const PageUp: FC<IPageUpProps> = ({ isScrollVisible, size }) => {
  const cnPageUp = classNames(css.pageUp, isScrollVisible ? css.fadeIn : css.fadeOut);

  return (
    <div className={cnPageUp} onClick={() => scrollTo(0)}>
      <ArrowDownIcon width={size} height={size} color="primary" />
    </div>
  );
};
export default PageUp;
