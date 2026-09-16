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
  <span class="inline-flex size-11">
    <button
      v-if="!colorMode.unknown"
      type="button"
      class="inline-flex size-full items-center justify-center rounded-full border border-border text-heading transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      :aria-label="toggleLabel"
      :title="toggleLabel"
      @click="toggleColorMode"
    >
      <svg
        v-if="isDark"
        aria-hidden="true"
        class="size-6"
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
        v-else
        aria-hidden="true"
        class="size-6"
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
