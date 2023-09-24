/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import ArrowBackIcon from 'components/icons/ArrowBackIcon';

import css from './Pagination.module.scss';

type TPaginationProps = {
  offset: number;
  isLastPage: boolean;
  isFirstPage: boolean;
  totalPagesCount: number;
  paginationNums: (string | number)[];
  onChange: (pageNumb: number) => void;
};

const Pagination: FC<TPaginationProps> = ({
  offset,
  isLastPage,
  isFirstPage,
  paginationNums,
  totalPagesCount,
  onChange,
}) => {
  const handleOffset = (n: number) => {
    onChange(n);
  };
  const handlePrevPage = () => {
    if (offset !== 1) {
      onChange(offset - 1);
    }
  };
  const handleNextPage = () => {
    if (offset !== totalPagesCount) {
      onChange(offset + 1);
    }
  };

  return (
    <div className={css.pagination}>
      <ArrowBackIcon
        className={classNames(isFirstPage && css.arrow_transparent)}
        width="36"
        height="36"
        onClick={handlePrevPage}
        color="accent"
      />

      <ul className={css.pagination__list}>
        {paginationNums.map((pageNum, i) => (
          <li
            key={i}
            onClick={typeof pageNum === 'number' ? () => handleOffset(pageNum) : undefined}
            className={classNames(css.pagination__item, offset === pageNum && css.pagination__item_current)}
          >
            {pageNum}
          </li>
        ))}
      </ul>

      <ArrowBackIcon
        width="36"
        height="36"
        className={classNames(classNames(css.arrow__back, isLastPage && css.arrow_transparent))}
        onClick={handleNextPage}
        color="accent"
      />
    </div>
  );
};
export default observer(Pagination);
