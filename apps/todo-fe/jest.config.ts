/* eslint-disable */
export default {
  displayName: 'todo-fe',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'], babelrc: false }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(react-resizable-panels|@pinecone-intern/ui)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  modulePathIgnorePatterns: ['generated', '.next'],
  moduleNameMapper: {
    '^@pinecone-intern/ui$': '<rootDir>/../../libs/shared/ui/src/index.ts',
    '^@pinecone-intern/ui/(.*)$': '<rootDir>/../../libs/shared/ui/src/$1',
  },
  setupFilesAfterEnv: ['jest-canvas-mock'],
  coverageDirectory: '../../coverage/apps/todo-fe',
  collectCoverageFrom: [
    '**/app/**/_components/**/*.tsx',
    '**/app/**/_lib/**/*.ts',
    '!jest.config.ts',
  ],
};
