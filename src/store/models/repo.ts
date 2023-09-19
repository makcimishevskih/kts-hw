// API
export type TOwnerApi = {
  id: number;
  url: string;
  login: string;
  node_id: string;
  avatar_url: string;
  html_url: string;
  repos_url: string;
  events_url: string;
  type: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  received_events_url: string;
  site_admin: boolean;
  gravatar_id: string;
  followers_url: string;
  following_url: string;
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
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  contributions: number;
};

export type TReadmeApi = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
};

// MODELS

export type TPermissionsModel = {
  admin: boolean;
  maintain: boolean;
  push: boolean;
  triage: boolean;
  pull: boolean;
};

export type TOwnerModel = {
  id: number;
  url: string;
  login: string;
  nodeId: string;
  avatarUrl: string;
  htmlUrl: string;
  reposUrl: string;
  eventsUrl: string;
  type: string;
  gistsUrl: string;
  starredUrl: string;
  subscriptionsUrl: string;
  organizationsUrl: string;
  received_eventsUrl: string;
  siteAdmin: boolean;
  gravatarId: string;
  followersUrl: string;
  followingUrl: string;
};

export type TReadmeModel = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  htmlUrl: string;
  gitUrl: string;
  downloadUrl: string;
  type: string;
  content: string;
  encoding: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
};

export type TOrgReposModel = {
  owner: TOwnerModel;
  permissions: TPermissionsModel;
  id: number;
  name: string;
  fullName: string;
  description: string | null;

  nodeId: string;
  private: boolean;
  htmlUrl: string;
  fork: boolean;
  url: string;
  forksUrl: string;
  keysUrl: string;
  collaboratorsUrl: string;
  teamsUrl: string;
  hooksUrl: string;
  issueEventsUrl: string;
  eventsUrl: string;
  assigneesUrl: string;
  branchesUrl: string;
  tagsUrl: string;
  blobsUrl: string;
  gitTagsUrl: string;
  gitRefsUrl: string;
  treesUrl: string;
  statusesUrl: string;
  languagesUrl: string;
  stargazersUrl: string;
  contributorsUrl: string;
  subscribersUrl: string;
  subscriptionUrl: string;
  commitsUrl: string;
  gitCommitsUrl: string;
  commentsUrl: string;
  issueCommentUrl: string;
  contentsUrl: string;
  compareUrl: string;
  mergesUrl: string;
  archiveUrl: string;
  downloadsUrl: string;
  issuesUrl: string;
  pullsUrl: string;
  milestonesUrl: string;
  notificationsUrl: string;
  labelsUrl: string;
  releasesUrl: string;
  deploymentsUrl: string;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  gitUrl: string;
  sshUrl: string;
  cloneUrl: string;
  svnUrl: string;
  homepage: string | null;
  size: number;
  stargazersCount: number;
  watchersCount: number;
  language: string;
  hasIssues: boolean;
  hasProjects: boolean;
  hasDownloads: boolean;
  hasWiki: boolean;
  hasPages: boolean;
  hasDiscussions: boolean;
  forksCount: number;
  mirrorUrl: string | null;
  archived: boolean;
  disabled: boolean;
  openIssuesCount: number;
  license: object | null;
  allowForking: boolean;
  isTemplate: boolean;
  webCommitSignoffRequired: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  openIssues: number;
  watchers: number;
  defaultBranch: string;
};

export type TContributorModel = {
  login: string;
  id: number;
  nodeId: string;
  avatarUrl: string;
  gravatarId: string;
  url: string;
  htmlUrl: string;
  followersUrl: string;
  followingUrl: string;
  gistsUrl: string;
  starredUrl: string;
  subscriptionsUrl: string;
  organizationsUrl: string;
  reposUrl: string;
  eventsUrl: string;
  receivedEventsUrl: string;
  type: string;
  siteAdmin: boolean;
  contributions: number;
};

export type TLanguagesModel = Record<string, number>;

export const normalizeOrgRepos = (arr: TOrgReposApi[]): TOrgReposModel[] =>
  arr.map((from) => ({
    owner: normalizeOwner(from.owner),
    id: from.id,
    url: from.url,
    fork: from.fork,
    name: from.name,
    size: from.size,
    forks: from.forks,
    topics: from.topics,
    gitUrl: from.git_url,
    sshUrl: from.ssh_url,
    nodeId: from.node_id,
    svnUrl: from.svn_url,
    license: from.license,
    private: from.private,
    hasWiki: from.has_wiki,
    keysUrl: from.keys_url,
    htmlUrl: from.html_url,
    tagsUrl: from.tags_url,
    pushedAt: from.pushed_at,
    cloneUrl: from.clone_url,
    homepage: from.homepage,
    teamsUrl: from.teams_url,
    hooksUrl: from.hooks_url,
    archived: from.archived,
    watchers: from.watchers,
    disabled: from.disabled,
    language: from.language,
    hasPages: from.has_pages,
    fullName: from.full_name,
    forksUrl: from.forks_url,
    blobsUrl: from.blobs_url,
    treesUrl: from.trees_url,
    pullsUrl: from.pulls_url,
    mirrorUrl: from.mirror_url,
    eventsUrl: from.events_url,
    updatedAt: from.updated_at,
    mergesUrl: from.merges_url,
    createdAt: from.created_at,
    labelsUrl: from.labels_url,
    issuesUrl: from.issues_url,
    hasIssues: from.has_issues,
    visibility: from.visibility,
    compareUrl: from.compare_url,
    archiveUrl: from.archive_url,
    commitsUrl: from.commits_url,
    isTemplate: from.is_template,
    forksCount: from.forks_count,
    openIssues: from.open_issues,
    description: from.description,
    permissions: from.permissions,
    gitTagsUrl: from.git_tags_url,
    gitRefsUrl: from.git_refs_url,
    releasesUrl: from.releases_url,
    branchesUrl: from.branches_url,
    statusesUrl: from.statuses_url,
    contentsUrl: from.contents_url,
    commentsUrl: from.comments_url,
    hasProjects: from.has_projects,
    hasDownloads: from.has_downloads,
    allowForking: from.allow_forking,
    assigneesUrl: from.assignees_url,
    languagesUrl: from.languages_url,
    downloadsUrl: from.downloads_url,
    defaultBranch: from.default_branch,
    watchersCount: from.watchers_count,
    stargazersUrl: from.stargazers_url,
    milestonesUrl: from.milestones_url,
    gitCommitsUrl: from.git_commits_url,
    subscribersUrl: from.subscribers_url,
    deploymentsUrl: from.deployments_url,
    hasDiscussions: from.has_discussions,
    issueEventsUrl: from.issue_events_url,
    contributorsUrl: from.contributors_url,
    stargazersCount: from.stargazers_count,
    subscriptionUrl: from.subscription_url,
    openIssuesCount: from.open_issues_count,
    issueCommentUrl: from.issue_comment_url,
    notificationsUrl: from.notifications_url,
    collaboratorsUrl: from.collaborators_url,
    webCommitSignoffRequired: from.web_commit_signoff_required,
  }));

export const normalizeOwner = (from: TOwnerApi): TOwnerModel => ({
  id: from.id,
  url: from.url,
  type: from.type,
  login: from.login,
  nodeId: from.node_id,
  htmlUrl: from.html_url,
  gistsUrl: from.gists_url,
  reposUrl: from.repos_url,
  eventsUrl: from.events_url,
  avatarUrl: from.avatar_url,
  siteAdmin: from.site_admin,
  gravatarId: from.gravatar_id,
  starredUrl: from.starred_url,
  followersUrl: from.followers_url,
  followingUrl: from.following_url,
  subscriptionsUrl: from.subscriptions_url,
  organizationsUrl: from.organizations_url,
  received_eventsUrl: from.received_events_url,
});

export const normalizeContributor = (arr: TContributorApi[]): TContributorModel[] =>
  arr.map((from) => ({
    id: from.id,
    url: from.url,
    type: from.type,
    login: from.login,
    nodeId: from.node_id,
    htmlUrl: from.html_url,
    gistsUrl: from.gists_url,
    reposUrl: from.repos_url,
    eventsUrl: from.events_url,
    siteAdmin: from.site_admin,
    avatarUrl: from.avatar_url,
    gravatarId: from.gravatar_id,
    starredUrl: from.starred_url,
    followersUrl: from.followers_url,
    followingUrl: from.following_url,
    contributions: from.contributions,
    subscriptionsUrl: from.subscriptions_url,
    organizationsUrl: from.organizations_url,
    receivedEventsUrl: from.received_events_url,
  }));

export const normalizeReadme = (from: TReadmeApi): TReadmeModel => ({
  sha: from.sha,
  url: from.url,
  size: from.size,
  type: from.type,
  name: from.name,
  path: from.path,
  gitUrl: from.git_url,
  content: from.content,
  htmlUrl: from.html_url,
  encoding: from.encoding,
  downloadUrl: from.download_url,
  _links: {
    git: from._links.git,
    html: from._links.html,
    self: from._links.self,
  },
});
