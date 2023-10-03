import classNames from 'classnames';
import { FC } from 'react';
import { IconProps } from '../types';
import css from './ArrowBackIcon.module.scss';

const ArrowBackIcon: FC<IconProps> = ({ width = 32, height = 32, color = 'primary', onClick, className, style }) => {
  const strokeColorClass = {
    primary: css.stroke_primary,
    secondary: css.stroke_secondary,
    accent: css.stroke_accent,
  };

  const cn = classNames(css.arrowWrapper, className);

  return (
    <div className={cn} onClick={onClick} style={{ cursor: 'pointer', ...style }}>
      <svg
        className={css.arrow}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          className={strokeColorClass[color]}
          d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default ArrowBackIcon;
