export type ContactField = 'name' | 'email' | 'message'
export type ContactStatus = 'idle' | 'submitting' | 'success' | 'error'

interface SubmitResult {
  submitted: boolean
  firstInvalid?: ContactField
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const useContactForm = () => {
  const config = useRuntimeConfig()

  const form = reactive({
    name: '',
    email: '',
    message: '',
  })

  const errors = reactive<Record<ContactField, string>>({
    name: '',
    email: '',
    message: '',
  })

  const status = ref<ContactStatus>('idle')

  const isSubmitting = computed(() => status.value === 'submitting')

  const clearError = (field: ContactField) => {
    errors[field] = ''

    if (status.value !== 'submitting') {
      status.value = 'idle'
    }
  }

  const validate = (): ContactField | undefined => {
    errors.name = ''
    errors.email = ''
    errors.message = ''

    if (form.name.trim().length < 2) {
      errors.name = 'home.contact.form.errors.name'
    }

    if (!EMAIL_PATTERN.test(form.email.trim())) {
      errors.email = 'home.contact.form.errors.email'
    }

    if (form.message.trim().length < 20) {
      errors.message = 'home.contact.form.errors.message'
    }

    return (Object.keys(errors) as ContactField[]).find(
      (field) => errors[field],
    )
  }

  const resetForm = () => {
    form.name = ''
    form.email = ''
    form.message = ''
  }

  const submit = async (): Promise<SubmitResult> => {
    if (isSubmitting.value) {
      return { submitted: false }
    }

    const firstInvalid = validate()

    if (firstInvalid) {
      status.value = 'idle'

      return {
        submitted: false,
        firstInvalid,
      }
    }

    const endpoint = config.public.formspreeEndpoint.trim()

    if (!endpoint) {
      status.value = 'error'
      return { submitted: false }
    }

    status.value = 'submitting'

    const payload = new FormData()
    payload.append('name', form.name.trim())
    payload.append('email', form.email.trim())
    payload.append('message', form.message.trim())

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      })

      if (!response.ok) {
        throw new Error('Contact form request failed')
      }

      resetForm()
      status.value = 'success'

      return { submitted: true }
    } catch {
      status.value = 'error'

      return { submitted: false }
    }
  }

  return {
    form,
    errors,
    status,
    isSubmitting,
    clearError,
    submit,
  }
}
