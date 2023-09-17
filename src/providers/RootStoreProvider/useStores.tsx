import { createContext, useContext } from 'react';
import RootStore from 'store/RootStore';

export const RootStoreContext = createContext<RootStore | null>(null);

const useStores = () => {
  const context = useContext(RootStoreContext);

  if (context === null) {
    throw new Error('Wrap store');
  }

  return context;
};

export default useStores;
