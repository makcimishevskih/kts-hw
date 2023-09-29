import classNames from 'classnames';
import { FC } from 'react';

import ArrowDownIcon from 'components/icons/ArrowDownIcon';

import scrollToTop from 'utils/scrollToTop';

import css from './PageUp.module.scss';

interface IPageUpProps {
  isScrollVisible: boolean;
  size: number;
}

const PageUp: FC<IPageUpProps> = ({ isScrollVisible, size }) => {
  const cnPageUp = classNames(css.pageUp, isScrollVisible ? css.fadeIn : css.fadeOut);

  return (
    <div className={cnPageUp} onClick={scrollToTop}>
      <ArrowDownIcon width={size} height={size} color="primary" />
    </div>
  );
};
export default PageUp;
