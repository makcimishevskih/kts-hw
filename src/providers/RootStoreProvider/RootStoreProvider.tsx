import { FC, PropsWithChildren } from 'react';
import { RootStoreContext } from 'providers/RootStoreProvider';
import RootStore from 'store/RootStore';

const RootStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  return <RootStoreContext.Provider value={new RootStore()}>{children}</RootStoreContext.Provider>;
};

export default RootStoreProvider;
