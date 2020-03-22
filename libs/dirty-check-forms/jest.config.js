module.exports = {
  name: 'dirty-check-forms',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/dirty-check-forms',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
