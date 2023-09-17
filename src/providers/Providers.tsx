import { FC, PropsWithChildren } from 'react';

import RootStoreProvider from './RootStoreProvider';
import RouterProvider from './RouterProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <RouterProvider>
      <RootStoreProvider>{children}</RootStoreProvider>
    </RouterProvider>
  );
};
export default Providers;
