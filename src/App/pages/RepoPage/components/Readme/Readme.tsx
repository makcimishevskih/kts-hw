import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import Loader from 'components/Loader';
import Text from 'components/Text';

import { TReadmeModel } from 'store/models/repo';
import { decodeFromUint8Array } from 'utils/encode';

import css from './Readme.module.scss';

type TReadmeProps = {
  error: string;
  loading: boolean;
  readme: TReadmeModel | null;
};

const Readme: FC<TReadmeProps> = ({ readme, error, loading }) => {
  const readmeContent = readme && decodeFromUint8Array(readme?.content);

  return (
    <div className={css.readme}>
      <Text tag="h5" view="p-12" weight="bold" mt="16px">
        {readme?.name}
      </Text>

      <div className={css.readme__status}>
        {error && <div className={css.error}>{error}</div>}
        {loading && !error && <Loader color="accent" size="l" />}
      </div>

      <pre className={css.content}>{readmeContent}</pre>
    </div>
  );
};
export default observer(Readme);
