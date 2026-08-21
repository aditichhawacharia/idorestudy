import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve('.');
const dist = path.join(root, '.static-verify-dist');

async function copyDirectory(source, destination) {
  await fs.mkdir(destination, { recursive: true });
  for (const entry of await fs.readdir(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);
    if (entry.isDirectory()) await copyDirectory(from, to);
    else await fs.copyFile(from, to);
  }
}

function run(script) {
  const result = spawnSync(process.execPath, [script], {
    cwd: root,
    env: { ...process.env, DIST_DIR: dist },
    encoding: 'utf8',
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.status !== 0) process.exit(result.status || 1);
}

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(path.join(dist, '.vite'), { recursive: true });
await fs.mkdir(path.join(dist, 'assets'), { recursive: true });
await copyDirectory(path.join(root, 'public'), dist);
await fs.copyFile(path.join(root, 'index.html'), path.join(dist, 'index.html'));
await fs.writeFile(path.join(dist, '.vite', 'manifest.json'), JSON.stringify({
  'src/main.jsx': { file: 'assets/index.js', isEntry: true },
  'src/pages/StudyCafe.jsx': { file: 'assets/StudyCafe.js', isDynamicEntry: true },
}, null, 2));
await fs.writeFile(path.join(dist, 'assets', 'index.js'), '// Static-route verification placeholder.\n');
await fs.writeFile(path.join(dist, 'assets', 'StudyCafe.js'), '// Static-route verification placeholder.\n');

run('scripts/prerender.mjs');
run('scripts/link-audit.mjs');

if (process.env.KEEP_STATIC_VERIFY !== '1') {
  await fs.rm(dist, { recursive: true, force: true });
}
console.log('Static prerender verification completed without requiring the Vite dependency tree.');
