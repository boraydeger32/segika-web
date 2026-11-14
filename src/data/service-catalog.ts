/**
 * Hizmet kataloğu — Services sayfasının veri modeli.
 *
 * Home sayfası modülleri "ne yapar" diye tanıtır; bu sayfa aynı modülleri
 * "sizin için mi" diye ele alır. Bu yüzden ayrı bir veri yapısı var:
 * her hizmetin kapsamı, kime uygun olduğu ve hangi işi devraldığı.
 *
 * Tüm kapsam maddeleri segika.com'daki ilgili sayfalardan türetildi;
 * yeni bir özellik iddiası eklenmedi.
 */

import type { IconName } from '../lib/icons';

export type CatalogItem = {
  code: string;
  /** Çizgi ikon — bkz. src/lib/icons.ts */
  icon: IconName;
  name: string;
  /** Tek cümlede ne yaptığı. */
  summary: string;
  /** Bu hizmetin devraldığı somut işler. */
  scope: string[];
  /** Kime uygun — ziyaretçinin kendini tanıması için. */
  fit: string;
  href: string;
};

/** Yazılım modülleri. */
export const software: CatalogItem[] = [
  {
    code: 'TŞV',
    icon: 'tesvik',
    name: 'SGK Teşvik Programı',
    summary:
      'Yürürlükteki tüm teşvikleri hesaplar, en yüksek olanı seçer ve raporlar.',
    scope: [
      'Teşvik hesaplama ve dönemsel raporlama',
      'Potansiyel teşvik sorgulama — işe almadan önce',
      'Teşvik simülasyonu ile kadro planlama',
      'Hatalı teşvik sorgulama ve düzeltme',
    ],
    fit: 'Teşvikten yararlanan ya da yararlanıp yararlanamadığını bilmeyen her işletme',
    href: '/sgk-tesvik-programi/',
  },
  {
    code: 'VZT',
    icon: 'vizite',
    name: 'SGK Vizite Programı',
    summary:
      'Sağlık raporlarını SMS onayı olmadan otomatik onaylar, iş kazalarını izler.',
    scope: [
      'Tüm sicillerin sağlık raporları tek panelde',
      'SMS onayı olmadan otomatik rapor onaylama',
      'İş kazası takibi ve 3 günlük süre uyarısı',
      'Rapor geçmişi filtreleme ve arama',
    ],
    fit: 'Personel sayısı yüksek, düzenli rapor trafiği olan işletmeler',
    href: '/sgk-vizite-programi/',
  },
  {
    code: 'KML',
    icon: 'kimlik',
    name: 'Kimlik Bildirimi Programı',
    summary:
      'İşe giren ve çıkan personeli Emniyet ya da Jandarma’ya otomatik bildirir.',
    scope: [
      'SGK verisinden personel hareketi izleme',
      'Bölgeye göre Emniyet / Jandarma yönlendirmesi',
      'Çok işyerli yapıda toplu bildirim',
      'Bildirim geçmişi ve durum takibi',
    ],
    fit: 'Personel sirkülasyonu olan, özellikle çok şubeli işletmeler',
    href: '/kimlik-bildirimi-programi/',
  },
  {
    code: 'İŞK',
    icon: 'iskur',
    name: 'İşkur Bildirimi Programı',
    summary:
      'SGK verisinden İŞKUR işgücü çizelgesini üretir ve bildirir.',
    scope: [
      'Aylık işgücü çizelgesi otomatik hazırlama',
      'Vergi numarası bazında toplu bildirim',
      'İl ve meslek kodu bazında dağılım',
      'SGK işe giriş-çıkış servisine sürekli bağlantı',
    ],
    fit: 'İŞKUR’a düzenli çizelge vermek zorunda olan işletmeler',
    href: '/iskur-bildirimi-programi/',
  },
  {
    code: 'ARÇ',
    icon: 'araclar',
    name: 'SGK Araçları ve Raporlar',
    summary:
      'Borç, hizmet listesi, tahakkuk ve emanet alacaklarını tek panelden yönetir.',
    scope: [
      'İşveren borç görüntüleme, tüm siciller birlikte',
      'Hizmet listesi ve tahakkuk raporu',
      'İşe giriş-çıkış listesi, PDF ve Excel çıktı',
      'Emanet alacak tespiti ve müfredat kartı',
    ],
    fit: 'Çok sicilli gruplar ve birden fazla mükellefe bakan mali müşavirler',
    href: '/sgk-araclari-ve-raporlar/',
  },
  {
    code: 'İK',
    icon: 'ekip',
    name: 'İnsan Kaynakları Araçları',
    summary:
      'Tazminat, maaş, deneme süresi ve MYK belgesi takibini otomatikleştirir.',
    scope: [
      'Çalışan tazminat hesaplama',
      'Brütten nete, netten brüte maaş hesaplama',
      'Deneme ve iş güvencesi süresi takibi',
      'MYK belge sorgulama ve analizi',
    ],
    fit: 'Kendi İK ya da bordro ekibi olan işletmeler',
    href: '/program-ozellikleri/insan-kaynaklari-raporlari/',
  },
];

/**
 * Yetenek matrisi — hangi modül hangi işi devralıyor.
 *
 * Ziyaretçi kendi sorununu satırda bulup hangi modüle ihtiyacı olduğunu
 * görüyor. Sütun kodları yukarıdaki `code` alanlarıyla eşleşir.
 */
export const matrix = {
  columns: ['TŞV', 'VZT', 'KML', 'İŞK', 'ARÇ', 'İK'],
  rows: [
    { job: 'Teşvik hesaplama ve raporlama', has: ['TŞV'] },
    { job: 'Sağlık raporu onayı', has: ['VZT'] },
    { job: 'İş kazası bildirimi takibi', has: ['VZT'] },
    { job: 'Emniyet / Jandarma bildirimi', has: ['KML'] },
    { job: 'İŞKUR işgücü çizelgesi', has: ['İŞK'] },
    { job: 'SGK borç sorgulama', has: ['ARÇ'] },
    { job: 'Hizmet listesi ve tahakkuk', has: ['ARÇ'] },
    { job: 'İşe giriş-çıkış raporu', has: ['ARÇ', 'İK'] },
    { job: 'Tazminat ve maaş hesaplama', has: ['İK'] },
    { job: 'Bordro programı entegrasyonu', has: ['TŞV', 'ARÇ', 'İK'] },
  ],
} as const;

/**
 * Hizmet seçim rehberi — "hangisi bana uygun" sorusu.
 * Her madde bir ziyaretçi profilini tarif ediyor.
 */
export const guide = [
  {
    profile: 'Tek işyeri, 10–50 çalışan',
    need: 'Teşvik kaybını önlemek ve rapor onaylarıyla uğraşmamak',
    picks: ['SGK Teşvik Programı', 'SGK Vizite Programı'],
  },
  {
    profile: 'Çok şubeli, 100+ çalışan',
    need: 'Tüm sicilleri tek panelden yönetmek, bildirimleri kaçırmamak',
    picks: ['Teşvik', 'Vizite', 'Kimlik Bildirimi', 'İşkur', 'SGK Araçları'],
  },
  {
    profile: 'Mali müşavir ofisi',
    need: 'Birden fazla mükellefin SGK işlerini aynı yerden yürütmek',
    picks: ['SGK Araçları ve Raporlar', 'SGK Teşvik Programı'],
  },
  {
    profile: 'İK departmanı olan kurum',
    need: 'Operasyonu devredip stratejik işlere zaman ayırmak',
    picks: ['Tüm modüller', 'Danışmanlık hizmetleri'],
  },
];
