import classNames from 'classnames';
import React from 'react';
import Text from '../Text';
import css from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  image,
  onClick,
  actionSlot,
  captionSlot,
  contentSlot,
  className,
  ...props
}) => {
  const cxCard = classNames(css.card, className);

  return (
    <div onClick={onClick} id="test-card" className={cxCard} {...props}>
      <img className={css.card__img} src={image} alt={typeof title === 'string' ? title : 'product'} />

      <div className={css.card__info}>
        <div className={css.card__header}>
          {captionSlot && (
            <Text
              mt="8px"
              tag="p"
              view="p-14"
              color="secondary"
              className={css.card__caption}
              mb="8px"
              stylesProps={{ display: 'flex', alignItems: 'center', gap: '20px' }}
            >
              {captionSlot}
            </Text>
          )}
          <Text mt="8px" tag="h2" view="p-20" maxLines={2} weight="bold" color="primary">
            {title}
          </Text>
          <Text mt="8px" view="p-16" maxLines={3} tag="p" color="secondary">
            {subtitle}
          </Text>
        </div>
        <div className={css.card__footer}>
          {contentSlot && (
            <Text view="p-18" tag="span" color="primary" weight="bold">
              {contentSlot}
            </Text>
          )}
          {actionSlot && actionSlot}
        </div>
      </div>
    </div>
  );
};

export default Card;
