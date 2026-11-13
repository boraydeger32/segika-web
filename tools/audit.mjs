/**
 * Tarayıcı denetim aracı.
 *
 * Verilen sayfayı istenen genişliklerde açar, tam sayfa ekran görüntüsü alır ve
 * yatay taşmaya sebep olan öğeleri bildirir. Her geliştirme fazında kendi işimi
 * denetlemek için kullanıyorum.
 *
 *   node tools/audit.mjs /                       → 360, 768, 1440
 *   node tools/audit.mjs /iletisim/ 390          → tek genişlik
 *   node tools/audit.mjs / 360,1440 --out shots  → hedef klasör
 */

import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ORIGIN = process.env.AUDIT_ORIGIN ?? 'http://localhost:4321';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const args = process.argv.slice(2);
const flagIndex = args.findIndex((a) => a.startsWith('--'));
const positional = flagIndex === -1 ? args : args.slice(0, flagIndex);
const flags = Object.fromEntries(
  (flagIndex === -1 ? [] : args.slice(flagIndex)).reduce((acc, a, i, arr) => {
    if (a.startsWith('--')) acc.push([a.slice(2), arr[i + 1]?.startsWith('--') ? true : arr[i + 1]]);
    return acc;
  }, []),
);

const path = positional[0] ?? '/';
const widths = (positional[1] ?? '360,768,1440').split(',').map(Number);
const outDir = resolve(process.cwd(), flags.out ?? 'tools/.shots');
const slug = path.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home';

/** Chrome'u uzaktan hata ayıklama açık şekilde başlatır. */
async function launch(port) {
  const proc = spawn(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      '--force-color-profile=srgb',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=/tmp/segika-audit-${port}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  );

  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return proc;
    } catch {
      /* henüz ayakta değil */
    }
    await sleep(150);
  }
  proc.kill();
  throw new Error('Chrome uzaktan hata ayıklama portu açılmadı.');
}

/** Tek bir CDP oturumu üzerinden komut gönderen ince sarmalayıcı. */
async function connect(port) {
  const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json());
  const page = targets.find((t) => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  const pending = new Map();
  let id = 0;

  ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve: res, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : res(msg.result);
    }
  });

  await new Promise((res, rej) => {
    ws.addEventListener('open', res, { once: true });
    ws.addEventListener('error', rej, { once: true });
  });

  const send = (method, params = {}) =>
    new Promise((res, rej) => {
      const i = ++id;
      pending.set(i, { resolve: res, reject: rej });
      ws.send(JSON.stringify({ id: i, method, params }));
    });

  return { send, close: () => ws.close() };
}

/**
 * Yatay taşmaya sebep olan öğeleri bulur.
 * Kendi içinde kaydırılan (overflow-x) kapsayıcıların çocukları kasıtlıdır, elenir.
 */
const OVERFLOW_PROBE = `(() => {
  const vw = document.documentElement.clientWidth;
  const scrollable = new Set();
  document.querySelectorAll('*').forEach((el) => {
    const o = getComputedStyle(el).overflowX;
    if (o === 'auto' || o === 'scroll' || o === 'hidden') scrollable.add(el);
  });
  const insideScroller = (el) => {
    for (let p = el.parentElement; p; p = p.parentElement) if (scrollable.has(p)) return true;
    return false;
  };
  const offenders = [];
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    if (r.right <= vw + 1 && r.left >= -1) return;
    if (insideScroller(el)) return;
    const cls = typeof el.className === 'string' ? el.className.trim().slice(0, 80) : '';
    offenders.push({
      el: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (cls ? ' .' + cls : ''),
      left: Math.round(r.left),
      right: Math.round(r.right),
      width: Math.round(r.width),
      text: (el.textContent || '').trim().slice(0, 48),
    });
  });
  // Sadece en dıştaki suçluyu bildir; çocukları gürültü yapar.
  const outermost = offenders.filter((o, i) =>
    !offenders.some((p, j) => j !== i && p.left <= o.left && p.right >= o.right && p.width > o.width));
  return JSON.stringify({
    viewport: vw,
    scrollWidth: document.documentElement.scrollWidth,
    overflows: document.documentElement.scrollWidth > vw + 1,
    offenders: outermost.slice(0, 10),
  });
})()`;

await mkdir(outDir, { recursive: true });
const url = ORIGIN + path;
const report = [];

for (const [index, width] of widths.entries()) {
  const port = 9400 + index;
  const chrome = await launch(port);
  const { send, close } = await connect(port);

  try {
    await send('Page.enable');
    /* Tam sayfa görüntüsünde görünür alan dışındaki bölümler gözlemciye hiç
       girmediği için animasyonlu öğeler boş çıkıyordu. Azaltılmış hareket
       emülasyonu her şeyi son durumunda basar — denetim gerçek düzeni görür. */
    await send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
    });
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 900,
      deviceScaleFactor: 2,
      mobile: width < 768,
    });
    await send('Page.navigate', { url });
    await sleep(2500); // font yüklemesi ve açılış animasyonu bitsin

    const probe = await send('Runtime.evaluate', {
      expression: OVERFLOW_PROBE,
      returnByValue: true,
    });
    const result = JSON.parse(probe.result.value);

    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      optimizeForSpeed: false,
    });
    const file = resolve(outDir, `${slug}-${width}.png`);
    await writeFile(file, Buffer.from(shot.data, 'base64'));

    report.push({ width, file, ...result });
  } finally {
    close();
    chrome.kill();
  }
}

console.log(`\n${url}\n${'─'.repeat(url.length)}`);
let clean = true;
for (const r of report) {
  const status = r.overflows ? `TAŞMA  ${r.scrollWidth}px içerik` : 'temiz';
  console.log(`\n${String(r.width).padStart(5)}px  ${status}`);
  console.log(`        ${r.file}`);
  if (r.overflows) {
    clean = false;
    for (const o of r.offenders) {
      console.log(`        → ${o.el}`);
      console.log(`          sol=${o.left} sağ=${o.right} genişlik=${o.width}  "${o.text}"`);
    }
  }
}
console.log(clean ? '\nTüm genişlikler temiz.\n' : '\nYatay taşma var.\n');
process.exit(clean ? 0 : 1);
