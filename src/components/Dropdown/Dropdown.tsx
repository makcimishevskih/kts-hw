import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import css from './Dropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type DropdownProps = {
  className?: string;
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
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
  const cx = classNames(css.wrapperDropDown, className);

  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useRef<HTMLInputElement>(null);

  const handleText = (v: string) => {
    if (options.filter(({ value }) => value.toLowerCase().startsWith(inputText.toLowerCase())).length !== 0) {
      setIsOpen(true);
    }
    setInputText(v);
  };

  const filteredOptions = options.filter(({ value }) => value.toLowerCase().startsWith(inputText.toLowerCase()));

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

  const localOnChange = (el: Option) => {
    if (type === 'multi') {
      onChange(!value.includes(el) ? [...value, el] : value.filter((filterEl) => filterEl.key !== el.key));
    } else {
      onChange(!value.includes(el) ? [el] : []);
      setIsOpen(false);
    }
  };

  return (
    <div className={cx} ref={ref} onClick={onClick}>
      <Input
        width="m"
        value={!isOpen && value.length !== 0 ? getTitle(value) : inputText}
        disabled={disabled}
        onChange={handleText}
        afterSlot={<ArrowDownIcon />}
        placeholder={getTitle(value)}
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && !disabled ? (
        <ul className={css.list}>
          {filteredOptions.map((option) => (
            <li
              onClick={() => localOnChange(option)}
              key={option.key}
              className={`${css.item} ${value.includes(option) ? css.item_checked : ''}`}
            >
              {option.value}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Dropdown;