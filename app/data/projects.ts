import type { Project } from '~/types/project'

export const projects: readonly Project[] = [
  {
    slug: 'sim-cle',
    title: 'SIM de la CLE',
    image: '/images/projects/sim-cle.webp',
    imageAltKey: 'home.projects.items.simCle.imageAlt',
    typeKey: 'home.projects.items.simCle.type',
    metaKey: 'home.projects.items.simCle.meta',
    descriptionKey: 'home.projects.items.simCle.description',
    technologies: ['Laravel 11', 'Livewire 3', 'Tailwind CSS 4', 'PostgreSQL'],
    featured: true,
    externalLink: {
      href: 'https://sim-cle.morelia.tecnm.mx/login',
      labelKey: 'home.projects.actions.visitSystem',
      accessibleLabelKey: 'home.projects.items.simCle.externalLabel',
    },
    detail: {
      overviewKey: 'home.projects.items.simCle.detail.overview',
      challengeKey: 'home.projects.items.simCle.detail.challenge',
      solutionKey: 'home.projects.items.simCle.detail.solution',
      roleKey: 'home.projects.items.simCle.detail.role',
      highlightsKeys: [
        'home.projects.items.simCle.detail.highlights.leadership',
        'home.projects.items.simCle.detail.highlights.fullStack',
        'home.projects.items.simCle.detail.highlights.teamwork',
      ],
    },
  },
  {
    slug: 'portfolio',
    title: 'Portafolio personal',
    image: '/images/projects/portfolio.webp',
    imageAltKey: 'home.projects.items.portfolio.imageAlt',
    typeKey: 'home.projects.items.portfolio.type',
    metaKey: 'home.projects.items.portfolio.meta',
    descriptionKey: 'home.projects.items.portfolio.description',
    technologies: ['Nuxt', 'TypeScript', 'Tailwind CSS', 'GitHub API'],
    featured: false,
    externalLink: {
      href: 'https://github.com/itsaulromero/portfolio',
      labelKey: 'home.projects.actions.viewRepository',
      accessibleLabelKey: 'home.projects.items.portfolio.externalLabel',
    },
    detail: {
      overviewKey: 'home.projects.items.portfolio.detail.overview',
      challengeKey: 'home.projects.items.portfolio.detail.challenge',
      solutionKey: 'home.projects.items.portfolio.detail.solution',
      roleKey: 'home.projects.items.portfolio.detail.role',
      highlightsKeys: [
        'home.projects.items.portfolio.detail.highlights.i18n',
        'home.projects.items.portfolio.detail.highlights.github',
        'home.projects.items.portfolio.detail.highlights.accessibility',
      ],
    },
  },
]
