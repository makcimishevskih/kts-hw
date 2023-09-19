export type TOrgApi = {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string;
  twitter_username: string | null;
  is_verified: boolean;
  has_organization_projects: boolean;
  has_repository_projects: boolean;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  html_url: 'https://github.com/ktsstudio';
  created_at: Date;
  updated_at: Date;
  archived_at: Date | null;
  type: string;
};

export type TOrgModel = {
  login: string;
  id: number;
  node_id: string;
  url: string;
  reposUrl: string;
  eventsUrl: string;
  hooksUrl: string;
  issuesUrl: string;
  membersUrl: string;
  publicMembersUrl: string;
  avatarUrl: string;
  description: string;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string;
  twitterUsername: string | null;
  isVerified: boolean;
  hasOrganizationProjects: boolean;
  hasRepositoryProjects: boolean;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  htmlUrl: 'https://github.com/ktsstudio';
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
  type: string;
};

export const normalizeOrg = (from: TOrgApi): TOrgModel => ({
  login: from.login,
  id: from.id,
  node_id: from.node_id,
  url: from.url,
  reposUrl: from.repos_url,
  eventsUrl: from.events_url,
  hooksUrl: from.hooks_url,
  issuesUrl: from.issues_url,
  membersUrl: from.members_url,
  publicMembersUrl: from.public_members_url,
  avatarUrl: from.avatar_url,
  description: from.description,
  name: from.name,
  company: from.company,
  blog: from.blog,
  location: from.location,
  email: from.email,
  twitterUsername: from.twitter_username,
  isVerified: from.is_verified,
  hasOrganizationProjects: from.has_organization_projects,
  hasRepositoryProjects: from.has_repository_projects,
  publicRepos: from.public_repos,
  publicGists: from.public_gists,
  followers: from.followers,
  following: from.following,
  htmlUrl: from.html_url,
  createdAt: from.created_at,
  updatedAt: from.updated_at,
  archivedAt: from.archived_at,
  type: from.type,
});
