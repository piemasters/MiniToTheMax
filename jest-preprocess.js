const babelOptions = {
  presets: [
    'babel-preset-gatsby',
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: ['@emotion'],
};
module.exports = require('babel-jest').default.createTransformer(babelOptions);
