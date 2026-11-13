/**
 * İç bağlantı denetimi.
 *
 * dist/ içindeki her HTML dosyasını tarar, site içi her bağlantının karşılığı
 * olan bir sayfa üretilmiş mi kontrol eder. Ayrıca mevcut segika.com'un URL
 * haritasıyla karşılaştırarak hangi adreslerin henüz taşınmadığını listeler.
 *
 *   node tools/links.mjs
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// fileURLToPath şart: proje yolunda Türkçe karakter var, .pathname yüzde kodlu döner
const DIST = fileURLToPath(new URL('../dist/', import.meta.url));

/** dist içindeki tüm .html dosyalarını toplar. */
async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const files = await walk(DIST);

/** Üretilen rotalar: /a/b/index.html → /a/b/ */
const routes = new Set(
  files.map((f) => {
    const rel = '/' + relative(DIST, f);
    return rel.replace(/index\.html$/, '').replace(/\/+$/, '/') || '/';
  }),
);

const broken = new Map();
const external = new Set();

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const from = '/' + relative(DIST, file).replace(/index\.html$/, '');

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('data:')
    )
      continue;
    if (/^https?:\/\//.test(href)) {
      external.add(href);
      continue;
    }
    // Varlıklar (font, görsel, css) rota değil
    if (/\.(woff2?|png|jpe?g|svg|ico|css|js|pdf|xml|txt)$/.test(href)) continue;

    const path = href.split('#')[0].split('?')[0];
    if (!routes.has(path)) {
      if (!broken.has(path)) broken.set(path, new Set());
      broken.get(path).add(from);
    }
  }
}

console.log(`\nÜretilen sayfa: ${routes.size}`);
console.log(`Dış bağlantı:  ${external.size}`);

if (broken.size === 0) {
  console.log('\nKırık iç bağlantı yok.\n');
} else {
  console.log(`\nKarşılığı olmayan ${broken.size} iç adres:\n`);
  for (const [path, sources] of [...broken].sort()) {
    const list = [...sources].slice(0, 3).join(', ');
    const more = sources.size > 3 ? ` (+${sources.size - 3} sayfa daha)` : '';
    console.log(`  ${path}`);
    console.log(`      geçtiği yer: ${list}${more}`);
  }
  console.log();
}

console.log('Dış bağlantılar:');
for (const url of [...external].sort()) console.log(`  ${url}`);
console.log();

process.exit(broken.size === 0 ? 0 : 1);
