export const ROUTES = {
  orgs: {
    mask: '/',
    createRoute: (orgName: string, repoName: string) => `/repo/${orgName}/${repoName}`,
    repo: {
      mask: '/repo/:orgName/:repoName',
      createRoute: (orgName: string, repoName: string) => `/repo/${orgName}/${repoName}`,
    },
  },
  error: {
    mask: '*',
  },
};
