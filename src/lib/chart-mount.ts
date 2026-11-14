/**
 * Grafiklerin ortak kurulum mantığı.
 *
 * Dört grafik bileşeni aynı şeyi yapıyor: bölüm görünür olunca ECharts'ı
 * indir, tuvali aç, tabloyu gözden çek, yeniden boyutlanmayı dinle. Bu
 * dosya olmadan aynı otuz satır dört yerde dururdu ve biri düzeltilince
 * diğerleri geride kalırdı.
 *
 * Değişmeyen üç kural burada uygulanıyor:
 *  1. Paket tembel — ilk yüklemeye tek bayt eklemiyor.
 *  2. Kurulum başarısız olursa sunucuda basılmış tablo yerinde kalıyor;
 *     içerik hiçbir koşulda kaybolmuyor.
 *  3. prefers-reduced-motion açıkken animasyon yok, son kare basılıyor.
 */

export type ChartTokens = {
  ink: string;
  muted: string;
  bar: string;
  accentSoft: string;
  surface: string;
  line: string;
  dark: boolean;
};

type Builder = (ctx: {
  /** ECharts örneği — `setOption` çağrılacak yer. */
  chart: import('echarts/core').ECharts;
  canvas: HTMLElement;
  tokens: ChartTokens;
  /** prefers-reduced-motion açık mı. */
  reduced: boolean;
}) => void | (() => void);

/** Renkler token katmanından okunuyor; grafik ikinci bir palet açmıyor. */
function readTokens(dark: boolean): ChartTokens {
  const root = getComputedStyle(document.documentElement);
  const t = (name: string) => root.getPropertyValue(name).trim();
  return {
    dark,
    ink: dark ? t('--color-ink-inverse') : t('--color-ink'),
    muted: dark ? t('--color-ink-subtle') : t('--color-ink-muted'),
    bar: dark ? t('--color-brand') : t('--color-accent'),
    /* Vurgusuz ikinci seri — "kalan", "kapsam dışı" gibi. */
    accentSoft: dark ? t('--color-hairline-inverse') : t('--color-wash'),
    surface: dark ? t('--color-void-soft') : t('--color-surface'),
    line: dark ? t('--color-hairline-inverse') : t('--color-hairline'),
  };
}

let corePromise: Promise<typeof import('./echarts')> | null = null;
function loadCore() {
  corePromise ??= import('./echarts');
  return corePromise;
}

/**
 * Verilen seçicideki her `<figure>` için grafiği kurar.
 *
 * @param selector  Bileşenin kök öğesini bulan seçici (ör. `[data-share-chart]`)
 * @param build     Seçenekleri kuran işlev; isterse temizleyici döndürür
 */
export function mountCharts(selector: string, build: Builder): void {
  const figures = document.querySelectorAll<HTMLElement>(selector);
  if (!figures.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  async function setup(figure: HTMLElement) {
    const canvas = figure.querySelector<HTMLElement>('[data-chart-canvas]');
    if (!canvas) return;

    const { echarts } = await loadCore();
    const tokens = readTokens(canvas.dataset.tone === 'dark');

    canvas.hidden = false;
    canvas.removeAttribute('aria-hidden');

    const chart = echarts.init(canvas, undefined, { renderer: 'canvas' });
    const reflow = build({ chart, canvas, tokens, reduced });

    /* Tablo ancak grafik gerçekten kurulduktan sonra gözden çekiliyor. */
    figure.dataset.ready = 'true';

    const onResize = () => {
      if (typeof reflow === 'function') reflow();
      chart.resize();
    };
    if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(canvas);
    else window.addEventListener('resize', onResize);
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        setup(entry.target as HTMLElement).catch((err) => {
          /*
            Yayında sessiz geç: tablo yerinde duruyor, içerik kaybolmadı.
            Geliştirmede sessizlik tehlikeli — yedek tablo bozuk grafiği
            maskeliyor ve hata fark edilmiyor (bir kez başımıza geldi).
          */
          if (import.meta.env.DEV) console.error('[grafik] kurulamadı:', err);
        });
      }
    },
    { rootMargin: '240px 0px' },
  );

  figures.forEach((f) => io.observe(f));
}

/** Türkçe binlik ayracıyla biçimlendirme — eksen etiketlerinde kullanılıyor. */
export function tr(n: number): string {
  return n.toLocaleString('tr-TR');
}
