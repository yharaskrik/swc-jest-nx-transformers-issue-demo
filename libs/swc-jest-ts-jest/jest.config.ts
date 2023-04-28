/* eslint-disable */
import { readFileSync } from 'fs';

// Reading the SWC compilation config and remove the "exclude"
// for the test files to be compiled by SWC
const { exclude: _, ...swcJestConfig } = JSON.parse(
  readFileSync(`${__dirname}/.swcrc`, 'utf-8')
);

// disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves.
// If we do not disable this, SWC Core will read .swcrc and won't transform our test files due to "exclude"
if (swcJestConfig.swcrc === undefined) {
  swcJestConfig.swcrc = false;
}

export default {
  displayName: 'swc-jest-ts-jest',
  preset: '../../jest.preset.js',
  globalSetup: '<rootDir>/src/global-setup.ts',
  transform: {
    // 'src/global-(setup|teardown).ts': [
    //   'ts-jest',
    //   {
    //     tsconfig: '<rootDir>/tsconfig.spec.json',
    //     isolatedModules: process.env['CI'] === 'true',
    //   },
    // ],
    '^.+\\.[tj]s$': ['@swc/jest', swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/swc-jest-ts-jest',
};
