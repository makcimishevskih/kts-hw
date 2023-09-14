import { makeObservable, computed, observable, action } from 'mobx';

import { TOrg } from 'entities/org';
import { TContributor, TLanguages, TOrgRepo, TReadme } from 'entities/repo';

import { getData } from 'utils/fetchData';

// const REPO_PER_PAGE = 9;

class OrgStore {
  // ORG
  org: TOrg | null = null;
  orgName: string = '';
  orgError: string = '';
  orgLoading: boolean = false;
  // REPO_LIST
  orgRepos: TOrgRepo[] = [];
  errorReposList = '';
  loadingReposList = false;

  // REPO
  contributors: TContributor[] = [];
  readme: TReadme | null = null;
  languages: TLanguages | null = null;
  errorsRepo = { contributors: '', readme: '', languages: '' };
  loadersRepo = { contributors: false, readme: false, languages: false };

  selectedRepo: TOrgRepo | null = null;

  constructor() {
    // makeAutoObservable(this);
    makeObservable(this, {
      // ORG_PAGE
      org: observable,
      orgName: observable,
      orgRepos: observable,
      orgError: observable,
      getOrgData: action,
      getReposData: action,
      changeOrgName: action,
      loadingReposList: observable,
      errorReposList: observable,
      // REPO_PAGE
      selectedRepo: observable,
      readme: observable,
      languages: observable,
      contributors: observable,
      errorsRepo: observable,
      loadersRepo: observable,
      getRepoData: action,
    });
  }

  findRepoById = (paramId: string) => {
    if (paramId) {
      this.selectedRepo = (this.orgRepos && this.orgRepos.find((el) => String(el.id) === paramId)) || null;
    }
    return this.selectedRepo;
  };

  getRepoData = (fileName: string) => {
    const repoURL = this.selectedRepo && `repos/${this.orgName}/${this.selectedRepo?.name}`;
    this.errorsRepo = { contributors: '', readme: '', languages: '' };
    this.loadersRepo = { contributors: true, readme: true, languages: true };

    getData<TContributor[]>(`${repoURL}/contributors`).then((response) => {
      if (response.isError) {
        this.errorsRepo = { ...this.errorsRepo, contributors: "Can't load contributors" };
      } else {
        this.contributors = response.data;
        this.loadersRepo = { ...this.loadersRepo, contributors: false };
      }
    });
    getData<TLanguages>(`${repoURL}/languages`).then((response) => {
      if (response.isError) {
        this.errorsRepo = { ...this.errorsRepo, languages: "Can't load languages" };
      } else {
        this.languages = response.data;
        this.loadersRepo = { ...this.loadersRepo, languages: false };
      }
    });
    getData<TReadme>(`${repoURL}/contents/${fileName}`).then((response) => {
      if (response.isError) {
        this.errorsRepo = { ...this.errorsRepo, readme: `Can't load ${fileName}` };
      } else {
        this.readme = response.data;
        this.loadersRepo = { ...this.loadersRepo, readme: false };
      }
    });
  };

  // ORG
  getOrgData = () => {
    this.orgError = '';
    this.orgLoading = true;

    getData<TOrg>(`orgs/${this.orgName}`).then((response) => {
      if (response.isError) {
        this.orgError = "Can't load org";
      } else {
        this.org = response.data;
        this.orgLoading = false;
      }
    });
  };
  getReposData = (perPage: number, offset: number) => {
    this.errorReposList = '';
    this.loadingReposList = true;
    getData<TOrgRepo[]>(`orgs/${this.orgName}/repos?per_page=${perPage}&page=${offset}`).then((response) => {
      if (response.isError) {
        this.errorReposList = "Can't load org repositories";
      } else {
        this.orgRepos = response.data;
        this.loadingReposList = false;
      }
    });
  };
  changeOrgName = (name: string) => {
    this.orgName = name;
  };
}

export default new OrgStore();
