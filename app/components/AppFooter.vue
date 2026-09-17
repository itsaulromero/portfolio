<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-background">
    <div class="mx-auto w-full max-w-[1184px] px-6 pb-8 pt-16 sm:px-8 lg:pt-20">
      <div
        class="grid gap-12 pb-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-start"
      >
        <div class="max-w-md">
          <NuxtLink
            :to="localePath('/')"
            class="inline-flex items-center gap-3 rounded-lg text-heading transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
          >
            <span
              class="rounded border border-border bg-surface px-2 py-1 font-mono text-xs text-primary-light"
              aria-hidden="true"
            >
              src
            </span>

            <span class="text-xl font-semibold">Saúl Romero</span>
          </NuxtLink>

          <p class="mt-5 max-w-sm text-base leading-6 text-muted">
            {{ t('footer.description') }}
          </p>
        </div>

        <div>
          <p
            class="mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-subtle"
          >
            {{ t('footer.connect') }}
          </p>

          <div class="flex items-center gap-3">
            <a
              href="https://github.com/itsaulromero"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-social-link liquid-glass"
              :aria-label="t('footer.social.github')"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                class="h-5 w-5"
                fill="currentColor"
              >
                <path
                  d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.19-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.25c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
                />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/saul-romero-cruz-64a242236/"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-social-link liquid-glass"
              :aria-label="t('footer.social.linkedin')"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                class="h-5 w-5"
                fill="currentColor"
              >
                <path
                  d="M6.94 8.5H3.56V19h3.38V8.5ZM5.25 3A1.96 1.96 0 1 0 5.25 6.92 1.96 1.96 0 0 0 5.25 3ZM19.5 12.98c0-3.16-1.69-4.63-3.94-4.63a3.4 3.4 0 0 0-3.07 1.69V8.5H9.11V19h3.38v-5.2c0-1.37.26-2.7 1.96-2.7 1.68 0 1.7 1.57 1.7 2.79V19h3.35v-6.02Z"
                />
              </svg>
            </a>

            <a
              href="https://x.com/itsaulromero"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-social-link liquid-glass"
              :aria-label="t('footer.social.x')"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                class="h-[1.125rem] w-[1.125rem]"
                fill="currentColor"
              >
                <path
                  d="M18.24 2.25h3.31l-7.23 8.26 8.51 11.24h-6.66l-5.22-6.82-5.97 6.82H1.67l7.74-8.85L1.25 2.25h6.83l4.72 6.24 5.44-6.24Zm-1.16 17.52h1.83L7.08 4.13H5.11l11.97 15.64Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col gap-6 border-t border-border/80 pt-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between"
      >
        <p>
          {{ t('footer.copyright', { year: currentYear }) }}
        </p>

        <div class="flex items-center justify-between gap-5 sm:justify-end">
          <p>{{ t('footer.credit') }}</p>

          <a
            href="#top"
            class="back-to-top liquid-glass"
            :aria-label="t('footer.backToTop')"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m7 14 5-5 5 5" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-social-link,
.back-to-top {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--glass-text-muted);
  transition:
    color 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.footer-social-link {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.875rem;
}

.back-to-top {
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  border-radius: 50%;
}

.footer-social-link:hover,
.footer-social-link:focus-visible,
.back-to-top:hover,
.back-to-top:focus-visible {
  border-color: var(--glass-accent);
  color: var(--glass-text);
  box-shadow:
    inset 0 1px 0 var(--glass-highlight),
    0 0 18px var(--glass-glow);
  transform: translateY(-3px);
}

.footer-social-link:active,
.back-to-top:active {
  transform: translateY(0) scale(0.92);
}

.footer-social-link:focus-visible,
.back-to-top:focus-visible {
  outline: 2px solid var(--glass-accent);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .footer-social-link,
  .back-to-top {
    transition: none;
  }
}
</style>
