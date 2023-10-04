export const ROUTES = {
  orgs: {
    mask: '/',
    repo: {
      mask: '/repo/:orgName/:repoName',
      createRoute: (orgName: string, repoName: string) => `/repo/${orgName}/${repoName}`,
    },
  },
  error: {
    mask: '/*',
  },
};
