<script setup lang="ts">
import {
  siCss,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLaravel,
  siPhp,
  siPostgresql,
  siTailwindcss,
} from 'simple-icons'
import type { SimpleIcon } from 'simple-icons'

const { t } = useI18n()

interface Technology {
  name: string
  icon: SimpleIcon
  color: string
}

interface TechnologyGroup {
  id: string
  labelKey: string
  columns: number
  technologies: Technology[]
}

const technologyGroups: TechnologyGroup[] = [
  {
    id: 'frontend',
    labelKey: 'home.technologies.groups.frontend',
    columns: 4,
    technologies: [
      {
        name: 'HTML5',
        icon: siHtml5,
        color: `#${siHtml5.hex}`,
      },
      {
        name: 'CSS3',
        icon: siCss,
        color: `#${siCss.hex}`,
      },
      {
        name: 'JavaScript',
        icon: siJavascript,
        color: `#${siJavascript.hex}`,
      },
      {
        name: 'Tailwind CSS',
        icon: siTailwindcss,
        color: `#${siTailwindcss.hex}`,
      },
    ],
  },
  {
    id: 'backend',
    labelKey: 'home.technologies.groups.backend',
    columns: 3,
    technologies: [
      {
        name: 'PHP',
        icon: siPhp,
        color: `#${siPhp.hex}`,
      },
      {
        name: 'Laravel',
        icon: siLaravel,
        color: `#${siLaravel.hex}`,
      },
      {
        name: 'PostgreSQL',
        icon: siPostgresql,
        color: `#${siPostgresql.hex}`,
      },
    ],
  },
  {
    id: 'tools',
    labelKey: 'home.technologies.groups.tools',
    columns: 2,
    technologies: [
      {
        name: 'Git',
        icon: siGit,
        color: `#${siGit.hex}`,
      },
      {
        name: 'GitHub',
        icon: siGithub,
        color: 'rgb(var(--color-heading))',
      },
    ],
  },
]
</script>

<template>
  <section
    id="technologies"
    class="technologies-section"
    aria-labelledby="technologies-title"
  >
    <div class="technologies-container">
      <header class="technologies-header">
        <h2 id="technologies-title" class="technologies-title">
          {{ t('home.technologies.title') }}
        </h2>

        <p class="technologies-description">
          {{ t('home.technologies.description') }}
        </p>
      </header>

      <div class="technology-groups">
        <section
          v-for="group in technologyGroups"
          :key="group.id"
          class="technology-group"
          :aria-labelledby="`technology-group-${group.id}`"
        >
          <h3 :id="`technology-group-${group.id}`" class="sr-only">
            {{ t(group.labelKey) }}
          </h3>

          <ul
            class="technology-list"
            :style="{ '--technology-columns': String(group.columns) }"
          >
            <HomeTechnologyCard
              v-for="technology in group.technologies"
              :key="technology.name"
              :name="technology.name"
              :icon="technology.icon"
              :color="technology.color"
            />
          </ul>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped>
.technologies-section {
  scroll-margin-top: 5rem;
  background-color: rgb(var(--color-background));
}

.technologies-container {
  min-height: 100svh;
  max-width: 76.5rem;
  margin-inline: auto;
  padding: 7rem 1.5rem 8rem;
}

.technologies-header {
  max-width: 45rem;
  margin-inline: auto;
  text-align: center;
}

.technologies-title {
  color: rgb(var(--color-heading));
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.025em;
}

.technologies-description {
  margin-top: 1.5rem;
  color: rgb(var(--color-body));
  font-size: 1rem;
  line-height: 1.75;
}

.technology-groups {
  display: grid;
  width: min(100%, 31.75rem);
  margin: 4.75rem auto 0;
  gap: 6rem;
}

.technology-group {
  min-width: 0;
}

.technology-list {
  display: grid;
  grid-template-columns: repeat(var(--technology-columns), 7rem);
  justify-content: start;
  gap: 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (width <= 768px) {
  .technologies-container {
    min-height: auto;
    padding-block: 6rem;
  }

  .technology-groups {
    margin-top: 4rem;
    gap: 4rem;
  }
}

@media (width <= 640px) {
  .technologies-container {
    padding: 5rem 1.25rem 6rem;
  }

  .technologies-description {
    font-size: 0.9375rem;
  }

  .technology-groups {
    margin-top: 3.5rem;
    gap: 2.5rem;
  }

  .technology-list {
    grid-template-columns: repeat(2, 7rem);
    justify-content: center;
  }
}

@media (width <= 360px) {
  .technology-list {
    grid-template-columns: repeat(2, 6.5rem);
    gap: 0.75rem;
  }
}
</style>
