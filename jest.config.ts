import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '<rootDir>/src/__tests__/**/*.test.ts',
        '<rootDir>/src/**/__tests__/**/*.test.ts',
    ],
    testPathIgnorePatterns: [
        '<rootDir>/src/__tests__/responsive.test.ts', // Playwright test
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: { module: 'commonjs' } }],
    },
    collectCoverageFrom: [
        'src/utils/**/*.ts',
        '!src/utils/**/__tests__/**',
        '!src/**/*.d.ts',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
};

export default config;
