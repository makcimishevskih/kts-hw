import { useRef, useCallback, MutableRefObject } from 'react';

const useFocus = (): { inputRef: MutableRefObject<HTMLInputElement | null>; handleElementFocusOnClick: () => void } => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleElementFocusOnClick = useCallback(() => {
    inputRef?.current?.focus();
  }, [inputRef]);

  return {
    inputRef,
    handleElementFocusOnClick,
  };
};

export default useFocus;
