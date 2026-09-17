<script setup lang="ts">
const { t } = useI18n()

const isStackVisible = ref(false)

const stackGroups = computed(() => [
  {
    label: t('home.hero.terminal.focus.frontend'),
    items: ['Vue', 'Nuxt', 'TypeScript', 'Tailwind CSS'],
  },
  {
    label: t('home.hero.terminal.focus.backend'),
    items: ['Laravel', 'PostgreSQL'],
  },
  {
    label: t('home.hero.terminal.focus.cloud'),
    items: ['AWS', 'Cloudflare'],
  },
])

const toggleStack = () => {
  isStackVisible.value = !isStackVisible.value
}
</script>

<template>
  <aside class="terminal-shell" :aria-label="t('home.hero.terminal.ariaLabel')">
    <div class="terminal-header">
      <div class="flex items-center gap-2" aria-hidden="true">
        <span class="terminal-control bg-[#FF5F57]" />
        <span class="terminal-control bg-[#FEBB2E]" />
        <span class="terminal-control bg-[#28C840]" />
      </div>

      <div class="terminal-title">
        <span class="terminal-source" aria-hidden="true">src</span>
        <span>{{ t('home.hero.terminal.windowTitle') }}</span>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        class="h-4 w-4 text-subtle"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m7 9 3 3-3 3" />
        <path d="M13 15h4" />
      </svg>
    </div>

    <div class="terminal-body">
      <p class="terminal-line">
        <span class="terminal-prompt">saul@portfolio:~$</span>
        <span>
          {{ t('home.hero.terminal.initCommand') }}
        </span>
      </p>

      <div class="terminal-block">
        <p class="terminal-line">
          <span class="terminal-command-symbol">$</span>
          <span>{{ t('home.hero.terminal.whoamiCommand') }}</span>
        </p>

        <p class="pl-5">
          <strong class="font-semibold text-primary-light">
            {{ t('home.hero.terminal.name') }}
          </strong>

          <span class="text-subtle">
            [{{ t('home.hero.terminal.role') }}]
          </span>
        </p>
      </div>

      <div class="terminal-block">
        <p class="terminal-line">
          <span class="terminal-command-symbol">$</span>
          <span>{{ t('home.hero.terminal.focusCommand') }}</span>
        </p>

        <ul class="flex flex-wrap gap-2 pl-5">
          <li class="terminal-chip">
            {{ t('home.hero.terminal.focus.frontend') }}
          </li>
          <li class="terminal-chip">
            {{ t('home.hero.terminal.focus.backend') }}
          </li>
          <li class="terminal-chip">
            {{ t('home.hero.terminal.focus.apis') }}
          </li>
          <li class="terminal-chip">
            {{ t('home.hero.terminal.focus.cloud') }}
          </li>
        </ul>
      </div>

      <div class="terminal-block">
        <p class="terminal-line">
          <span class="terminal-command-symbol">$</span>
          <span>{{ t('home.hero.terminal.availabilityCommand') }}</span>
        </p>

        <p class="flex items-start gap-2 pl-5 text-success">
          <span class="terminal-status-dot" aria-hidden="true" />
          <span>{{ t('home.hero.terminal.availability') }}</span>
        </p>
      </div>

      <button
        type="button"
        class="terminal-input"
        :aria-expanded="isStackVisible"
        @click="toggleStack"
      >
        <span class="text-primary-light" aria-hidden="true">&gt;</span>

        <span class="min-w-0 truncate">
          {{ t('home.hero.terminal.apiCommand') }}
        </span>

        <span class="terminal-cursor" aria-hidden="true" />
      </button>

      <Transition name="terminal-reveal">
        <div
          v-if="isStackVisible"
          class="terminal-stack-output"
          aria-live="polite"
        >
          <p class="terminal-line">
            <span class="terminal-command-symbol">$</span>
            <span>{{ t('home.hero.terminal.exploreCommand') }}</span>
          </p>

          <div class="mt-2 space-y-1 pl-5">
            <p
              v-for="group in stackGroups"
              :key="group.label"
              class="terminal-stack-line"
            >
              <span class="text-info">"{{ group.label }}"</span>
              <span class="text-subtle">:</span>
              <span class="text-body">
                [{{ group.items.map((item) => `"${item}"`).join(', ') }}]
              </span>
            </p>
          </div>
        </div>
      </Transition>

      <p class="terminal-hint">
        {{
          isStackVisible
            ? t('home.hero.terminal.collapseHint')
            : t('home.hero.terminal.hint')
        }}
      </p>
    </div>
  </aside>
</template>

<style scoped>
.terminal-shell {
  position: relative;
  overflow: hidden;
  border: 1px solid rgb(var(--color-border));
  border-radius: 1rem;
  background:
    linear-gradient(145deg, rgb(255 255 255 / 4%), transparent 38%),
    rgb(var(--color-surface) / 94%);
  box-shadow:
    0 26px 65px rgb(0 0 0 / 28%),
    0 0 52px rgb(var(--color-primary) / 14%);
  color: rgb(var(--color-body));
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem;
  line-height: 1.6;
  backdrop-filter: blur(20px);
  transition:
    border-color 260ms ease,
    box-shadow 260ms ease,
    transform 260ms ease;
}

.terminal-shell:hover {
  border-color: rgb(var(--color-primary) / 55%);
  box-shadow:
    0 30px 72px rgb(0 0 0 / 32%),
    0 0 64px rgb(var(--color-primary) / 20%);
  transform: translateY(-4px);
}

.terminal-header {
  display: grid;
  min-height: 2.75rem;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid rgb(var(--color-border));
  padding: 0 1rem;
  background: rgb(var(--color-background-alt) / 58%);
}

.terminal-header > :last-child {
  justify-self: end;
}

.terminal-control {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 12%);
}

.terminal-title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgb(var(--color-muted));
  white-space: nowrap;
}

.terminal-source {
  border-radius: 0.2rem;
  padding: 0.05rem 0.3rem;
  background: rgb(var(--color-field));
  color: rgb(var(--color-primary-light));
  font-size: 0.625rem;
}

.terminal-body {
  min-height: 20rem;
  padding: 1.25rem;
}

.terminal-block {
  margin-top: 1rem;
}

.terminal-line {
  display: flex;
  min-width: 0;
  align-items: flex-start;
  gap: 0.5rem;
}

.terminal-prompt {
  flex-shrink: 0;
  color: rgb(var(--color-primary-light));
  font-weight: 600;
}

.terminal-command-symbol {
  width: 0.75rem;
  flex-shrink: 0;
  color: rgb(var(--color-primary-light));
}

.terminal-chip {
  border: 1px solid rgb(var(--color-primary) / 24%);
  border-radius: 0.25rem;
  padding: 0.1rem 0.45rem;
  background: rgb(var(--color-primary) / 12%);
  color: rgb(var(--color-primary-light));
  line-height: 1.4;
}

.terminal-status-dot {
  width: 0.45rem;
  height: 0.45rem;
  flex-shrink: 0;
  border-radius: 50%;
  margin-top: 0.4rem;
  background: rgb(var(--color-success));
  box-shadow: 0 0 10px rgb(var(--color-success) / 68%);
}

.terminal-input {
  display: flex;
  width: 100%;
  min-width: 0;
  align-items: center;
  gap: 0.55rem;
  border: 1px solid rgb(var(--color-primary) / 28%);
  border-radius: 0.4rem;
  margin-top: 1.1rem;
  padding: 0.55rem 0.7rem;
  background: rgb(var(--color-field) / 82%);
  color: rgb(var(--color-primary-light));
  text-align: left;
  transition:
    border-color 200ms ease,
    background-color 200ms ease,
    box-shadow 200ms ease;
}

.terminal-input:hover {
  border-color: rgb(var(--color-primary-light) / 62%);
  background: rgb(var(--color-primary) / 12%);
}

.terminal-input:focus-visible {
  border-color: rgb(var(--color-primary-light));
  outline: none;
  box-shadow: 0 0 0 3px rgb(var(--color-primary) / 22%);
}

.terminal-cursor {
  width: 0.35rem;
  height: 1rem;
  flex-shrink: 0;
  margin-left: auto;
  background: rgb(var(--color-primary-light));
  animation: terminal-cursor 1s steps(1) infinite;
}

.terminal-stack-output {
  overflow: hidden;
  border-left: 1px solid rgb(var(--color-primary) / 35%);
  margin-top: 0.85rem;
  padding-left: 0.75rem;
}

.terminal-stack-line {
  overflow-wrap: anywhere;
}

.terminal-hint {
  margin-top: 0.75rem;
  color: rgb(var(--color-primary-light));
  font-size: 0.6875rem;
}

.terminal-reveal-enter-active,
.terminal-reveal-leave-active {
  transition:
    opacity 260ms ease,
    transform 260ms ease;
}

.terminal-reveal-enter-from,
.terminal-reveal-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}

:global(.light) .terminal-shell {
  box-shadow:
    0 24px 58px rgb(15 23 42 / 15%),
    0 0 44px rgb(var(--color-primary) / 10%);
}

@keyframes terminal-cursor {
  0%,
  48% {
    opacity: 1;
  }

  49%,
  100% {
    opacity: 0;
  }
}

@media (width <= 420px) {
  .terminal-header {
    grid-template-columns: auto 1fr auto;
    gap: 0.75rem;
  }

  .terminal-title {
    justify-self: center;
  }

  .terminal-body {
    padding: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .terminal-shell,
  .terminal-input,
  .terminal-reveal-enter-active,
  .terminal-reveal-leave-active {
    transition: none;
  }

  .terminal-cursor {
    animation: none;
  }
}
</style>
