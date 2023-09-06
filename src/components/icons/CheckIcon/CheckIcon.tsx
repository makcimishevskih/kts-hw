import { FC } from 'react';
import { IconProps } from '../Icon';

const CheckIcon: FC<IconProps> = ({ width = 24, height = 24, color = 'primary', opacity, className }) => {
  const colorStyle = {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    accent: 'var(--text-accent)',
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      opacity={opacity}
      data-testid="icon"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path d="M4 11.6129L9.87755 18L20 7" stroke={colorStyle[color]} strokeWidth="2" />
    </svg>
  );
};
export default CheckIcon;
