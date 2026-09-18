import type {
  GitHubData,
  GitHubProfile,
  GitHubRepository,
} from '~/types/github'

const GITHUB_USERNAME = 'itsaulromero'
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`

const githubHeaders = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2026-03-10',
}

export function useGitHubData() {
  return useLazyAsyncData<GitHubData>(
    'github-data',
    async () => {
      const [profile, repositories] = await Promise.all([
        $fetch<GitHubProfile>(GITHUB_API_URL, {
          headers: githubHeaders,
        }),
        $fetch<GitHubRepository[]>(`${GITHUB_API_URL}/repos`, {
          headers: githubHeaders,
          query: {
            type: 'owner',
            sort: 'updated',
            direction: 'desc',
            per_page: 6,
          },
        }),
      ])

      return {
        profile,
        repositories: repositories
          .filter((repository) => !repository.fork && !repository.archived)
          .slice(0, 2),
      }
    },
    {
      server: false,
    },
  )
}
