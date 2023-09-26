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
} from 'store/models/repo';
import { TTypes } from 'store/models/types';
import { getData } from 'utils/fetchData';

type GitHubRepoStoreConstructor = {
  name: string;
  reposFilterType: TTypes;
  repoName: string | undefined;
};

export class GitHubRepoStore implements ILocalStore {
  readme: TReadmeModel | null = null;
  contributors: TContributorModel[] = [];
  languages: TLanguagesModel | null = null;
  errorsRepo = { contributors: '', readme: '', languages: '' };
  loadersRepo = { contributors: false, readme: false, languages: false };

  orgName: string;
  reposFilterType: TTypes;
  repoName: string | undefined;

  constructor({ name, reposFilterType, repoName }: GitHubRepoStoreConstructor) {
    makeObservable<GitHubRepoStore>(this, {
      errorsRepo: observable,
      loadersRepo: observable,
      getFullRepoData: action,
    });

    this.orgName = name;
    this.repoName = repoName;
    this.reposFilterType = reposFilterType;

    if (this.repoName && this.orgName) {
      this.getFullRepoData();
    }
  }

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
    this.readme = null;
    this.contributors = [];
    this.languages = null;
    this.errorsRepo = { contributors: '', readme: '', languages: '' };
    this.loadersRepo = { contributors: false, readme: false, languages: false };
  };
}

export default GitHubRepoStore;
