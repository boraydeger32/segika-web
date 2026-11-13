/**
 * Erişilebilirlik ve etkileşim denetimi.
 *
 * Tarayıcıyı gerçekten sürerek kontrol eder:
 *  · mega menü klavyeyle açılıyor, Esc ile kapanıyor ve odak geri dönüyor mu
 *  · mobil menü açılıp kapanıyor, sayfa kaydırması kilitleniyor mu
 *  · prefers-reduced-motion açıkken defter rakamları doğru basılıyor mu
 *  · görünür odak halkası var mı, alt metinsiz görsel kalmış mı
 *  · başlık hiyerarşisi atlamalı mı
 *
 *   node tools/a11y.mjs /
 */

import { spawn } from 'node:child_process';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ORIGIN = process.env.AUDIT_ORIGIN ?? 'http://localhost:4321';
const path = process.argv[2] ?? '/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const port = 9500;
const proc = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=/tmp/segika-a11y-${port}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
);

for (let i = 0; i < 60; i++) {
  try {
    if ((await fetch(`http://127.0.0.1:${port}/json/version`)).ok) break;
  } catch {}
  await sleep(150);
}

const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json());
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
const pending = new Map();
let id = 0;
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? reject(new Error(m.error.message)) : resolve(m.result);
  }
});
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
const send = (method, params = {}) =>
  new Promise((res, rej) => {
    const i = ++id;
    pending.set(i, { resolve: res, reject: rej });
    ws.send(JSON.stringify({ id: i, method, params }));
  });

const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + (r.exceptionDetails.exception?.description ?? ''));
  return r.result.value;
};

/**
 * Gerçek tuş vuruşu gönderir.
 * Enter ve boşluk için `text` alanı şart — aksi hâlde Chrome düğme üzerinde
 * varsayılan click davranışını üretmez ve test yanlışlıkla başarısız görünür.
 */
const key = async (keyName, code, keyCode, text) => {
  await send('Input.dispatchKeyEvent', {
    type: text ? 'keyDown' : 'rawKeyDown',
    key: keyName,
    code,
    windowsVirtualKeyCode: keyCode,
    nativeVirtualKeyCode: keyCode,
    ...(text ? { text, unmodifiedText: text } : {}),
  });
  await send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: keyName,
    code,
    windowsVirtualKeyCode: keyCode,
    nativeVirtualKeyCode: keyCode,
  });
};

const tab = () => key('Tab', 'Tab', 9);
const enter = () => key('Enter', 'Enter', 13, '\r');
const escape = () => key('Escape', 'Escape', 27);

const results = [];
const check = (name, pass, detail = '') => results.push({ name, pass, detail });

// ── Masaüstü ───────────────────────────────────────────────────────────────
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: ORIGIN + path });
await sleep(2500);

// Başlık hiyerarşisi
const headings = await evaluate(`JSON.stringify(
  [...document.querySelectorAll('h1,h2,h3,h4')].map(h => Number(h.tagName[1])))`);
const levels = JSON.parse(headings);
check('Tek bir h1 var', levels.filter((l) => l === 1).length === 1, `h1 sayısı: ${levels.filter((l) => l === 1).length}`);
let skip = null;
for (let i = 1; i < levels.length; i++) if (levels[i] - levels[i - 1] > 1) skip = `${levels[i - 1]} → ${levels[i]}`;
check('Başlık seviyesi atlanmıyor', !skip, skip ?? '');

// Alt metni olmayan görseller
// aria-hidden görseller dekoratiftir; boş alt doğru pratiktir, hata değil.
const noAlt = await evaluate(`[...document.querySelectorAll('img')]
  .filter(i => !i.alt && i.getAttribute('aria-hidden') !== 'true').length`);
check('Anlamlı görsellerde alt metni var', noAlt === 0, `alt'sız: ${noAlt}`);

// Erişilebilir adı olmayan düğme/bağlantılar
const nameless = await evaluate(`JSON.stringify([...document.querySelectorAll('a,button')]
  .filter(el => !(el.textContent||'').trim() && !el.getAttribute('aria-label') && !el.getAttribute('title'))
  .map(el => el.outerHTML.slice(0,70)))`);
check('Tüm düğme ve bağlantıların adı var', JSON.parse(nameless).length === 0, JSON.parse(nameless).join(' | '));

// Mega menü: gerçek Enter tuşuyla aç
await evaluate(`document.querySelector('.js-menu-trigger').focus()`);
await enter();
await sleep(350);
const opened = await evaluate(`document.querySelector('.js-menu-trigger').getAttribute('aria-expanded')`);
check('Mega menü klavyeyle açılıyor', opened === 'true', `aria-expanded=${opened}`);

const panelVisible = await evaluate(`(() => {
  const p = document.querySelector('.js-menu-item[data-open="true"] .js-menu-panel');
  return p ? getComputedStyle(p).visibility : 'yok';
})()`);
check('Açılan panel görünür', panelVisible === 'visible', `visibility=${panelVisible}`);

/* Açık mega menü panelinde metin okunuyor mu?
   Koyu header'da `.island` renk kuralı panellere sızıp metni beyaz panelde
   beyaza çevirmişti (ölçülen kontrast 1,02:1) — bu kontrol o hatanın
   tekrarını yakalar. */
const srgb = (v) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const lum = (rgb) => {
  const [r, g, b] = rgb;
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
};
const parse = (s) => (s.match(/\d+(\.\d+)?/g) ?? []).slice(0, 3).map(Number);

const panelProbe = await evaluate(`(() => {
  const p = document.querySelector('.js-menu-item[data-open="true"] .js-menu-panel');
  if (!p) return 'yok';
  const card = p.firstElementChild;
  const link = p.querySelector('a');
  return JSON.stringify({
    bg: getComputedStyle(card).backgroundColor,
    fg: getComputedStyle(link).color,
    text: link.textContent.trim().slice(0, 28),
  });
})()`);

if (panelProbe !== 'yok') {
  const pp = JSON.parse(panelProbe);
  const l1 = lum(parse(pp.bg));
  const l2 = lum(parse(pp.fg));
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  check(
    'Açık mega menüde metin okunuyor',
    ratio >= 4.5,
    `${ratio.toFixed(2)}:1 — "${pp.text}"`,
  );
}

// Esc kapatır ve odak düğmeye döner
await escape();
await sleep(300);
const afterEsc = await evaluate(`JSON.stringify({
  expanded: document.querySelector('.js-menu-trigger').getAttribute('aria-expanded'),
  focused: document.activeElement?.classList.contains('js-menu-trigger') })`);
const esc = JSON.parse(afterEsc);
check('Esc mega menüyü kapatıyor', esc.expanded === 'false');
check('Esc sonrası odak düğmeye dönüyor', esc.focused === true);

// Odak halkası: JS .focus() :focus-visible'ı tetiklemez, gerçekten Tab'layarak bak
await evaluate(`document.body.focus()`);
for (let i = 0; i < 6; i++) await tab();
// Odak halkası rengi `transition-colors` ile animasyonlu geçiyor;
// geçiş bitmeden örneklenirse ara değer okunur ve test yanlış kalır.
await sleep(600);
const outline = await evaluate(`(() => {
  const el = document.activeElement;
  const s = getComputedStyle(el);
  return JSON.stringify({
    el: el.tagName.toLowerCase() + ' · ' + (el.textContent || '').trim().slice(0, 24),
    width: s.outlineWidth, style: s.outlineStyle, color: s.outlineColor,
    matches: el.matches(':focus-visible') });
})()`);
const ol = JSON.parse(outline);
check(
  'Odak halkası görünür ve vurgu renginde',
  ol.matches && ol.style !== 'none' && parseFloat(ol.width) >= 2 && ol.color === 'rgb(12, 110, 55)',
  `${ol.el} → ${ol.width} ${ol.style} ${ol.color}`,
);

// Atla bağlantısı
const skipLink = await evaluate(`(() => {
  const a = document.body.querySelector('a[href="#icerik"]');
  if (!a) return 'yok';
  a.focus();
  const r = a.getBoundingClientRect();
  return r.width > 10 && r.height > 10 ? 'görünür' : 'gizli';
})()`);
check('İçeriğe geç bağlantısı odakta görünür', skipLink === 'görünür', skipLink);

// Defter rakamları gerçek değerleri gösteriyor mu (yalnızca defteri olan sayfalarda)
const hasLedger = await evaluate(`Boolean(document.querySelector('.js-ledger'))`);
if (hasLedger) {
  await evaluate(`document.querySelector('.js-ledger').scrollIntoView()`);
  await sleep(1600);
  const vals = JSON.parse(
    await evaluate(`JSON.stringify([...document.querySelectorAll('.js-count')].map(e => e.textContent.trim()))`),
  );
  check('Defter rakamları doğru basılıyor', vals.includes('1.700.000') && vals.includes('360.000.000'), vals.join(' · '));
}

// ── Mobil ──────────────────────────────────────────────────────────────────
await send('Emulation.setDeviceMetricsOverride', { width: 360, height: 740, deviceScaleFactor: 2, mobile: true });
await send('Page.navigate', { url: ORIGIN + path });
await sleep(2200);

/* Kilit, `html { overflow: hidden }` yerine gövdeyi sabitleyerek kuruluyor
   (iOS Safari'de ilki hem sayfayı her zaman kilitlemiyor hem de panelin
   kendi kaydırmasını bozuyordu). Test ikisini de kabul eder ve asıl ölçüt
   olarak sayfanın gerçekten kayıp kaymadığına bakar. */
const mobileOpen = await evaluate(`(() => {
  const t = document.getElementById('mobile-toggle');
  t.click();
  const p = document.getElementById('mobile-panel');
  const html = document.documentElement.style.overflow === 'hidden';
  const body = getComputedStyle(document.body).position === 'fixed';
  const before = window.scrollY;
  window.scrollTo(0, before + 400);
  const moved = Math.abs(window.scrollY - before) > 5;
  window.scrollTo(0, before);
  return JSON.stringify({
    expanded: t.getAttribute('aria-expanded'),
    hidden: p.hidden,
    label: t.getAttribute('aria-label'),
    scrollLocked: (html || body) && !moved,
    overflowY: getComputedStyle(p).overflowY,
    panelScrollable: (() => {
      p.querySelectorAll('details').forEach((d) => (d.open = true));
      const ok = p.scrollHeight > p.clientHeight;
      p.querySelectorAll('details').forEach((d) => (d.open = false));
      return ok;
    })(),
    panelFitsViewport: Math.round(p.getBoundingClientRect().bottom) <= window.innerHeight });
})()`);
const mo = JSON.parse(mobileOpen);
check('Mobil menü açılıyor', mo.expanded === 'true' && mo.hidden === false);
check('Mobil menü açıkken sayfa kaydırması kilitli', mo.scrollLocked === true);
check(
  'Mobil menü panel içinde kaydırılabiliyor',
  ['auto', 'scroll'].includes(mo.overflowY) && mo.panelScrollable === true,
  `overflow-y=${mo.overflowY}`,
);
check('Mobil menü ekrana sığıyor', mo.panelFitsViewport === true);
check('Mobil menü etiketi duruma göre değişiyor', mo.label === 'Menüyü kapat', mo.label);

await escape();
await sleep(250);
const mobileClosed = await evaluate(`JSON.stringify({
  hidden: document.getElementById('mobile-panel').hidden,
  expanded: document.getElementById('mobile-toggle').getAttribute('aria-expanded') })`);
const mc = JSON.parse(mobileClosed);
check('Esc mobil menüyü kapatıyor', mc.hidden === true && mc.expanded === 'false');

// ── Azaltılmış hareket ─────────────────────────────────────────────────────
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: ORIGIN + path });
await sleep(2200);

// v1 `.reveal`, v2 `.rise` kullanıyor; hangisi varsa ona bak
const reduced = await evaluate(`JSON.stringify((() => {
  const el = document.querySelector('.reveal, .rise');
  const masks = [...document.querySelectorAll('.line-mask > span')];
  return {
    counts: [...document.querySelectorAll('.js-count, .js-scene-count')]
      .map(e => e.textContent.trim()).slice(0, 3),
    revealOpacity: el ? getComputedStyle(el).opacity : 'yok',
    maskedLinesVisible: masks.length === 0 ||
      masks.every(m => getComputedStyle(m).transform === 'none'),
  };
})())`);
const rd = JSON.parse(reduced);
if (hasLedger) {
  check('Azaltılmış harekette rakamlar doğrudan basılı', rd.counts.includes('1.700.000'), rd.counts.join(' · '));
}
check('Azaltılmış harekette içerik görünür (opacity 1)', rd.revealOpacity === '1', `opacity=${rd.revealOpacity}`);
check('Azaltılmış harekette başlık satırları yerinde', rd.maskedLinesVisible === true);

// ── Rapor ──────────────────────────────────────────────────────────────────
const pad = Math.max(...results.map((r) => r.name.length));
console.log(`\n${ORIGIN}${path} — erişilebilirlik ve etkileşim\n${'─'.repeat(pad + 10)}`);
for (const r of results) {
  console.log(`${r.pass ? ' ✓ ' : ' ✗ '} ${r.name.padEnd(pad)}  ${r.detail}`);
}
const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} geçti${failed.length ? ` — ${failed.length} sorun` : ''}\n`);

ws.close();
proc.kill();
process.exit(failed.length ? 1 : 0);
