import css from './Card.module.scss';
import React from 'react';
import Text from '../Text';
import classNames from 'classnames';
import Button from '../Button';

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
  className = 'test-card',
  ...props
}) => {
  // const cxCard = classNames(css.card, className);
  const cxCard = classNames(css.card, 'test-card');

  return (
    <div onClick={onClick} id="test-card" className={cxCard} {...props}>
      <img
        className={css.card__img}
        src={image}
        alt={typeof title === 'string' ? title : 'product'}
      />

      <div className={css.card__info}>
        <div className={css.card__header}>
          {captionSlot && (
            <Text
              tag="p"
              view="p-14"
              color="secondary"
              className={css.card__caption}
              stylesProps={{ marginBottom: '8px' }}
            >
              {captionSlot}
            </Text>
          )}
          <Text
            tag="h2"
            view="p-20"
            maxLines={2}
            weight="bold"
            color="primary"
            stylesProps={{ marginBottom: '8px' }}
          >
            {title}
          </Text>
          <Text
            stylesProps={{ marginBottom: '20px' }}
            view="p-16"
            maxLines={3}
            tag="p"
            color="secondary"
          >
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
