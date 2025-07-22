module.exports = {
  setupFiles: ['<rootDir>/jest.global-mock.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
};
