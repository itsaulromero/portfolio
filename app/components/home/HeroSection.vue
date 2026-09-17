<script setup lang="ts">
const { t } = useI18n()

const qualities = computed(() => [
  {
    label: t('home.hero.qualities.accessibility'),
    className: 'quality-warning',
  },
  {
    label: t('home.hero.qualities.performance'),
    className: 'quality-primary',
  },
  {
    label: t('home.hero.qualities.maintainability'),
    className: 'quality-success',
  },
])
</script>

<template>
  <section id="home" class="hero-section" aria-labelledby="hero-title">
    <div class="hero-grid" aria-hidden="true" />
    <div class="hero-glow hero-glow-primary" aria-hidden="true" />
    <div class="hero-glow hero-glow-secondary" aria-hidden="true" />

    <div
      class="relative z-10 mx-auto grid w-full max-w-[1224px] items-center gap-16 px-6 py-20 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(24rem,0.85fr)] lg:px-8 lg:py-24"
    >
      <div class="max-w-3xl">
        <p class="hero-eyebrow">
          <span class="hero-eyebrow-dot" aria-hidden="true" />
          {{ t('home.hero.eyebrow') }}
        </p>

        <h1
          id="hero-title"
          class="mt-5 text-[clamp(2.75rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-heading"
        >
          <span class="block">
            {{ t('home.hero.title') }}
          </span>

          <span class="hero-title-gradient mt-2 block">
            {{ t('home.hero.titleHighlight') }}
          </span>
        </h1>

        <p
          class="mt-6 max-w-2xl text-base leading-7 text-body sm:text-lg sm:leading-8"
        >
          {{ t('home.hero.description') }}
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#projects" class="hero-action hero-action-primary">
            <span>{{ t('home.hero.actions.projects') }}</span>

            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 5v14" />
              <path d="m6 13 6 6 6-6" />
            </svg>
          </a>

          <a
            href="/documents/saul-romero-cv.pdf"
            download
            class="hero-action hero-action-secondary"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              class="h-[1.125rem] w-[1.125rem]"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>

            <span>{{ t('home.hero.actions.resume') }}</span>
          </a>
        </div>

        <ul
          class="mt-8 flex flex-wrap gap-3"
          :aria-label="t('home.hero.qualities.accessibility')"
        >
          <li
            v-for="quality in qualities"
            :key="quality.label"
            class="quality-badge"
          >
            <span
              class="quality-dot"
              :class="quality.className"
              aria-hidden="true"
            />

            {{ quality.label }}
          </li>
        </ul>
      </div>
      <HomeHeroTerminal />
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  isolation: isolate;
  min-height: calc(100svh - 5rem);
  overflow: hidden;
  background-color: rgb(var(--color-background));
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgb(96 165 250 / 4%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(96 165 250 / 4%) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, black, transparent 88%);
  pointer-events: none;
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
}

.hero-glow-primary {
  top: 5%;
  right: 7%;
  width: 25rem;
  height: 25rem;
  background: rgb(59 130 246 / 14%);
}

.hero-glow-secondary {
  bottom: 5%;
  left: 8%;
  width: 18rem;
  height: 18rem;
  background: rgb(34 211 238 / 7%);
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgb(var(--color-primary-light) / 60%);
  border-radius: 9999px;
  padding: 0.35rem 0.7rem;
  background: rgb(var(--color-primary) / 8%);
  color: rgb(var(--color-primary-light));
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25rem;
}

.hero-eyebrow-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: rgb(var(--color-primary-light));
  box-shadow: 0 0 12px rgb(var(--color-primary-light) / 75%);
}

.hero-title-gradient {
  background: linear-gradient(
    90deg,
    #93c5fd 0%,
    #60a5fa 50%,
    rgb(37 121 222 / 39%) 100%
  );
  background-clip: text;
  color: transparent;
}

.hero-action {
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  border-radius: 9999px;
  padding: 0.75rem 1.125rem;
  font-size: 0.925rem;
  font-weight: 600;
  transition:
    color 220ms ease,
    background-color 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.hero-action:hover {
  transform: translateY(-2px);
}

.hero-action:active {
  transform: translateY(0) scale(0.97);
}

.hero-action:focus-visible {
  outline: 2px solid rgb(var(--color-primary-light));
  outline-offset: 3px;
}

.hero-action-primary {
  border: 1px solid rgb(var(--color-primary-light) / 45%);
  background: rgb(var(--color-action));
  box-shadow: 0 10px 30px rgb(var(--color-action) / 24%);
  color: white;
}

.hero-action-primary:hover {
  background: rgb(var(--color-primary));
  box-shadow: 0 12px 34px rgb(var(--color-primary) / 38%);
}

.hero-action-secondary {
  position: relative;
  border: 1px solid rgb(var(--color-primary-light) / 24%);
  background: rgb(var(--color-surface) / 18%);
  color: rgb(var(--color-heading));
}

.hero-action-secondary::before,
.hero-action-secondary::after {
  position: absolute;
  inset: -1px;
  border: 1px solid rgb(var(--color-primary-light) / 70%);
  border-radius: inherit;
  content: '';
  pointer-events: none;
  animation: hero-action-wave 3.2s ease-out infinite;
}

.hero-action-secondary::after {
  animation-delay: 0.65s;
}

.hero-action-secondary:hover {
  border-color: rgb(var(--color-primary-light) / 55%);
  background: rgb(var(--color-surface) / 70%);
  box-shadow: 0 8px 24px rgb(var(--color-primary) / 12%);
}

.hero-action-secondary:hover::before,
.hero-action-secondary:hover::after {
  animation: none;
  opacity: 0;
}

@keyframes hero-action-wave {
  0% {
    opacity: 0;
    transform: scale(0.98);
  }

  12% {
    opacity: 0.65;
  }

  65%,
  100% {
    opacity: 0;
    transform: scale(1.14);
  }
}

.quality-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid rgb(var(--color-border));
  border-radius: 9999px;
  padding: 0.4rem 0.7rem;
  background: rgb(var(--color-surface) / 68%);
  color: rgb(var(--color-body));
  font-size: 0.75rem;
  font-weight: 500;
  backdrop-filter: blur(12px);
}

.quality-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
}

.quality-warning {
  background: rgb(var(--color-warning));
  box-shadow: 0 0 8px rgb(var(--color-warning) / 55%);
}

.quality-primary {
  background: rgb(var(--color-primary-light));
  box-shadow: 0 0 8px rgb(var(--color-primary-light) / 55%);
}

.quality-success {
  background: rgb(var(--color-success));
  box-shadow: 0 0 8px rgb(var(--color-success) / 55%);
}

:global(.light) .hero-glow-primary {
  background: rgb(59 130 246 / 10%);
}

:global(.light) .hero-glow-secondary {
  background: rgb(14 116 144 / 5%);
}

@media (width <= 640px) {
  .hero-section {
    min-height: auto;
  }

  .hero-grid {
    background-size: 48px 48px;
  }

  .hero-glow-primary {
    top: 8%;
    right: -9rem;
  }

  .hero-glow-secondary {
    bottom: 12%;
    left: -10rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-action {
    transition: none;
  }

  .hero-action-secondary::before,
  .hero-action-secondary::after {
    animation: none;
  }
}
</style>
