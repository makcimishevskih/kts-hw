export const getPagesValues = (pageNumbers: number[], offset: number) => {
  const SEPARATOR = '...';
  const first = pageNumbers[0];
  const last = pageNumbers[pageNumbers.length - 1];

  if (pageNumbers.length <= 5) {
    return pageNumbers;
  }

  if (offset === 1) {
    return [...pageNumbers.slice(0, offset + 2), SEPARATOR, last];
  } else if (offset === last || offset === last - 1) {
    return [first, SEPARATOR, ...pageNumbers.slice(offset - 2, last + 1)];
  } else if (offset === 3) {
    return [first, ...pageNumbers.slice(offset - 2, offset + 1), SEPARATOR, last];
  } else if (offset < 3) {
    return [...pageNumbers.slice(offset - 2, offset + 1), SEPARATOR, last];
  } else if (offset >= last - 2) {
    return [...pageNumbers.slice(offset - 2, offset + 1), SEPARATOR, last];
  } else if (offset > 3) {
    return [first, SEPARATOR, ...pageNumbers.slice(offset - 2, offset + 1), SEPARATOR, last];
  }
  return pageNumbers;
};
