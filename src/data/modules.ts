/**
 * Ana sayfadaki modül bölümü.
 *
 * Metinler segika.com ve Segika broşüründen birebir alındı — hiçbiri uydurulmadı.
 * `screenshot` alanı şimdilik boş: canlı sitedeki ekran görüntüleri gerçek TC
 * Kimlik numaraları ve sağlık verisi içerdiği için kullanılamıyor
 * (bkz. assets/KVKK-RISKLI-GORSELLER.md). Demo hesaptan temiz görseller
 * geldiğinde yalnızca bu alan doldurulacak.
 */

export type ModuleEntry = {
  /** Mono etiket — bölümün üstünde küçük, versal. */
  eyebrow: string;
  title: string;
  /** Tek cümlelik fayda. */
  summary: string;
  /**
   * Karta özel bağlantı metni. Altı kartta da "İncele" yazmak hem tıklama
   * oranını düşürüyor hem de bağlantının nereye gittiğini söylemiyor.
   */
  cta: string;
  href: string;
  /** Dolduğunda gerçek görsel basılır; boşken işaretli yer tutucu çıkar. */
  screenshot?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Yer tutucuda gösterilecek beklenen dosya ve oran. */
  placeholder: {
    file: string;
    ratio: string;
    describes: string;
  };
};

export const modules: ModuleEntry[] = [
  {
    eyebrow: 'Teşvik',
    title: 'SGK Teşvik Programı',
    summary:
      'Dakikalar içinde eksiksiz ve hatasız teşvik hesaplaması yapar ve raporlar.',
    cta: 'Teşvik hesaplamayı görün',
    href: '/sgk-tesvik-programi/',
    placeholder: {
      file: 'assets/screenshots/tesvik-hesaplama.png',
      ratio: '16 / 10',
      describes: 'Teşvik Hesaplama ekranı — kanun kodu, çalışan sayısı, hesaplanan tutar',
    },
  },
  {
    eyebrow: 'Vizite',
    title: 'SGK Vizite Programı',
    summary:
      'SMS onay sürecine gerek kalmadan tüm sağlık raporları sistem tarafından otomatik olarak onaylanır.',
    cta: 'Rapor onayını görün',
    href: '/sgk-vizite-programi/',
    placeholder: {
      file: 'assets/screenshots/vizite-saglik-raporu.png',
      ratio: '16 / 10',
      describes: 'Sağlık Raporu Bildirimi listesi — anonim veriyle',
    },
  },
  {
    eyebrow: 'İş kazası',
    title: 'SGK İş Kazası Takibi',
    summary:
      'Yasal süreçleri zamanında yönetmeniz için iş kazası bildirimlerini otomatik izler ve bilgilendirir.',
    cta: 'Kaza takibini görün',
    href: '/program-ozellikleri/sgk-is-kazasi-takibi/',
    placeholder: {
      file: 'assets/screenshots/is-kazasi-takibi.png',
      ratio: '16 / 9',
      describes: 'Otomatik İş Kazası Bildirimi ayar ekranı',
    },
  },
  {
    eyebrow: 'Kimlik bildirimi',
    title: 'Kimlik Bildirimi Programı',
    summary:
      'SGK verilerini çekerek kimlik bildirimlerini Emniyet ve Jandarma’ya otomatik olarak gerçekleştirir.',
    cta: 'Bildirim akışını görün',
    href: '/kimlik-bildirimi-programi/',
    placeholder: {
      file: 'assets/screenshots/kimlik-bildirimi.png',
      ratio: '16 / 10',
      describes: 'Kimlik Bildirimi işlem listesi — anonim veriyle',
    },
  },
  {
    eyebrow: 'İşkur',
    title: 'İşkur Bildirimi Programı',
    summary:
      'SGK verilerini kullanarak İŞKUR işgücü çizelgesi bildirimi dakikalar alır ve hatasız gerçekleşir.',
    cta: 'Çizelge akışını görün',
    href: '/iskur-bildirimi-programi/',
    placeholder: {
      file: 'assets/screenshots/iskur-isgucu-cizelgesi.png',
      ratio: '4 / 3',
      describes: 'İşgücü Çizelgesi — il ve meslek bazında dağılım',
    },
  },
  {
    eyebrow: 'Araçlar',
    title: 'SGK Araçları ve Raporlar',
    summary:
      'Borç sorgulamadan teşvik denetimine, asgari ücret desteğinden e-borcu yoktur belgesine kadar tüm siciller tek panelde.',
    cta: 'Araçları görün',
    href: '/sgk-araclari-ve-raporlar/',
    placeholder: {
      file: 'assets/screenshots/sgk-araclari.png',
      ratio: '16 / 10',
      describes: 'İşveren Borç Görüntüleme — anonim firma adlarıyla',
    },
  },
];

/** Hero'da kullanılacak ana ürün görseli. */
export const heroShot = {
  screenshot: undefined as ModuleEntry['screenshot'],
  placeholder: {
    file: 'assets/screenshots/hero-tesvik-hesaplama.png',
    ratio: '16 / 10',
    describes:
      'Teşvik Hesaplama ana ekranı — Segika markalı üst bar, anonim firma adları, 1440×900',
  },
};
