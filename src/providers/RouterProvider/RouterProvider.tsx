import { FC, PropsWithChildren } from 'react';

// import { HashRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

const RouterProvider: FC<PropsWithChildren> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
  // return <HashRouter>{children}</HashRouter>;
};

export default RouterProvider;
