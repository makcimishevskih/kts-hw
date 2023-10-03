import { makeObservable, observable, action, runInAction } from 'mobx';
import { ILocalStore } from 'hooks/useLocalStore';

import {
  TContributorModel,
  TLanguagesModel,
  TContributorApi,
  TReadmeApi,
  TReadmeModel,
  normalizeContributor,
  normalizeReadme,
  TOrgReposApi,
  TOrgReposModel,
  normalizeOrgRepos,
} from 'store/models/repo';

import { getData } from 'utils/fetchData';
import repoStoreRoutes from './config/routes';

type GitHubRepoStoreConstructor = {
  orgName: string | undefined;
  repoName: string | undefined;
};

export class GitHubRepoStore implements ILocalStore {
  readme: TReadmeModel | null = null;
  contributors: TContributorModel[] = [];
  languages: TLanguagesModel | null = null;
  errorsRepo = { contributors: '', readme: '', languages: '' };
  loadersRepo = { contributors: false, readme: false, languages: false };

  orgName: string | undefined = '';
  repoName: string | undefined = '';

  repo: TOrgReposModel | null = null;
  repoLoading: boolean = false;
  repoError: string = '';

  constructor({ orgName, repoName }: GitHubRepoStoreConstructor) {
    makeObservable<GitHubRepoStore>(this, {
      repo: observable,
      repoError: observable,
      repoLoading: observable,

      errorsRepo: observable,
      loadersRepo: observable,
      getFullRepoData: action,
    });

    this.orgName = orgName;
    this.repoName = repoName;

    if (this.repoName && this.orgName) {
      this.getSelectedRepoData();
      this.getFullRepoData();
    }
  }

  getSelectedRepoData = async () => {
    this.repoLoading = true;
    this.repoError = '';

    const { data, isError } = await getData<TOrgReposApi[], TOrgReposModel[]>(
      repoStoreRoutes.repos.createRoot(this.orgName, this.repoName),
      normalizeOrgRepos,
    );

    runInAction(() => {
      if (isError) {
        this.repo = null;
        this.repoError = "Can't load selected repo";
        this.repoLoading = false;
      } else {
        this.repo = data[0] as TOrgReposModel;
        this.repoLoading = false;
      }
    });
  };

  getFullRepoData = async () => {
    this.errorsRepo = { contributors: '', readme: '', languages: '' };
    this.loadersRepo = { contributors: true, readme: true, languages: true };

    const [contributors, languages, readme] = await Promise.all([
      getData<TContributorApi[], TContributorModel[]>(
        repoStoreRoutes.repos.contributors.createRoot(this.orgName, this.repoName),
        normalizeContributor,
      ),
      getData<TLanguagesModel, TLanguagesModel>(
        repoStoreRoutes.repos.languages.createRoot(this.orgName, this.repoName),
        (data) => data,
      ),
      getData<TReadmeApi, TReadmeModel>(
        repoStoreRoutes.repos.readme.createRoot(this.orgName, this.repoName),
        normalizeReadme,
      ),
    ]);

    runInAction(() => {
      if (contributors.isError) {
        this.errorsRepo = { ...this.errorsRepo, contributors: "Can't load contributors" };
        this.loadersRepo = { ...this.loadersRepo, contributors: false };
      } else {
        this.contributors = contributors.data as TContributorModel[];
        this.loadersRepo = { ...this.loadersRepo, contributors: false };
      }

      if (languages.isError) {
        this.errorsRepo = { ...this.errorsRepo, languages: "Can't load languages" };
        this.loadersRepo = { ...this.loadersRepo, languages: false };
      } else {
        this.languages = languages.data as TLanguagesModel;
        this.loadersRepo = { ...this.loadersRepo, languages: false };
      }

      if (readme.isError) {
        this.errorsRepo = { ...this.errorsRepo, readme: `Can't load README.md` };
        this.loadersRepo = { ...this.loadersRepo, readme: false };
      } else {
        this.readme = readme.data as TReadmeModel;
        this.loadersRepo = { ...this.loadersRepo, readme: false };
      }
    });
  };

  destroy = () => {
    this.repo = null;
    this.readme = null;
    this.contributors = [];
    this.languages = null;
  };
}

export default GitHubRepoStore;
