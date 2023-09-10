import classNames from 'classnames';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import css from './Input.module.scss';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  className?: string;
  afterSlot?: ReactNode;
  onChange: (value: string) => void;
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

    const widthStyle: Record<typeof width, string> = {
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
          style={styles && { ...styles }}
          {...props}
        />
        {afterSlot ? <>{afterSlot}</> : null}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
