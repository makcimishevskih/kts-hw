import classNames from 'classnames';
import * as React from 'react';
import css from './Text.module.scss';

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
  view?: 'title' | 'subtitle' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14' | 'p-12';
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
  m = 0,
  stylesProps,
}) => {
  const viewCls = view && css[view];

  const cxTypo = classNames(className, css.text, css[color], viewCls);

  const styles = {
    color: color,
    fontWeight: weight,
    lineClamp: maxLines,
    WebkitLineClamp: maxLines,
    margin: m,
    marginTop: mt,
    marginLeft: ml,
    marginRight: mr,
    marginBottom: mb,
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
