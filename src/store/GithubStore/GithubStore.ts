// Global store unused
import { makeObservable, observable, action, runInAction } from 'mobx';
import { normalizeOrg, TOrgApi, TOrgModel } from 'store/models/org';
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
import { TTypes } from 'store/models/types';

import { getData } from 'utils/fetchData';

import { CollectionModel, getCollection, getInitialCollectionModel } from './../shared/collection';

export type IPrivateFields = '_org' | '_orgRepos' | '_orgType' | '_orgName';

export class GithubStore {
  private _org: TOrgModel | null = null;
  private _orgName: string = '';
  orgError: string = '';
  orgLoading: boolean = false;

  private _orgRepos: CollectionModel<number | string, TOrgReposModel> = getInitialCollectionModel();
  errorReposList = '';
  loadingReposList = false;

  readme: TReadmeModel | null = null;
  contributors: TContributorModel[] = [];
  languages: TLanguagesModel | null = null;
  errorsRepo = { contributors: '', readme: '', languages: '' };
  loadersRepo = { contributors: false, readme: false, languages: false };

  private _orgType: TTypes = 'all';
  orgReposLength: number = 0;
  selectedRepo: TOrgReposModel | null = null;

  constructor() {
    makeObservable<GithubStore, IPrivateFields>(this, {
      // ORG_PAGE
      _org: observable,
      _orgName: observable,
      _orgType: observable,
      _orgRepos: observable,
      orgError: observable,
      setOrgName: action,
      setOrgType: action,
      getOrgData: action,
      getReposData: action,
      // REPO_PAGE
      selectedRepo: observable,
      readme: observable,
      languages: observable,
      errorsRepo: observable,
      loadersRepo: observable,
      contributors: observable,
      orgReposLength: observable,
      errorReposList: observable,
      loadingReposList: observable,
      getFullRepoData: action,
    });
  }

  get org() {
    return this._org;
  }

  get orgRepos(): TOrgReposModel[] {
    return this._orgRepos.order.map((id) => this._orgRepos.entities[id]);
  }

  get orgType() {
    return this._orgType;
  }

  setOrgType = (type: TTypes) => {
    this._orgType = type;
  };

  get orgName() {
    return this._orgName;
  }

  setOrgName = (name: string) => {
    this._orgName = name;
  };

  findRepoById = (paramId: string) => {
    if (paramId) {
      this.selectedRepo = this._orgRepos && this._orgRepos.entities[+paramId];
    }

    return this.selectedRepo;
  };

  // ORG
  getOrgData = () => {
    this.orgError = '';
    this.orgLoading = true;

    getData<TOrgApi, TOrgModel>(`orgs/${this._orgName}`, normalizeOrg).then(({ isError, data }) => {
      if (isError) {
        runInAction(() => {
          this.orgLoading = false;
          this.orgError = "Can't find org. Try again!";
        });
      } else {
        runInAction(() => {
          this._org = data;
          this.orgLoading = false;
        });
      }
    });
  };

  // REPOS
  getReposData = (perPage: number, offset: number) => {
    this.errorReposList = '';
    this.loadingReposList = true;

    this._orgRepos = getInitialCollectionModel();

    getData<TOrgReposApi[], TOrgReposModel[]>(
      `orgs/${this._orgName}/repos?type=${this._orgType}&per_page=${perPage}&page=${offset}`,
      normalizeOrgRepos,
    ).then(({ isError, data }) => {
      if (isError) {
        runInAction(() => {
          this.loadingReposList = false;
          this.errorReposList = "Can't load _org repositories";
        });
      } else {
        runInAction(() => {
          try {
            const list = getCollection(data, (item) => item.id);

            this._orgRepos = list;
            this.loadingReposList = false;
          } catch (err) {
            this._orgRepos = getInitialCollectionModel();
            this.loadingReposList = false;
            this.errorReposList = "Can't load _org repositories";
          }
        });
      }
    });
    getData<TOrgReposApi[], TOrgReposModel[]>(
      `orgs/${this._orgName}/repos?type=${this._orgType}`,
      normalizeOrgRepos,
    ).then(({ isError, data }) => {
      if (isError) {
        runInAction(() => {
          this.loadingReposList = false;
          this.errorReposList = "Can't load _org repositories";
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
    const repoURL = this.selectedRepo && `repos/${this._orgName}/${this.selectedRepo?.name}`;
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

export default GithubStore;