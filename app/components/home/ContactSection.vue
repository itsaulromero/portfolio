<script setup lang="ts">
import type { ContactField } from '~/composables/useContactForm'

const { t } = useI18n()

const { form, errors, status, isSubmitting, clearError, submit } =
  useContactForm()

const fieldIds: Record<ContactField, string> = {
  name: 'contact-name',
  email: 'contact-email',
  message: 'contact-message',
}

const handleSubmit = async () => {
  const result = await submit()

  if (!result.firstInvalid) {
    return
  }

  await nextTick()
  document.getElementById(fieldIds[result.firstInvalid])?.focus()
}
</script>

<template>
  <section id="contact" class="contact-section" aria-labelledby="contact-title">
    <div class="contact-container">
      <header class="contact-header">
        <h2 id="contact-title">
          {{ t('home.contact.title') }}
        </h2>

        <p>
          {{ t('home.contact.description') }}
        </p>
      </header>

      <div class="contact-grid">
        <div class="contact-information">
          <p class="contact-eyebrow">
            {{ t('home.contact.eyebrow') }}
          </p>

          <h3>
            {{ t('home.contact.heading') }}
          </h3>

          <p class="contact-copy">
            {{ t('home.contact.body') }}
          </p>

          <div class="contact-divider" />

          <ul class="contact-details">
            <li>
              <span class="availability-marker" aria-hidden="true" />

              <span>{{ t('home.contact.availability') }}</span>
            </li>

            <li>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                class="contact-detail-icon"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>

              <span>{{ t('home.contact.location') }}</span>
            </li>
          </ul>

          <p class="contact-note">
            {{ t('home.contact.note') }}
          </p>
        </div>

        <form
          class="contact-form"
          :aria-label="t('home.contact.form.ariaLabel')"
          :aria-busy="isSubmitting"
          novalidate
          @submit.prevent="handleSubmit"
        >
          <div class="form-field">
            <label :for="fieldIds.name" class="field-label">
              <span>
                {{ t('home.contact.form.name.label') }}
                <span class="required-marker" aria-hidden="true"> * </span>
              </span>

              <span class="required-hint">
                {{ t('home.contact.form.required') }}
              </span>
            </label>

            <input
              :id="fieldIds.name"
              v-model="form.name"
              type="text"
              name="name"
              autocomplete="name"
              required
              minlength="2"
              maxlength="80"
              class="form-control"
              :class="{ 'form-control-error': errors.name }"
              :placeholder="t('home.contact.form.name.placeholder')"
              :aria-invalid="Boolean(errors.name)"
              :aria-describedby="
                errors.name ? `${fieldIds.name}-error` : undefined
              "
              :disabled="isSubmitting"
              @input="clearError('name')"
            />

            <p
              v-if="errors.name"
              :id="`${fieldIds.name}-error`"
              class="field-error"
            >
              {{ t(errors.name) }}
            </p>
          </div>

          <div class="form-field">
            <label :for="fieldIds.email" class="field-label">
              <span>
                {{ t('home.contact.form.email.label') }}
                <span class="required-marker" aria-hidden="true"> * </span>
              </span>

              <span class="required-hint">
                {{ t('home.contact.form.required') }}
              </span>
            </label>

            <input
              :id="fieldIds.email"
              v-model="form.email"
              type="email"
              name="email"
              autocomplete="email"
              inputmode="email"
              required
              maxlength="254"
              class="form-control"
              :class="{ 'form-control-error': errors.email }"
              :placeholder="t('home.contact.form.email.placeholder')"
              :aria-invalid="Boolean(errors.email)"
              :aria-describedby="
                errors.email ? `${fieldIds.email}-error` : undefined
              "
              :disabled="isSubmitting"
              @input="clearError('email')"
            />

            <p
              v-if="errors.email"
              :id="`${fieldIds.email}-error`"
              class="field-error"
            >
              {{ t(errors.email) }}
            </p>
          </div>

          <div class="form-field">
            <label :for="fieldIds.message" class="field-label">
              <span>
                {{ t('home.contact.form.message.label') }}
                <span class="required-marker" aria-hidden="true"> * </span>
              </span>

              <span class="required-hint">
                {{ t('home.contact.form.required') }}
              </span>
            </label>

            <textarea
              :id="fieldIds.message"
              v-model="form.message"
              name="message"
              required
              minlength="20"
              maxlength="2000"
              rows="6"
              class="form-control form-textarea"
              :class="{ 'form-control-error': errors.message }"
              :placeholder="t('home.contact.form.message.placeholder')"
              :aria-invalid="Boolean(errors.message)"
              :aria-describedby="
                errors.message ? `${fieldIds.message}-error` : undefined
              "
              :disabled="isSubmitting"
              @input="clearError('message')"
            />

            <p
              v-if="errors.message"
              :id="`${fieldIds.message}-error`"
              class="field-error"
            >
              {{ t(errors.message) }}
            </p>
          </div>

          <button type="submit" class="submit-button" :disabled="isSubmitting">
            <span>
              {{
                isSubmitting
                  ? t('home.contact.form.submitting')
                  : t('home.contact.form.submit')
              }}
            </span>

            <span
              v-if="isSubmitting"
              class="submit-spinner"
              aria-hidden="true"
            />

            <svg
              v-else
              aria-hidden="true"
              viewBox="0 0 24 24"
              class="submit-icon"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </button>

          <div class="form-feedback" aria-live="polite" aria-atomic="true">
            <p
              v-if="status === 'success'"
              class="form-message form-message-success"
              role="status"
            >
              {{ t('home.contact.form.success') }}
            </p>

            <p
              v-else-if="status === 'error'"
              class="form-message form-message-error"
              role="alert"
            >
              {{ t('home.contact.form.error') }}

              <span>
                {{ t('home.contact.form.fallback') }}
                <a href="mailto:contacto@saulromero.dev">
                  contacto@saulromero.dev
                </a>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: clamp(5rem, 10vw, 8rem) 1.5rem;
}

.contact-container {
  width: min(100%, 75rem);
  margin-inline: auto;
}

.contact-header h2 {
  color: rgb(var(--color-heading));
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.035em;
}

.contact-header p {
  max-width: 42rem;
  margin-top: 0.75rem;
  color: rgb(var(--color-muted));
  font-size: 1.0625rem;
  line-height: 1.65;
}

.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(28rem, 1.05fr);
  gap: clamp(3rem, 8vw, 8rem);
  align-items: start;
  margin-top: clamp(3.5rem, 7vw, 5rem);
}

.contact-information {
  padding-top: 0.5rem;
}

.contact-eyebrow {
  color: rgb(var(--color-primary-light));
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.contact-information h3 {
  margin-top: 2rem;
  color: rgb(var(--color-heading));
  font-size: clamp(1.75rem, 3vw, 2rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.contact-copy {
  max-width: 30rem;
  margin-top: 1.75rem;
  color: rgb(var(--color-body));
  font-size: 1rem;
  line-height: 1.65;
}

.contact-divider {
  width: min(100%, 30rem);
  height: 1px;
  margin-block: 2rem;
  background: rgb(var(--color-border));
}

.contact-details {
  display: grid;
  gap: 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.contact-details li {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: rgb(var(--color-body));
  font-size: 0.9rem;
}

.availability-marker {
  width: 0.65rem;
  height: 0.65rem;
  flex: 0 0 auto;
  border-radius: 50%;
  background: rgb(52 211 153);
  box-shadow: 0 0 0.8rem rgb(52 211 153 / 55%);
}

.contact-detail-icon {
  width: 1.15rem;
  height: 1.15rem;
  flex: 0 0 auto;
  color: rgb(var(--color-primary-light));
}

.contact-note {
  margin-top: 2.5rem;
  color: rgb(var(--color-muted));
  font-size: 0.75rem;
  line-height: 1.6;
}

.contact-form {
  border: 1px solid rgb(var(--color-border));
  border-radius: 1.125rem;
  padding: clamp(1.5rem, 4vw, 2.25rem);
  background: rgb(var(--color-surface) / 82%);
  box-shadow:
    0 1.5rem 4rem rgb(0 0 0 / 18%),
    0 1.5rem 3.5rem rgb(var(--color-primary) / 10%);
}

.form-field + .form-field {
  margin-top: 1.5rem;
}

.field-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.65rem;
  color: rgb(var(--color-heading));
  font-size: 0.875rem;
  font-weight: 500;
}

.required-marker {
  margin-left: 0.25rem;
  color: rgb(var(--color-primary-light));
}

.required-hint {
  color: rgb(var(--color-muted));
  font-size: 0.75rem;
  font-weight: 400;
}

.form-control {
  display: block;
  width: 100%;
  border: 1px solid rgb(var(--color-border));
  border-radius: 0.75rem;
  padding: 0.9rem 1rem;
  background: rgb(var(--color-background) / 62%);
  color: rgb(var(--color-heading));
  font: inherit;
  line-height: 1.5;
  outline: none;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    background-color 180ms ease;
}

.form-control:focus {
  border-color: rgb(var(--color-primary-light));
  box-shadow: 0 0 0 3px rgb(var(--color-primary) / 14%);
}

.form-control:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.form-control:hover:not(:disabled) {
  border-color: rgb(var(--color-primary-light) / 55%);
}

.form-control-error {
  border-color: rgb(248 113 113);
}

.form-control-error:focus {
  border-color: rgb(248 113 113);
  box-shadow: 0 0 0 3px rgb(248 113 113 / 15%);
}

.form-textarea {
  min-height: 9rem;
  resize: vertical;
}

.field-error {
  margin-top: 0.5rem;
  color: rgb(248 113 113);
  font-size: 0.75rem;
  line-height: 1.5;
}

.submit-button {
  display: inline-flex;
  min-width: 11.875rem;
  min-height: 3.125rem;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border: 0;
  border-radius: 0.7rem;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: rgb(var(--color-primary));
  color: white;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 0.75rem 2rem rgb(var(--color-primary) / 20%);
  transition:
    background-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.submit-button:focus-visible {
  outline: 2px solid rgb(var(--color-primary-light));
  outline-offset: 4px;
}

.submit-button:disabled {
  cursor: wait;
  opacity: 0.75;
}

.submit-button:hover:not(:disabled) {
  background: rgb(var(--color-primary-light));
  box-shadow: 0 1rem 2.25rem rgb(var(--color-primary) / 28%);
  transform: translateY(-2px);
}

.submit-icon {
  width: 1.1rem;
  height: 1.1rem;
}

.submit-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgb(255 255 255 / 35%);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 700ms linear infinite;
}

.form-feedback {
  min-height: 1.5rem;
  margin-top: 1rem;
}

.form-message {
  font-size: 0.8125rem;
  line-height: 1.55;
}

.form-message-success {
  color: rgb(52 211 153);
}

.form-message-error {
  color: rgb(248 113 113);
}

.form-message-error span {
  display: block;
  margin-top: 0.25rem;
  color: rgb(var(--color-muted));
}

.form-message-error a {
  color: rgb(var(--color-primary-light));
  text-decoration: underline;
  text-underline-offset: 0.2rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (width <= 56rem) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }

  .contact-copy,
  .contact-divider {
    max-width: 38rem;
  }
}

@media (width <= 40rem) {
  .contact-section {
    padding-inline: 1rem;
  }

  .contact-form {
    padding: 1.25rem;
  }

  .submit-button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .form-control,
  .submit-button {
    transition: none;
  }

  .submit-button:hover:not(:disabled) {
    transform: none;
  }

  .submit-spinner {
    animation-duration: 1.5s;
  }
}
</style>
