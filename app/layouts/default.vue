<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div id="top" class="flex min-h-screen flex-col bg-background text-body">
    <a
      href="#main-content"
      class="sr-only fixed left-4 top-4 z-[100] rounded-md bg-action px-4 py-2 font-medium text-white focus:not-sr-only"
    >
      {{ t('accessibility.skipToContent') }}
    </a>
    <AppHeader />
    <main id="main-content" class="flex-1" tabindex="-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
