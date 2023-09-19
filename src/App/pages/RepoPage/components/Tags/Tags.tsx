import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { TOrgReposModel } from 'store/models/repo';
import css from './Tags.module.scss';

interface ITagsProps {
  repo: TOrgReposModel | null;
}

const Tags: FC<ITagsProps> = ({ repo }) => {
  return (
    <ul className={css.tags}>
      {repo &&
        repo.topics.map((el) => (
          <li key={el} className={css.tag}>
            {el}
          </li>
        ))}
    </ul>
  );
};

export default observer(Tags);
