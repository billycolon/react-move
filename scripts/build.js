// @flow weak

const fs = require('fs');
const execSync = require('child_process').execSync;
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });

// console.log('Building CommonJS modules ...')

// exec('babel modules -d . --ignore __tests__', {
//   BABEL_ENV: 'cjs'
// })

// console.log('\nBuilding ES modules ...')

// exec('babel modules -d es --ignore __tests__', {
//   BABEL_ENV: 'es'
// })

console.log('\nBuilding react-move.js ...');

exec('rollup -c -f umd -o build/react-move.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'development',
});

console.log('\nBuilding react-move.min.js ...');

exec('rollup -c -f umd -o build/react-move.min.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'production',
});

const size = gzipSize.sync(
  fs.readFileSync('build/react-move.min.js'),
);

console.log('\ngzipped, the UMD build is %s', prettyBytes(size));
