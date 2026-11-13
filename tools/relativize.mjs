/**
 * dist/ çıktısını alt yolda servis edilebilir hâle getirir.
 *
 * Astro mutlak yol üretir (`/fonts/x.woff2`, `/hizmetler/`). Site kendi kök
 * alan adında yayınlanacaksa bu doğrudur; ancak bir önizleme ortamında
 * (artifact, alt dizin) kök `/` başka bir yeri gösterdiği için her bağlantı
 * ve varlık kırılır.
 *
 * Bu araç `dist/`i kopyalayıp kopyadaki mutlak yolları, dosyanın kendi
 * derinliğine göre göreli yola çevirir. Orijinal `dist/` hiç değişmez —
 * gerçek dağıtım onunla yapılır.
 *
 *   node tools/relativize.mjs            → dist-preview/
 *   node tools/relativize.mjs --out foo  → foo/
 */

import { cp, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC = join(ROOT, 'dist');

const args = process.argv.slice(2);
const outFlag = args.indexOf('--out');
const OUT = join(ROOT, outFlag === -1 ? 'dist-preview' : args[outFlag + 1]);

/** Verilen dizindeki tüm dosyaları toplar. */
async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

await rm(OUT, { recursive: true, force: true });
await cp(SRC, OUT, { recursive: true });

const files = (await walk(OUT)).filter((f) => f.endsWith('.html'));

/** Dosyanın bulunduğu dizinden köke dönen önek: '', '../', '../../' … */
const prefixFor = (file) => {
  const depth = relative(OUT, dirname(file)).split('/').filter(Boolean).length;
  return depth === 0 ? '' : '../'.repeat(depth);
};

let rewritten = 0;

for (const file of files) {
  const prefix = prefixFor(file);
  let html = await readFile(file, 'utf8');
  const before = html;

  html = html.replace(/(href|src)="(\/[^"]*)"/g, (match, attr, path) => {
    // Protokol-göreli (//cdn…) dokunulmaz
    if (path.startsWith('//')) return match;

    // Kök: /  →  index.html
    if (path === '/') return `${attr}="${prefix}index.html"`;

    const clean = path.slice(1);

    // Dizin yolu (sonu /) → o dizinin index.html'i
    if (clean.endsWith('/')) return `${attr}="${prefix}${clean}index.html"`;

    // Dosya yolu (uzantısı var) → olduğu gibi göreli
    if (/\.[a-z0-9]+$/i.test(clean)) return `${attr}="${prefix}${clean}"`;

    // Uzantısız, sonu / değil (ör. /sitemap.html zaten dosya) → göreli bırak
    return `${attr}="${prefix}${clean}"`;
  });

  // Canonical ve og:url mutlak kalmalı — gerçek adresi gösteriyorlar.
  // Yukarıdaki regex yalnızca href/src'ye dokunduğu için meta content'ler
  // zaten etkilenmedi; canonical href'i geri al.
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/g,
    (m) => {
      const orig = before.match(/<link rel="canonical" href="([^"]*)"/);
      return orig ? `<link rel="canonical" href="${orig[1]}"` : m;
    },
  );

  if (html !== before) rewritten++;
  await writeFile(file, html);
}

console.log(`\n${relative(ROOT, OUT)}/ hazır`);
console.log(`  HTML dosyası : ${files.length}`);
console.log(`  yolu düzeltilen: ${rewritten}`);
console.log(`  not: orijinal dist/ değişmedi — gerçek dağıtım onunla yapılır\n`);
