export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
        ],
      },
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme', 'screen'],
      },
    ],
  },
  ignoreFiles: [
    'node_modules/**/*',
    'dist/**/*',
    'build/**/*',
    'coverage/**/*',
    '*.min.css',
  ],
}
