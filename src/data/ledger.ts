/**
 * İşlem defteri — sayfanın imza bölümü.
 *
 * Rakamlar ve dipnot segika.com ana sayfasından birebir alındı (12 Kasım 2026).
 * Broşürdeki aynı tablo "2025 Temmuz ayı verileri" notunu taşıyor.
 *
 * Tasarım notu: rakamların yanına orantı çubuğu koymuyorum. Değerler 4.000 ile
 * 360.000.000 arasında değişiyor; doğrusal çubukta hepsi görünmez, logaritmik
 * çubuk ise okuyucuyu yanıltır. Defterin gücü zaten sağa hizalı tabular
 * sütunun kendisinde — basamaklar üst üste dizildiğinde ölçek kendiliğinden okunuyor.
 */

export type LedgerRow = {
  label: string;
  /** Sayısal değer — sayaç animasyonu bunu kullanır. */
  value: number;
  /** Ekranda görünen biçim. Türkçe binlik ayracı nokta. */
  display: string;
  /** Rakamdan sonra gelen ek. */
  suffix?: string;
  /** Satırın altındaki açıklama. */
  note: string;
};

export type LedgerGroup = {
  caption: string;
  rows: LedgerRow[];
};

export const ledgerIntro = {
  eyebrow: 'Aylık işlem hacmi',
  title: 'Her ay biz bunu yapıyoruz',
  body: 'Altyapı sağladığımız iş ortaklarımızla birlikte Türkiye’nin en büyük işlem hacmini gerçekleştiriyoruz.',
  /** Broşürdeki dipnot: "* 2025 Temmuz ayı verileri". Tarih vermek rakamı
      daha inandırıcı yapıyor; güncellenince burası da güncellenmeli. */
  period: '2025 Temmuz ayı verileri',
} as const;

export const ledgerGroups: LedgerGroup[] = [
  {
    caption: 'Kapsam',
    rows: [
      {
        label: 'Çalışan',
        value: 1_700_000,
        display: '1.700.000',
        suffix: '+',
        note: 'Her ay işlem yapılan çalışan sayısı',
      },
      {
        label: 'Sicil',
        value: 61_000,
        display: '61.000',
        suffix: '+',
        note: 'Her ay işlem yapılan SGK sicili',
      },
      {
        label: 'Firma',
        value: 20_000,
        display: '20.000',
        suffix: '+',
        note: 'Her ay işlem yapılan firma',
      },
    ],
  },
  {
    caption: 'Otomatik işlemler',
    rows: [
      {
        label: 'İş kazası takibi',
        value: 21_000,
        display: '21.000',
        suffix: '+',
        note: 'İş kazası takibi yapılan sicil',
      },
      {
        label: 'Otomatik onaylama',
        value: 16_000,
        display: '16.000',
        suffix: '+',
        note: 'Otomatik onaylama yapılan sicil',
      },
      {
        label: 'Sağlık raporu',
        value: 8_000,
        display: '8.000',
        suffix: '+',
        note: 'Otomatik onaylanan sağlık raporu',
      },
      {
        label: 'İş kazası tespiti',
        value: 4_000,
        display: '4.000',
        suffix: '+',
        note: 'Tespit edilen iş kazası',
      },
      {
        label: 'Kimlik bildirimi · sicil',
        value: 5_000,
        display: '5.000',
        suffix: '+',
        note: 'Kimlik bildirimi yapılan sicil',
      },
      {
        label: 'Kimlik bildirimi · personel',
        value: 6_000,
        display: '6.000',
        suffix: '+',
        note: 'Kimlik bildirimi yapılan personel',
      },
    ],
  },
];

/** Defterin kapanış satırı — muhasebe defterindeki toplam gibi çift çizgiyle ayrılır. */
export const ledgerTotal = {
  label: 'Kazandırılan teşvik',
  value: 360_000_000,
  display: '360.000.000',
  suffix: ' ₺',
  short: '360M+',
  note: 'Her ay kazandırılan toplam teşvik',
  footnote:
    '05510, 14857, 05746 ve x6322 teşvikleri hariç olup, yalnızca 6111, 3294 ve 2828 teşviklerinin toplamıdır.',
} as const;

/** Hero'nun altındaki güven şeridi — defterden üç ana rakam. */
export const trustStrip = {
  claim: 'Türkiye’nin en büyük işlem hacmi',
  body: 'Segika SGK otomasyon yazılımı, teşvik hesaplamadan sağlık raporu onayına, kimlik bildiriminden işkur çizelgesine kadar tüm süreçleri tek panelde yürütüyor.',
  /**
   * Şeritteki rakamlar kısa tutuldu: 360px'te üç sütuna sığsın, hiçbiri
   * ikinci satıra taşmasın. Açık yazımı defter bölümü zaten veriyor.
   */
  figures: [
    { display: '1,7M+', label: 'çalışan' },
    { display: '61.000+', label: 'sicil' },
    { display: '20.000+', label: 'firma' },
  ],
} as const;
