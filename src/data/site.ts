/**
 * Site geneli sabitler ve gezinme yapısı.
 *
 * URL'ler mevcut segika.com yapısından birebir alındı (12 Kasım 2026 taraması).
 * Site arama trafiği aldığı için bu adresler değiştirilmemeli; hepsi sonunda
 * eğik çizgiyle biter (astro.config.mjs → trailingSlash: 'always').
 */

export const site = {
  name: 'Segika',
  tagline: 'SGK Otomasyon Yazılımı',
  url: 'https://www.segika.com',
  locale: 'tr-TR',
} as const;

export const cta = {
  primary: { label: 'Ücretsiz Deneyin', href: 'https://app.segika.com/register' },
  secondary: { label: 'Üye Girişi', href: 'https://app.segika.com/login' },
} as const;

export const contact = {
  phone: { label: '(0212) 909 99 41', href: 'tel:+902129099941' },
  gsm: { label: '(0555) 142 71 71', href: 'tel:+905551427171' },
  whatsapp: { label: 'WhatsApp', href: 'https://wa.me/905551427171' },
  email: { label: 'sgk@turksab.com', href: 'mailto:sgk@turksab.com' },
} as const;

export type NavLink = {
  label: string;
  href: string;
  /** Mega menüde başlığın altında görünen tek satırlık açıklama. */
  note?: string;
};

export type NavGroup = {
  label: string;
  /** Grup başlığının kendisi bir sayfaya gidiyorsa. */
  href?: string;
  links: NavLink[];
};

/**
 * Mega menü sütunu. Her sütun bir veya daha fazla grup taşır.
 * Sütunları elle dengeliyorum: otomatik ızgara 5 grubu 3 sütuna bölünce
 * son hücre boş kalıyor ve menü yarım kalmış gibi duruyordu.
 */
export type NavColumn = NavGroup[];

const programGroups: NavGroup[] = [
  {
    label: 'SGK Teşvik',
    href: '/sgk-tesvik-programi/',
    links: [
      { label: 'SGK Teşvik Programı', href: '/sgk-tesvik-programi/' },
      { label: 'SGK Teşvik Hesaplama', href: '/program-ozellikleri/sgk-tesvik-hesaplama/' },
      { label: 'SGK Teşvik Raporları', href: '/program-ozellikleri/sgk-tesvik-raporlari/' },
      { label: 'SGK Teşvik Simülasyonu', href: '/program-ozellikleri/sgk-tesvik-simulasyonu/' },
      {
        label: 'Potansiyel Teşvik Sorgulama',
        href: '/program-ozellikleri/sgk-potansiyel-tesvik-sorgulama/',
      },
      { label: 'SGK Entegrasyonu', href: '/program-ozellikleri/sgk-entegrasyonu/' },
      { label: 'Sektörel Faydalar', href: '/program-ozellikleri/sektorler/' },
    ],
  },
  {
    label: 'SGK Vizite',
    href: '/sgk-vizite-programi/',
    links: [
      { label: 'SGK Vizite Programı', href: '/sgk-vizite-programi/' },
      { label: 'Sağlık Raporu Takibi', href: '/program-ozellikleri/sgk-saglik-raporu-takibi/' },
      {
        label: 'Sağlık Raporu Otomatik Onaylama',
        href: '/program-ozellikleri/sgk-saglik-raporu-otomatik-onaylama/',
      },
      { label: 'SGK İş Kazası Takibi', href: '/program-ozellikleri/sgk-is-kazasi-takibi/' },
    ],
  },
  {
    label: 'Bildirimler',
    links: [
      { label: 'Kimlik Bildirimi Programı', href: '/kimlik-bildirimi-programi/' },
      {
        label: 'Emniyet ve Jandarma Kimlik Bildirimi',
        href: '/program-ozellikleri/otomatik-kimlik-bildirimi/',
      },
      { label: 'İşkur Bildirimi Programı', href: '/iskur-bildirimi-programi/' },
      { label: 'İşkur İşgücü Çizelgesi', href: '/program-ozellikleri/iskur-isgucu-cizelgesi/' },
      {
        label: 'İşgücü Çizelgesi Otomatik Bildirimi',
        href: '/program-ozellikleri/iskur-isgucu-cizelgesi-otomatik-bildirimi/',
      },
    ],
  },
  {
    label: 'SGK Araçları ve Raporlar',
    href: '/sgk-araclari-ve-raporlar/',
    links: [
      { label: 'SGK Araçları ve Raporlar', href: '/sgk-araclari-ve-raporlar/' },
      { label: 'SGK İşe Giriş Çıkış Listesi', href: '/program-ozellikleri/sgk-ise-giris-cikis-listesi/' },
      { label: 'SGK Hizmet Listesi', href: '/program-ozellikleri/sgk-hizmet-listesi/' },
      { label: 'SGK Tahakkuk Raporu', href: '/program-ozellikleri/sgk-tahakkuk-raporu/' },
      {
        label: 'SGK Yardımcı Araçlar ve Raporlar',
        href: '/program-ozellikleri/sgk-yardimci-araclar-ve-raporlar/',
      },
    ],
  },
  {
    label: 'İnsan Kaynakları Araçları',
    links: [
      { label: 'Deneme ve İş Güvencesi Takibi', href: '/program-ozellikleri/deneme-ve-is-guvencesi-takibi/' },
      { label: 'Çalışan Tazminat Hesaplama', href: '/program-ozellikleri/calisan-tazminat-hesaplama/' },
      { label: 'Çalışan Maaş Hesaplama', href: '/program-ozellikleri/calisan-maas-hesaplama/' },
      { label: 'İnsan Kaynakları Raporları', href: '/program-ozellikleri/insan-kaynaklari-raporlari/' },
      { label: 'MYK Analizi ve Takibi', href: '/program-ozellikleri/myk-analizi-ve-takibi/' },
    ],
  },
];

/** Üç dengeli sütun: 7 / 4+5 / 5+5 kalem. */
export const programMenu: NavColumn[] = [
  [programGroups[0]],
  [programGroups[1], programGroups[2]],
  [programGroups[3], programGroups[4]],
];

export const consultingMenu: NavLink[] = [
  {
    label: 'İş ve Sosyal Güvenlik Hukuku',
    href: '/danismanlik/is-ve-sosyal-guvenlik-hukuku-danismanligi/',
  },
  { label: 'İnsan Kaynakları Yönetimi', href: '/danismanlik/insan-kaynaklari-yonetimi/' },
  { label: 'Personel Bulma ve İşe Alım', href: '/danismanlik/personel-bulma-ve-ise-alim/' },
];

const guideGroups: NavGroup[] = [
  {
    label: 'İşveren Yükümlülükleri',
    links: [
      { label: 'İş Yerini Bildirme Yükümlülüğü', href: '/sgk-isveren-rehberi/is-yerini-bildirme-yukumlulugu/' },
      { label: 'Sigortalıyı Bildirme Yükümlülüğü', href: '/sgk-isveren-rehberi/sigortaliyi-bildirme-yukumlulugu/' },
      { label: 'Sigortalının İşten Ayrılması', href: '/sgk-isveren-rehberi/sigortalinin-isten-ayrilmasi/' },
      { label: 'Sigorta Primleri Ödeme Yükümlülüğü', href: '/sgk-isveren-rehberi/sigorta-primleri-odeme-yukumlulugu/' },
      { label: 'Hastalık ve Geçici İş Göremezlik', href: '/sgk-isveren-rehberi/hastalik-ve-gecici-is-goremezlik/' },
      { label: 'İş Kazası ve Meslek Hastalığı', href: '/sgk-isveren-rehberi/is-kazasi-ve-meslek-hastaligi/' },
      { label: 'Alt İşverenle Çalışmak', href: '/sgk-isveren-rehberi/alt-isverenle-calismak/' },
      { label: 'Geçici İş Devri', href: '/sgk-isveren-rehberi/gecici-is-devri/' },
    ],
  },
  {
    label: 'İş Yeri Denetimi',
    links: [
      { label: 'İş Yeri Denetimi', href: '/sgk-isveren-rehberi/is-yeri-denetimi/' },
      { label: 'İş Yeri Denetim Nedenleri', href: '/sgk-isveren-rehberi/is-yeri-denetim-nedenleri/' },
      { label: 'İş Yeri Denetim Şekilleri', href: '/sgk-isveren-rehberi/is-yeri-denetim-sekilleri/' },
      { label: 'Denetim Sonuçlarına İtiraz', href: '/sgk-isveren-rehberi/is-yeri-denetim-sonuclarina-itiraz/' },
    ],
  },
  {
    label: 'Cezalar ve Kontrol',
    links: [
      { label: 'SGK İdari Para Cezaları', href: '/sgk-isveren-rehberi/sgk-idari-para-cezalari/' },
      { label: 'SGK Kontrol Listesi', href: '/sgk-isveren-rehberi/sgk-kontrol-listesi/' },
      { label: 'SGK Rehberi', href: '/sgk-isveren-rehberi/sgk-rehberi/' },
      { label: 'SGK Teşvikleri', href: '/kategori/sgk-tesvikleri/' },
    ],
  },
];

/** Üç sütun: 8 / 4 / 4 kalem. */
export const guideMenu: NavColumn[] = [[guideGroups[0]], [guideGroups[1]], [guideGroups[2]]];

export const footerColumns = [
  {
    label: 'SGK Otomasyon Yazılımı',
    links: [
      { label: 'Hizmetler', href: '/hizmetler/' },
      { label: 'Ücretsiz Teşvik Analizi', href: '/tesvik-analizi/' },
      { label: 'SGK Teşvik Programı', href: '/sgk-tesvik-programi/' },
      { label: 'SGK Vizite Programı', href: '/sgk-vizite-programi/' },
      { label: 'SGK Araçları ve Raporlar', href: '/sgk-araclari-ve-raporlar/' },
      { label: 'Kimlik Bildirimi Programı', href: '/kimlik-bildirimi-programi/' },
      { label: 'İşkur Bildirimi Programı', href: '/iskur-bildirimi-programi/' },
      { label: 'MYK Analizi ve Takibi', href: '/program-ozellikleri/myk-analizi-ve-takibi/' },
      { label: 'Tanıtım Videoları ve Broşür', href: '/program-ozellikleri/tanitim-videolari-ve-brosur/' },
    ],
  },
  {
    label: 'SGK İşveren Rehberi',
    links: [
      { label: 'SGK İşveren Rehberi', href: '/kategori/sgk-isveren-rehberi/' },
      { label: 'SGK Teşvikleri', href: '/kategori/sgk-tesvikleri/' },
      { label: 'SGK İdari Para Cezaları', href: '/sgk-isveren-rehberi/sgk-idari-para-cezalari/' },
      { label: 'SGK Kontrol Listesi', href: '/sgk-isveren-rehberi/sgk-kontrol-listesi/' },
    ],
  },
  {
    label: 'Danışmanlık Hizmetleri',
    links: consultingMenu,
  },
  {
    label: 'Segika',
    links: [
      { label: 'Hakkımızda', href: '/hakkimizda/' },
      { label: 'Duyurular', href: '/kategori/duyurular/' },
      { label: 'Fiyatlandırma', href: '/program-ozellikleri/fiyatlandirma/' },
      { label: 'İletişim', href: '/iletisim/' },
    ],
  },
] as const;

export const legalLinks = [
  { label: 'Kullanım Koşulları', href: '/kurallar/kullanim-kosullari/' },
  { label: 'Gizlilik Politikası', href: '/kurallar/gizlilik-politikasi/' },
  { label: 'Çerez Politikası', href: '/cerez-politikasi-ab/' },
] as const;
