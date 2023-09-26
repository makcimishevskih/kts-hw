import { FC, ReactNode } from 'react';

import RouterProvider from './RouterProvider';

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return <RouterProvider>{children}</RouterProvider>;
};
export default Providers;
