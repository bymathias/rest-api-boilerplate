module.exports = {
  setupFiles: ['dotenv/config'],
  rootDir: './',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ]
}
