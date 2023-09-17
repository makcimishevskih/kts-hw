import { FC, PropsWithChildren } from 'react';

import { BrowserRouter } from 'react-router-dom';

const RouterProvider: FC<PropsWithChildren> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouterProvider;
