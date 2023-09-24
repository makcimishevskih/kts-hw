import { makeObservable, observable, action, runInAction, autorun } from 'mobx';
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

export class GithubReposStore {
  readme: TReadmeModel | null = null;
  contributors: TContributorModel[] = [];
  languages: TLanguagesModel | null = null;
  errorsRepo = { contributors: '', readme: '', languages: '' };
  loadersRepo = { contributors: false, readme: false, languages: false };

  orgName: string;
  reposFilterType: TTypes;
  repoName: string | undefined;

  constructor(name: string, reposFilterType: TTypes, repoName: string | undefined) {
    this.orgName = name;
    this.reposFilterType = reposFilterType;
    this.repoName = repoName;

    autorun(() => {
      if (this.repoName && this.orgName) {
        this.getFullRepoData(this.orgName, this.repoName);
      }
    });

    makeObservable<GithubReposStore>(this, {
      getFullRepoData: action,
      errorsRepo: observable,
      loadersRepo: observable,
    });
  }

  getFullRepoData = async (orgName: string, repoName: string) => {
    const repoURL = `repos/${orgName}/${repoName}`;

    this.errorsRepo = { contributors: '', readme: '', languages: '' };
    this.loadersRepo = { contributors: true, readme: true, languages: true };

    const requestList = [
      getData<TContributorApi[], TContributorModel[]>(`${repoURL}/contributors`, normalizeContributor),
      getData<TLanguagesModel, TLanguagesModel>(`${repoURL}/languages`, (data) => data),
      getData<TReadmeApi, TReadmeModel>(`${repoURL}/contents/README.md`, normalizeReadme),
    ];

    const [contributors, languages, readme] = await Promise.all(requestList);

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
}

export default GithubReposStore;
