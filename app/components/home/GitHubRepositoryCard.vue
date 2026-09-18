<script setup lang="ts">
import type { GitHubRepository } from '~/types/github'

const props = withDefaults(
  defineProps<{
    repository: GitHubRepository
    accent?: 'info' | 'primary'
  }>(),
  {
    accent: 'primary',
  },
)

const { t } = useI18n()

const language = computed(
  () =>
    props.repository.language || t('home.about.repositories.languageFallback'),
)

const linkLabel = computed(
  () =>
    `${t('home.about.repositories.viewRepository')}: ${props.repository.name}`,
)
</script>

<template>
  <article class="repository-card">
    <div class="repository-heading">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
      >
        <path
          d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z"
        />
      </svg>

      <h3>{{ repository.name }}</h3>
    </div>

    <p class="repository-description">
      {{
        repository.description ||
        t('home.about.repositories.descriptionFallback')
      }}
    </p>

    <div class="repository-footer">
      <p class="repository-language">
        <span
          class="repository-language-dot"
          :class="{
            'repository-language-dot-info': accent === 'info',
            'repository-language-dot-primary': accent === 'primary',
          }"
          aria-hidden="true"
        />

        {{ language }}
      </p>

      <a
        :href="repository.html_url"
        target="_blank"
        rel="noopener noreferrer"
        class="repository-link"
        :aria-label="linkLabel"
      >
        {{ t('home.about.repositories.viewRepository') }}

        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <path d="M5 12h14" />
          <path d="m14 7 5 5-5 5" />
        </svg>
      </a>
    </div>
  </article>
</template>

<style scoped>
.repository-card {
  display: flex;
  min-height: 10rem;
  flex-direction: column;
  border: 1px solid rgb(var(--color-border));
  border-radius: 0.875rem;
  padding: 1.25rem;
  background:
    linear-gradient(145deg, rgb(255 255 255 / 2%), transparent 42%),
    rgb(var(--color-surface) / 88%);
  color: rgb(var(--color-body));
  transition:
    border-color 240ms ease,
    box-shadow 240ms ease,
    transform 240ms ease;
}

.repository-card:hover {
  border-color: rgb(var(--color-primary-light) / 44%);
  box-shadow:
    0 16px 36px rgb(0 0 0 / 16%),
    0 0 28px rgb(var(--color-primary) / 10%);
  transform: translateY(-3px);
}

.repository-heading {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.65rem;
  color: rgb(var(--color-heading));
}

.repository-heading > svg {
  flex-shrink: 0;
  color: rgb(var(--color-muted));
}

.repository-heading h3 {
  overflow: hidden;
  font-size: 0.875rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.repository-description {
  overflow: hidden;
  min-height: 2.325rem;
  max-height: 2.325rem;
  margin-top: 0.9rem;
  color: rgb(var(--color-muted));
  font-size: 0.75rem;
  line-height: 1.55;
}

.repository-footer {
  border-top: 1px solid rgb(var(--color-border));
  margin-top: auto;
  padding-top: 0.9rem;
}

.repository-language {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: rgb(var(--color-body));
  font-size: 0.6875rem;
}

.repository-language-dot {
  width: 0.4rem;
  height: 0.4rem;
  flex-shrink: 0;
  border-radius: 50%;
}

.repository-language-dot-info {
  background: rgb(var(--color-info));
  box-shadow: 0 0 8px rgb(var(--color-info) / 55%);
}

.repository-language-dot-primary {
  background: rgb(var(--color-primary-light));
  box-shadow: 0 0 8px rgb(var(--color-primary-light) / 55%);
}

.repository-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.75rem;
  color: rgb(var(--color-primary-light));
  font-size: 0.6875rem;
  font-weight: 600;
  transition:
    color 200ms ease,
    gap 200ms ease;
}

.repository-link:hover {
  gap: 0.65rem;
  color: rgb(var(--color-heading));
}

.repository-link:focus-visible {
  border-radius: 0.25rem;
  outline: 2px solid rgb(var(--color-primary-light));
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .repository-card,
  .repository-link {
    transition: none;
  }
}
</style>
