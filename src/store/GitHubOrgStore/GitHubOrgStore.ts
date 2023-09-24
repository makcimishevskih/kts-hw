import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { normalizeOrgRepos, TOrgReposApi, TOrgReposModel } from 'store/models/repo';
import { TTypes } from 'store/models/types';
import { getData } from 'utils/fetchData';
import { CollectionModel, getCollection, getInitialCollectionModel } from './../shared/collection';

export type IPrivateFields = '_orgName' | '_orgRepos' | '_reposFilterType';

export class GithubOrgStore {
  private _orgName: string = 'ktsstudio';
  private _orgRepos: CollectionModel<number | string, TOrgReposModel> = getInitialCollectionModel();
  private _reposFilterType: TTypes = 'all';

  orgError: string = '';
  orgLoading: boolean = false;
  orgReposLength: number = 0;

  errorReposList = '';
  loadingReposList = false;

  selectedRepo: TOrgReposModel | null = null;

  constructor() {
    makeObservable<GithubOrgStore, IPrivateFields>(this, {
      _orgName: observable,
      _reposFilterType: observable,
      _orgRepos: observable,

      orgError: observable,
      orgLoading: observable,
      errorReposList: observable,
      loadingReposList: observable,

      orgRepos: computed,
      getReposData: action,
      findRepoById: action,
      setReposFilterType: action,
    });
  }

  findRepoById = (paramId: string): TOrgReposModel | null => {
    if (paramId) {
      this.selectedRepo = this._orgRepos.entities[+paramId];
    }
    return this.selectedRepo || null;
  };

  get orgName() {
    return this._orgName;
  }

  setOrgName = (name: string) => {
    this.errorReposList = '';
    this._orgName = name;
  };

  get reposFilterType() {
    return this._reposFilterType;
  }

  get orgRepos(): TOrgReposModel[] {
    return this._orgRepos.order.map((id) => this._orgRepos.entities[id]);
  }

  setReposFilterType = (filterType: TTypes) => {
    this._reposFilterType = filterType;
  };

  getReposData = async (perPage: number, offset: number) => {
    this._orgRepos = getInitialCollectionModel();
    this.errorReposList = '';
    this.loadingReposList = true;

    const requests = [
      getData<TOrgReposApi[], TOrgReposModel[]>(
        `orgs/${this.orgName}/repos?type=${this.reposFilterType}&per_page=${perPage}&page=${offset}`,
        normalizeOrgRepos,
      ),
      getData<TOrgReposApi[], TOrgReposModel[]>(
        `orgs/${this.orgName}/repos?type=${this.reposFilterType}`,
        normalizeOrgRepos,
      ),
    ];

    const [reposResponse, reposLengthResponse] = await Promise.all(requests);

    if (reposResponse.isError) {
      runInAction(() => {
        this.loadingReposList = false;
        this.orgReposLength = 0;
        this.errorReposList = "Can't load org repositories";
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
          this.errorReposList = "Can't load org repositories";
          this._orgRepos = getInitialCollectionModel();
        });
      }
    }

    if (reposLengthResponse.isError) {
      runInAction(() => {
        this.loadingReposList = false;
        this.orgReposLength = 0;
        this.errorReposList = "Can't load org repositories";
      });
    } else {
      runInAction(() => {
        this.orgReposLength = reposLengthResponse.data.length;
        this.loadingReposList = false;
      });
    }
  };
}

export default new GithubOrgStore();
