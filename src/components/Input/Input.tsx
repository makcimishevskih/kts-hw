import css from './Input.module.scss';

import classNames from 'classnames';
import { forwardRef, InputHTMLAttributes, useEffect, useRef } from 'react';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
  className?: string;
  styles?: object;
  borderRadius?: string;
  width: 's' | 'm' | 'l';
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { styles, onChange, value = '', afterSlot, className, type = 'text', borderRadius, width = 's', onClick, ...props },
    ref,
  ) => {
    const cxInputWrapper = classNames(css.inputWrapper, className);

    const widthStyle: any = {
      s: '300px',
      m: '600px',
      l: '100%',
    };

    return (
      <div onClick={onClick} className={cxInputWrapper} style={{ borderRadius, maxWidth: widthStyle[width] }}>
        <input
          className={css.nativeInput}
          ref={ref}
          type={type}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          {...props}
        />
        {afterSlot ? <>{afterSlot}</> : null}
      </div>
    );
  },
);

export default Input;
