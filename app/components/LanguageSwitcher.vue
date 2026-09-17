<script setup lang="ts">
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

type LocaleCode = 'en' | 'es'

function getLocalePath(localeCode: LocaleCode) {
  return switchLocalePath(localeCode).split('#')[0]
}
</script>

<template>
  <div
    class="liquid-glass language-switcher"
    role="group"
    :aria-label="t('language.selectorLabel')"
  >
    <span
      aria-hidden="true"
      class="language-thumb"
      :class="{ 'language-thumb-spanish': locale === 'es' }"
    />

    <NuxtLink
      :to="getLocalePath('en')"
      hreflang="en"
      class="language-option"
      :class="{ 'language-option-active': locale === 'en' }"
      :aria-label="t('language.english')"
      :aria-current="locale === 'en' ? 'page' : undefined"
    >
      EN
    </NuxtLink>

    <NuxtLink
      :to="getLocalePath('es')"
      hreflang="es"
      class="language-option"
      :class="{ 'language-option-active': locale === 'es' }"
      :aria-label="t('language.spanish')"
      :aria-current="locale === 'es' ? 'page' : undefined"
    >
      ES
    </NuxtLink>
  </div>
</template>

<style scoped>
.language-switcher {
  --switch-width: 6.25rem;
  --switch-height: 2.625rem;
  --switch-thumb-size: 2.375rem;

  position: relative;
  display: grid;
  width: var(--switch-width);
  height: var(--switch-height);
  box-sizing: border-box;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  border-radius: 9999px;
}

.language-thumb {
  position: absolute;
  z-index: 1;
  inset-block: 0;
  inset-inline-start: 0;
  display: grid;
  width: 50%;
  place-items: center;
  pointer-events: none;
  transition: transform 480ms cubic-bezier(0.2, 0.85, 0.25, 1.1);
}

.language-thumb::before {
  width: var(--switch-thumb-size);
  height: var(--switch-thumb-size);
  box-sizing: border-box;
  border: 1px solid var(--glass-border);
  border-radius: 50%;
  background: var(--glass-thumb-background);
  box-shadow: var(--glass-thumb-shadow);
  content: '';
}

.language-thumb-spanish {
  transform: translateX(100%);
}

.language-option {
  position: relative;
  z-index: 2;
  display: grid;
  min-width: 0;
  height: 100%;
  place-items: center;
  padding: 0;
  border-radius: 9999px;
  color: var(--glass-text-muted);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  transition:
    color 220ms ease,
    text-shadow 220ms ease,
    transform 180ms ease;
}

.language-option:hover,
.language-option:focus-visible,
.language-option-active {
  color: var(--glass-text);
  text-shadow: 0 0 10px var(--glass-glow);
}

.language-option:active {
  transform: scale(0.92);
}

.language-option:focus-visible {
  outline: 2px solid var(--glass-accent);
  outline-offset: -4px;
}

@media (width <= 420px) {
  .language-switcher {
    --switch-width: 5.5rem;
    --switch-height: 2.5rem;
    --switch-thumb-size: 2.25rem;
  }

  .language-option {
    font-size: 0.8125rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .language-thumb,
  .language-option {
    transition: none;
  }
}
</style>
