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
  const cxLabel = classNames(css.checkbox__label, disabled && css.disabled, className);
  const cxIcon = classNames(
    css.checkbox__input,
    css.checkbox_checked,
    className && css[className],
    disabled && css.disabled,
  );

  const pathCn = disabled ? css.path : css.path_checked;

  return (
    <label className={cxLabel} htmlFor={id}>
      <input
        className={cxIcon}
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={() => {
          onChange(!checked);
        }}
        {...nativeProps}
      />
      {checked && (
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path className={pathCn} d="M4 11.6129L9.87755 18L20 7" strokeWidth="2" />
          </svg>
        </span>
      )}
    </label>
  );
};

export default CheckBox;
