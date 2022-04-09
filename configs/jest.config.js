import { env } from './env.config.js';

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  collectCoverageFrom: ['**/*.ts'],
  coverageReporters: [
    env.CI && 'clover',
    env.CI && 'json',
    env.CI && 'lcov',
    !env.CI ? 'text' : 'text-summary',
  ].filter(Boolean),
  ci: env.CI,
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  rootDir: '../src/',
};

export default config;
