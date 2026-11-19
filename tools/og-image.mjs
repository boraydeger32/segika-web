/**
 * Paylaşım (Open Graph) kartı üretici.
 *
 * Kart bilerek tipografik: elimizde kullanılabilir bir ürün ekran görüntüsü
 * yok (canlı sitedekiler gerçek TC Kimlik ve sağlık verisi taşıyor), uydurma
 * bir arayüz çizmek de yasak. Bu yüzden kartta yalnızca doğrulanabilir şeyler
 * var: gerçek kelime markası, sayfanın gerçek başlığı ve kaynaklı rakam.
 *
 * Yazı tipleri siteyle aynı dosyalardan okunuyor (public/fonts), böylece kart
 * sayfanın tipografisiyle aynı dili konuşuyor ve Türkçe harfler doğru çiziliyor.
 *
 *   node tools/og-image.mjs            → iki kart da üretilir
 *   node tools/og-image.mjs --list     → üretilecek kartları yazar
 */

import { spawn } from 'node:child_process';
import { writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
/* Proje yolunda Türkçe karakter var; `.pathname` yüzde kodlu döner. */
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Üretilecek kartlar. Metinler sayfalardaki birebir metinlerden. */
const CARDS = [
  {
    out: 'public/brand/og-default.png',
    eyebrow: 'SGK Otomasyon Yazılımı',
    title: 'Teşvik, vizite, kimlik bildirimi ve işkur — tek panelde',
    figure: '360.000.000 ₺',
    figureLabel: 'Kullanıcılarımızın her ay kazandığı toplam teşvik',
    footnote: 'Yalnızca 6111, 3294 ve 2828 teşvikleri · 2025 Temmuz',
  },
  {
    out: 'public/brand/og-tesvik-analizi.png',
    eyebrow: 'Ücretsiz teşvik analizi',
    title: 'Hak ettiğiniz teşviki alıyor musunuz?',
    figure: '7 teşvik',
    figureLabel: 'Yürürlükteki tüm kanun kodları birlikte hesaplanır',
    footnote: 'Kurulum yok · Kredi kartı istenmez',
  },
];

/** Yazı tipini data URI'ye çevirir — headless Chrome yerel dosyayı böyle alıyor. */
async function fontUri(file) {
  const buf = await readFile(resolve(ROOT, 'public/fonts', file));
  return `data:font/woff2;base64,${buf.toString('base64')}`;
}

async function template(card, fonts, logo) {
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><style>
    @font-face { font-family: 'Plex'; src: url('${fonts.sans}') format('woff2-variations');
      font-weight: 100 700; unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+2000-206F, U+20BA, U+2122; }
    @font-face { font-family: 'Plex'; src: url('${fonts.sansExt}') format('woff2-variations');
      font-weight: 100 700; unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF; }
    @font-face { font-family: 'PlexMono'; src: url('${fonts.mono}') format('woff2'); font-weight: 400; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px; height: 630px; display: flex; flex-direction: column;
      justify-content: space-between; padding: 72px 80px;
      font-family: 'Plex', sans-serif; background: #0b0b0c; color: #faf9f5;
      /* Sitedeki nokta dokusunun aynısı */
      background-image: radial-gradient(rgb(250 249 245 / 0.07) 1px, transparent 1px);
      background-size: 28px 28px;
    }
    .top { display: flex; align-items: center; justify-content: space-between; }
    .logo { height: 38px; }
    .eyebrow {
      font-family: 'PlexMono', monospace; font-size: 15px; letter-spacing: 0.1em;
      text-transform: uppercase; color: #9a968c;
      border: 1px solid #26262a; border-radius: 999px; padding: 9px 18px;
    }
    h1 {
      font-size: 62px; line-height: 1.07; letter-spacing: -0.03em; font-weight: 500;
      max-width: 19ch; text-wrap: balance;
    }
    .bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 48px;
      border-top: 1px solid #26262a; padding-top: 30px; }
    .figure { font-size: 46px; font-weight: 500; letter-spacing: -0.025em;
      color: #2cbc63; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .figure-label { font-size: 18px; color: #9a968c; margin-top: 8px; max-width: 34ch; }
    .footnote { font-family: 'PlexMono', monospace; font-size: 13px; color: #6b6862;
      text-align: right; max-width: 36ch; line-height: 1.5; text-wrap: balance; }
  </style></head><body>
    <div class="top">
      <img class="logo" src="${logo}" alt="">
      <span class="eyebrow">${card.eyebrow}</span>
    </div>
    <h1>${card.title}</h1>
    <div class="bottom">
      <div>
        <div class="figure">${card.figure}</div>
        <div class="figure-label">${card.figureLabel}</div>
      </div>
      <div class="footnote">${card.footnote}</div>
    </div>
  </body></html>`;
}

async function main() {
  if (process.argv.includes('--list')) {
    CARDS.forEach((c) => console.log(`${c.out}  —  ${c.title}`));
    return;
  }

  const fonts = {
    sans: await fontUri('ibm-plex-sans-latin-wght-normal.woff2'),
    sansExt: await fontUri('ibm-plex-sans-latin-ext-wght-normal.woff2'),
    mono: await fontUri('ibm-plex-mono-latin-400-normal.woff2'),
  };
  const logoBuf = await readFile(resolve(ROOT, 'public/brand/segika-wordmark-dark.png'));
  const logo = `data:image/png;base64,${logoBuf.toString('base64')}`;

  const port = 9500 + Math.floor(Math.random() * 300);
  const chrome = spawn(
    CHROME,
    ['--headless=new', `--remote-debugging-port=${port}`, '--no-first-run',
     `--user-data-dir=/tmp/cdp-og-${port}`, '--hide-scrollbars', '--window-size=1200,630'],
    { stdio: 'ignore' },
  );

  let list = null;
  for (let i = 0; i < 40; i++) {
    await sleep(300);
    try { list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); break; } catch {}
  }
  if (!list) throw new Error('Chrome açılmadı');

  const sock = new WebSocket(list.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => (sock.onopen = r));
  let id = 0;
  const waits = new Map();
  sock.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (waits.has(m.id)) waits.get(m.id)(m.result);
  };
  const send = (method, params = {}) =>
    new Promise((r) => { const i = ++id; waits.set(i, r); sock.send(JSON.stringify({ id: i, method, params })); });

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride',
    { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });

  for (const card of CARDS) {
    const html = await template(card, fonts, logo);
    await send('Page.navigate', { url: `data:text/html;charset=utf-8,${encodeURIComponent(html)}` });
    /* Gömülü yazı tiplerinin çözülmesi için bekle; erken çekersek yedek
       yazı tipiyle render olup Türkçe harfler bozuluyor. */
    await sleep(1400);
    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 },
    });
    const path = resolve(ROOT, card.out);
    await writeFile(path, Buffer.from(shot.data, 'base64'));
    console.log(`yazıldı  ${card.out}`);
  }

  chrome.kill();
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
