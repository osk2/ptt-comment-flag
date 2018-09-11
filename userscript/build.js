// npm run build:userscript
// yarn run build:userscript

const rollup = require('rollup');
const metablock = require('rollup-plugin-userscript-metablock');
const pkg = require('../package.json');

main();

async function main() {
  const bundle = await rollup.rollup({
    input: '../chrome-extension/js/content_script.js',
    plugins: [
      metablock({
        file: './metablock.json',
        version: pkg.version,
      }),
    ],
  });

  await bundle.write({
    file: 'ptt-comment-flag.user.js',
    format: 'iife',
  });
}

