import { TTypes } from 'store/models/types';

const orgStoreRoutes = {
  orgs: {
    all: {
      createRoot: (orgName: string, filterType: TTypes) => `orgs/${orgName}/repos?type=${filterType}`,
    },
    filter: {
      createRoot: (orgName: string, filterType: TTypes, perPage: number, offset: number) =>
        `orgs/${orgName}/repos?type=${filterType}&per_page=${perPage}&page=${offset}`,
    },
  },
};

export default orgStoreRoutes;
