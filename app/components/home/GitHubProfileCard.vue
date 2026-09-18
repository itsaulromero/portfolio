<script setup lang="ts">
import type { GitHubProfile } from '~/types/github'

const props = defineProps<{
  profile: GitHubProfile | null
  loading: boolean
  hasError: boolean
}>()

const emit = defineEmits<{
  retry: []
}>()

const { t } = useI18n()

const displayName = computed(
  () => props.profile?.name || props.profile?.login || '',
)

const memberSince = computed(() => {
  if (!props.profile) {
    return ''
  }

  return new Date(props.profile.created_at).getUTCFullYear().toString()
})

function retryRequest() {
  emit('retry')
}
</script>

<template>
  <article
    class="github-profile-card"
    :aria-labelledby="'github-profile-title'"
    :aria-busy="loading"
  >
    <header class="github-profile-header">
      <div class="github-profile-heading">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          class="h-5 w-5"
          fill="currentColor"
        >
          <path
            d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.02c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.39.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
          />
        </svg>

        <h3 id="github-profile-title">
          {{ t('home.about.github.title') }}
        </h3>
      </div>

      <span class="github-source-badge">
        <span class="github-source-dot" aria-hidden="true" />
        {{ t('home.about.github.source') }}
      </span>
    </header>

    <div class="github-profile-content" aria-live="polite">
      <template v-if="loading">
        <p class="sr-only">
          {{ t('home.about.github.loading') }}
        </p>

        <div class="github-skeleton-summary" aria-hidden="true">
          <span class="github-skeleton github-skeleton-avatar" />

          <div class="flex-1 space-y-2">
            <span class="github-skeleton h-4 w-36" />
            <span class="github-skeleton h-3 w-24" />
            <span class="github-skeleton h-3 w-20" />
          </div>
        </div>

        <span
          class="github-skeleton mt-5 block h-20 w-full"
          aria-hidden="true"
        />

        <div class="mt-4 grid grid-cols-2 gap-3" aria-hidden="true">
          <span class="github-skeleton h-16" />
          <span class="github-skeleton h-16" />
        </div>

        <span
          class="github-skeleton mt-5 block h-11 w-full rounded-xl"
          aria-hidden="true"
        />
      </template>

      <div v-else-if="hasError" class="github-error" role="status">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          class="h-7 w-7"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v6" />
          <path d="M12 17h.01" />
        </svg>

        <strong>{{ t('home.about.github.errorTitle') }}</strong>
        <p>{{ t('home.about.github.errorDescription') }}</p>

        <button type="button" class="github-retry-button" @click="retryRequest">
          {{ t('home.about.github.retry') }}
        </button>
      </div>

      <template v-else-if="profile">
        <div class="github-profile-summary">
          <img
            :src="profile.avatar_url"
            :alt="
              t('home.about.github.avatarAlt', {
                name: displayName,
              })
            "
            width="72"
            height="72"
            class="github-avatar"
            loading="lazy"
            decoding="async"
          />

          <div class="min-w-0">
            <p class="truncate font-semibold text-heading">
              {{ displayName }}
            </p>

            <a
              :href="profile.html_url"
              target="_blank"
              rel="noopener noreferrer"
              class="github-username"
            >
              @{{ profile.login }}
            </a>

            <p v-if="profile.location" class="github-location">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>

              {{ profile.location }}
            </p>
          </div>
        </div>

        <div class="github-bio">
          <span>{{ t('home.about.github.bioLabel') }}</span>
          <p>
            {{ profile.bio || t('home.about.github.bioFallback') }}
          </p>
        </div>

        <dl class="github-statistics">
          <div>
            <dt>{{ t('home.about.github.publicRepos') }}</dt>
            <dd>{{ profile.public_repos }}</dd>
          </div>

          <div>
            <dt>{{ t('home.about.github.memberSince') }}</dt>
            <dd>{{ memberSince }}</dd>
          </div>
        </dl>

        <a
          :href="profile.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="github-profile-link"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            class="h-4 w-4"
            fill="currentColor"
          >
            <path
              d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.02c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.39.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
            />
          </svg>

          {{ t('home.about.github.viewProfile') }}

          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path d="M14 5h5v5" />
            <path d="m10 14 9-9" />
            <path d="M19 13v6H5V5h6" />
          </svg>
        </a>
      </template>
    </div>
  </article>
</template>

<style scoped>
.github-profile-card {
  width: 100%;
  border: 1px solid rgb(var(--color-primary) / 28%);
  border-radius: 1rem;
  padding: 1.5rem;
  background:
    linear-gradient(145deg, rgb(255 255 255 / 3%), transparent 38%),
    rgb(var(--color-surface) / 94%);
  box-shadow:
    0 24px 58px rgb(0 0 0 / 24%),
    0 0 38px rgb(var(--color-primary) / 12%);
  color: rgb(var(--color-body));
  transition:
    border-color 260ms ease,
    box-shadow 260ms ease,
    transform 260ms ease;
}

.github-profile-card:hover {
  border-color: rgb(var(--color-primary-light) / 48%);
  box-shadow:
    0 28px 64px rgb(0 0 0 / 28%),
    0 0 48px rgb(var(--color-primary) / 17%);
  transform: translateY(-3px);
}

.github-profile-header,
.github-profile-heading,
.github-profile-summary,
.github-location {
  display: flex;
  align-items: center;
}

.github-profile-header {
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid rgb(var(--color-border));
  padding-bottom: 1.25rem;
}

.github-profile-heading {
  gap: 0.65rem;
  color: rgb(var(--color-heading));
  font-size: 0.875rem;
  font-weight: 600;
}

.github-source-badge {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid rgb(var(--color-success) / 35%);
  border-radius: 9999px;
  padding: 0.3rem 0.65rem;
  background: rgb(var(--color-success) / 8%);
  color: rgb(var(--color-success));
  font-size: 0.6875rem;
  font-weight: 600;
}

.github-source-dot {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: currentcolor;
  box-shadow: 0 0 8px currentcolor;
}

.github-profile-content {
  padding-top: 1.25rem;
}

.github-profile-summary {
  gap: 1rem;
}

.github-avatar {
  width: 4.5rem;
  height: 4.5rem;
  flex-shrink: 0;
  border: 2px solid rgb(var(--color-primary-light) / 42%);
  border-radius: 50%;
  object-fit: cover;
}

.github-username {
  display: inline-flex;
  margin-top: 0.2rem;
  color: rgb(var(--color-primary-light));
  font-size: 0.875rem;
}

.github-username:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.github-location {
  gap: 0.35rem;
  margin-top: 0.25rem;
  color: rgb(var(--color-muted));
  font-size: 0.8125rem;
}

.github-bio {
  border-radius: 0.5rem;
  margin-top: 1.25rem;
  padding: 0.85rem;
  background: rgb(var(--color-field) / 72%);
}

.github-bio > span {
  display: block;
  margin-bottom: 0.25rem;
  color: rgb(var(--color-muted));
  font-size: 0.6875rem;
  text-align: center;
}

.github-bio > p {
  color: rgb(var(--color-body));
  font-size: 0.8125rem;
  line-height: 1.5;
}

.github-statistics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.github-statistics > div {
  border-radius: 0.5rem;
  padding: 0.75rem;
  background: rgb(var(--color-field) / 72%);
  text-align: center;
}

.github-statistics dt {
  color: rgb(var(--color-muted));
  font-size: 0.6875rem;
}

.github-statistics dd {
  margin-top: 0.3rem;
  color: rgb(var(--color-heading));
  font-size: 0.875rem;
  font-weight: 600;
}

.github-profile-link,
.github-retry-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(var(--color-primary) / 32%);
  border-radius: 0.75rem;
  background: rgb(var(--color-field) / 72%);
  color: rgb(var(--color-heading));
  font-weight: 600;
  transition:
    border-color 220ms ease,
    background-color 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.github-profile-link {
  width: 100%;
  min-height: 2.75rem;
  gap: 0.55rem;
  margin-top: 1.25rem;
  font-size: 0.75rem;
}

.github-retry-button {
  min-height: 2.5rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
}

.github-profile-link:hover,
.github-retry-button:hover {
  border-color: rgb(var(--color-primary-light) / 62%);
  background: rgb(var(--color-primary) / 12%);
  box-shadow: 0 0 24px rgb(var(--color-primary) / 14%);
  transform: translateY(-1px);
}

.github-profile-link:focus-visible,
.github-retry-button:focus-visible,
.github-username:focus-visible {
  outline: 2px solid rgb(var(--color-primary-light));
  outline-offset: 3px;
}

.github-error {
  display: flex;
  min-height: 18rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(var(--color-muted));
  text-align: center;
}

.github-error strong {
  margin-top: 0.75rem;
  color: rgb(var(--color-heading));
}

.github-error p {
  max-width: 18rem;
  margin-top: 0.35rem;
  font-size: 0.8125rem;
}

.github-skeleton {
  display: block;
  border-radius: 0.5rem;
  background: rgb(var(--color-border) / 58%);
  animation: github-skeleton-pulse 1.5s ease-in-out infinite;
}

.github-skeleton-summary {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.github-skeleton-avatar {
  width: 4.5rem;
  height: 4.5rem;
  flex-shrink: 0;
  border-radius: 50%;
}

@keyframes github-skeleton-pulse {
  0%,
  100% {
    opacity: 0.42;
  }

  50% {
    opacity: 0.82;
  }
}

@media (width <= 420px) {
  .github-profile-card {
    padding: 1.125rem;
  }

  .github-profile-header {
    align-items: flex-start;
  }

  .github-source-badge {
    max-width: 8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .github-profile-card,
  .github-profile-link,
  .github-retry-button {
    transition: none;
  }

  .github-skeleton {
    animation: none;
  }
}
</style>
