import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/__tests__/**/*.test.ts'],
    testPathIgnorePatterns: [
        '<rootDir>/src/__tests__/responsive.test.ts', // Playwright test
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: { module: 'commonjs' } }],
    },
};

export default config;
