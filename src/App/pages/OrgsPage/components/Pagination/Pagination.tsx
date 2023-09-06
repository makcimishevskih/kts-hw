import css from './Pagination.module.scss';

import { FC } from 'react';

interface IPaginationProps {}

const Pagination: FC<IPaginationProps> = () => {
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 114, 15];
  return (
    <div className={css.pagination}>
      <ul className={css.pages}>
        {num.map((el) => (
          <li key={el} className={css.page}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Pagination;
