import { env } from './env.config.js';

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  ci: env.CI,
  collectCoverage: env.CI,
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: '../coverage',
  coverageReporters: [
    env.CI && 'clover',
    env.CI && 'json',
    env.CI && 'lcov',
    !env.CI ? 'text' : 'text-summary',
  ].filter(Boolean),
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  rootDir: '../src/',
};

export default config;
