export interface GitHubProfile {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  bio: string | null
  location: string | null
  public_repos: number
  created_at: string
}

export interface GitHubRepository {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  fork: boolean
  archived: boolean
  updated_at: string
}

export interface GitHubData {
  profile: GitHubProfile
  repositories: GitHubRepository[]
}
