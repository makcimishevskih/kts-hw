import { FC, PropsWithChildren } from 'react';

import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Text from 'components/Text';

import css from './Status.module.scss';

type IStatusProps = {
  isLoading: boolean;
  errorMessage: string;
  isEmpty: boolean;
  className?: string;
  isBackButton?: boolean;
  goTo?: () => void;
} & PropsWithChildren;

const Status: FC<IStatusProps> = ({
  children,
  isLoading,
  errorMessage,
  isEmpty = true,
  isBackButton = false,
  goTo = () => {},
}) => {
  const { t } = useTranslation();
  return (
    <div className={css.status}>
      {!errorMessage && isLoading && <Loader color="accent" size="xl" />}
      {errorMessage && !isLoading && (
        <div className={css.status_error}>
          {isBackButton && (
            <div>
              <Button className={css.button} onClick={goTo}>
                {t('go-back')}
              </Button>
            </div>
          )}
          {errorMessage}
        </div>
      )}
      {!errorMessage && !isLoading && isEmpty && (
        <div className={css.status_empty}>
          {isBackButton && (
            <div>
              <Button onClick={goTo}> {t('go-back')}</Button>
            </div>
          )}

          <Text view="p-20" tag="p">
            {children}
          </Text>
        </div>
      )}
    </div>
  );
};
export default Status;
