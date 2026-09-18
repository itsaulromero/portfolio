<script setup lang="ts">
import type { Project } from '~/types/project'

defineProps<{
  project: Project
}>()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <article class="project-card">
    <div class="project-image-container">
      <img
        :src="project.image"
        :alt="t(project.imageAltKey)"
        width="800"
        height="450"
        loading="lazy"
        decoding="async"
        class="project-image"
      />
    </div>

    <div class="project-content">
      <header class="project-header">
        <div class="project-category">
          <span>{{ t(project.typeKey) }}</span>

          <span v-if="project.featured" class="project-featured">
            {{ t('home.projects.featured') }}
          </span>
        </div>

        <h3 class="project-title">
          {{ project.title }}
        </h3>

        <p class="project-meta">
          {{ t(project.metaKey) }}
        </p>
      </header>

      <p class="project-description">
        {{ t(project.descriptionKey) }}
      </p>

      <ul
        class="project-technologies"
        :aria-label="t('home.projects.technologiesLabel')"
      >
        <li
          v-for="technology in project.technologies"
          :key="technology"
          class="project-technology"
        >
          {{ technology }}
        </li>
      </ul>

      <footer class="project-footer">
        <NuxtLink
          :to="
            localePath({
              name: 'projects-slug',
              params: { slug: project.slug },
            })
          "
          class="project-link project-detail-link"
          :aria-label="
            t('home.projects.actions.viewDetailLabel', {
              project: project.title,
            })
          "
        >
          {{ t('home.projects.actions.viewDetail') }}
        </NuxtLink>

        <a
          :href="project.externalLink.href"
          target="_blank"
          rel="noopener noreferrer"
          class="project-link"
          :aria-label="t(project.externalLink.accessibleLabelKey)"
        >
          <span>{{ t(project.externalLink.labelKey) }}</span>

          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            class="project-link-icon"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </footer>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  min-width: 0;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgb(var(--color-border));
  border-radius: 1.125rem;
  background: rgb(var(--color-surface) / 62%);
  transition:
    border-color 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.project-card:hover {
  border-color: rgb(var(--color-primary-light) / 48%);
  box-shadow: 0 20px 46px rgb(0 0 0 / 18%);
  transform: translateY(-4px);
}

.project-image-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-bottom: 1px solid rgb(var(--color-border));
  background: rgb(var(--color-background));
}

.project-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms ease;
}

.project-card:hover .project-image {
  transform: scale(1.025);
}

.project-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.75rem;
}

.project-header {
  min-width: 0;
}

.project-category {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: rgb(var(--color-primary-light));
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.project-featured {
  border: 1px solid rgb(var(--color-primary-light) / 35%);
  border-radius: 0.35rem;
  padding: 0.2rem 0.5rem;
  background: rgb(var(--color-primary) / 10%);
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: normal;
  text-transform: none;
}

.project-title {
  margin-top: 1.1rem;
  color: rgb(var(--color-heading));
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.project-meta {
  margin-top: 0.45rem;
  color: rgb(var(--color-muted));
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    monospace;
  font-size: 0.75rem;
  line-height: 1.5;
}

.project-description {
  margin-top: 1rem;
  color: rgb(var(--color-body));
  font-size: 0.9375rem;
  line-height: 1.65;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: 1.25rem 0 0;
  padding: 0;
  list-style: none;
}

.project-technology {
  border: 1px solid rgb(var(--color-border));
  border-radius: 0.45rem;
  padding: 0.3rem 0.6rem;
  background: rgb(var(--color-background) / 45%);
  color: rgb(var(--color-body));
  font-size: 0.6875rem;
  line-height: 1rem;
}

.project-footer {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  border-top: 1px solid rgb(var(--color-border));
  margin-top: auto;
  padding-top: 1.25rem;
}

.project-link {
  display: inline-flex;
  min-height: 2.5rem;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  border-radius: 0.625rem;
  padding-inline: 0.75rem;
  color: rgb(var(--color-heading));
  font-size: 0.8125rem;
  font-weight: 600;
  transition:
    background-color 180ms ease,
    color 180ms ease;
}

.project-detail-link {
  color: #fff;
  background: rgb(var(--color-primary));
  box-shadow: 0 0.75rem 1.75rem rgb(var(--color-primary) / 18%);
}

.project-link:hover {
  background: rgb(var(--color-primary) / 10%);
  color: rgb(var(--color-primary-light));
}

.project-detail-link:hover {
  color: #fff;
  background: rgb(var(--color-primary-light));
}

.project-link:focus-visible {
  outline: 2px solid rgb(var(--color-primary-light));
  outline-offset: 3px;
}

.project-link-icon {
  width: 1rem;
  height: 1rem;
}

:global(.light) .project-card {
  background: rgb(var(--color-surface) / 88%);
}

:global(.light) .project-card:hover {
  box-shadow: 0 20px 42px rgb(15 23 42 / 12%);
}

@media (width <= 640px) {
  .project-content {
    padding: 1.4rem;
  }

  .project-title {
    font-size: 1.35rem;
  }

  .project-footer {
    flex-direction: column;
  }

  .project-link {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-image {
    transition: none;
  }

  .project-card:hover,
  .project-card:hover .project-image {
    transform: none;
  }
}
</style>
