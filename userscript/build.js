// npm run build:userscript
// yarn run build:userscript

const fs = require('fs');
const rollup = require('rollup');
const metablock = require('rollup-plugin-userscript-metablock');
const pkg = require('../chrome-extension/manifest.json');

const meta = {
  name: pkg.name,
  description: pkg.description,
  version: pkg.version,
  author: pkg.author,
  namespace: 'https://github.com/osk2/ptt-comment-flag/',
  match: pkg.content_scripts[0].matches,
  require: [
    'https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/tippy.js/2.5.4/tippy.min.js',
  ],
  noframes: true,
};

const externalStyles = [
  'https://cdnjs.cloudflare.com/ajax/libs/tippy.js/2.5.4/tippy.css',
];

main();

async function main() {
  fs.writeFileSync('./metablock.json', JSON.stringify(meta, null, 2));

  const bundle = await rollup.rollup({
    input: '../chrome-extension/js/content_script.js',
    plugins: [
      metablock({
        file: './metablock.json',
      }),
    ],
  });

  await bundle.write({
    file: 'ptt-comment-flag.user.js',
    format: 'es',
  });

  const injection = `
const styles = ${JSON.stringify(externalStyles, null, 2)};

for(const css of styles) {
  const el = document.createElement('link');
  el.rel = 'stylesheet';
  el.type = 'text/css';
  el.href = css;
  document.head.appendChild(el);
}
`;

  fs.writeFileSync('ptt-comment-flag.user.js', injection, { flag: 'a' });
}

