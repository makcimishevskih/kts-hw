import css from './ProductPage.module.scss';

import { FC, useEffect, useState } from 'react';
import { getContributors, getLanguages, TContributor, TOrgRepos, TReadme, getReadme } from 'utils/fetchData';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Text from 'components/Text';
import ArrowBackIcon from 'components/icons/ArrowBackIcon';
import link from 'assets/link.svg';
import { randomRGBColor } from 'utils/randomRGBColor';
import { decodeFromUint8Array } from 'utils/encode';
interface IProductPageProps {
  list: TOrgRepos[];
}

const README_FILE_NAME = 'README.md';

// const t = [
//   {
//     name: '0.1.2',
//     zipball_url: 'https://api.github.com/repos/ktsstudio/notific/zipball/refs/tags/0.1.2',
//     tarball_url: 'https://api.github.com/repos/ktsstudio/notific/tarball/refs/tags/0.1.2',
//     commit: {
//       sha: '37e4b3d356cf5ff32386dca181da0c36a1e00844',
//       url: 'https://api.github.com/repos/ktsstudio/notific/commits/37e4b3d356cf5ff32386dca181da0c36a1e00844',
//     },
//     node_id: 'MDM6UmVmMjU2OTQ2MDI6cmVmcy90YWdzLzAuMS4y',
//   },
//   {
//     name: '0.1.1',
//     zipball_url: 'https://api.github.com/repos/ktsstudio/notific/zipball/refs/tags/0.1.1',
//     tarball_url: 'https://api.github.com/repos/ktsstudio/notific/tarball/refs/tags/0.1.1',
//     commit: {
//       sha: 'dc6bb52b8d3097d62d0d7f254fddb6483bb268d8',
//       url: 'https://api.github.com/repos/ktsstudio/notific/commits/dc6bb52b8d3097d62d0d7f254fddb6483bb268d8',
//     },
//     node_id: 'MDM6UmVmMjU2OTQ2MDI6cmVmcy90YWdzLzAuMS4x',
//   },
//   {
//     name: '0.1.0',
//     zipball_url: 'https://api.github.com/repos/ktsstudio/notific/zipball/refs/tags/0.1.0',
//     tarball_url: 'https://api.github.com/repos/ktsstudio/notific/tarball/refs/tags/0.1.0',
//     commit: {
//       sha: '8bd48a75de554d9df135dcac89c186d89e3ce6a0',
//       url: 'https://api.github.com/repos/ktsstudio/notific/commits/8bd48a75de554d9df135dcac89c186d89e3ce6a0',
//     },
//     node_id: 'MDM6UmVmMjU2OTQ2MDI6cmVmcy90YWdzLzAuMS4w',
//   },
// ];
// const c = [
//   {
//     login: 'gbiryukov',
//     id: 6758384,
//     node_id: 'MDQ6VXNlcjY3NTgzODQ=',
//     avatar_url: 'https://avatars.githubusercontent.com/u/6758384?v=4',
//     gravatar_id: '',
//     url: 'https://api.github.com/users/gbiryukov',
//     html_url: 'https://github.com/gbiryukov',
//     followers_url: 'https://api.github.com/users/gbiryukov/followers',
//     following_url: 'https://api.github.com/users/gbiryukov/following{/other_user}',
//     gists_url: 'https://api.github.com/users/gbiryukov/gists{/gist_id}',
//     starred_url: 'https://api.github.com/users/gbiryukov/starred{/owner}{/repo}',
//     subscriptions_url: 'https://api.github.com/users/gbiryukov/subscriptions',
//     organizations_url: 'https://api.github.com/users/gbiryukov/orgs',
//     repos_url: 'https://api.github.com/users/gbiryukov/repos',
//     events_url: 'https://api.github.com/users/gbiryukov/events{/privacy}',
//     received_events_url: 'https://api.github.com/users/gbiryukov/received_events',
//     type: 'User',
//     site_admin: false,
//     contributions: 3,
//   },
//   {
//     login: 'grigory51',
//     id: 1757481,
//     node_id: 'MDQ6VXNlcjE3NTc0ODE=',
//     avatar_url: 'https://avatars.githubusercontent.com/u/1757481?v=4',
//     gravatar_id: '',
//     url: 'https://api.github.com/users/grigory51',
//     html_url: 'https://github.com/grigory51',
//     followers_url: 'https://api.github.com/users/grigory51/followers',
//     following_url: 'https://api.github.com/users/grigory51/following{/other_user}',
//     gists_url: 'https://api.github.com/users/grigory51/gists{/gist_id}',
//     starred_url: 'https://api.github.com/users/grigory51/starred{/owner}{/repo}',
//     subscriptions_url: 'https://api.github.com/users/grigory51/subscriptions',
//     organizations_url: 'https://api.github.com/users/grigory51/orgs',
//     repos_url: 'https://api.github.com/users/grigory51/repos',
//     events_url: 'https://api.github.com/users/grigory51/events{/privacy}',
//     received_events_url: 'https://api.github.com/users/grigory51/received_events',
//     type: 'User',
//     site_admin: false,
//     contributions: 2,
//   },
// ];
// const product: TOrgRepos = {
//   id: 25694602,
//   node_id: 'MDEwOlJlcG9zaXRvcnkyNTY5NDYwMg==',
//   name: 'notific',
//   full_name: 'ktsstudio/notific',
//   private: false,
//   owner: {
//     login: 'ktsstudio',
//     id: 14364638,
//     node_id: 'MDEyOk9yZ2FuaXphdGlvbjE0MzY0NjM4',
//     avatar_url: 'https://avatars.githubusercontent.com/u/14364638?v=4',
//     gravatar_id: '',
//     url: 'https://api.github.com/users/ktsstudio',
//     html_url: 'https://github.com/ktsstudio',
//     followers_url: 'https://api.github.com/users/ktsstudio/followers',
//     following_url: 'https://api.github.com/users/ktsstudio/following{/other_user}',
//     gists_url: 'https://api.github.com/users/ktsstudio/gists{/gist_id}',
//     starred_url: 'https://api.github.com/users/ktsstudio/starred{/owner}{/repo}',
//     subscriptions_url: 'https://api.github.com/users/ktsstudio/subscriptions',
//     organizations_url: 'https://api.github.com/users/ktsstudio/orgs',
//     repos_url: 'https://api.github.com/users/ktsstudio/repos',
//     events_url: 'https://api.github.com/users/ktsstudio/events{/privacy}',
//     received_events_url: 'https://api.github.com/users/ktsstudio/received_events',
//     type: 'Organization',
//     site_admin: false,
//   },
//   html_url: 'https://github.com/ktsstudio/notific',
//   description: 'amd-модуль для показа уведомлений',
//   fork: false,
//   url: 'https://api.github.com/repos/ktsstudio/notific',
//   forks_url: 'https://api.github.com/repos/ktsstudio/notific/forks',
//   keys_url: 'https://api.github.com/repos/ktsstudio/notific/keys{/key_id}',
//   collaborators_url: 'https://api.github.com/repos/ktsstudio/notific/collaborators{/collaborator}',
//   teams_url: 'https://api.github.com/repos/ktsstudio/notific/teams',
//   hooks_url: 'https://api.github.com/repos/ktsstudio/notific/hooks',
//   issue_events_url: 'https://api.github.com/repos/ktsstudio/notific/issues/events{/number}',
//   events_url: 'https://api.github.com/repos/ktsstudio/notific/events',
//   assignees_url: 'https://api.github.com/repos/ktsstudio/notific/assignees{/user}',
//   branches_url: 'https://api.github.com/repos/ktsstudio/notific/branches{/branch}',
//   tags_url: 'https://api.github.com/repos/ktsstudio/notific/tags',
//   blobs_url: 'https://api.github.com/repos/ktsstudio/notific/git/blobs{/sha}',
//   git_tags_url: 'https://api.github.com/repos/ktsstudio/notific/git/tags{/sha}',
//   git_refs_url: 'https://api.github.com/repos/ktsstudio/notific/git/refs{/sha}',
//   trees_url: 'https://api.github.com/repos/ktsstudio/notific/git/trees{/sha}',
//   statuses_url: 'https://api.github.com/repos/ktsstudio/notific/statuses/{sha}',
//   languages_url: 'https://api.github.com/repos/ktsstudio/notific/languages',
//   stargazers_url: 'https://api.github.com/repos/ktsstudio/notific/stargazers',
//   contributors_url: 'https://api.github.com/repos/ktsstudio/notific/contributors',
//   subscribers_url: 'https://api.github.com/repos/ktsstudio/notific/subscribers',
//   subscription_url: 'https://api.github.com/repos/ktsstudio/notific/subscription',
//   commits_url: 'https://api.github.com/repos/ktsstudio/notific/commits{/sha}',
//   git_commits_url: 'https://api.github.com/repos/ktsstudio/notific/git/commits{/sha}',
//   comments_url: 'https://api.github.com/repos/ktsstudio/notific/comments{/number}',
//   issue_comment_url: 'https://api.github.com/repos/ktsstudio/notific/issues/comments{/number}',
//   contents_url: 'https://api.github.com/repos/ktsstudio/notific/contents/{+path}',
//   compare_url: 'https://api.github.com/repos/ktsstudio/notific/compare/{base}...{head}',
//   merges_url: 'https://api.github.com/repos/ktsstudio/notific/merges',
//   archive_url: 'https://api.github.com/repos/ktsstudio/notific/{archive_format}{/ref}',
//   downloads_url: 'https://api.github.com/repos/ktsstudio/notific/downloads',
//   issues_url: 'https://api.github.com/repos/ktsstudio/notific/issues{/number}',
//   pulls_url: 'https://api.github.com/repos/ktsstudio/notific/pulls{/number}',
//   milestones_url: 'https://api.github.com/repos/ktsstudio/notific/milestones{/number}',
//   notifications_url: 'https://api.github.com/repos/ktsstudio/notific/notifications{?since,all,participating}',
//   labels_url: 'https://api.github.com/repos/ktsstudio/notific/labels{/name}',
//   releases_url: 'https://api.github.com/repos/ktsstudio/notific/releases{/id}',
//   deployments_url: 'https://api.github.com/repos/ktsstudio/notific/deployments',
//   created_at: '2014-10-24T15:23:29Z',
//   updated_at: '2023-01-28T10:46:21Z',
//   pushed_at: '2016-10-06T17:28:01Z',
//   git_url: 'git://github.com/ktsstudio/notific.git',
//   ssh_url: 'git@github.com:ktsstudio/notific.git',
//   clone_url: 'https://github.com/ktsstudio/notific.git',
//   svn_url: 'https://github.com/ktsstudio/notific',
//   homepage: '',
//   size: 80,
//   stargazers_count: 2,
//   watchers_count: 2,
//   language: 'JavaScript',
//   has_issues: true,
//   has_projects: true,
//   has_downloads: true,
//   has_wiki: true,
//   has_pages: false,
//   has_discussions: false,
//   forks_count: 0,
//   mirror_url: null,
//   archived: true,
//   disabled: false,
//   open_issues_count: 0,
//   license: null,
//   allow_forking: true,
//   is_template: false,
//   web_commit_signoff_required: false,
//   topics: ['javascript', 'popup'],
//   visibility: 'public',
//   forks: 0,
//   open_issues: 0,
//   watchers: 2,
//   default_branch: 'master',
//   permissions: {
//     admin: false,
//     maintain: false,
//     push: false,
//     triage: false,
//     pull: true,
//   },
// };
// const languages: Record<string, number> = {
//   JavaScript: 17730,
//   CSS: 2812,
//   HTML: 1001,
// };

// const r: TReadme = {
//   name: 'README.md',
//   path: 'README.md',
//   sha: '0a49e4fdc2b7257a31d3495076fea3048e091bf4',
//   size: 2720,
//   url: 'https://api.github.com/repos/ktsstudio/notific/contents/README.md?ref=master',
//   html_url: 'https://github.com/ktsstudio/notific/blob/master/README.md',
//   git_url: 'https://api.github.com/repos/ktsstudio/notific/git/blobs/0a49e4fdc2b7257a31d3495076fea3048e091bf4',
//   download_url: 'https://raw.githubusercontent.com/ktsstudio/notific/master/README.md',
//   type: 'file',
//   content:
//     'Tm90aWZpYwo9PT09PT09PT09CgrQn9GA0L7RgdGC0LXQudGI0LjQuSBhbWQt\n0LzQvtC00YPQu9GMKNC/0L7QutCwKSDQtNC70Y8g0L/QvtC60LDQt9CwINGD\n0LLQtdC00L7QvNC70LXQvdC40LkuINCU0LvRjyDRgNCw0LHQvtGC0Ysg0YLR\ngNC10LHRg9C10YLRgdGPIGpRdWVyeS4KCiMjIyDQlNC+0YHRgtGD0L/QvdGL\n0LUg0LzQtdGC0L7QtNGLCgojIyMjIC5jb25maWcocGFyYW1zKQoK0J/QvtC3\n0LLQvtC70Y/QtdGCINC90LDRgdGC0YDQvtC40YLRjCDQvNC+0LTRg9C70Ywu\nCgpgYGBKYXZhU2NyaXB0CnJlcXVpcmUoWydub3RpZmljJ10sIGZ1bmN0aW9u\nKE5vdGlmaWMpewogICAgTm90aWZpYy5jb25maWcoewoKICAgICAgICAvLyDQ\nuNC80LXQvdCwINGB0YLQuNC70LXQuSDQs9C10L3QtdGA0LjRgNGD0LXQvNC+\n0Lkg0LLQtdGA0YHRgtC60LgKICAgICAgICAvLyDQstC+0LfQvNC+0LbQvdGL\n0LUg0L/QvtC70Y86IGJvZHksIGNvbnRhaW5lciwgdG9wLCBib3R0b20sIAog\nICAgICAgIC8vIG5vdGlmaWNhdGlvbiwgZGVmYXVsdCwgZXJyb3IsIHN1Y2Nl\nc3MsIHdhcm5pbmcsIAogICAgICAgIC8vIHRpdGxlLCB0ZXh0LCBjbG9zZQog\nICAgICAgIGNzczogewogICAgICAgICAgICB0aXRsZTogJ3N1cGVyLW1lZ2Et\ndGl0bGUnCiAgICAgICAgfSwKCiAgICAgICAgLy8g0YjQuNGA0LjQvdCwINGD\n0LLQtdC00L7QvNC70LXQvdC40Y8sINC80L7QttC90L4g0LIg0L/RgNC+0YbQ\ntdC90YLQsNGFINC+0YIg0YjQuNGA0LjQvdGLINGN0LrRgNCw0L3QsAogICAg\nICAgIHdpZHRoOiAzNjAsCgogICAgICAgIC8vINC/0L7Qu9C+0LbQtdC90LjQ\ntSDRg9Cy0LXQtNC+0LzQu9C10L3QuNC5CiAgICAgICAgLy8g0LzQvtC20LXR\ngiDQv9GA0LjQvdC40LzQsNGC0Ywg0LfQvdCw0YfQtdC90LjRjyAndG9wJywg\nJ2JvdHRvbScKICAgICAgICAvLyDQv9C+INGD0LzQvtC70YfQsNC90LjRjiAn\nYm90dG9tJwogICAgICAgIHBvc2l0aW9uOiAnYm90dG9tJywKCiAgICAgICAg\nLy8g0LjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINC00LjQt9Cw0LnQvSBib290\nc3RyYXAg0LLQvNC10YHRgtC+INC+0LHRi9GH0L3QvtCz0L4KICAgICAgICAv\nLyDQtNC70Y8g0YDQsNCx0L7RgtGLINC+0L/RhtC40Lgg0LTQvtC70LbQvdCw\nINCx0YvRgtGMINC/0L7QtNC60LvRjtGH0LXQvdCwIGNzcy3QutCwIGJvb3Rz\ndGFyYXAt0LAKICAgICAgICAvLyDQv9C+INGD0LzQvtC70YfQsNC90LjRjiBm\nYWxzZQogICAgICAgIGJvb3RzdHJhcDogZmFsc2UKICAgIH0pOwp9KTsKYGBg\nCgojIyMjIC5zaG93KG9wdGlvbnMpCgrQn9C+0LrQsNC30YvQstCw0LXRgiDR\ng9Cy0LXQtNC+0LzQu9C10L3QuNC1CgpgYGBKYXZhU2NyaXB0CnJlcXVpcmUo\nWydub3RpZmljJ10sIGZ1bmN0aW9uKE5vdGlmaWMpewogICAgTm90aWZpYy5z\naG93KHsKICAgICAgICAvLyDQv9C+INGD0LzQvtC70YfQsNC90LjRjiAnTm90\naWZpY2F0aW9uJwogICAgICAgIHRpdGxlOiAnTm90aWZpY2F0aW9uIHRpdGxl\nJywKCiAgICAgICAgdGV4dDogJ05vdGlmaWNhdGlvbiBtZXNzYWdlJywKCiAg\nICAgICAgLy8g0LzQvtC20LXRgiDQv9GA0LjQvdC40LzQsNGC0Ywg0LfQvdCw\n0YfQtdC90LjRjyAnZGVmYXVsdCcsICdlcnJvcicsICdzdWNjZXNzJywgJ3dh\ncm5pbmcnCiAgICAgICAgLy8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4gZGVm\nYXVsdAogICAgICAgIHR5cGU6ICdkZWZhdWx0JywKCiAgICAgICAgLy8g0LLR\ngNC10LzRjyDQsNCy0YLQvtC30LDQutGA0YvRgtC40Y8g0YPQstC10LTQvtC8\n0LvQtdC90LjRjy4gZmFsc2Ug0LTQu9GPINC+0YLQvNC10L3RiyDQsNCy0YLQ\nvtC30LDQutGA0YvRgtC40Y8KICAgICAgICAvLyDQv9C+INGD0LzQvtC70YfQ\nsNC90LjRjiA1MDAwCiAgICAgICAgdGltZW91dDogZmFsc2UsCgogICAgICAg\nIC8vINC80L7QttC10YIg0L/RgNC40L3QuNC80LDRgtGMINC30L3QsNGH0LXQ\nvdC40Y8gJ3RvcCcsICdib3R0b20nCiAgICAgICAgLy8g0L/QviDRg9C80L7Q\nu9GH0LDQvdC40Y4gJ2JvdHRvbScKICAgICAgICAvLyBERVBSRUNBVEVECiAg\nICAgICAgcG9zaXRpb246ICdib3R0b20nCiAgICB9KTsKfSk7CmBgYAoKIyMj\nIyAuZXJyb3Iob3B0aW9ucykKCtCf0L7QutCw0LfRi9Cy0LDQtdGCINGD0LLQ\ntdC00L7QvNC70LXQvdC40LUg0L7QsSDQvtGI0LjQsdC60LUKCmBgYEphdmFT\nY3JpcHQKcmVxdWlyZShbJ25vdGlmaWMnXSwgZnVuY3Rpb24oTm90aWZpYyl7\nCiAgICBOb3RpZmljLmVycm9yKHsKICAgICAgICB0aXRsZTogJ05vdGlmaWNh\ndGlvbiB0aXRsZScsCiAgICAgICAgdGV4dDogJ05vdGlmaWNhdGlvbiBtZXNz\nYWdlJywKICAgICAgICB0aW1lb3V0OiA1MDAwLAogICAgICAgIHBvc2l0aW9u\nOiAnYm90dG9tJwogICAgfSk7Cn0pOwpgYGAKCiMjIyMgLnN1Y2Nlc3Mob3B0\naW9ucykKCtCf0L7QutCw0LfRi9Cy0LDQtdGCINGD0LLQtdC00L7QvNC70LXQ\nvdC40LUg0L7QsSDRg9GB0L/QtdGI0L3QvtC8INC00LXQudGB0YLQstC40Lgu\nCmBgYG9wdGlvbnNgYGAg0LjQtNC10L3RgtC40YfQvdGLINC+0L/RhtC40Y/Q\nvCDQvNC10YLQvtC00LAgYGBgLmVycm9yYGBgCgojIyMjIC53YXJuaW5nKG9w\ndGlvbnMpCgrQn9C+0LrQsNC30YvQstCw0LXRgiDQv9GA0LXQtNGD0L/RgNC1\n0LbQtNC10L3QuNC1LgpgYGBvcHRpb25zYGBgINC40LTQtdC90YLQuNGH0L3R\niyDQvtC/0YbQuNGP0Lwg0LzQtdGC0L7QtNCwIGBgYC5lcnJvcmBgYAoKI0Vu\nZ2xpc2gKKGNvbWluZyBzb29uKQo=\n',
//   encoding: 'base64',
//   _links: {
//     self: 'https://api.github.com/repos/ktsstudio/notific/contents/README.md?ref=master',
//     git: 'https://api.github.com/repos/ktsstudio/notific/git/blobs/0a49e4fdc2b7257a31d3495076fea3048e091bf4',
//     html: 'https://github.com/ktsstudio/notific/blob/master/README.md',
//   },
// };

const ProductPage: FC<IProductPageProps> = ({ list }) => {
  const [contributors, setContributors] = useState<TContributor[]>([]);
  const [readme, setReadme] = useState<TReadme | null>(null);
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [languages, setLanguages] = useState<any>([]);

  const navigate = useNavigate();
  const location = useLocation();

  const goToBack = () => navigate(-1);
  const { id } = useParams();
  const product = list.find((el) => String(el.id) === id);

  useEffect(() => {
    (async () => {
      if (product) {
        const requests = [
          getContributors(product.contributors_url),
          getLanguages(product.contributors_url),
          getReadme(product.contents_url, README_FILE_NAME),
        ];
        const [contributors, languages, readme] = await Promise.all(requests);
        setContributors(contributors);
        setLanguages(languages);
        setReadme(readme);
        setReadmeContent(decodeFromUint8Array(readme.content));
      }
    })();
  }, [product]);

  const renderSubs = [
    { count: product?.stargazers_count, text: 'stars' },
    { count: product?.watchers_count, text: 'warnings' },
    { count: product?.forks_count, text: 'forks' },
  ].map(({ count, text }) => (
    <Text key={text} tag="li" view="p-14" weight="bold" color="secondary">
      {count} <span>{text}</span>
    </Text>
  ));

  const langValues: any[] = Object.values(languages);
  const oneLanguagesSum = langValues.reduce((acc, count) => acc + count, 0) / 100;
  const languagesWithPercent = Object.entries(languages).map(([name, count]) => ({
    name,
    percent: +(count / oneLanguagesSum).toFixed(1),
    color: randomRGBColor(),
  }));

  return (
    <div className={css.product}>
      <header className={css.product__header}>
        <ArrowBackIcon width="32" height="32" onClick={goToBack} color="accent" />
        <img src={product?.owner.avatar_url} width="40" height="40" alt="repo-avatar" />
        <Text tag="h2" view="title">
          {product?.name}
        </Text>
      </header>

      <Link className={css.product__homepage} to={product?.homepage || location.pathname}>
        <img width="16px" height="16px" src={link} alt="link-logo" />
        {product?.homepage ? (
          <>
            <Text tag="p" view="p-16" weight="bold" stylesProps={{ color: 'red' }}>
              {product?.homepage}
            </Text>
          </>
        ) : (
          'no link'
        )}
      </Link>

      <ul className={css.product__tags}>
        {product?.topics.map((el) => (
          <li key={el.toString()} className={css.product__tag}>
            {el}
          </li>
        ))}
      </ul>

      <ul className={css.product__subs}>{renderSubs}</ul>

      <div className={css.product__info}>
        <div className={css.contributors}>
          <Text tag="h4">
            <Text weight="bold" view="p-18" tag="span">
              Contributors
            </Text>
            <Text tag="span">{contributors.length}</Text>
          </Text>

          <ul className={css.contributors__list}>
            {contributors.map((cont) => (
              <li key={cont.node_id} className={css.contributors__item}>
                <img width="32" height="32" src={cont.avatar_url} alt="avatar" />
                <Text tag="h4" view="p-16" weight="bold">
                  {cont.login}
                </Text>
                <Text tag="h4" view="p-16" color="secondary">
                  {cont.node_id}
                </Text>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.product__languages}>
          <Text tag="h4" weight="bold" view="p-18">
            Languages
          </Text>

          <div className={css.languages__range}>
            {languagesWithPercent.map(({ name, percent, color }) => (
              <div
                className={css.range__item}
                key={name}
                style={{ width: `${percent}%`, backgroundColor: color }}
              ></div>
            ))}
          </div>

          <ul className={css.languages__list}>
            {languagesWithPercent.map(({ name, percent, color }) => (
              <li key={name} className={css.languages__item}>
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <circle cx="4" cy="4" r="4" fill={color} />
                </svg>

                <Text color="primary" tag="p">
                  {name}
                  <span>{percent}%</span>
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={css.product__readme}>
        <Text tag="h5" view="p-12" weight="bold" stylesProps={{ padding: 'var(--space-m)' }}>
          {readme?.name}
        </Text>

        <pre className={css.content}>{readmeContent}</pre>
      </div>

      {/* link ---> cont.html_url */}
      {/* <Text>{product?.description}</Text> */}
    </div>
  );
};
export default ProductPage;
