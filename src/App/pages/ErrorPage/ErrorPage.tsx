import css from './ErrorPage.module.scss';

import { FC } from 'react';

interface IErrorPageProps {}

const ErrorPage: FC<IErrorPageProps> = () => {
  return <div className={css.error}>ErrorPage</div>;
};
export default ErrorPage;
