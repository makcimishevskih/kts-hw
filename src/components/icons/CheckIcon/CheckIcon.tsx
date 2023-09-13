import classNames from 'classnames';
import { FC } from 'react';
import { IconProps } from '../Icon';

import css from './Checkbox.module.scss';

const CheckIcon: FC<IconProps> = ({ width = 24, height = 24, color = 'primary', opacity, className }) => {
  const strokeColorClass = {
    primary: css.stroke_primary,
    secondary: css.stroke_secondary,
    accent: css.stroke_accent,
  };

  const cn = classNames(css.checkbox, className);

  return (
    <svg
      className={cn}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      opacity={opacity}
      data-testid="icon"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path className={strokeColorClass[color]} d="M4 11.6129L9.87755 18L20 7" strokeWidth="2" />
    </svg>
  );
};
export default CheckIcon;
