export interface ProjectExternalLink {
  href: string
  labelKey: string
  accessibleLabelKey: string
}

export interface ProjectDetail {
  overviewKey: string
  challengeKey: string
  solutionKey: string
  roleKey: string
  highlightsKeys: readonly string[]
}

export interface Project {
  slug: string
  title: string
  image: string
  imageAltKey: string
  typeKey: string
  metaKey: string
  descriptionKey: string
  technologies: readonly string[]
  featured: boolean
  externalLink: ProjectExternalLink
  detail: ProjectDetail
}
