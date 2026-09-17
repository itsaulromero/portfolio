<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
})
</script>

<template>
  <div class="grid min-h-screen place-items-center bg-background px-6">
    <section
      class="w-full max-w-xl rounded-2xl border border-border bg-surface p-8"
    >
      <h1 class="text-3xl font-bold text-heading">
        {{ t('home.status.title') }}
      </h1>

      <p class="mt-3 text-body">
        {{ t('home.status.description') }}
      </p>
    </section>
  </div>
</template>
