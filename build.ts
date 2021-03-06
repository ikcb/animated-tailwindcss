import type { BuildOptions } from 'esbuild';

import {
  closeSync,
  copyFileSync,
  openSync,
  readdirSync,
  readFileSync,
  unlinkSync,
  writeSync,
} from 'fs';
import { join } from 'path';

import { pnpPlugin } from '@yarnpkg/esbuild-plugin-pnp';
import { build as esBuild } from 'esbuild';
// @ts-ignore
import replace from 'replace';

const copyFiles = (src: string, dest = src): void => {
  const destList = dest.split(' ');
  src.split(' ').forEach((file, i) => copyFileSync(file, join(__dirname, 'dist', destList[i])));
};

const opts: BuildOptions = {
  bundle: true,
  charset: 'utf8',
  minify: true,
  plugins: [pnpPlugin()],
  target: 'es2019',
};

esBuild({
  ...opts,
  external: ['tailwindcss'],
  platform: 'node',

  entryPoints: ['dist/index.js'],
  outfile: 'dist/index.cjs',
})
  .then(async () => {
    readdirSync(join(__dirname, 'dist')).forEach((file) => {
      if (!/^index(\.cjs|\.d\.ts)$/.test(file)) unlinkSync(join(__dirname, 'dist', file));
    });

    copyFiles('.npmignore LICENSE README.md');
    copyFiles('package-dist.json', 'package.json');

    // merge type declarations
    const data = readFileSync(join(__dirname, 'dist', 'index.d.ts'));
    const fd = openSync(join(__dirname, 'dist', 'index.d.ts'), 'w+');
    writeSync(fd, `${readFileSync(join(__dirname, 'types', 'base.d.ts'))}\n${data}`);
    closeSync(fd);

    [/<a href="[^"]*#gh-dark-mode-only">[^]*?<\/a>\s+/, /#gh-light-mode-only/].forEach((regex) =>
      replace({ regex, replacement: '', paths: ['./dist/README.md'], silent: true }),
    );

    // build for browser
    return esBuild({
      ...opts,
      format: 'esm',

      entryPoints: ['dist/index.cjs'],
      outfile: 'dist/index.mjs',
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
