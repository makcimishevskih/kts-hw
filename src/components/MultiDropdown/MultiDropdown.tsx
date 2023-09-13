import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import css from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
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
};
const MultiDropdown: FC<MultiDropdownProps> = ({ options, value, disabled, getTitle, onChange, className }) => {
  const cx = classNames(css.wrapperMultiDropDown, className);

  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useRef<HTMLInputElement>(null);

  const handleText = (v: string) => {
    if (options.filter(({ value }) => value.toLowerCase().startsWith(inputText.toLowerCase())).length !== 0) {
      setIsOpen(true);
    }
    setInputText(v);
  };

  const filtered = options.filter(({ value }) => value.toLowerCase().startsWith(inputText.toLowerCase()));

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

  return (
    <div className={cx} ref={ref}>
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
          {filtered.map((el) => (
            <li
              onClick={() => {
                onChange(!value.includes(el) ? [...value, el] : options.filter((filterEl) => filterEl.key !== el.key));
              }}
              key={el.key}
              className={`${css.item} ${value.includes(el) ? css.itemChecked : ''}`}
            >
              {el.value}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default MultiDropdown;
