import { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../',
  testRegex: '.*\\.(test|spec)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  moduleNameMapper: {
    '@/presenter/(.*)': ['<rootDir>/presenter/$1'],
    '@/infra/(.*)': ['<rootDir>/infrastructure/$1'],
    '@/domain/(.*)': ['<rootDir>/domain/$1'],
    '@/helpers/(.*)': ['<rootDir>/helpers/$1'],
    'test/(.*)': ['<rootDir>/test/$1'],
  },
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Relatório de Testes',
        outputPath: './reports/html/test-report.html',
        includeFailureMsg: true,
        includeConsoleLog: true,
      },
    ],
  ],
};

export default config;
