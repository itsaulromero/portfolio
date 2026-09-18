<script setup lang="ts">
import type { SimpleIcon } from 'simple-icons'

defineProps<{
  name: string
  icon: SimpleIcon
  color: string
}>()
</script>

<template>
  <li class="technology-card">
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      class="technology-icon"
      :style="{ color }"
    >
      <path :d="icon.path" fill="currentColor" />
    </svg>

    <span class="technology-name">
      {{ name }}
    </span>
  </li>
</template>

<style scoped>
.technology-card {
  display: flex;
  width: 7rem;
  min-height: 7rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  border: 1px solid rgb(var(--color-border));
  border-radius: 1rem;
  background: rgb(var(--color-surface) / 58%);
  color: rgb(var(--color-body));
  transition:
    border-color 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.technology-card:hover {
  border-color: rgb(var(--color-primary-light) / 55%);
  box-shadow: 0 12px 30px rgb(var(--color-primary) / 10%);
  transform: translateY(-4px);
}

.technology-icon {
  width: 2.75rem;
  height: 2.75rem;
}

.technology-name {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  text-align: center;
}

:global(.light) .technology-card {
  background: rgb(var(--color-surface) / 82%);
}

:global(.light) .technology-card:hover {
  box-shadow: 0 12px 28px rgb(var(--color-primary) / 12%);
}

@media (width <= 360px) {
  .technology-card {
    width: 6.5rem;
    min-height: 6.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .technology-card {
    transition: none;
  }

  .technology-card:hover {
    transform: none;
  }
}
</style>
