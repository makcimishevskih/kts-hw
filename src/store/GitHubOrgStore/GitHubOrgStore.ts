import { makeObservable, observable, action, runInAction } from 'mobx';

import { normalizeOrg, TOrgApi, TOrgModel } from 'store/models/org';
import { TTypes } from 'store/models/types';

import { getData } from 'utils/fetchData';

export type IPrivateFields = '_org';

export class GithubOrgStore {
  private _org: TOrgModel | null = null;
  orgName: string = '';
  orgType: TTypes = 'all';
  orgError: string = '';
  orgLoading: boolean = false;

  constructor() {
    makeObservable<GithubOrgStore, IPrivateFields>(this, {
      _org: observable,
      orgName: observable,
      orgType: observable,
      orgError: observable,
      orgLoading: observable,
      setOrgName: action,
      setOrgType: action,
      getOrgData: action,
    });
  }

  get org() {
    return this._org;
  }

  setOrgType = (type: TTypes) => {
    this.orgType = type;
  };

  setOrgName = (name: string) => {
    this.orgName = name;
  };

  getOrgData = async () => {
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
          this._org = data;
          this.orgLoading = false;
        });
      }
    });
  };
}

export default GithubOrgStore;
