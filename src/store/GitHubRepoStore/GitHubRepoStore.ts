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
      getSelectedRepoData: action,
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
    const repoURL = `repos/${this.orgName}/${this.repoName}`;

    const { data, isError } = await getData<TOrgReposApi[], TOrgReposModel[]>(repoURL, normalizeOrgRepos);

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
    const repoURL = `repos/${this.orgName}/${this.repoName}`;

    this.errorsRepo = { contributors: '', readme: '', languages: '' };
    this.loadersRepo = { contributors: true, readme: true, languages: true };

    const [contributors, languages, readme] = await Promise.all([
      getData<TContributorApi[], TContributorModel[]>(`${repoURL}/contributors`, normalizeContributor),
      getData<TLanguagesModel, TLanguagesModel>(`${repoURL}/languages`, (data) => data),
      getData<TReadmeApi, TReadmeModel>(`${repoURL}/contents/README.md`, normalizeReadme),
    ]);

    runInAction(() => {
      if (contributors.isError) {
        this.errorsRepo = { ...this.errorsRepo, contributors: "Can't load contributors" };
      } else {
        this.contributors = contributors.data as TContributorModel[];
        this.loadersRepo = { ...this.loadersRepo, contributors: false };
      }

      if (languages.isError) {
        this.errorsRepo = { ...this.errorsRepo, languages: "Can't load languages" };
      } else {
        this.languages = languages.data as TLanguagesModel;
        this.loadersRepo = { ...this.loadersRepo, languages: false };
      }

      if (readme.isError) {
        this.errorsRepo = { ...this.errorsRepo, readme: `Can't load README.md` };
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
