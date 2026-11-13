/**
 * Konu sayfaları (/konu/…).
 *
 * WordPress'teki etiket arşivlerinin karşılığı. Mevcut sitede arama trafiği
 * aldıkları için adresleri korunuyor. Her biri, ilgili sayfaları bir araya
 * toplayan hub olarak kuruluyor — kendi gövde metinleri yok, zaten canlı
 * sitede de yoktu.
 *
 * Açıklamalar mevcut sitenin meta verisinden alındı.
 */

import { featurePages } from './content-pages';
import { modulePages } from './module-pages';

export type Topic = {
  slug: string;
  label: string;
  headline: string;
  description: string;
  /** Bu konuya bağlanan sayfalar. */
  entries: { title: string; description: string; href: string }[];
};

/** Yardımcı: özellik sayfalarını slug listesine göre toplar. */
const features = (...slugs: string[]) =>
  slugs
    .map((slug) => featurePages.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({
      title: p.title,
      description: p.description,
      href: `/program-ozellikleri/${p.slug}/`,
    }));

/** Yardımcı: modül sayfalarını slug listesine göre toplar. */
const modules = (...slugs: string[]) =>
  slugs
    .map((slug) => modulePages.find((m) => m.slug === slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m))
    .map((m) => ({ title: m.name, description: m.intro, href: `/${m.slug}/` }));

export const topics: Topic[] = [
  {
    slug: 'sgk-tesvik-hesaplama',
    label: 'SGK Teşvik Hesaplama',
    headline: 'Teşvik hesaplamayla|ilgili her şey.',
    description:
      'Tekstil, inşaat, teknoloji, lojistik, turizm, sağlık, eğitim, gıda, üretim, restoran ve kafe, perakende ve tüm sektörler için SGK teşvik hesaplama programı.',
    entries: [
      ...modules('sgk-tesvik-programi'),
      ...features(
        'sgk-tesvik-hesaplama',
        'sgk-tesvik-raporlari',
        'sgk-tesvik-simulasyonu',
        'sgk-potansiyel-tesvik-sorgulama',
        'sgk-entegrasyonu',
        'sektorler',
      ),
    ],
  },
  {
    slug: 'sgk-vizite-sistemi',
    label: 'SGK Vizite Sistemi',
    headline: 'Sağlık raporu ve|iş kazası süreçleri.',
    description:
      'SGK sağlık raporu takip programı ile tüm sicilleriniz için SGK’dan tek tek girip takip ve işlem yapmanıza gerek bırakmadan personele ait iş göremezlik raporlarını tek panelden alın.',
    entries: [
      ...modules('sgk-vizite-programi'),
      ...features(
        'sgk-saglik-raporu-takibi',
        'sgk-saglik-raporu-otomatik-onaylama',
        'sgk-is-kazasi-takibi',
      ),
    ],
  },
  {
    slug: 'insan-kaynaklari-araclari',
    label: 'İnsan Kaynakları Araçları',
    headline: 'İK ekibinin|günlük araçları.',
    description:
      'İş Kanunu’ndaki 2 aylık deneme ve 6 aylık iş güvencesi sürelerinden tazminat ve maaş hesaplamaya kadar insan kaynakları araçları.',
    entries: features(
      'deneme-ve-is-guvencesi-takibi',
      'calisan-tazminat-hesaplama',
      'calisan-maas-hesaplama',
      'insan-kaynaklari-raporlari',
      'sgk-entegrasyonu',
    ),
  },
  {
    slug: 'myk-belge-sorgulama',
    label: 'MYK Belge Sorgulama',
    headline: 'MYK belgesi|sorgulama ve takip.',
    description:
      'MYK belge sorgulama, analiz ve takip işlemleri. Çalışanlarınızın Mesleki Yeterlilik Kurumu belgelerini tek panelden sorgulayın ve geçerlilik sürelerini izleyin.',
    entries: features('myk-analizi-ve-takibi'),
  },
  {
    slug: 'sgk-yardimci-araclar',
    label: 'SGK Yardımcı Araçlar',
    headline: 'Borç, hizmet listesi|ve tahakkuk raporu.',
    description:
      'SGK yardımcı araçlar ve raporlar, borç sorgulamadan teşvik denetimine, asgari ücret desteğinden e-borcu yoktur belgesine kadar birçok işlemi kolaylıkla yapmanızı sağlar.',
    entries: [
      ...modules('sgk-araclari-ve-raporlar'),
      ...features(
        'sgk-ise-giris-cikis-listesi',
        'sgk-hizmet-listesi',
        'sgk-tahakkuk-raporu',
        'sgk-yardimci-araclar-ve-raporlar',
      ),
    ],
  },
  {
    slug: 'sgk-otomasyon',
    label: 'SGK Otomasyon',
    headline: 'SGK otomasyonunun|tamamı.',
    description:
      'Teşvik hesaplamadan sağlık raporu onayına, kimlik bildiriminden işkur çizelgesine kadar Segika SGK otomasyon yazılımının yaptığı her iş.',
    entries: modules(
      'sgk-tesvik-programi',
      'sgk-vizite-programi',
      'kimlik-bildirimi-programi',
      'iskur-bildirimi-programi',
      'sgk-araclari-ve-raporlar',
    ),
  },
];
