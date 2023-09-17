import { makeObservable, observable, action, runInAction } from 'mobx';
import {
  TOrgReposModel,
  TContributorModel,
  TLanguagesModel,
  TOrgReposApi,
  TContributorApi,
  TReadmeApi,
  TReadmeModel,
  normalizeOrgRepos,
  normalizeContributor,
  normalizeReadme,
} from 'store/models/repo';
import { getData } from 'utils/fetchData';

// import { normalizeOrg, TOrgApi, TOrgModel } from '../models/repos';
import { normalizeOrg, TOrgApi, TOrgModel } from '../models/org';
// import { TContributor, TLanguages, TOrgRepos, TReadme } from '../types/entities/repo';
import { TTypes } from '../types/entities/types';

// FLOW ЗАМЕСТО ASYNC AWAIT

export class GithubStore {
  org: TOrgModel | null = null;
  orgName: string = '';
  orgError: string = '';
  orgLoading: boolean = false;

  orgRepos: TOrgReposModel[] = [];
  errorReposList = '';
  loadingReposList = false;

  contributors: TContributorModel[] = [];
  readme: TReadmeModel | null = null;
  languages: TLanguagesModel | null = null;
  errorsRepo = { contributors: '', readme: '', languages: '' };
  loadersRepo = { contributors: false, readme: false, languages: false };

  orgType: TTypes = 'all';
  orgReposLength: number = 0;
  selectedRepo: TOrgReposModel | null = null;

  constructor() {
    makeObservable(this, {
      // ORG_PAGE
      org: observable,
      orgName: observable,
      orgType: observable,
      orgRepos: observable,
      orgError: observable,
      getOrgData: action,
      getReposData: action,
      // REPO_PAGE
      selectedRepo: observable,
      readme: observable,
      languages: observable,
      contributors: observable,
      errorsRepo: observable,
      loadersRepo: observable,
      getFullRepoData: action,

      orgReposLength: observable,
      errorReposList: observable,
      loadingReposList: observable,
    });
  }

  setOrgType = (type: TTypes) => {
    this.orgType = type;
  };

  setOrgName = (name: string) => {
    this.orgName = name;
  };

  findRepoById = (paramId: string) => {
    // ORGS_REPOS
    if (paramId) {
      this.selectedRepo = (this.orgRepos && this.orgRepos.find((el) => String(el.id) === paramId)) || null;
    }
    return this.selectedRepo;
  };

  // ORG
  getOrgData = () => {
    // ORG_ERROR, ORG_LOADING, ORG, ORG_NAME
    this.orgError = '';
    this.orgLoading = true;

    getData<TOrgApi, TOrgModel>(`orgs/${this.orgName}`, normalizeOrg).then(({ isError, data }) => {
      if (isError) {
        runInAction(() => {
          this.orgLoading = false;
          this.orgError = "Can't find org. Try again!";
        });
      } else {
        runInAction(() => {
          this.org = data;
          this.orgLoading = false;
        });
      }
    });
  };

  // REPOS
  getReposData = (perPage: number, offset: number) => {
    // ERROR_REPOS_LIST, LOADING_REPOS_LIST
    // ORG_NAME, ORG_TYPE, ORGS_REPOS_LENGTH
    this.errorReposList = '';
    this.loadingReposList = true;

    getData<TOrgReposApi[], TOrgReposModel[]>(
      `orgs/${this.orgName}/repos?type=${this.orgType}&per_page=${perPage}&page=${offset}`,
      normalizeOrgRepos,
    ).then(({ isError, data }) => {
      if (isError) {
        runInAction(() => {
          this.loadingReposList = false;
          this.errorReposList = "Can't load org repositories";
        });
      } else {
        runInAction(() => {
          this.orgRepos = data;
          this.loadingReposList = false;
        });
      }
    });
    getData<TOrgReposApi[], TOrgReposModel[]>(
      `orgs/${this.orgName}/repos?type=${this.orgType}`,
      normalizeOrgRepos,
    ).then(({ isError, data }) => {
      if (isError) {
        runInAction(() => {
          this.loadingReposList = false;
          this.errorReposList = "Can't load org repositories";
        });
      } else {
        runInAction(() => {
          this.orgReposLength = data.length;
          this.loadingReposList = false;
        });
      }
    });
  };

  getFullRepoData = (fileName: string) => {
    // ORG, SELECTED_REPO, ORG_NAME
    // ERRORS_REPO LOADERS_REPO, CONTRIUTORS, LANGUAGES, README
    const repoURL = this.selectedRepo && `repos/${this.orgName}/${this.selectedRepo?.name}`;
    this.errorsRepo = { contributors: '', readme: '', languages: '' };
    this.loadersRepo = { contributors: true, readme: true, languages: true };
    getData<TContributorApi[], TContributorModel[]>(`${repoURL}/contributors`, normalizeContributor).then(
      ({ isError, data }) => {
        if (isError) {
          this.errorsRepo = { ...this.errorsRepo, contributors: "Can't load contributors" };
        } else {
          runInAction(() => {
            this.contributors = data;
            this.loadersRepo = { ...this.loadersRepo, contributors: false };
          });
        }
      },
    );
    getData<TLanguagesModel, TLanguagesModel>(`${repoURL}/languages`, (data) => data).then(({ isError, data }) => {
      if (isError) {
        this.errorsRepo = { ...this.errorsRepo, languages: "Can't load languages" };
      } else {
        runInAction(() => {
          this.languages = data;
          this.loadersRepo = { ...this.loadersRepo, languages: false };
        });
      }
    });
    getData<TReadmeApi, TReadmeModel>(`${repoURL}/contents/${fileName}`, normalizeReadme).then(({ isError, data }) => {
      if (isError) {
        this.errorsRepo = { ...this.errorsRepo, readme: `Can't load ${fileName}` };
      } else {
        runInAction(() => {
          this.readme = data;
          this.loadersRepo = { ...this.loadersRepo, readme: false };
        });
      }
    });
  };
}

export const GitHubStore = new GithubStore();
