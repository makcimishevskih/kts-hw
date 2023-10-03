import { FC } from 'react';

import Status from 'components/Status';
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
      <Text className={css.readme__title} tag="h5" view="p-12" weight="bold">
        {readme?.name}
      </Text>

      <Status isLoading={loading} errorMessage={error} isEmpty={false} />

      <pre className={css.content}>{readmeContent}</pre>
    </div>
  );
};
export default Readme;
