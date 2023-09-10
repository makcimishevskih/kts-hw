import { FC } from 'react';
import { IconProps } from '../Icon';

const ArrowDownIcon: FC<IconProps> = ({ width = 24, height = 24, color = 'primary', handler, className, style }) => {
  const colorStyle = {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    accent: 'var(--text-accent)',
  };

  return (
    <div onClick={handler} style={{ cursor: 'pointer', ...style }}>
      <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
          fill={colorStyle[color]}
        />
      </svg>
    </div>
  );
};

export default ArrowDownIcon;
