// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@nuxtjs/i18n'],

  tailwindcss: {
    cssPath: './app/assets/css/tailwind.css',
  },

  i18n: {
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    locales: [
      {
        code: 'es',
        name: 'Español',
        language: 'es-MX',
        file: 'es.json',
      },
      {
        code: 'en',
        name: 'English',
        language: 'en-US',
        file: 'en.json',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'es',
    },
  },
})
