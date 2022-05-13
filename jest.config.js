/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['__tests__/integration/fakeData', '__tests__/commonTests', '__tests__/utils', '__tests__/seeds', '__tests__/unit/fakeData'],
};
