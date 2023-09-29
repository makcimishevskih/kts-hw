import { FC, PropsWithChildren } from 'react';

import { HashRouter } from 'react-router-dom';

const RouterProvider: FC<PropsWithChildren> = ({ children }) => {
  return <HashRouter>{children}</HashRouter>;
};

export default RouterProvider;
