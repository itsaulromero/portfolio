<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
})
</script>

<template>
  <div>
    <HomeHeroSection />
    <HomeAboutSection />
    <HomeTechnologiesSection />
  </div>
</template>
