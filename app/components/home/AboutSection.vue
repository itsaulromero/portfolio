<script setup lang="ts">
const { t } = useI18n()

const { data, status, error, refresh } = useGitHubData()

const profile = computed(() => data.value?.profile ?? null)
const repositories = computed(() => data.value?.repositories ?? [])

const isLoading = computed(
  () => status.value === 'idle' || status.value === 'pending',
)

const hasError = computed(
  () => status.value === 'error' || Boolean(error.value),
)

function retryGitHubRequest() {
  void refresh()
}
</script>

<template>
  <section id="about" class="about-section" aria-labelledby="about-title">
    <div class="about-container">
      <div class="about-layout">
        <div>
          <header>
            <h2 id="about-title" class="about-title">
              {{ t('home.about.title') }}
            </h2>

            <p class="about-subtitle">
              {{ t('home.about.subtitle') }}
            </p>
          </header>

          <div class="about-description">
            <p>{{ t('home.about.description.first') }}</p>
            <p>{{ t('home.about.description.second') }}</p>
          </div>

          <div class="about-information-grid">
            <article class="about-information-card">
              <div class="about-information-header">
                <span
                  class="about-information-label about-information-label-warning"
                >
                  {{ t('home.about.education.label') }}
                </span>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                >
                  <path d="m3 10 9-5 9 5-9 5-9-5Z" />
                  <path d="M7 12.5V17c2.5 2 7.5 2 10 0v-4.5" />
                </svg>
              </div>

              <h3>{{ t('home.about.education.title') }}</h3>
              <p>{{ t('home.about.education.institution') }}</p>

              <div class="about-information-meta">
                {{ t('home.about.education.organization') }}
              </div>
            </article>

            <article class="about-information-card">
              <div class="about-information-header">
                <span
                  class="about-information-label about-information-label-info"
                >
                  {{ t('home.about.experience.label') }}
                </span>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                >
                  <rect x="4" y="7" width="16" height="13" rx="2" />
                  <path d="M9 7V5h6v2" />
                  <path d="M4 12h16" />
                </svg>
              </div>

              <h3>{{ t('home.about.experience.title') }}</h3>
              <p>{{ t('home.about.experience.company') }}</p>

              <div class="about-information-meta">
                <span>{{ t('home.about.experience.type') }}</span>
                <span>{{ t('home.about.experience.period') }}</span>
              </div>
            </article>
          </div>
        </div>

        <div class="about-github-column">
          <HomeGitHubProfileCard
            :profile="profile"
            :loading="isLoading"
            :has-error="hasError"
            @retry="retryGitHubRequest"
          />
        </div>
      </div>

      <div class="about-repositories">
        <p class="about-repositories-description">
          {{ t('home.about.repositories.description') }}
        </p>

        <div
          class="about-repositories-content"
          aria-live="polite"
          :aria-busy="isLoading"
        >
          <template v-if="isLoading">
            <p class="sr-only">
              {{ t('home.about.github.loading') }}
            </p>

            <div class="about-repositories-grid" aria-hidden="true">
              <span class="about-repository-skeleton" />
              <span class="about-repository-skeleton" />
            </div>
          </template>

          <div
            v-else-if="!hasError && repositories.length"
            class="about-repositories-grid"
          >
            <HomeGitHubRepositoryCard
              v-for="(repository, index) in repositories"
              :key="repository.id"
              :repository="repository"
              :accent="index % 2 === 0 ? 'info' : 'primary'"
            />
          </div>

          <p
            v-else-if="!hasError"
            class="about-repositories-empty"
            role="status"
          >
            {{ t('home.about.repositories.empty') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  scroll-margin-top: 5rem;
  background: rgb(var(--color-background));
}

.about-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 76.5rem;
  margin: 0 auto;
  padding: 6rem 1.5rem;
}

.about-layout {
  display: grid;
  gap: 4rem;
}

.about-title {
  color: rgb(var(--color-heading));
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.about-subtitle {
  margin-top: 1rem;
  color: rgb(var(--color-body));
  font-size: 1rem;
  font-weight: 500;
}

.about-description {
  display: grid;
  max-width: 40rem;
  gap: 1rem;
  margin-top: 3.5rem;
  color: rgb(var(--color-body));
  font-size: 0.9375rem;
  line-height: 1.5;
}

.about-information-grid {
  display: grid;
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.about-information-card {
  border: 1px solid rgb(var(--color-border));
  border-radius: 0.875rem;
  padding: 1rem;
  background:
    linear-gradient(145deg, rgb(255 255 255 / 2%), transparent 44%),
    rgb(var(--color-surface) / 88%);
  transition:
    border-color 240ms ease,
    box-shadow 240ms ease,
    transform 240ms ease;
}

.about-information-card:hover {
  border-color: rgb(var(--color-primary-light) / 40%);
  box-shadow:
    0 14px 34px rgb(0 0 0 / 14%),
    0 0 24px rgb(var(--color-primary) / 8%);
  transform: translateY(-3px);
}

.about-information-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: rgb(var(--color-muted));
}

.about-information-label {
  display: inline-flex;
  border: 1px solid;
  border-radius: 0.25rem;
  padding: 0.2rem 0.5rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1;
  text-transform: uppercase;
}

.about-information-label-warning {
  border-color: rgb(var(--color-warning) / 50%);
  background: rgb(var(--color-warning) / 8%);
  color: rgb(var(--color-warning));
}

.about-information-label-info {
  border-color: rgb(var(--color-info) / 50%);
  background: rgb(var(--color-info) / 8%);
  color: rgb(var(--color-info));
}

.about-information-card h3 {
  margin-top: 0.9rem;
  color: rgb(var(--color-heading));
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
}

.about-information-card > p {
  margin-top: 0.3rem;
  color: rgb(var(--color-muted));
  font-size: 0.8125rem;
}

.about-information-meta {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  border-top: 1px solid rgb(var(--color-border));
  margin-top: 0.8rem;
  padding-top: 0.7rem;
  color: rgb(var(--color-muted));
  font-size: 0.75rem;
}

.about-github-column {
  align-self: center;
}

.about-repositories {
  border-top: 1px solid rgb(var(--color-border));
  margin-top: 4rem;
  padding-top: 1.5rem;
}

.about-repositories-description {
  color: rgb(var(--color-body));
  font-size: 0.875rem;
  text-align: center;
}

.about-repositories-content {
  margin-top: 1.75rem;
}

.about-repositories-grid {
  display: grid;
  width: 100%;
  max-width: 46rem;
  gap: 1.25rem;
  margin: 0 auto;
}

.about-repository-skeleton {
  display: block;
  min-height: 10rem;
  border-radius: 0.875rem;
  background: rgb(var(--color-border) / 55%);
  animation: about-skeleton-pulse 1.5s ease-in-out infinite;
}

.about-repositories-empty {
  color: rgb(var(--color-muted));
  font-size: 0.8125rem;
  text-align: center;
}

@keyframes about-skeleton-pulse {
  0%,
  100% {
    opacity: 0.42;
  }

  50% {
    opacity: 0.82;
  }
}

@media (width >= 640px) {
  .about-information-grid,
  .about-repositories-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width >= 1024px) {
  .about-container {
    padding: 7rem 2rem;
  }

  .about-layout {
    grid-template-columns: minmax(0, 1.25fr) minmax(22rem, 0.85fr);
    align-items: center;
    gap: 7rem;
  }

  .about-github-column {
    padding-top: 2.75rem;
  }
}

@media (width <= 420px) {
  .about-container {
    padding: 5rem 1rem;
  }

  .about-description {
    margin-top: 2.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-information-card {
    transition: none;
  }

  .about-repository-skeleton {
    animation: none;
  }
}
</style>
