import { FC, PropsWithChildren } from 'react';

import Loader from 'components/Loader';
import Text from 'components/Text';

import ArrowBackIcon from 'components/icons/ArrowBackIcon';
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
  return (
    <div className={css.status}>
      {!errorMessage && isLoading && <Loader color="accent" size="xl" />}
      {errorMessage && !isLoading && (
        <div className={css.status_error}>
          {isBackButton && <ArrowBackIcon width="45" height="45" onClick={goTo} color="accent" />}
          Error:{errorMessage}
        </div>
      )}
      {!errorMessage && !isLoading && isEmpty && (
        <div className={css.status_empty}>
          {isBackButton && <ArrowBackIcon width="45" height="45" onClick={goTo} color="accent" />}
          <Text view="p-20" tag="p">
            {children}
          </Text>
        </div>
      )}
    </div>
  );
};
export default Status;
