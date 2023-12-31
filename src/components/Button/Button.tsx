import classNames from 'classnames';

import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import Loader from '../Loader';
import css from './Button.module.scss';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    loading?: boolean;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    isRound?: boolean;
    isRect?: boolean;
  }>;

const Button: React.FC<ButtonProps> = ({
  onClick,
  loading,
  children,
  disabled,
  className,
  isRound,
  isRect,
  ...props
}) => {
  const cn = classNames(
    css.myBtn,
    className,
    loading && css.loading,
    disabled && css.disabled,
    isRect && css.rected,
    isRound && css.rounded,
  );

  return (
    <button className={cn} onClick={!loading ? onClick : undefined} disabled={disabled || loading} {...props}>
      {loading && <Loader size="s" />}
      {children}
    </button>
  );
};

export default Button;
