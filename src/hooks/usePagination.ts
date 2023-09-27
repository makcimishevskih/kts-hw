import { useCallback, useMemo, useState } from 'react';

const usePagination = (itemsCount: number | undefined, itemPerPage: number) => {
  const [offset, setOffset] = useState<number>(1);
  const totalPagesCount = itemsCount ? Math.ceil(itemsCount / itemPerPage) : 0;
  const pageNumbers = useMemo(() => new Array(totalPagesCount).fill(0).map((_, i) => i + 1), [totalPagesCount]);

  const onChange = useCallback((n: number) => {
    setOffset(n);
  }, []);
  const handleOffsetToStart = useCallback(() => {
    setOffset(1);
  }, []);

  const getPagesValues = useCallback((offset: number, pageNumbers: number[]) => {
    const first = pageNumbers[0];
    const last = pageNumbers[pageNumbers.length - 1];

    if (pageNumbers.length <= 5) {
      return pageNumbers;
    }

    if (offset === 1) {
      return [...pageNumbers.slice(0, offset + 2), '...', last];
    } else if (offset === last || offset === last - 1) {
      return [first, '...', ...pageNumbers.slice(offset - 2, last + 1)];
    } else if (offset === 3) {
      return [first, ...pageNumbers.slice(offset - 2, offset + 1), '...', last];
    } else if (offset < 3) {
      return [...pageNumbers.slice(offset - 2, offset + 1), '...', last];
    } else if (offset >= last - 2) {
      return [...pageNumbers.slice(offset - 2, offset + 1), '...', last];
    } else if (offset > 3) {
      return [first, '...', ...pageNumbers.slice(offset - 2, offset + 1), '...', last];
    }
    return pageNumbers;
  }, []);

  const paginationNums = getPagesValues(offset, pageNumbers);

  return {
    offset,
    paginationNums,
    totalPagesCount,
    onChange,
    handleOffsetToStart,
  };
};

export default usePagination;
