import { makeObservable, observable, action, runInAction, computed } from 'mobx';
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

export type PrivateFields = '_orgRepos';

export class GithubReposStore {
  private _orgRepos: CollectionModel<number | string, TOrgReposModel> = getInitialCollectionModel();
  private _orgType: TTypes = 'all';
  errorReposList = '';
  loadingReposList = false;
  readme: TReadmeModel | null = null;
  contributors: TContributorModel[] = [];
  languages: TLanguagesModel | null = null;
  errorsRepo = { contributors: '', readme: '', languages: '' };
  loadersRepo = { contributors: false, readme: false, languages: false };
  orgReposLength: number = 0;
  selectedRepo: TOrgReposModel | null = null;

  constructor() {
    makeObservable<GithubReposStore, PrivateFields>(this, {
      _orgRepos: observable,
      errorsRepo: observable,
      loadersRepo: observable,
      errorReposList: observable,
      loadingReposList: observable,
      getReposData: action,
      getFullRepoData: action,
      orgRepos: computed,
      setOrgType: action,
    });
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

  findRepoById = (paramId: string) => {
    if (paramId) {
      this.selectedRepo = this._orgRepos.entities[+paramId];
    }

    return this.selectedRepo;
  };

  getReposData = async (orgName: string, orgType: TTypes, perPage: number, offset: number) => {
    this.errorReposList = '';
    this.loadingReposList = true;

    this._orgRepos = getInitialCollectionModel();

    getData<TOrgReposApi[], TOrgReposModel[]>(
      `orgs/${orgName}/repos?type=${orgType}&per_page=${perPage}&page=${offset}`,
      normalizeOrgRepos,
    ).then(({ isError, data }) => {
      if (isError) {
        runInAction(() => {
          this.errorReposList = "Can't load org repositories";
          this.loadingReposList = false;
        });
      } else {
        try {
          const list = getCollection(data, (item) => item.id);

          runInAction(() => {
            this.loadingReposList = false;
            this._orgRepos = list;
          });
        } catch (err) {
          runInAction(() => {
            this.loadingReposList = false;
            this._orgRepos = getInitialCollectionModel();
            this.errorReposList = "Can't load org repositories";
          });
        }
      }
    });

    getData<TOrgReposApi[], TOrgReposModel[]>(`orgs/${orgName}/repos?type=${orgType}`, normalizeOrgRepos).then(
      ({ isError, data }) => {
        if (isError) {
          runInAction(() => {
            this.errorReposList = "Can't load org repositories";
            this.loadingReposList = false;
          });
        } else {
          runInAction(() => {
            this.orgReposLength = data.length;
            this.loadingReposList = false;
          });
        }
      },
    );
  };

  getFullRepoData = async (orgName: string, fileName: string) => {
    const repoURL = this.selectedRepo && `repos/${orgName}/${this.selectedRepo?.name}`;

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

export default GithubReposStore;
