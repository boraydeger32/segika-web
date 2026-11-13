/**
 * Site içi yol yardımcısı.
 *
 * Astro `base` ayarını yalnızca kendi ürettiği varlıklara (CSS paketi, resim
 * işlemcisi çıktısı) uygular. Şablonlarda elle yazılan `href="/iletisim/"` ya
 * da `src="/fonts/..."` ham kalır — site kökte servis edilirken sorun değil,
 * ama GitHub Pages proje sayfası gibi alt yollarda hepsi kırılır.
 *
 * `url()` bu farkı kapatır: kök-göreli her yola base önekini ekler.
 * Dış bağlantılar, çapalar, mailto/tel adresleri olduğu gibi döner.
 *
 *   url('/iletisim/')        → '/segika-web/iletisim/'   (base varsa)
 *                            → '/iletisim/'              (base yoksa)
 *   url('https://x.com')     → 'https://x.com'
 *   url('#icerik')           → '#icerik'
 */

/** Astro'nun çözdüğü base; sonunda eğik çizgi olmadan tutulur. */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function url(path: string): string {
  // Dış bağlantı, protokol-göreli adres, çapa ve şema taşıyanlar dokunulmaz
  if (
    /^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path) ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:')
  ) {
    return path;
  }

  // Zaten base ile başlıyorsa iki kez eklenmesin
  if (BASE && (path === BASE || path.startsWith(`${BASE}/`))) return path;

  // Kök-göreli değilse olduğu gibi bırak
  if (!path.startsWith('/')) return path;

  return `${BASE}${path}`;
}
