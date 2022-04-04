import { env } from './env.config.js';

/** @type {import('@jest/types').Config.InitialOptions} */
export default {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  rootDir: '../src/',
  coverageReporters: [
    env.CI && 'clover',
    env.CI && 'json',
    env.CI && 'lcov',
    !env.CI ? 'text' : 'text-summary',
  ].filter(Boolean),
};
