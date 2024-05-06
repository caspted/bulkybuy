module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // roots: ['<rootDir>/src'],
  testRegex: '/__tests__/.*\\.spec\\.ts$',
  transform: {
    '^.+\\.tsx?$': '@swc/jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};