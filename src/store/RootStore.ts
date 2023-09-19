import GitHubStore from './GithubStore';
import QueryParamsStore from './QueryParamsStore';

class RootStore {
  github = new GitHubStore();
  query = new QueryParamsStore();
}

export default RootStore;
