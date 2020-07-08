module.exports = {
  rootDir: './',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '**/test/unit/**/*.spec.(js|jsx|ts|tsx)'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ]
}
