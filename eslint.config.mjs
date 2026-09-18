import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-explicit-any': 'error',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
  },
})
