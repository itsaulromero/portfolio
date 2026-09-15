export default {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-vue'],
  ignoreFiles: [
    '**/.nuxt/**',
    '**/.output/**',
    '**/node_modules/**',
    '**/dist/**',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['apply', 'config', 'screen', 'tailwind'],
      },
    ],
  },
}
