import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import css from './Tags.module.scss';

interface ITagsProps {
  tags: string[];
}

const Tags: FC<ITagsProps> = ({ tags }) => {
  return (
    <ul className={css.tags}>
      {tags.map((el) => (
        <li key={el} className={css.tag}>
          {el}
        </li>
      ))}
    </ul>
  );
};

export default observer(Tags);
