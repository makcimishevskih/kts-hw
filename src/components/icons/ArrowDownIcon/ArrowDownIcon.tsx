import classNames from 'classnames';
import { FC } from 'react';
import { IconProps } from '../Icon';
import css from './ArrowDownIcon.module.scss';

const ArrowDownIcon: FC<IconProps> = ({ width = 24, height = 24, color = 'primary', onClick, className, style }) => {
  const fillColorClass = {
    primary: css.fill_primary,
    secondary: css.fill_secondary,
    accent: css.fill_accent,
  };

  const cn = classNames(css.arrow, className);

  return (
    <div className={cn} onClick={onClick} style={{ cursor: 'pointer', ...style }}>
      <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={fillColorClass[color]}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        />
      </svg>
    </div>
  );
};

export default ArrowDownIcon;
