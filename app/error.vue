<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const { locale, t } = useI18n()

const statusCode = computed(() => props.error.statusCode || 500)
const isNotFound = computed(() => statusCode.value === 404)

const titleKey = computed(() =>
  isNotFound.value ? 'errorPage.notFound.title' : 'errorPage.general.title',
)

const descriptionKey = computed(() =>
  isNotFound.value
    ? 'errorPage.notFound.description'
    : 'errorPage.general.description',
)

const homePath = computed(() => (locale.value === 'en' ? '/en' : '/'))

useHead(() => ({
  title: `${statusCode.value} | ${t(titleKey.value)}`,
  htmlAttrs: {
    lang: locale.value === 'en' ? 'en' : 'es-MX',
  },
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
}))

const handleReturnHome = async () => {
  await clearError({
    redirect: homePath.value,
  })
}
</script>

<template>
  <div class="error-page">
    <header class="error-header">
      <div class="error-brand">
        <span class="brand-prefix">src</span>
        <span>Saúl Romero</span>
      </div>

      <ThemeToggle />
    </header>

    <main class="error-content">
      <article class="error-card">
        <p class="error-eyebrow">
          {{ t('errorPage.eyebrow') }}
        </p>

        <p class="error-code" aria-hidden="true">
          {{ statusCode }}
        </p>

        <h1>
          {{ t(titleKey) }}
        </h1>

        <p class="error-description">
          {{ t(descriptionKey) }}
        </p>

        <button type="button" class="home-button" @click="handleReturnHome">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            class="home-button-icon"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>

          <span>{{ t('errorPage.action') }}</span>
        </button>

        <p class="error-support">
          {{ t('errorPage.support') }}
        </p>
      </article>
    </main>
  </div>
</template>

<style scoped>
.error-page {
  display: grid;
  min-height: 100vh;
  min-height: 100dvh;
  grid-template-rows: auto 1fr;
  overflow: hidden;
  background: rgb(var(--color-background));
  color: rgb(var(--color-body));
}

.error-header {
  display: flex;
  width: min(100%, 80rem);
  align-items: center;
  justify-content: space-between;
  margin-inline: auto;
  padding: 1.5rem;
}

.error-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: rgb(var(--color-heading));
  font-size: 0.95rem;
  font-weight: 600;
}

.brand-prefix {
  border-radius: 0.25rem;
  padding: 0.25rem 0.45rem;
  background: rgb(var(--color-primary) / 10%);
  color: rgb(var(--color-primary-light));
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    monospace;
  font-size: 0.7rem;
  font-weight: 500;
}

.error-content {
  display: grid;
  place-items: center;
  padding: 2rem 1.5rem 7rem;
}

.error-card {
  width: min(100%, 42rem);
  border: 1px solid rgb(var(--color-border));
  border-radius: 1.25rem;
  padding: clamp(2rem, 6vw, 4rem);
  background: rgb(var(--color-surface) / 82%);
  text-align: center;
  box-shadow:
    0 1.5rem 4rem rgb(0 0 0 / 16%),
    0 1.5rem 4rem rgb(var(--color-primary) / 9%);
}

.error-eyebrow {
  color: rgb(var(--color-primary-light));
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.error-code {
  margin-top: 1.5rem;
  color: rgb(var(--color-primary-light));
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    monospace;
  font-size: clamp(4.5rem, 16vw, 8rem);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.08em;
}

.error-card h1 {
  margin-top: 1.75rem;
  color: rgb(var(--color-heading));
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.035em;
}

.error-description {
  max-width: 31rem;
  margin: 1.25rem auto 0;
  color: rgb(var(--color-body));
  font-size: 1rem;
  line-height: 1.7;
}

.home-button {
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  border: 0;
  border-radius: 0.7rem;
  margin-top: 2rem;
  padding: 0.75rem 1.25rem;
  background: rgb(var(--color-primary));
  color: white;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 0.8rem 2rem rgb(var(--color-primary) / 22%);
  transition:
    background-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.home-button:hover {
  background: rgb(var(--color-primary-light));
  box-shadow: 0 1rem 2.25rem rgb(var(--color-primary) / 30%);
  transform: translateY(-2px);
}

.home-button:focus-visible {
  outline: 2px solid rgb(var(--color-primary-light));
  outline-offset: 4px;
}

.home-button-icon {
  width: 1.1rem;
  height: 1.1rem;
}

.error-support {
  max-width: 27rem;
  margin: 1.75rem auto 0;
  color: rgb(var(--color-muted));
  font-size: 0.75rem;
  line-height: 1.6;
}

@media (width <= 40rem) {
  .error-header {
    padding: 1rem;
  }

  .error-content {
    padding: 1.5rem 1rem 5rem;
  }

  .error-card {
    padding: 2rem 1.25rem;
  }

  .home-button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-button {
    transition: none;
  }

  .home-button:hover {
    transform: none;
  }
}
</style>
