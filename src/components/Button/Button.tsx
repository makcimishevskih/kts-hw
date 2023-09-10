import classNames from 'classnames';

import React from 'react';
import Loader from '../Loader';
import css from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ onClick, loading, children, disabled, className, ...props }) => {
  const cxBtn = classNames(css.myBtn, className, loading && css.loading, disabled && css.disabled);

  return (
    <button className={cxBtn} onClick={!loading ? onClick : undefined} disabled={disabled || loading} {...props}>
      {loading ? (
        <>
          <Loader size="s" color="white" /> {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
