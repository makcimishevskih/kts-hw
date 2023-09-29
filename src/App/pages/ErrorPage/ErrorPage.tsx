import { FC } from 'react';
import css from './ErrorPage.module.scss';

interface IErrorPageProps {}

const ErrorPage: FC<IErrorPageProps> = () => {
  return <div className={css.errorPage}>Page not found</div>;
};
export default ErrorPage;
