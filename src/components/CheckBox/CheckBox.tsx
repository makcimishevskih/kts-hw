import classNames from 'classnames';
import React from 'react';
import css from './CheckBox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (checked: boolean) => void;
  className?: string;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  id,
  checked = false,
  disabled = false,
  onChange,
  className,
  ...nativeProps
}) => {
  const cxIcon = classNames(css.checkbox, css.checkbox_active, className && css[className], disabled && css.disabled);

  const cxLabel = classNames({ [css.disabled]: disabled }, className);

  return (
    <label className={cxLabel} htmlFor={id}>
      <input
        data-testid="checkbox"
        className={cxIcon}
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={
          !disabled
            ? () => {
                onChange(!checked);
              }
            : undefined
        }
        {...nativeProps}
      />
      {checked && (
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 11.6129L9.87755 18L20 7"
              stroke={!disabled ? 'var(--brand)' : 'black'}
              strokeWidth="2"
              strokeOpacity={!disabled ? undefined : 0.2}
            />
          </svg>
        </span>
      )}
    </label>
  );
};

export default CheckBox;
