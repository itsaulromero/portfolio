<script setup lang="ts">
import { projects } from '~/data/projects'

defineI18nRoute({
  paths: {
    es: '/proyectos/[slug]',
    en: '/projects/[slug]',
  },
})

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

const routeSlug = Array.isArray(route.params.slug)
  ? route.params.slug[0]
  : route.params.slug

const project = projects.find((item) => item.slug === routeSlug)

if (!project) {
  throw createError({
    statusCode: 404,
    statusMessage: t('home.projects.detailPage.notFound'),
  })
}

const projectsHref = computed(() => `${localePath('/')}#projects`)

useSeoMeta({
  title: () =>
    t('home.projects.detailPage.seoTitle', {
      project: project.title,
    }),
  description: () => t(project.descriptionKey),
  ogTitle: () =>
    t('home.projects.detailPage.seoTitle', {
      project: project.title,
    }),
  ogDescription: () => t(project.descriptionKey),
  ogImage: project.image,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <main class="project-detail-page">
    <article class="project-detail-container">
      <NuxtLink :to="projectsHref" class="back-link">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>

        <span>{{ t('home.projects.detailPage.back') }}</span>
      </NuxtLink>

      <header class="project-header">
        <div class="project-header-content">
          <div class="project-labels">
            <p class="project-type">
              <span class="project-type-dot" aria-hidden="true" />
              {{ t(project.typeKey) }}
            </p>

            <span v-if="project.featured" class="featured-badge">
              {{ t('home.projects.featured') }}
            </span>
          </div>

          <h1>{{ project.title }}</h1>

          <p class="project-meta">
            {{ t(project.metaKey) }}
          </p>

          <p class="project-introduction">
            {{ t(project.descriptionKey) }}
          </p>

          <a
            :href="project.externalLink.href"
            target="_blank"
            rel="noopener noreferrer"
            class="external-link"
            :aria-label="t(project.externalLink.accessibleLabelKey)"
          >
            <span>{{ t(project.externalLink.labelKey) }}</span>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
              />
            </svg>
          </a>
        </div>

        <figure class="project-image-frame">
          <img
            :src="project.image"
            :alt="t(project.imageAltKey)"
            class="project-image"
          />
        </figure>
      </header>

      <div class="project-content-grid">
        <section
          class="detail-panel detail-panel-wide"
          aria-labelledby="project-overview-title"
        >
          <p class="section-number" aria-hidden="true">01</p>

          <div>
            <h2 id="project-overview-title">
              {{ t('home.projects.detailPage.overview') }}
            </h2>

            <p>{{ t(project.detail.overviewKey) }}</p>
          </div>
        </section>

        <section class="detail-panel" aria-labelledby="project-challenge-title">
          <p class="section-number" aria-hidden="true">02</p>

          <div>
            <h2 id="project-challenge-title">
              {{ t('home.projects.detailPage.challenge') }}
            </h2>

            <p>{{ t(project.detail.challengeKey) }}</p>
          </div>
        </section>

        <section class="detail-panel" aria-labelledby="project-solution-title">
          <p class="section-number" aria-hidden="true">03</p>

          <div>
            <h2 id="project-solution-title">
              {{ t('home.projects.detailPage.solution') }}
            </h2>

            <p>{{ t(project.detail.solutionKey) }}</p>
          </div>
        </section>

        <section
          class="detail-panel detail-panel-wide"
          aria-labelledby="project-role-title"
        >
          <p class="section-number" aria-hidden="true">04</p>

          <div>
            <h2 id="project-role-title">
              {{ t('home.projects.detailPage.role') }}
            </h2>

            <p>{{ t(project.detail.roleKey) }}</p>
          </div>
        </section>
      </div>

      <div class="project-summary-grid">
        <section
          class="summary-panel"
          aria-labelledby="project-highlights-title"
        >
          <h2 id="project-highlights-title">
            {{ t('home.projects.detailPage.highlights') }}
          </h2>

          <ul class="highlights-list">
            <li
              v-for="highlightKey in project.detail.highlightsKeys"
              :key="highlightKey"
            >
              <span class="highlight-marker" aria-hidden="true" />
              <span>{{ t(highlightKey) }}</span>
            </li>
          </ul>
        </section>

        <section
          class="summary-panel"
          aria-labelledby="project-technologies-title"
        >
          <h2 id="project-technologies-title">
            {{ t('home.projects.detailPage.technologies') }}
          </h2>

          <ul class="technology-list">
            <li
              v-for="technology in project.technologies"
              :key="technology"
              class="technology-item"
            >
              {{ technology }}
            </li>
          </ul>
        </section>
      </div>
    </article>
  </main>
</template>

<style scoped>
.project-detail-page {
  min-height: 100vh;
  padding: clamp(7rem, 12vw, 9rem) 1.5rem 6rem;
  color: rgb(var(--color-text, 248 250 252));
}

.project-detail-container {
  width: min(100%, 90rem);
  margin-inline: auto;
}

.back-link {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 2.5rem;
  color: rgb(var(--color-muted, 148 163 184));
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    color 180ms ease,
    transform 180ms ease;
}

.back-link svg {
  width: 1.1rem;
  height: 1.1rem;
}

.back-link:hover {
  color: rgb(var(--color-primary, 96 165 250));
  transform: translateX(-0.2rem);
}

.back-link:focus-visible {
  border-radius: 0.5rem;
  outline: 2px solid rgb(var(--color-primary, 96 165 250));
  outline-offset: 0.3rem;
}

.project-header {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(25rem, 1.1fr);
  gap: clamp(2.5rem, 6vw, 6rem);
  align-items: center;
}

.project-header-content h1 {
  max-width: 12ch;
  margin: 1rem 0 0;
  font-size: clamp(2.75rem, 6vw, 5rem);
  line-height: 0.98;
  letter-spacing: -0.055em;
}

.project-labels {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.project-type,
.featured-badge {
  display: inline-flex;
  align-items: center;
  min-height: 1.75rem;
  border: 1px solid rgb(var(--color-border, 51 65 85));
  border-radius: 999px;
  padding-inline: 0.75rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.project-type {
  gap: 0.45rem;
  margin: 0;
  color: rgb(var(--color-primary, 96 165 250));
}

.project-type-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: currentcolor;
  box-shadow: 0 0 0.75rem currentcolor;
}

.featured-badge {
  color: rgb(147 197 253);
  background: rgb(59 130 246 / 10%);
}

.project-meta {
  margin: 1.15rem 0 0;
  color: rgb(var(--color-muted, 148 163 184));
  font-family: monospace;
  font-size: 0.875rem;
}

.project-introduction {
  max-width: 40rem;
  margin: 1.5rem 0 0;
  color: rgb(var(--color-muted, 148 163 184));
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.8;
}

.external-link {
  display: inline-flex;
  gap: 0.65rem;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  margin-top: 2rem;
  border: 1px solid rgb(var(--color-primary, 96 165 250));
  border-radius: 999px;
  padding: 0.7rem 1.25rem;
  color: rgb(255 255 255);
  background: rgb(37 121 222);
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 0.8rem 2rem rgb(37 121 222 / 18%);
  transition:
    background-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.external-link svg {
  width: 1rem;
  height: 1rem;
}

.external-link:hover {
  background: rgb(29 105 196);
  box-shadow: 0 1rem 2.5rem rgb(37 121 222 / 28%);
  transform: translateY(-0.15rem);
}

.project-image-frame {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  margin: 0;
  border: 1px solid rgb(var(--color-border, 51 65 85));
  border-radius: 1.5rem;
  background: #15151a;
  box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 25%);
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-content-grid,
.project-summary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: clamp(4rem, 8vw, 7rem);
}

.project-content-grid {
  counter-reset: detail-section;
}

.detail-panel,
.summary-panel {
  border: 1px solid rgb(var(--color-border, 51 65 85));
  border-radius: 1.25rem;
  background: #0f0f12;
}

.detail-panel {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 1.25rem;
  padding: clamp(1.5rem, 3vw, 2.25rem);
}

.detail-panel-wide {
  grid-column: 1 / -1;
}

.section-number {
  margin: 0;
  color: rgb(var(--color-primary, 96 165 250));
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 700;
}

.detail-panel h2,
.summary-panel h2 {
  margin: 0;
  font-size: clamp(1.15rem, 2vw, 1.4rem);
  letter-spacing: -0.025em;
}

.detail-panel p:not(.section-number) {
  margin: 1rem 0 0;
  color: rgb(var(--color-muted, 148 163 184));
  line-height: 1.75;
}

.project-summary-grid {
  margin-top: 1.25rem;
}

.summary-panel {
  padding: clamp(1.5rem, 3vw, 2.25rem);
}

.highlights-list,
.technology-list {
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}

.highlights-list {
  display: grid;
  gap: 1rem;
}

.highlights-list li {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  color: rgb(var(--color-muted, 148 163 184));
  line-height: 1.6;
}

.highlight-marker {
  flex: 0 0 auto;
  width: 0.45rem;
  height: 0.45rem;
  margin-top: 0.5rem;
  border-radius: 50%;
  background: rgb(52 211 153);
  box-shadow: 0 0 0.75rem rgb(52 211 153 / 65%);
}

.technology-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.technology-item {
  border: 1px solid rgb(var(--color-border, 51 65 85));
  border-radius: 999px;
  padding: 0.55rem 0.85rem;
  color: rgb(var(--color-muted, 148 163 184));
  background: #15151a;
  font-size: 0.8rem;
  font-weight: 600;
}

@media (width <= 64rem) {
  .project-header {
    grid-template-columns: 1fr;
  }

  .project-image-frame {
    order: -1;
  }

  .project-header-content h1 {
    max-width: none;
  }
}

@media (width <= 44rem) {
  .project-detail-page {
    padding-inline: 1rem;
  }

  .project-content-grid,
  .project-summary-grid {
    grid-template-columns: 1fr;
  }

  .detail-panel-wide {
    grid-column: auto;
  }

  .detail-panel {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .external-link {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .back-link,
  .external-link {
    transition: none;
  }

  .back-link:hover,
  .external-link:hover {
    transform: none;
  }
}

.external-link:focus-visible {
  border-radius: 0.5rem;
  outline: 2px solid rgb(var(--color-primary, 96 165 250));
  outline-offset: 0.3rem;
}
</style>
<style>
html.light .project-detail-page {
  color: #0f172a;
}

html.light .project-header-content h1,
html.light .detail-panel h2,
html.light .summary-panel h2 {
  color: #0f172a;
}

html.light .project-meta,
html.light .project-introduction,
html.light .detail-panel p:not(.section-number),
html.light .highlights-list li {
  color: #475569;
}

html.light .project-image-frame,
html.light .detail-panel,
html.light .summary-panel {
  border-color: #cbd5e1;
  background: #fff;
  box-shadow: 0 1.25rem 3rem rgb(15 23 42 / 7%);
}

html.light .technology-item {
  border-color: #cbd5e1;
  color: #334155;
  background: #f8fafc;
}
</style>
