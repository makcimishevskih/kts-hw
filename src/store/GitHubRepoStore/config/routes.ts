const repoStoreRoutes = {
  repos: {
    createRoot: (orgName: string | undefined, repoName: string | undefined) => `repos/${orgName}/${repoName}`,
    contributors: {
      createRoot: (orgName: string | undefined, repoName: string | undefined) =>
        `repos/${orgName}/${repoName}/contributors`,
    },
    languages: {
      createRoot: (orgName: string | undefined, repoName: string | undefined) =>
        `repos/${orgName}/${repoName}/languages`,
    },
    readme: {
      createRoot: (orgName: string | undefined, repoName: string | undefined) =>
        `repos/${orgName}/${repoName}/contents/README.md`,
    },
  },
};

export default repoStoreRoutes;
