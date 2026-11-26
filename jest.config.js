module.exports = {
  roots: ['src'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': [
      '@swc/jest',
      {
        sourceMaps: 'inline',
        module: {
          type: 'commonjs',
        },
        jsc: {
          target: 'es2022',
          parser: {
            syntax: 'typescript',
            tsx: true,
            dynamicImport: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)(\\?url)?$': `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`],
  transformIgnorePatterns: [
    `node_modules/(?!(react-photoswipe-gallery|photoswipe)/)`,
  ],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  setupFilesAfterEnv: [`<rootDir>/jest.setup.js`],
};
