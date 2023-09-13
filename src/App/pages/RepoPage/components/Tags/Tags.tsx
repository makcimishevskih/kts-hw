import { FC } from 'react';
import css from './Tags.module.scss';

interface ITagsProps {
  tags: string[] | undefined;
}

const Tags: FC<ITagsProps> = ({ tags }) => {
  return (
    <ul className={css.tags}>
      {tags &&
        tags.map((el) => (
          <li key={el} className={css.tag}>
            {el}
          </li>
        ))}
    </ul>
  );
};

export default Tags;
