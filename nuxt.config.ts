// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['@fontsource-variable/roboto/wght.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
  ],

  tailwindcss: {
    cssPath: './app/assets/css/tailwind.css',
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
    storage: 'localStorage',
    storageKey: 'portfolio-color-mode',
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
