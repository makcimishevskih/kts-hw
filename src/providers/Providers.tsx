import { FC, PropsWithChildren } from 'react';

import RouterProvider from './RouterProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <RouterProvider>{children}</RouterProvider>;
};
export default Providers;
