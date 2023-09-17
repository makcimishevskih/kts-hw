import { useRef } from 'react';

const useLocalStore = <T>(creator: () => T): T => {
  const container = useRef<T | null>(null);
  if (container.current === null) {
    container.current = creator();
  }
  return container.current;
};
export default useLocalStore;
