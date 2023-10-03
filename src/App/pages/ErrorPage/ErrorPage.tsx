import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';

import css from './ErrorPage.module.scss';

const ErrorPage: FC = () => {
  const { t } = useTranslation('errorPage');
  const navigate = useNavigate();

  const goToHome = useCallback(() => {
    navigate('/');
  }, []);

  return (
    <section className={css.error}>
      <div>
        <div className={css.error__text}>{t('error-page')}</div>
        <Button className={css.button} onClick={goToHome}>
          Home
        </Button>
      </div>
    </section>
  );
};
export default ErrorPage;
