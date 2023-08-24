const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  testEnvironment: 'node',
  testRegex: '/__tests__/.*\\.js?$',
  moduleFileExtensions: ['js', 'json', 'node'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};

module.exports = createJestConfig(customJestConfig);
