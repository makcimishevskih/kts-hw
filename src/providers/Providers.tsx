import { FC, ReactNode } from 'react';

import { BrowserRouter } from 'react-router-dom';

interface IProvidersProps {
  children: ReactNode;
}

const Providers: FC<IProvidersProps> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default Providers;
