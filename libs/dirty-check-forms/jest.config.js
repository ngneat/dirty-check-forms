module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/dirty-check-forms',

  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',

      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  displayName: 'dirty-check-forms',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  transform: {
    '^.+.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  moduleNameMapper: {
    'lodash-es': 'lodash',
  },
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
};
