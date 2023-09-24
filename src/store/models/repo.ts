// API
export type TOwnerApi = {
  id: number;
  url: string;
  type: string;
  login: string;
  node_id: string;
  avatar_url: string;
};

export type TOrgReposApi = {
  owner: TOwnerApi;
  permissions: TPermissionsModel;
  id: number;
  name: string;
  full_name: string;
  description: string | null;

  node_id: string;
  private: boolean;
  html_url: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: object | null;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
};

export type TContributorApi = {
  id: number;
  login: string;
  avatar_url: string;
  contributions: number;
};

export type TReadmeApi = {
  name: string;
  content: string;
};

// MODELS
export type TPermissionsModel = {
  pull: boolean;
  push: boolean;
  admin: boolean;
  triage: boolean;
  maintain: boolean;
};

export type TOwnerModel = {
  id: number;
  url: string;
  type: string;
  login: string;
  nodeId: string;
  avatarUrl: string;
};

export type TReadmeModel = {
  name: string;
  content: string;
};

export type TOrgReposModel = {
  owner: TOwnerModel;
  permissions: TPermissionsModel;
  id: number;
  name: string;
  forks: number;
  watchers: number;
  homepage: string | null;
  fullName: string;
  updatedAt: string;
  createdAt: string;
  forksCount: number;
  description: string | null;
  watchersCount: number;
  stargazersCount: number;
  topics: string[];
};

export type TContributorModel = {
  id: number;
  login: string;
  avatarUrl: string;
  contributions: number;
};

export type TLanguagesModel = Record<string, number>;

export const normalizeOrgRepos = (arr: TOrgReposApi[]): TOrgReposModel[] =>
  arr.map((from) => ({
    owner: normalizeOwner(from.owner),
    id: from.id,
    name: from.name,
    forks: from.forks,
    topics: from.topics,
    homepage: from.homepage,
    watchers: from.watchers,
    fullName: from.full_name,
    updatedAt: from.updated_at,
    createdAt: from.created_at,
    forksCount: from.forks_count,
    description: from.description,
    permissions: from.permissions,
    watchersCount: from.watchers_count,
    stargazersCount: from.stargazers_count,
  }));

export const normalizeOwner = (from: TOwnerApi): TOwnerModel => ({
  id: from.id,
  url: from.url,
  type: from.type,
  login: from.login,
  nodeId: from.node_id,
  avatarUrl: from.avatar_url,
});

export const normalizeContributor = (arr: TContributorApi[]): TContributorModel[] =>
  arr.map((from) => ({
    id: from.id,
    login: from.login,
    contributions: from.contributions,
    avatarUrl: from.avatar_url,
  }));

export const normalizeReadme = (from: TReadmeApi): TReadmeModel => ({
  name: from.name,
  content: from.content,
});
