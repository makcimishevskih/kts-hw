import { useCallback, useRef } from 'react';

const useScrollIntoView = <T extends HTMLElement>(block: ScrollLogicalPosition) => {
  const myRef = useRef<T | null>(null);

  const scrollIntoView = useCallback(() => {
    setTimeout(() => {
      myRef.current &&
        myRef.current.scrollIntoView({
          block,
        });
    }, 50);
  }, [myRef]);

  return { myRef, scrollIntoView };
};

export default useScrollIntoView;
