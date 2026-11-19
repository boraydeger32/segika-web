/**
 * Yapısal veri denetçisi.
 *
 * İki şeyi kontrol eder:
 *  1. JSON-LD geçerli mi, beklenen düğümler var mı
 *  2. **Şemada iddia edilen her metin sayfada gerçekten görünüyor mu**
 *
 * İkincisi asıl mesele. Yapısal veri, sayfada olmayan bir şeyi makineye
 * anlatmak için kullanılabilir — arama motorlarının açıkça yasakladığı ve
 * cezalandırdığı bir davranış. Soru-cevap ve adımlar tek veri kaynağından
 * geldiği için şu an sapma imkânsız; bu araç o güvenceyi kalıcı kılıyor,
 * biri ileride şemayı elle doldurmaya kalkarsa test düşer.
 *
 *   node tools/schema.mjs                  → dist/ içindeki tüm sayfalar
 *   node tools/schema.mjs tesvik-analizi   → tek sayfa
 */

import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

/* Proje yolunda Türkçe karakter var; `.pathname` yüzde kodlu döner. */
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

const filtre = process.argv[2];
let gecen = 0;
let kalan = 0;

/** HTML'den görünür düz metni çıkarır — script ve style hariç. */
function gorunurMetin(html) {
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const govde = main || html;
  const temiz = govde
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  return decode(temiz).replace(/\s+/g, ' ').trim();
}

function decode(s) {
  const map = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ' };
  return s
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, e) => map[e])
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

/** Şemadaki bir metnin sayfada görünüp görünmediğini bildirir. */
function iddiaKontrol(sayfa, etiket, metin, govde, sorunlar) {
  const hedef = decode(metin).replace(/\s+/g, ' ').trim();
  if (!govde.includes(hedef)) {
    sorunlar.push(`${etiket}: sayfada bulunamadı — "${hedef.slice(0, 64)}…"`);
  }
}

async function htmlDosyalari(dir) {
  const out = [];
  for (const girdi of await readdir(dir, { withFileTypes: true })) {
    const tam = join(dir, girdi.name);
    if (girdi.isDirectory()) out.push(...(await htmlDosyalari(tam)));
    else if (girdi.name === 'index.html') out.push(tam);
  }
  return out;
}

const dosyalar = await htmlDosyalari(DIST);

for (const dosya of dosyalar) {
  const yol = dosya.slice(DIST.length).replace(/\/index\.html$/, '') || '/';
  if (filtre && !yol.includes(filtre)) continue;

  const html = await readFile(dosya, 'utf8');
  const blok = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!blok) continue;

  const sorunlar = [];
  let veri;
  try {
    veri = JSON.parse(blok[1]);
  } catch (err) {
    console.log(`✗ ${yol}  —  JSON-LD ayrıştırılamadı: ${err.message}`);
    kalan++;
    continue;
  }

  const govde = gorunurMetin(html);
  const dugumler = veri['@graph'] ?? [veri];
  const tipler = dugumler.map((d) => d['@type']);

  for (const d of dugumler) {
    if (d['@type'] === 'FAQPage') {
      for (const q of d.mainEntity ?? []) {
        iddiaKontrol(yol, 'soru', q.name, govde, sorunlar);
        iddiaKontrol(yol, 'cevap', q.acceptedAnswer?.text ?? '', govde, sorunlar);
      }
    }
    if (d['@type'] === 'HowTo') {
      for (const a of d.step ?? []) {
        iddiaKontrol(yol, 'adım', a.name, govde, sorunlar);
        iddiaKontrol(yol, 'adım metni', a.text, govde, sorunlar);
      }
    }
    /* Fiyat iddiası: elimizde fiyat yok, şemaya girmemeli. */
    if (d.offers) sorunlar.push('offers alanı var — fiyat bilgisi doğrulanmadı');
  }

  if (sorunlar.length) {
    console.log(`✗ ${yol}`);
    sorunlar.forEach((s) => console.log(`    ${s}`));
    kalan++;
  } else {
    console.log(`✓ ${yol.padEnd(26)} ${tipler.join(', ')}`);
    gecen++;
  }
}

console.log(
  kalan === 0
    ? `\n${gecen} sayfada yapısal veri doğrulandı — şemadaki her iddia sayfada görünüyor.`
    : `\n${gecen} geçti, ${kalan} sayfada sorun var.`,
);
process.exit(kalan === 0 ? 0 : 1);
