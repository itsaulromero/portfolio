<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
})
</script>

<template>
  <main>
    <h1>{{ t('home.status.title') }}</h1>
    <p>{{ t('home.status.description') }}</p>
  </main>
</template>
