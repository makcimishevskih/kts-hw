import classNames from 'classnames';

import css from './Button.module.scss';
import React from 'react';
import Loader from '../Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
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
