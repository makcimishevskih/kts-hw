import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { ILocalStore } from 'hooks/useLocalStore';
import { normalizeOrgRepos, TOrgReposApi, TOrgReposModel } from 'store/models/repo';
import { TTypes } from 'store/models/types';
import { getData } from 'utils/fetchData';
import { CollectionModel, getCollection, getInitialCollectionModel } from './../shared/collection';
import orgStoreRoutes from './config/routes';

export type IPrivateFields = '_orgName' | '_orgRepos' | '_reposFilterType';

export class GithubOrgStore implements ILocalStore {
  private _orgName: string = window.localStorage.getItem('orgName') || 'ktsstudio';
  private _orgRepos: CollectionModel<number | string, TOrgReposModel> = getInitialCollectionModel();
  private _reposFilterType: TTypes = (window.localStorage.getItem('filterType') || 'all') as TTypes;

  orgLoading: boolean = false;
  orgReposLength: number = 0;
  errorReposList = '';
  loadingReposList = false;

  constructor() {
    makeObservable<GithubOrgStore, IPrivateFields>(this, {
      _orgName: observable,
      _reposFilterType: observable,
      _orgRepos: observable.ref,

      orgLoading: observable,
      errorReposList: observable,
      loadingReposList: observable,

      orgRepos: computed,
      getReposData: action,
      setReposFilterType: action,
    });
  }

  get orgName(): string {
    return this._orgName;
  }

  setOrgName = (name: string) => {
    this.errorReposList = '';
    this._orgName = name;
    this.setLocalStorageOrgName(name);
  };

  get reposFilterType(): TTypes {
    return this._reposFilterType;
  }

  get orgRepos(): TOrgReposModel[] {
    return this._orgRepos.order.map((id) => this._orgRepos.entities[id]);
  }

  private setLocalStorageOrgName = (name: string) => {
    window.localStorage.setItem('orgName', name);
  };
  private setLocalStorageRepoType = (name: string) => {
    window.localStorage.setItem('filterType', name);
  };

  setReposFilterType = (filterType: TTypes) => {
    this._reposFilterType = filterType;
    this.setLocalStorageRepoType(filterType);
  };

  getReposData = async (perPage: number, offset: number) => {
    this._orgRepos = getInitialCollectionModel();
    this.errorReposList = '';
    this.loadingReposList = true;

    const [reposResponse, reposLengthResponse] = await Promise.all([
      getData<TOrgReposApi[], TOrgReposModel[]>(
        orgStoreRoutes.orgs.filter.createRoot(this.orgName, this.reposFilterType, perPage, offset),
        normalizeOrgRepos,
      ),
      getData<TOrgReposApi[], TOrgReposModel[]>(
        orgStoreRoutes.orgs.all.createRoot(this.orgName, this.reposFilterType),
        normalizeOrgRepos,
      ),
    ]);

    if (reposResponse.isError) {
      runInAction(() => {
        this.loadingReposList = false;
        this.orgReposLength = 0;
        this.errorReposList = "Can't load repositories";
      });
    } else {
      try {
        const list = getCollection(reposResponse.data, (item) => item.id);

        runInAction(() => {
          this.loadingReposList = false;
          this._orgRepos = list;
        });
      } catch (err) {
        runInAction(() => {
          this.loadingReposList = false;
          this.orgReposLength = 0;
          this.errorReposList = "Can't load repositories";
          this._orgRepos = getInitialCollectionModel();
        });
      }
    }

    if (reposLengthResponse.isError) {
      runInAction(() => {
        this.loadingReposList = false;
        this.orgReposLength = 0;
        this.errorReposList = "Can't load repositories";
      });
    } else {
      runInAction(() => {
        this.orgReposLength = reposLengthResponse.data.length;
        this.loadingReposList = false;
      });
    }
  };

  destroy = () => {
    this._orgName = window.localStorage.getItem('orgName') || 'ktsstudio';
    this._orgRepos = getInitialCollectionModel();
    this._reposFilterType = (window.localStorage.getItem('filterType') || 'all') as TTypes;
    this.orgLoading = false;
    this.orgReposLength = 0;
    this.errorReposList = '';
    this.loadingReposList = false;
  };
}

export default GithubOrgStore;
