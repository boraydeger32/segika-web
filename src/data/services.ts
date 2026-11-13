/**
 * Danışmanlık hizmetleri ve rehber içerikleri.
 * Başlıklar ve alt kalemler segika.com'dan birebir alındı.
 */

export type Service = {
  index: string;
  title: string;
  /** Kısa özet — alt kalemlerden türetilmedi, hizmetin kapsamını anlatır. */
  summary: string;
  /** Sayfadaki uzun listeden seçilmiş öne çıkan kalemler. */
  highlights: string[];
  href: string;
};

export const services: Service[] = [
  {
    index: '01',
    title: 'İş ve Sosyal Güvenlik Hukuku',
    summary:
      'İş sözleşmelerinden denetim süreçlerine, fesih ve ihtar uygulamalarından SGK uyuşmazlıklarına kadar riskleri önceden tespit eder, süreci birlikte yönetiriz.',
    highlights: [
      'İş hukuku uyuşmazlık danışmanlığı',
      'Fesih ve ihtar süreçleri',
      'İş sözleşmesi tasarımı ve revizyonu',
      'Alt işverenlik ve hizmet alımı',
      'Denetim ve teftiş süreçleri',
      'İşe iade davaları ve arabuluculuk',
    ],
    href: '/danismanlik/is-ve-sosyal-guvenlik-hukuku-danismanligi/',
  },
  {
    index: '02',
    title: 'İnsan Kaynakları Yönetimi',
    summary:
      'Organizasyon yapısından ücret sistemine, performans değerlendirmeden İK süreçlerinin dijitalleştirilmesine kadar kurumsal İK altyapısını kurarız.',
    highlights: [
      'Organizasyon yapısı ve kadro planlama',
      'İş analizi ve görev tanımı',
      'Ücret ve yan haklar yönetimi',
      'Performans değerlendirme sistemi',
      'İK politikaları ve yönetmelik geliştirme',
      'İK denetimi ve mevzuat uyumu',
    ],
    href: '/danismanlik/insan-kaynaklari-yonetimi/',
  },
  {
    index: '03',
    title: 'Personel Bulma ve İşe Alım',
    summary:
      'Şirketinizin kültürüne ve sektörel dinamiklerine uygun nitelikli insan kaynağını, mavi yakadan üst düzey yönetime kadar bulur ve yerleştiririz.',
    highlights: [
      'İşe alım stratejisi',
      'Mavi yaka ve beyaz yaka işe alım',
      'Üst düzey (executive) seçim',
      'Mülakat ve değerlendirme süreci',
      'Psikometrik ve kişilik envanteri',
      'Yetenek avcılığı (headhunting)',
    ],
    href: '/danismanlik/personel-bulma-ve-ise-alim/',
  },
];

export type GuideEntry = {
  title: string;
  /** Konunun neden önemli olduğunu anlatan tek cümle. */
  summary: string;
  href: string;
  category: string;
};

/**
 * Rehberden öne çıkan içerikler.
 * Başlıklar ve adresler mevcut siteden; özetler sayfaların kendi açıklamalarından.
 */
export const featuredGuides: GuideEntry[] = [
  {
    title: 'SGK İdari Para Cezaları',
    summary:
      'Sigortalı işe giriş bildirgesinin süresinde verilmemesi veya primlerin eksik ödenmesi hâlinde uygulanan yaptırımlar.',
    href: '/sgk-isveren-rehberi/sgk-idari-para-cezalari/',
    category: 'Cezalar',
  },
  {
    title: 'Sigortalıyı Bildirme Yükümlülüğü',
    summary:
      'Kayıt dışı işçi çalıştırdığı tespit edilen işverenlere, verilmesi gereken belgelere göre uygulanan idari para cezaları.',
    href: '/sgk-isveren-rehberi/sigortaliyi-bildirme-yukumlulugu/',
    category: 'Yükümlülükler',
  },
  {
    title: 'İş Kazası ve Meslek Hastalığı',
    summary:
      'İşveren, iş kazası ve meslek hastalığı hâlinde işçinin sağlık durumunun gerektirdiği hizmeti sağlamakla yükümlüdür.',
    href: '/sgk-isveren-rehberi/is-kazasi-ve-meslek-hastaligi/',
    category: 'Yükümlülükler',
  },
  {
    title: 'SGK Kontrol Listesi',
    summary:
      'İdari para cezası ve diğer yaptırımlarla karşılaşmamak için her işlemde kontrol edilmesi gereken maddeler.',
    href: '/sgk-isveren-rehberi/sgk-kontrol-listesi/',
    category: 'Kontrol',
  },
];
