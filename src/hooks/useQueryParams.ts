import { useLocation } from 'react-router-dom';

import useStores from 'hooks/useStores';

export const useQueryParamsStoreInit = (): void => {
  const RootStore = useStores();
  const { search } = useLocation();

  RootStore.query.setSearch(search);
};
