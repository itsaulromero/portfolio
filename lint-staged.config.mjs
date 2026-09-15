export default {
  '*.{js,cjs,mjs,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.vue': ['eslint --fix', 'stylelint --fix', 'prettier --write'],
  '*.css': ['stylelint --fix', 'prettier --write'],
  '*.{json,jsonc,md,yml,yaml}': 'prettier --write',
}
