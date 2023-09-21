import { makeObservable, observable, action, runInAction } from 'mobx';

import { normalizeOrg, TOrgApi, TOrgModel } from 'store/models/org';
import { TTypes } from 'store/models/types';

import { getData } from 'utils/fetchData';

export type IPrivateFields = '_org' | '_orgName' | '_orgType';

export class GithubOrgStore {
  private _org: TOrgModel | null = null;
  private _orgName: string = '';
  private _orgType: TTypes = 'all';
  orgError: string = '';
  orgLoading: boolean = false;

  constructor() {
    makeObservable<GithubOrgStore, IPrivateFields>(this, {
      _org: observable,
      _orgName: observable,
      _orgType: observable,
      orgError: observable,
      orgLoading: observable,
      setOrgType: action,
      setOrgName: action,
      getOrgData: action,
    });
  }

  get org() {
    return this._org;
  }

  get orgName() {
    return this._orgName;
  }

  setOrgName = (name: string) => {
    this._orgName = name;
  };

  get orgType() {
    return this._orgType;
  }

  setOrgType = (type: TTypes) => {
    this._orgType = type;
  };

  getOrgData = async () => {
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
}

export default GithubOrgStore;
