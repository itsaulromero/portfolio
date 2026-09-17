<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const navigationItems = computed(() => [
  {
    to: `${localePath('/')}#about`,
    label: t('navigation.about'),
  },
  {
    to: `${localePath('/')}#technologies`,
    label: t('navigation.technologies'),
  },
  {
    to: `${localePath('/')}#projects`,
    label: t('navigation.projects'),
  },
  {
    to: `${localePath('/')}#contact`,
    label: t('navigation.contact'),
  },
])
</script>

<template>
  <header class="pointer-events-none sticky top-0 z-50 bg-transparent">
    <div
      class="mx-auto flex max-w-[1440px] items-center gap-2 px-3 py-3 sm:px-6 min-[900px]:grid min-[900px]:grid-cols-[1fr_auto_1fr] min-[900px]:gap-6 min-[900px]:py-4"
    >
      <NuxtLink
        :to="localePath('/')"
        class="brand-link group pointer-events-auto flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg text-sm font-semibold text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:gap-2.5 sm:text-base"
        :aria-label="t('navigation.home')"
      >
        <span
          class="rounded bg-field/60 px-1 py-0.5 font-mono text-[10px] font-medium text-primary-light sm:px-1.5 sm:text-[11px]"
          aria-hidden="true"
        >
          src
        </span>

        <span class="brand-name">Saúl Romero</span>
      </NuxtLink>

      <nav
        class="liquid-glass desktop-navigation pointer-events-auto hidden min-[900px]:flex"
        :aria-label="t('navigation.mainLabel')"
      >
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          class="navigation-link"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div
        class="pointer-events-auto ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 min-[900px]:ml-0 min-[900px]:justify-self-end"
      >
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
.desktop-navigation {
  height: 2.75rem;
  align-items: center;
  border-radius: 9999px;
  padding: 3px;
}

.navigation-link {
  position: relative;
  z-index: 1;
  display: flex;
  height: 100%;
  align-items: center;
  border-radius: 9999px;
  padding: 0 1rem;
  color: var(--glass-text);
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition:
    color 220ms ease,
    text-shadow 220ms ease,
    transform 220ms ease;
}

.navigation-link::after {
  position: absolute;
  bottom: 5px;
  left: 50%;
  width: 16px;
  height: 1px;
  border-radius: 9999px;
  background: var(--glass-accent);
  box-shadow: 0 0 8px var(--glass-glow);
  content: '';
  opacity: 0;
  transform: translateX(-50%) scaleX(0);
  transition:
    opacity 220ms ease,
    transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.navigation-link:hover,
.navigation-link:focus-visible {
  color: var(--glass-text);
  text-shadow: 0 0 12px var(--glass-glow);
  transform: translateY(-1px);
}

.navigation-link:hover::after,
.navigation-link:focus-visible::after {
  opacity: 1;
  transform: translateX(-50%) scaleX(1);
}

.navigation-link:active {
  transform: scale(0.96);
}

.navigation-link:focus-visible,
.brand-link:focus-visible {
  outline: 2px solid var(--glass-accent);
  outline-offset: 3px;
}

.brand-name {
  transition:
    color 220ms ease,
    text-shadow 220ms ease;
}

.brand-link:hover .brand-name {
  color: rgb(var(--color-primary-light));
  text-shadow: 0 0 14px rgb(96 165 250 / 45%);
}

@media (prefers-reduced-motion: reduce) {
  .navigation-link,
  .navigation-link::after,
  .brand-name {
    transition: none;
  }
}
</style>
