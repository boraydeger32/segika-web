/**
 * İçerik sayfaları kaydı.
 *
 * Mevcut segika.com'un 12 Kasım 2026 taramasından çıkan URL'ler.
 *
 * Başlıklar sitenin kendisinden birebir alındı. `description` alanlarının çoğu
 * da sitenin kendi meta açıklamasıdır; meta açıklaması olmayan sayfalarda
 * başlığın tarafsız bir yeniden ifadesi kullanıldı — yeni bir iddia
 * içermemesine dikkat edildi. `body` ise **yalnızca** siteden ya da broşürden
 * doğrulanabildiği yerde dolu; hiçbir gövde metni yazılmadı.
 *
 * `body` alanı dolu olan sayfalar tam metinle basılır. Boş olanlar, başlık ve
 * açıklamasıyla birlikte **açıkça işaretli yer tutucu** gövdeyle basılır:
 * arama motorları doğru başlığı ve adresi bulur, ziyaretçi de sayfanın henüz
 * taşınmadığını açıkça görür. Gövde metni geldikçe `body` doldurulur.
 */

export type ContentPage = {
  slug: string;
  title: string;
  /** Mevcut siteden alınan meta açıklama; sayfanın girişi olarak da kullanılır. */
  description: string;
  /** Tam gövde metni. Boşsa yer tutucu basılır. */
  body?: string[];
};

export type ContentGroup = {
  /** URL önekini belirler, ör. 'program-ozellikleri'. */
  base: string;
  label: string;
  /** Listeleme sayfasının girişi. */
  intro: string;
  pages: ContentPage[];
};

/* ------------------------------------------------------------------ */
/* Program özellikleri                                                 */
/* ------------------------------------------------------------------ */

export const featurePages: ContentPage[] = [
  {
    slug: 'sgk-tesvik-hesaplama',
    title: 'SGK Teşvik Hesaplama',
    description:
      'SGK Teşvik Hesaplama Programı, sadece birkaç tıkla dakikalar içinde eksiksiz ve hatasız teşvik hesaplaması yapar ve raporlar. Sistem hataları otomatik ortadan kaldırır, her zaman günceldir ve sınırsız sistem desteği sunar.',
    body: [
      'SGK teşvik hesaplama programı, işletmenizin maksimum fayda elde etmesi için en iyi algoritmik hesaplamayı yapar. Bu sayede, hiçbir teşvikin kaçırılmaması ve alınabilecek en yüksek teşvikten faydalanılması sağlanır.',
      'Program, tüm iş yükünüzü ortadan kaldırarak SGK teşviklerini eksiksiz ve tam olarak hesaplar, size hızlı ve hatasız sonuçlar sunar.',
    ],
  },
  {
    slug: 'sgk-tesvik-raporlari',
    title: 'SGK Teşvik Raporları',
    description:
      'SGK teşvik raporları, verilerinizi zahmetsizce yakalamak ve analiz etmek için işlerinizi kolaylaştırır. Verilere dayalı kararlar almanızı sağlar.',
    body: [
      'Daha fazla deneyim oluşturmak için SGK verilerinizden yararlanarak SGK teşvik raporları alın. Hızlı iç görüler için özel olarak hazırlanmış raporlar, dönemsel ve şirket bazlı raporlar oluşturun ve kontrolü elinize alın.',
    ],
  },
  {
    slug: 'sgk-potansiyel-tesvik-sorgulama',
    title: 'SGK Potansiyel Teşvik Sorgulama',
    description:
      'SGK potansiyel teşvik sorgulama, personel işe almadan önce hangi teşvikten ne tutarda yararlanabileceğinizi öğrenmenizi sağlar. Böylelikle aday değerlendirmenizi SGK teşvik kazancına göre de yapabilirsiniz.',
  },
  {
    slug: 'sgk-tesvik-simulasyonu',
    title: 'SGK Teşvik Simülasyonu',
    description:
      'SGK teşvik simülasyonu ile personel sayınızı planlayın. İş yerlerinde personel sayısı ihtiyaçlara göre planlanır; bu planlamada SGK teşvikleri de belirleyici olur.',
  },
  {
    slug: 'sgk-entegrasyonu',
    title: 'SGK Entegrasyonu',
    description:
      'Günümüz işletmeleri, bordro ve SGK süreçlerini farklı yazılımlar arasında manuel veri aktarımıyla yürütmek zorunda kalmamalı.',
  },
  {
    slug: 'sektorler',
    title: 'Sektörel Faydalar',
    description:
      'Tekstil, inşaat, teknoloji, lojistik, turizm, sağlık, eğitim, gıda, üretim, restoran ve kafe, perakende ve tüm sektörler için SGK teşvik hesaplama programı.',
  },
  {
    slug: 'sgk-saglik-raporu-takibi',
    title: 'SGK Sağlık Raporu Takibi',
    description:
      'SGK sağlık raporu takip programı ile tüm sicilleriniz için SGK’dan tek tek girip takip ve işlem yapmanıza gerek kalmadan personele ait iş göremezlik raporlarını tek panelden alın.',
    body: [
      'SGK Sağlık Raporu Takip Programı, tüm sicilleriniz için tek panel üzerinden, onaylı ve onaysız tüm sağlık raporlarını hızlıca tarar, listeler ve erişime açar.',
      'Otomatik olarak SGK sistemleri ile entegre çalışır, çalışanlarınızın rapor geçmişlerini zamanlı ve eksiksiz şekilde size sunar. Filtreleme ve arama özellikleri sayesinde, yüzlerce sicil arasında dakikalar içinde ihtiyacınız olan veriye ulaşırsınız.',
    ],
  },
  {
    slug: 'sgk-saglik-raporu-otomatik-onaylama',
    title: 'SGK Sağlık Raporu Otomatik Onaylama',
    description:
      'SGK sağlık raporlarını manuel olarak onaylamaya gerek kalmadan sağlık raporu otomasyon sistemimiz sayesinde, işletmeler hem zaman kazanıyor hem de insan hatasını minimize ediyor.',
    body: [
      'SGK sağlık raporlarını manuel olarak onaylamak artık geçmişte kaldı. Yeni nesil sağlık raporu otomasyon sistemimiz sayesinde, işletmeler hem zaman kazanıyor hem de insan hatasını minimize ediyor.',
      'Üstelik, SMS onay sürecine gerek kalmadan tüm işlemler sistem tarafından otomatik olarak gerçekleştiriliyor.',
    ],
  },
  {
    slug: 'sgk-is-kazasi-takibi',
    title: 'SGK İş Kazası Takibi',
    description:
      'Artık iş kazası bildirimleri için ajanda tutmanıza, SGK sistemini manuel olarak takip etmenize gerek yok. Otomatik SGK iş kazası takibi ve bilgilendirme altyapımızla yasal süreçleri zamanında yönetin.',
    body: [
      'İş kazaları yalnızca çalışan sağlığını değil, işletmenizin hukuki ve mali yükümlülüklerini de doğrudan etkiler.',
      'SGK’ya 3 iş günü içinde yapılması gereken iş kazası bildirimi, unutulduğunda veya geciktiğinde ağır idari para cezaları ile karşılaşılabilir. Tam da bu kritik noktada devreye giren otomatik SGK iş kazası bildirimi, tüm süreci sizin yerinize takip eder.',
    ],
  },
  {
    slug: 'otomatik-kimlik-bildirimi',
    title: 'Emniyet ve Jandarma Kimlik Bildirimi',
    description:
      'Kimlik bildirim yazılımının sunduğu en büyük kolaylıklardan biri, tüm işyerlerinizdeki personel hareketlerini tek bir panelde toplamasıdır.',
    body: [
      'Kentsel alanlardaki işletmelerin işe giren ve çıkan personeli için Emniyet, kırsal alanlardaki işletmelerin ise Jandarma kimlik bildirimi yapma zorunluluğu vardır.',
      'Otomatik Kimlik Bildirimi, SGK verilerini çekerek çalışan kimlik bildirimlerini Emniyet ve Jandarma’ya otomatik olarak gerçekleştirir. Manuel bildirim süreçlerini ortadan kaldırır ve insan hatasını minimize eder, hata riskini sıfırlar.',
    ],
  },
  {
    slug: 'iskur-isgucu-cizelgesi',
    title: 'İşkur İşgücü Çizelgesi',
    description:
      'İŞKUR’a düzenli olarak gönderilmesi gereken işgücü çizelgeleri artık manuel işlem gerektirmiyor.',
    body: [
      'İŞKUR programı SGK’nın işe giriş-çıkış servislerine sürekli bağlı çalışır, her yeni hareketi kaydeder ve İŞKUR’un istediği formatta aylık işgücü çizelgesini üretir.',
    ],
  },
  {
    slug: 'iskur-isgucu-cizelgesi-otomatik-bildirimi',
    title: 'İşkur İşgücü Çizelgesi Otomatik Bildirimi',
    description:
      'SGK verilerini kullanarak İŞKUR işgücü çizelgesi otomatik bildirimi yapmak artık dakikalar alıyor ve hatasız gerçekleşiyor. “SGK’dan İŞKUR’a tek tuş” avantajıyla manuel yükünüzü hafifletin.',
    body: [
      'Birkaç şube veya farklı sicil numarasıyla çalışan büyük gruplar için toplu bildirim desteği en büyük kolaylıktır. Vergi numarası bazında hazırlanan çizelge, gruba bağlı tüm sicilleri tek işlemde kapsar.',
    ],
  },
  {
    slug: 'sgk-ise-giris-cikis-listesi',
    title: 'SGK İşe Giriş Çıkış Listesi',
    description:
      'SGK işe giriş çıkış listesi ile tüm işyerlerinizin personel hareketlerini tek bir panelden, hızlı ve eksiksiz şekilde raporlayın.',
    body: [
      'Aylık sicil bazlı raporlamadan TC kimlik numarası ile bireysel takibe, PDF ve Excel formatlarında çıktı almaya kadar her şey tek sistemde.',
    ],
  },
  {
    slug: 'sgk-hizmet-listesi',
    title: 'SGK Hizmet Listesi',
    description:
      'SGK entegrasyonu sayesinde, SGK hizmet listesi alma süreci artık karmaşık ekranlar ve manuel işlemlerle zaman kaybettirmiyor.',
    body: [
      'Geliştirilmiş SGK yazılımımız, doğrudan entegrasyon yoluyla sistemle anlık iletişim kurarak, tek işyeri veya çoklu işyeri bazında hizmet listelerini saniyeler içinde kullanıcıya sunuyor.',
    ],
  },
  {
    slug: 'sgk-tahakkuk-raporu',
    title: 'SGK Tahakkuk Raporu',
    description:
      'SGK Tahakkuk Raporu modülü zaman kazandırır, hata riskini azaltır ve iş süreçlerinizi profesyonelce yönetmenizi sağlar.',
    body: [
      'SGK yazılımı, işyerlerine özel olarak tasarlanan güçlü altyapısıyla tüm SGK tahakkuk raporlarını tek tuşla alabilme imkânı sunar.',
      'Tekil ya da birden fazla işyeri için, 5510 sayılı Kanun başta olmak üzere tüm teşvik ve sigorta kodlarına uygun detaylı raporlar saniyeler içinde hazırlanır.',
    ],
  },
  {
    slug: 'sgk-yardimci-araclar-ve-raporlar',
    title: 'SGK Yardımcı Araçlar ve Raporlar',
    description:
      'SGK yardımcı araçlar ve raporlar, borç sorgulamadan teşvik denetimine, asgari ücret desteğinden e-borcu yoktur belgesine kadar birçok işlemi kolaylıkla yapmanızı sağlar.',
    body: [
      'SGK borç takibini her işyeri için tek tek yapmak yerine, tüm SGK sicil numaralarınızı tek bir panel üzerinden kontrol edebilirsiniz. Anlık SGK işyeri borç sorgulaması ile hem zaman kazanır hem de gecikmeye neden olabilecek riskleri önceden görürsünüz.',
      'Birçok işyeri SGK emanet alacaklarını fark etmiyor ve alacaklar emanette kalıyor. SGK yazılımı, tüm işyerlerinize ait emanet alacaklarını tek ekranda detaylı şekilde raporlayarak, geçmiş dönemden kalan ve sistemde bekleyen iade haklarınızı tespit etmenizi sağlar.',
      'SGK müfredat kartı genellikle karmaşık yapısıyla dikkat çeker. SGK yazılımı sayesinde tüm işyerlerinize ait müfredat kartlarını sade, filtrelenebilir ve analiz edilebilir formatta alabilirsiniz.',
    ],
  },
  {
    slug: 'insan-kaynaklari-raporlari',
    title: 'İnsan Kaynakları Raporları',
    description:
      'İnsan kaynakları raporları sayesinde verileri derlemek yerine strateji geliştirmeye odaklanın.',
  },
  {
    slug: 'deneme-ve-is-guvencesi-takibi',
    title: 'Deneme ve İş Güvencesi Takibi',
    description:
      'İş Kanunu’ndaki 2 aylık deneme ve 6 aylık iş güvencesi sürelerini otomatik takip edin.',
  },
  {
    slug: 'calisan-tazminat-hesaplama',
    title: 'Çalışan Tazminat Hesaplama',
    description:
      'Her işyerinde bir gün ihtiyaç duyulan, ancak zahmetli hesaplamasıyla zaman ve enerji kaybettiren tazminat hesaplama artık çok kolay.',
  },
  {
    slug: 'calisan-maas-hesaplama',
    title: 'Çalışan Maaş Hesaplama',
    description:
      'Çalışan maaş hesaplama modülümüz, brütten nete veya netten brüte tüm dönüşümleri otomatikleştirir. Ücret bileşenlerinizi sisteme girdiğiniz anda güncel mevzuata uygun kesintiler uygulanır.',
    body: [
      'Tüm maaş verileri, sigorta primleri, vergi dilimleri, kesintiler ve yan haklar sistem tarafından hesaplanır; ayrıntılı bir tablo hâlinde brüt, net ve aradaki tüm kalemler önünüze gelir.',
    ],
  },
  {
    slug: 'myk-analizi-ve-takibi',
    title: 'MYK Analizi ve Takibi',
    description: 'MYK belge sorgulama, analiz ve takip işlemlerini tek panelden yürütün.',
  },
  {
    slug: 'tanitim-videolari-ve-brosur',
    title: 'Tanıtım Videoları ve Broşür',
    description: 'Segika SGK otomasyon yazılımının tanıtım videoları ve broşürü.',
  },
];

/* ------------------------------------------------------------------ */
/* SGK İşveren Rehberi                                                 */
/* ------------------------------------------------------------------ */

export const guidePages: ContentPage[] = [
  {
    slug: 'sgk-rehberi',
    title: 'SGK Rehberi',
    description:
      'SGK teşviklerinden eksik faydalanmamak ve cezalı duruma düşmemek için işverenlerin dikkat etmesi gereken önemli hususlar var.',
  },
  {
    slug: 'is-yerini-bildirme-yukumlulugu',
    title: 'İş Yerini Bildirme Yükümlülüğü',
    description:
      'İşverenin, sigortalı çalıştırmaya başladığı iş yerini Sosyal Güvenlik Kurumu’na bildirme yükümlülüğü ve bu yükümlülüğe aykırılığın sonuçları.',
  },
  {
    slug: 'sigortaliyi-bildirme-yukumlulugu',
    title: 'Sigortalıyı Bildirme Yükümlülüğü',
    description:
      'Sosyal güvenlik mevzuatı uyarınca, işverenin sigortalıyı bildirme yükümlülüğü vardır. Kayıt dışı işçi çalıştırdığı tespit edilen işverenlere, verilmesi gereken belgelere göre çeşitli idari para cezaları uygulanır.',
  },
  {
    slug: 'sigortalinin-isten-ayrilmasi',
    title: 'Sigortalının İşten Ayrılması',
    description:
      'Sigortalının işten ayrılması hâlinde işverenin yapması gereken bildirimler ve süreleri.',
  },
  {
    slug: 'sigorta-primleri-odeme-yukumlulugu',
    title: 'Sigorta Primleri Ödeme Yükümlülüğü',
    description:
      'İşverenin sigorta primlerini ödeme yükümlülüğü, ödeme süreleri ve gecikme hâlinde uygulanan yaptırımlar.',
  },
  {
    slug: 'hastalik-ve-gecici-is-goremezlik',
    title: 'Hastalık ve Geçici İş Göremezlik',
    description:
      'Hastalık ve geçici iş göremezlik hâlinde işverenin yükümlülükleri, rapor bildirimi ve ödeme süreçleri.',
  },
  {
    slug: 'is-kazasi-ve-meslek-hastaligi',
    title: 'İş Kazası ve Meslek Hastalığı',
    description:
      'İşveren, iş kazası ve meslek hastalığı hâlinde işçinin sağlık durumunun gerektirdiği sağlık hizmetini sağlamakla yükümlüdür.',
  },
  {
    slug: 'alt-isverenle-calismak',
    title: 'Alt İşverenle Çalışmak',
    description:
      'Asıl işveren, alt işverende işe girmiş ve onlarla sözleşme yapmış olsalar dahi sigortalı personellerle ilgili olarak alt işverenle birlikte SGK yükümlülüklerini taşır.',
  },
  {
    slug: 'gecici-is-devri',
    title: 'Geçici İş Devri',
    description:
      'İşveren olarak çalıştırdığınız sigortalıyı, iş görme edimini yerine getirmek üzere başka bir işverene geçici olarak devredebilirsiniz.',
  },
  {
    slug: 'is-yeri-denetimi',
    title: 'İş Yeri Denetimi',
    description:
      'İşverenlerin ve sigortalıların SGK mevzuatına uygun hareket edip etmediklerini belirlemek için SGK denetleme memurları iş yeri denetimi yaparlar.',
  },
  {
    slug: 'is-yeri-denetim-nedenleri',
    title: 'İş Yeri Denetim Nedenleri',
    description: 'SGK’nın bir iş yerinde denetim başlatmasına yol açan başlıca nedenler.',
  },
  {
    slug: 'is-yeri-denetim-sekilleri',
    title: 'İş Yeri Denetim Şekilleri',
    description: 'SGK denetimlerinin uygulanma biçimleri ve her birinin kapsamı.',
  },
  {
    slug: 'is-yeri-denetim-sonuclarina-itiraz',
    title: 'İş Yeri Denetim Sonuçlarına İtiraz',
    description:
      'Denetim sonucunda düzenlenen rapora karşı işverenin itiraz yolları ve başvuru süreleri.',
  },
  {
    slug: 'sgk-idari-para-cezalari',
    title: 'SGK İdari Para Cezaları',
    description:
      'Sosyal Güvenlik Kurumu, işverenlerin yükümlülüklerini eksiksiz yerine getirmesini sağlamak amacıyla düzenli olarak denetim yapma ve mevzuata aykırı durumlarda idari para cezası uygulama yetkisine sahiptir.',
    body: [
      'Sigortalı işe giriş bildirgesinin süresinde verilmemesi, primlerin eksik veya geç ödenmesi gibi durumlar idari para cezası doğurur.',
    ],
  },
  {
    slug: 'sgk-kontrol-listesi',
    title: 'SGK Kontrol Listesi',
    description:
      'İdari para cezası ve diğer yaptırımlarla karşılaşmamak için, SGK kontrol listesi ile yapılan her işlemi kontrol etmeniz faydalı olacaktır.',
  },
];

/* ------------------------------------------------------------------ */
/* SGK Teşvikleri                                                      */
/* ------------------------------------------------------------------ */

export const incentivePages: ContentPage[] = [
  {
    slug: '6111-sgk-tesvik',
    title: '6111 SGK Teşvik',
    description:
      'Genç, Kadın ve Mesleki Belge Sahibi Olanların İstihdamına Yönelik Sigorta Primi Desteği (6111 SGK Teşvik).',
  },
  {
    slug: '3294-sgk-tesvik',
    title: '3294 SGK Teşvik',
    description:
      '3294 sayılı Kanun’un Ek 5. maddesi ve 2018/8 sayılı Genelge uyarınca uygulanan, Sosyal Yardım Alanların İstihdamı Hâlinde verilen SGK teşviki.',
  },
  {
    slug: '2828-sgk-tesvik',
    title: '2828 SGK Teşvik',
    description:
      '2828 sayılı Sosyal Hizmetler Kanunu kapsamında istihdam edilenler için uygulanan sigorta primi teşviki.',
  },
  {
    slug: '14857-sgk-tesvik',
    title: '14857 SGK Teşvik',
    description:
      'Engelli sigortalı istihdamına yönelik sigorta primi teşviki. Özel sektöre ait iş yerlerinde çalıştırılan engelli sigortalıların, prime esas kazanç alt sınırı üzerinden hesaplanan sigorta primi işveren hisselerinin tamamı Hazine ve Maliye Bakanlığınca karşılanır. 1 Temmuz 2008 tarihinden itibaren uygulanmaktadır.',
  },
  {
    slug: '5746-sgk-tesvik',
    title: '5746 SGK Teşvik',
    description:
      '5746 sayılı Araştırma, Geliştirme ve Tasarım Faaliyetlerinin Desteklenmesi Hakkında Kanun kapsamındaki sigorta primi desteği.',
  },
  {
    slug: '6322-sgk-tesvik',
    title: '6322 SGK Teşvik',
    description:
      'Yatırımlarda Devlet Yardımları Hakkında Kararlar uyarınca uygulanan teşvik (16322 – 26322 SGK Teşvik). Prime esas kazanç alt sınırı üzerinden hesaplanan sigorta primlerinin işveren hisselerinin tamamı veya bir kısmı karşılanır.',
  },
  {
    slug: '5510-sgk-tesvik',
    title: '5510 SGK Teşvik',
    description:
      'Malullük, yaşlılık ve ölüm sigortaları primleri işveren hissesinde 5 puanlık indirim teşviki (5510 SGK Teşvik).',
  },
];

/* ------------------------------------------------------------------ */
/* Kurallar                                                            */
/* ------------------------------------------------------------------ */

export const legalPages: ContentPage[] = [
  {
    slug: 'kullanim-kosullari',
    title: 'Kullanım Koşulları',
    description: 'Segika SGK otomasyon yazılımı ve internet sitesinin kullanım koşulları.',
  },
  {
    slug: 'gizlilik-politikasi',
    title: 'Gizlilik Politikası',
    description:
      'Segika, SGK otomasyonu yazılımı üreten bir şirkettir. Bu gizlilik politikası, internet sitelerimizin kullanıcıları ile müşterilerimizden alınan kişisel verilerin nasıl işlendiğini açıklar.',
  },
  {
    slug: 'cerez-ayarlari',
    title: 'Çerez Ayarları',
    description: 'Segika internet sitesinde kullanılan çerezler ve tercih ayarları.',
  },
];

export const findPage = (pages: ContentPage[], slug: string) => pages.find((p) => p.slug === slug);
