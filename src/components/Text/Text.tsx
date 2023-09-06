import css from './Text.module.scss';

import * as React from 'react';
import classNames from 'classnames';

export type TextProps = {
  /** Отступы*/
  m?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span' | 'li';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
  stylesProps?: Record<string, string>;
};

const Text: React.FC<TextProps> = ({
  children,
  className,
  view,
  tag = 'p',
  weight,
  color = 'primary',
  maxLines,
  mt,
  mb,
  ml,
  mr,
  m,
  stylesProps,
}) => {
  const viewCls = view && css[view];

  const cxTypo = classNames(className, css.text, css[color], viewCls);

  const styles = {
    color: color,
    fontWeight: weight,
    lineClamp: maxLines,
    WebkitLineClamp: maxLines,
    marginTop: mt,
    marginBottom: mb,
    marginLeft: ml,
    marginRight: mr,
    margin: m,
    ...stylesProps,
  };

  return React.createElement(
    tag,
    {
      style: styles,
      className: cxTypo,
    },
    children,
  );
};

export default Text;
