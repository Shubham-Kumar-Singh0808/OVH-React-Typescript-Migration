/**
 * Copyright (c) 2013-present, creativeLabs Lukasz Holeczek.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/*index.ts',
    '!src/serviceWorker.ts',
    '!src/polyfill.ts',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testTimeout: 20000,
}
