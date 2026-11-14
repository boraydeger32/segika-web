/**
 * Değer önerileri.
 *
 * Her madde "ne yapar" değil "size ne kazandırır" diye yazıldı — modül
 * listesi bunu zaten anlatıyor, burada karşılığı duruyor.
 *
 * Kural: hiçbir fayda iddiası uydurulmadı. Her kaydın `source` alanı var ve
 * metin o kaynaktaki cümleden türetildi. Elimde ölçülmüş bir rakam olmayan
 * yerde (ör. "%40 zaman tasarrufu") hiçbir şey yazılmadı — doğrulanamayan
 * rakam, kazandırdığından çok güven kaybettirir.
 *
 * `proof` alanı yalnızca gerçek ve kaynaklı bir rakam varsa dolu.
 */

import type { IconName } from '../lib/icons';

export type ValueProp = {
  icon: IconName;
  title: string;
  body: string;
  /** Kaynaklı rakam — yoksa boş bırakılır. */
  proof?: string;
  source: string;
};

/*
 * Sıra rastgele değil: kaynaklı rakamı olan üç madde (tesvik, saat, kalkan)
 * aralara dağıtıldı. Üçü de başa toplanınca üç sütunlu ızgarada üst satır
 * rozetli, alt satır rozetsiz kalıyor ve bölüm yarım bırakılmış gibi duruyor.
 */
export const valueProps: ValueProp[] = [
  {
    icon: 'tesvik',
    title: 'Hak ettiğiniz teşviki tam alırsınız',
    body: 'Yürürlükteki yedi teşvik her personel için ayrı ayrı hesaplanır ve en yüksek kazancı sağlayan seçilir. Elle yapılan seçimde kaçan fark geri alınamıyor.',
    proof: 'Ayda 360.000.000 ₺ teşvik',
    source: 'segika.com — ana sayfa işlem hacmi tablosu',
  },
  {
    icon: 'yenile',
    title: 'Mevzuat değişince sistem güncel',
    body: 'Teşvik oranları, kanun kodları ve bildirim kuralları değiştiğinde güncelleme bizim işimiz. Sizin tarafta yapılacak bir şey yok.',
    source: 'segika.com/sgk-tesvik-programi',
  },
  {
    icon: 'saat',
    title: 'Günler süren işi dakikalara indirir',
    body: 'Teşvik hesaplama, İŞKUR çizelgesi ve kimlik bildirimi gibi dönemsel işler tek tuşla üretilir; sicil sayınız arttıkça aradaki fark büyür.',
    proof: 'Ayda 61.000+ sicilde işlem',
    source: 'segika.com/sgk-tesvik-programi · işlem hacmi tablosu',
  },
  {
    icon: 'baglanti',
    title: 'Bordro programınızı değiştirmeniz gerekmez',
    body: 'Luca, Logo, Mikro ve Eta ile tam entegrasyon çalışır; listede olmayan yazılımlara web API ile bağlanır.',
    source: 'segika.com/duyurular',
  },
  {
    icon: 'kalkan',
    title: 'Yasal süreleri kaçırmazsınız',
    body: 'İş kazası bildiriminin üç günlük süresi sistem tarafından izlenir ve siz uyarılırsınız. Kaçan bildirim idari para cezası demek.',
    proof: 'Ayda 4.000+ iş kazası tespiti',
    source: 'segika.com/sgk-vizite-programi · işlem hacmi tablosu',
  },
  {
    icon: 'destek',
    title: 'Takıldığınız yerde sınırsız destek',
    body: 'Kurulumdan dönem kapanışına kadar sistem desteği sınırsız ve ek ücretsiz. Soru başına ücret ya da paket limiti yok.',
    source: 'segika.com/sgk-tesvik-programi',
  },
];

export const valuePropsIntro = {
  eyebrow: 'Neden Segika',
  title: 'Yazılımın karşılığı',
  body: 'Altı başlık, altı somut karşılık. Her biri ürünün yaptığı bir işe değil, sizin kazandığınız sonuca bakıyor.',
} as const;

/**
 * Landing sayfası için kısa kesit — tek teklifli sayfada altı madde fazla,
 * ziyaretçiyi dağıtıyor. Teşvik kaybıyla doğrudan ilgili üçü alınıyor.
 */
export const landingValueProps = valueProps.filter((p) =>
  ['tesvik', 'yenile', 'baglanti'].includes(p.icon),
);
