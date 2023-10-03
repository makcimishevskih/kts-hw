import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TTypes } from 'store/models/types';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';

import css from './Dropdown.module.scss';

export type Option = {
  key: TTypes;
  value: TTypes;
};

export type DropdownProps = {
  className?: string;
  value: Option[];
  options: Option[];
  disabled?: boolean;
  onChange: (value: Option[], filterype: TTypes) => void;
  getTitle: (value: Option[]) => string;
  onClick?: () => void;
  type?: 'multi' | 'single';
};

const Dropdown: FC<DropdownProps> = ({
  type = 'multi',
  value,
  options,
  disabled,
  className,
  getTitle,
  onChange,
  onClick,
}) => {
  const { t } = useTranslation('orgPage');
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useRef<HTMLInputElement>(null);

  const handleText = (v: string) => {
    if (options.filter(({ value }) => value.toLowerCase().startsWith(inputValue.toLowerCase())).length !== 0) {
      setIsOpen(true);
    }
    setInputValue(v);
  };

  const filteredOptions = options.filter(({ value }) => value.toLowerCase().startsWith(inputValue.toLowerCase()));

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      if (!disabled && ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [disabled]);

  const localOnChange = (el: Option, filterType: TTypes) => {
    if (type === 'multi') {
      onChange(!value.includes(el) ? [...value, el] : value.filter((filterEl) => filterEl.key !== el.key), filterType);
    } else {
      onChange(!value.includes(el) ? [el] : [], filterType);
      setIsOpen(false);
    }
  };

  const cnWrapper = classNames(css.wrapperDropDown, className);

  const translatedValue = t(getTitle(value));

  return (
    <div className={cnWrapper} ref={ref} onClick={() => onClick}>
      <Input
        width="m"
        value={!isOpen && value.length !== 0 ? translatedValue : inputValue}
        disabled={disabled}
        onChange={handleText}
        afterSlot={<ArrowDownIcon color="accent" />}
        placeholder={translatedValue}
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && !disabled ? (
        <ul className={css.list}>
          {filteredOptions.map((option) => (
            <li
              onClick={() => localOnChange(option, option.value)}
              key={option.key}
              className={`${css.item} ${value.includes(option) ? css.item_checked : ''}`}
            >
              {t(option.value)}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

Dropdown.displayName = 'DropDown';

export default Dropdown;
