import css from './Pagination.module.scss';

import { FC } from 'react';
import ArrowBackIcon from 'components/icons/ArrowBackIcon';

interface IPaginationProps {
  perPage?: number;
  pagesCount: number;
  currentPage: number;
  reposAmount?: number;
  handlerPrevPage: () => void;
  handlerNextPage: () => void;
  handlerCurrentPage: (n: number) => void;
}

const Pagination: FC<IPaginationProps> = ({
  pagesCount,
  currentPage,
  handlerNextPage,
  handlerPrevPage,
  handlerCurrentPage,
}) => {
  const amountPages = new Array(pagesCount).fill(0).map((_, i) => i + 1);

  function aa(currentPage: number) {
    const l = amountPages[amountPages.length - 1];
    const f = amountPages[0];

    if (amountPages.length <= 5) {
      return amountPages;
    }

    if (currentPage === 1) {
      return [...amountPages.slice(0, currentPage + 2), '...', l];
    } else if (currentPage === l || currentPage === l - 1) {
      return [f, '...', ...amountPages.slice(currentPage - 2, l + 1)];
    } else if (currentPage < 3) {
      return [...amountPages.slice(currentPage - 2, currentPage + 1), '...', l];
    } else if (currentPage === 3) {
      return [f, ...amountPages.slice(currentPage - 2, currentPage + 1), '...', l];
    } else if (currentPage >= l - 2) {
      return [...amountPages.slice(currentPage - 2, currentPage + 1), '...', l];
    } else if (currentPage > 3) {
      return [f, '...', ...amountPages.slice(currentPage - 2, currentPage + 1), '...', l];
    }
    return amountPages;
  }

  const pages = aa(currentPage);

  return (
    <div className={css.pagination}>
      <ArrowBackIcon
        style={{ opacity: currentPage === 1 ? 0.2 : 1 }}
        width="36"
        height="36"
        onClick={handlerPrevPage}
        color="accent"
      />

      <ul className={css.pagination__list}>
        {pages.map((el, i) => (
          <div
            onClick={typeof el === 'number' ? () => handlerCurrentPage(el) : undefined}
            className={`${css.pagination__item} ${currentPage === el ? css.activePage : ''}`}
            style={currentPage === el ? {} : { padding: '10px' }}
            key={i}
          >
            {el}
          </div>
        ))}
      </ul>

      <ArrowBackIcon
        width="36"
        height="36"
        style={{ transform: 'rotate(180deg)', opacity: currentPage === amountPages[amountPages.length - 1] ? 0.2 : 1 }}
        onClick={handlerNextPage}
        color="accent"
      />

      {/* <button className={css.pagination__right} onClick={handlerNextPage}>
        NEXT
      </button> */}
    </div>
  );
};
export default Pagination;
