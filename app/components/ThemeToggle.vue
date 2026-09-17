<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

const isDark = computed(() => colorMode.value === 'dark')

const toggleLabel = computed(() =>
  isDark.value ? t('theme.switchToLight') : t('theme.switchToDark'),
)

function toggleColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <span class="theme-toggle-shell">
    <button
      v-if="!colorMode.unknown"
      type="button"
      class="liquid-glass theme-toggle-button"
      :class="{ 'theme-toggle-button-light': !isDark }"
      :aria-label="toggleLabel"
      :title="toggleLabel"
      @click="toggleColorMode"
    >
      <svg
        aria-hidden="true"
        class="theme-icon"
        :class="isDark ? 'theme-icon-visible' : 'theme-icon-moon-hidden'"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
        />
      </svg>

      <svg
        aria-hidden="true"
        class="theme-icon"
        :class="isDark ? 'theme-icon-sun-hidden' : 'theme-icon-visible'"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="12" cy="12" r="4" />

        <path
          stroke-linecap="round"
          d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"
        />
      </svg>
    </button>
  </span>
</template>

<style scoped>
.theme-toggle-shell,
.theme-toggle-button {
  width: 2.75rem;
  height: 2.75rem;
}

.theme-toggle-shell {
  display: inline-flex;
}

.theme-toggle-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--glass-text);
  cursor: pointer;
  transition:
    transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 280ms ease,
    box-shadow 280ms ease,
    background-color 280ms ease;
}

.theme-toggle-button:hover {
  border-color: #fff;
  background-color: rgb(255 255 255 / 8%);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 30%),
    0 0 20px rgb(96 165 250 / 28%);
  transform: translateY(-1px);
}

.theme-toggle-button-light {
  background:
    linear-gradient(145deg, rgb(255 255 255 / 90%), rgb(255 255 255 / 58%)),
    rgb(255 255 255 / 72%);
  color: #0f172a;
}

.theme-toggle-button-light:hover {
  border-color: #64748b;
  background-color: rgb(255 255 255 / 88%);
  box-shadow:
    inset 0 1px 0 #fff,
    0 0 18px rgb(37 99 235 / 22%);
}

.theme-toggle-button:active {
  transform: scale(0.92);
}

.theme-toggle-button:focus-visible {
  outline: 2px solid #60a5fa;
  outline-offset: 3px;
}

.theme-icon {
  position: absolute;
  z-index: 1;
  width: 1.35rem;
  height: 1.35rem;
  transition:
    opacity 420ms ease,
    transform 480ms cubic-bezier(0.2, 0.85, 0.25, 1.1),
    filter 280ms ease;
}

.theme-icon-visible {
  opacity: 1;
  transform: rotate(0) scale(1);
}

.theme-icon-moon-hidden {
  opacity: 0;
  transform: rotate(-75deg) scale(0.55);
}

.theme-icon-sun-hidden {
  opacity: 0;
  transform: rotate(75deg) scale(0.55);
}

.theme-toggle-button:hover .theme-icon-visible {
  filter: drop-shadow(0 0 6px rgb(96 165 250 / 55%));
  transform: rotate(8deg) scale(1.08);
}

@media (width <= 420px) {
  .theme-toggle-shell,
  .theme-toggle-button {
    width: 2.5rem;
    height: 2.5rem;
  }

  .theme-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .theme-toggle-button,
  .theme-icon {
    transition: none;
  }
}
</style>
