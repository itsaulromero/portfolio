<script setup lang="ts">
import { projects } from '~/data/projects'

const { t } = useI18n()
</script>

<template>
  <section
    id="projects"
    class="projects-section"
    aria-labelledby="projects-title"
  >
    <div class="projects-container">
      <header class="projects-header">
        <p class="projects-eyebrow">
          <span class="projects-eyebrow-dot" aria-hidden="true" />
          {{ t('home.projects.eyebrow') }}
        </p>

        <h2 id="projects-title" class="projects-title">
          {{ t('home.projects.title') }}
        </h2>

        <p class="projects-description">
          {{ t('home.projects.description') }}
        </p>
      </header>

      <div class="projects-grid">
        <HomeProjectCard
          v-for="project in projects"
          :key="project.slug"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  scroll-margin-top: 5rem;
  background-color: rgb(var(--color-background));
}

.projects-container {
  min-height: 100svh;
  max-width: 76.5rem;
  margin-inline: auto;
  padding: 7rem 1.5rem 8rem;
}

.projects-header {
  max-width: 45rem;
}

.projects-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgb(var(--color-primary-light) / 42%);
  border-radius: 9999px;
  padding: 0.3rem 0.65rem;
  background: rgb(var(--color-primary) / 8%);
  color: rgb(var(--color-primary-light));
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.projects-eyebrow-dot {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background: rgb(var(--color-primary-light));
  box-shadow: 0 0 8px rgb(var(--color-primary-light) / 65%);
}

.projects-title {
  margin-top: 1rem;
  color: rgb(var(--color-heading));
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.projects-description {
  margin-top: 0.85rem;
  color: rgb(var(--color-body));
  font-size: 1rem;
  line-height: 1.75;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  max-width: 51rem;
  margin-top: 3rem;
  gap: 2rem;
}

@media (width <= 768px) {
  .projects-container {
    min-height: auto;
    padding-block: 6rem;
  }

  .projects-grid {
    grid-template-columns: minmax(0, 1fr);
    max-width: 28rem;
  }
}

@media (width <= 640px) {
  .projects-container {
    padding: 5rem 1.25rem 6rem;
  }

  .projects-description {
    font-size: 0.9375rem;
  }

  .projects-grid {
    margin-top: 2.5rem;
  }
}
</style>
