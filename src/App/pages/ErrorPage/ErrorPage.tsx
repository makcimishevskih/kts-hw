import { FC } from 'react';
import css from './ErrorPage.module.scss';

interface IErrorPageProps {}

const ErrorPage: FC<IErrorPageProps> = () => {
  return <div className={css.error}>ErrorPage</div>;
};
export default ErrorPage;
