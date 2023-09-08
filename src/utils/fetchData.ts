import axios from 'axios';

export type TOwner = {
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
};

export type TPermissions = {
  admin: boolean;
  maintain: boolean;
  push: boolean;
  triage: boolean;
  pull: boolean;
};

export type TOrgs = {
  owner: TOwner;
  permissions: TPermissions;
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
  mirror_url: any | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: any | null;
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

export type TOrgsResponse = {
  data: TOrgs[];
};
export type TContributorsResponse = {
  data: TContributor[];
};
export type TTagsResponse = {
  data: TTag[];
};
export type TTag = {
  name: string;
  zipball_url: string;
  tarball_url: string;
  commit: {
    sha: string;
    url: string;
  };
  node_id: string;
};
export type TContributor = {
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
export type TReadme = {
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

// 1.
// export const URL_ORG = { ktsstudio: 'https://api.github.com/orgs/ktsstudio/repos' };
// for ORG          ---> 'https://api.github.com/orgs/{ORG_NAME}/repos'
// 2.
// export const URL_ORG_CONTRIBUTORS = { ktsstudio: 'https://api.github.com/repos/ktsstudio/notific/contributors' };
// for CONTRIBUTORS ---> 'https://api.github.com/repos/{ORG_NAME}/{REPO_NAME}/contributors'
// 3.
// export const URL_ORG_TAGS = { ktsstudio: 'https://api.github.com/repos/ktsstudio/notific/tags' };
// for TAGS(TOPICS) ---> 'https://api.github.com/repos/{ORG_NAME}/{REPO_NAME}/tags' };
// 4.
// export const URL_ORG_LANGUAGES = { ktsstudio: 'https://api.github.com/repos/ktsstudio/notific/languages' };
// for LANGUAGES    ---> 'https://api.github.com/repos/{ORG_NAME}/{REPO_NAME}/languages' };
// 5.
// export const URL_ORG_README = { ktsstudio: 'https://api.github.com/repos/ktsstudio/notific/contents/README.md' };
// for README       ---> 'https://api.github.com/repos/{ORG}/{REPO_NAME}/contents/{FILE_NAME}';

const config = {
  headers: {
    Authorization: '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',
    'X-GitHub-Api-Version': '2022-11-28',
  },
};

export async function getOrgs(url: string) {
  try {
    const { data } = await axios.get<TOrgsResponse>(url, config);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

// name
export async function getContributors(url: string) {
  try {
    const { data } = await axios.get<TContributorsResponse>(url, config);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
export async function getTags(url: string) {
  try {
    const { data } = await axios.get<TTagsResponse>(url, config);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
export async function getLanguages(url: string) {
  try {
    const { data } = await axios.get<TTagsResponse>(url, config);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
export async function getReadme(url: string) {
  try {
    const { data } = await axios.get(url, config);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
