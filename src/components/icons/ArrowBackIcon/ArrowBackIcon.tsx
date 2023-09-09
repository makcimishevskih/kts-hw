import css from './ArrowBackIcon.module.scss';
import { FC } from 'react';
import { IconProps } from '../Icon';

const ArrowBackIcon: FC<IconProps> = ({ width = 32, height = 32, color = 'primary', handler, className, style }) => {
  const colorStyle = {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    accent: 'var(--text-accent)',
  };

  return (
    <div className={css.arrow} onClick={handler} style={{ cursor: 'pointer', ...style }}>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 32 32" fill="none">
        <path
          d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
          stroke={colorStyle[color]}
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
