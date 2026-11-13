/**
 * Modül detay sayfaları.
 *
 * Tüm metinler segika.com'un kendi sayfalarından ve Segika broşüründen birebir
 * alındı (12 Kasım 2026). Hiçbiri yeniden yazılmadı veya uydurulmadı.
 *
 * `shot` alanları boş: mevcut ekran görüntüleri gerçek TC Kimlik numarası ve
 * sağlık verisi içerdiği için kullanılamıyor (assets/KVKK-RISKLI-GORSELLER.md).
 */

import type { ModuleEntry } from './modules';

export type DetailSection = {
  heading: string;
  body: string;
  /** Varsa bölümün kendi derin bağlantısı. */
  href?: string;
  shot?: ModuleEntry['screenshot'];
  placeholder?: { file: string; ratio: string; describes: string };
};

export type ModulePage = {
  slug: string;
  /** Mega menüde ve ekmek kırıntısında görünen kısa ad. */
  name: string;
  eyebrow: string;
  /** Sayfanın H1'i. İki satırda kırılması için `|` ile ayrılmış. */
  headline: string;
  intro: string;
  seo: { title: string; description: string };
  hero: { placeholder: { file: string; ratio: string; describes: string }; shot?: ModuleEntry['screenshot'] };
  /** Bu modüle ait defter rakamları. Boşsa bölüm basılmaz. */
  figures?: { display: string; label: string; note: string }[];
  sections: DetailSection[];
  /** Mega menüdeki kardeş sayfalar. */
  related: { label: string; href: string }[];
};

export const modulePages: ModulePage[] = [
  {
    slug: 'sgk-tesvik-programi',
    name: 'SGK Teşvik Programı',
    eyebrow: 'SGK Teşvik Programı',
    headline: 'SGK Teşvik Programı ile dakikalar içinde|eksiksiz ve hatasız teşvik hesaplayın',
    intro:
      'SGK Teşvik Programı, sadece birkaç tıkla dakikalar içinde eksiksiz ve hatasız teşvik hesaplaması yapar ve raporlar. Sistem hataları otomatik ortadan kaldırır, her zaman günceldir ve sınırsız sistem desteği sunar.',
    seo: {
      title: 'SGK Teşvik Programı — Segika SGK Otomasyon Yazılımı',
      description:
        'SGK Teşvik Programı, sadece birkaç tıkla dakikalar içinde eksiksiz ve hatasız teşvik hesaplaması yapar ve raporlar. Sistem hataları otomatik ortadan kaldırır, her zaman günceldir ve sınırsız sistem desteği sunar.',
    },
    hero: {
      placeholder: {
        file: 'assets/screenshots/tesvik-hesaplama.png',
        ratio: '16 / 10',
        describes: 'Teşvik Hesaplama ekranı — kanun kodu, çalışan sayısı, hesaplanan tutar',
      },
    },
    figures: [
      {
        display: '360.000.000+',
        label: 'Kazandırılan teşvik',
        note: 'Her ay kazandırılan toplam teşvik',
      },
      { display: '1.700.000+', label: 'Çalışan', note: 'Her ay işlem yapılan çalışan sayısı' },
      { display: '61.000+', label: 'Sicil', note: 'Her ay işlem yapılan SGK sicili' },
    ],
    sections: [
      {
        heading: 'Akıllı algoritma ile SGK teşvik hesaplama',
        body: 'SGK teşvik programı, işletmenizin maksimum fayda elde etmesi için en iyi algoritmik hesaplamayı yapar. Bu sayede, hiçbir teşvikin kaçırılmaması ve alınabilecek en yüksek teşvikten faydalanılması sağlanır. Teşvik programı, tüm iş yükünüzü ortadan kaldırarak SGK teşviklerini eksiksiz ve tam olarak hesaplar, size hızlı ve hatasız sonuçlar sunar.',
        href: '/program-ozellikleri/sgk-tesvik-hesaplama/',
        placeholder: {
          file: 'assets/screenshots/tesvik-hesaplama-ozeti.png',
          ratio: '4 / 3',
          describes: 'Teşvik Hesaplama Özeti — kanun kodu bazında bildirilen ve hesaplanan tutar',
        },
      },
      {
        heading: 'Verileri analiz edin, verilere dayalı kararlar alın',
        body: 'SGK teşvik raporları, verilerinizi zahmetsizce yakalamak ve analiz etmek için işlerinizi kolaylaştırır. Daha fazla deneyim oluşturmak için SGK verilerinizden yararlanarak SGK teşvik raporları alın. Hızlı iç görüler için özel olarak hazırlanmış raporlar, dönemsel ve şirket bazlı raporlar oluşturun ve kontrolü elinize alın.',
        href: '/program-ozellikleri/sgk-tesvik-raporlari/',
        placeholder: {
          file: 'assets/screenshots/tesvik-raporlari.png',
          ratio: '16 / 10',
          describes: 'Dönemsel teşvik raporu — şirket bazlı dağılım',
        },
      },
      {
        heading: 'Maksimum teşvik, hatasız hesaplama',
        body: 'SGK teşvik hesaplama programı, işletmenizin maksimum fayda elde etmesi için en iyi algoritmik hesaplamayı yapar. Program, tüm iş yükünüzü ortadan kaldırarak SGK teşviklerini eksiksiz ve tam olarak hesaplar, size hızlı ve hatasız sonuçlar sunar.',
      },
    ],
    related: [
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
    slug: 'sgk-vizite-programi',
    name: 'SGK Vizite Programı',
    eyebrow: 'SGK Vizite Programı',
    headline: 'Sağlık raporu süreçlerinde otomatik konfor:|zahmetsiz, hatasız ve yasal uyumlu',
    intro:
      'SGK sağlık raporlarını manuel olarak onaylamaya gerek kalmadan sağlık raporu otomasyon sistemimiz sayesinde, işletmeler hem zaman kazanıyor hem de insan hatasını minimize ediyor. Üstelik, SMS onay sürecine gerek kalmadan tüm SGK sağlık raporları sistem tarafından otomatik olarak gerçekleştiriliyor.',
    seo: {
      title: 'SGK Vizite Programı — Segika SGK Otomasyon Yazılımı',
      description:
        'SGK Vizite Programı ile tüm sicilleriniz için SGK’dan tek tek girip takip ve işlem yapmanıza gerek bırakmadan personellere ait iş göremezlik raporlarını tek panelden alın.',
    },
    hero: {
      placeholder: {
        file: 'assets/screenshots/vizite-saglik-raporu.png',
        ratio: '16 / 10',
        describes: 'Sağlık Raporu Bildirimi listesi — anonim veriyle',
      },
    },
    figures: [
      { display: '21.000+', label: 'İş kazası takibi', note: 'İş kazası takibi yapılan sicil' },
      { display: '16.000+', label: 'Otomatik onaylama', note: 'Otomatik onaylama yapılan sicil' },
      { display: '8.000+', label: 'Sağlık raporu', note: 'Otomatik onaylanan sağlık raporu' },
      { display: '4.000+', label: 'İş kazası tespiti', note: 'Tespit edilen iş kazası' },
    ],
    sections: [
      {
        heading: 'SMS onayı yok, hızlı ve hatasız süreç yönetimi',
        body: 'SGK sağlık raporlarını manuel olarak onaylamak artık geçmişte kaldı. Yeni nesil sağlık raporu otomasyon sistemimiz sayesinde, işletmeler hem zaman kazanıyor hem de insan hatasını minimize ediyor. Üstelik, SMS onay sürecine gerek kalmadan tüm işlemler sistem tarafından otomatik olarak gerçekleştiriliyor.',
        href: '/program-ozellikleri/sgk-saglik-raporu-otomatik-onaylama/',
        placeholder: {
          file: 'assets/screenshots/otomatik-onaylama.png',
          ratio: '4 / 3',
          describes: 'Otomatik Sağlık Raporu Onaylama ayar ekranı',
        },
      },
      {
        heading: 'Tüm SGK sağlık raporları tek panelde',
        body: 'SGK Sağlık Raporu Takip Programı, tüm sicilleriniz için tek panel üzerinden, onaylı ve onaysız tüm sağlık raporlarını hızlıca tarar, listeler ve erişime açar. Otomatik olarak SGK sistemleri ile entegre çalışır, çalışanlarınızın rapor geçmişlerini zamanlı ve eksiksiz şekilde size sunar. Filtreleme ve arama özellikleri sayesinde, yüzlerce sicil arasında dakikalar içinde ihtiyacınız olan veriye ulaşırsınız.',
        href: '/program-ozellikleri/sgk-saglik-raporu-takibi/',
        placeholder: {
          file: 'assets/screenshots/saglik-raporu-takibi.png',
          ratio: '16 / 10',
          describes: 'Sicil bazlı sağlık raporu listesi — anonim veriyle',
        },
      },
      {
        heading: 'İş kazası bildirimlerini kaçırmayın, cezalardan korunun',
        body: 'İş kazaları yalnızca çalışan sağlığını değil, işletmenizin hukuki ve mali yükümlülüklerini de doğrudan etkiler. SGK’ya 3 iş günü içinde yapılması gereken iş kazası bildirimi, unutulduğunda veya geciktiğinde ağır idari para cezaları ile karşılaşılabilir. Tam da bu kritik noktada devreye giren otomatik SGK iş kazası bildirimi, tüm süreci sizin yerinize takip eder.',
        href: '/program-ozellikleri/sgk-is-kazasi-takibi/',
        placeholder: {
          file: 'assets/screenshots/is-kazasi-takibi.png',
          ratio: '16 / 9',
          describes: 'Otomatik İş Kazası Bildirimi ayar ekranı',
        },
      },
    ],
    related: [
      { label: 'SGK Sağlık Raporu Takibi', href: '/program-ozellikleri/sgk-saglik-raporu-takibi/' },
      {
        label: 'Sağlık Raporu Otomatik Onaylama',
        href: '/program-ozellikleri/sgk-saglik-raporu-otomatik-onaylama/',
      },
      { label: 'SGK İş Kazası Takibi', href: '/program-ozellikleri/sgk-is-kazasi-takibi/' },
    ],
  },

  {
    slug: 'kimlik-bildirimi-programi',
    name: 'Kimlik Bildirimi Programı',
    eyebrow: 'Kimlik Bildirimi Programı',
    headline: 'SGK verisiyle otomatik kimlik bildirimi:|yasal uyum da, vakit tasarrufu da elinizde',
    intro:
      'Kuruluşunuzun bulunduğu bölgeye göre, işe giren ve işten çıkan tüm personelin kimlik bildirimi hem Jandarma hem de Emniyet birimlerine zamanında yapılmalıdır. Kimlik bildirimi programı, SGK verilerini çekerek personel hareketlerinizi izler ve kimlik bildirimlerini otomatik olarak gerçekleştirir.',
    seo: {
      title: 'Kimlik Bildirimi Programı — Segika SGK Otomasyon Yazılımı',
      description:
        'Kimlik bildirimi programı, SGK verilerini çekerek personel hareketlerinizi izler ve kimlik bildirimlerini Emniyet ve Jandarma’ya otomatik olarak gerçekleştirir.',
    },
    hero: {
      placeholder: {
        file: 'assets/screenshots/kimlik-bildirimi.png',
        ratio: '16 / 10',
        describes: 'Kimlik Bildirimi işlem listesi — anonim veriyle',
      },
    },
    figures: [
      { display: '5.000+', label: 'Sicil', note: 'Kimlik bildirimi yapılan sicil' },
      { display: '6.000+', label: 'Personel', note: 'Kimlik bildirimi yapılan personel' },
    ],
    sections: [
      {
        heading: 'Emniyet ve Jandarma, doğru birime doğru bildirim',
        body: 'Kentsel alanlardaki işletmelerin işe giren ve çıkan personeli için Emniyet, kırsal alanlardaki işletmelerin ise Jandarma kimlik bildirimi yapma zorunluluğu vardır. Program, kuruluşunuzun bulunduğu bölgeye göre bildirimi doğru birime yönlendirir.',
        href: '/program-ozellikleri/otomatik-kimlik-bildirimi/',
        placeholder: {
          file: 'assets/screenshots/kimlik-bildirimi-birim.png',
          ratio: '16 / 10',
          describes: 'İşyeri bazında Emniyet / Jandarma yönlendirme ayarı',
        },
      },
      {
        heading: 'Manuel bildirim süreçlerini ortadan kaldırır',
        body: 'Otomatik Kimlik Bildirimi, SGK verilerini çekerek çalışan kimlik bildirimlerini Emniyet ve Jandarma’ya otomatik olarak gerçekleştirir. Manuel bildirim süreçlerini ortadan kaldırır ve insan hatasını minimize eder, hata riskini sıfırlar. Personel çabası ve idari yükü büyük ölçüde azaltır.',
      },
      {
        heading: 'Tüm işyerleriniz tek panelde',
        body: 'Kimlik bildirim yazılımının sunduğu en büyük kolaylıklardan biri, tüm işyerlerinizdeki personel hareketlerini tek bir panelde toplamasıdır. Çalışan sayınız arttıkça bu sorumluluk kadar, iş yükü ve hata riski de katlanır; sistem bu yükü sizin yerinize taşır.',
      },
    ],
    related: [
      {
        label: 'Emniyet ve Jandarma Kimlik Bildirimi',
        href: '/program-ozellikleri/otomatik-kimlik-bildirimi/',
      },
    ],
  },

  {
    slug: 'iskur-bildirimi-programi',
    name: 'İşkur Bildirimi Programı',
    eyebrow: 'İşkur Bildirimi Programı',
    headline: 'İşgücü raporları otomatik gelsin,|İŞKUR süreçleri kolaylaşsın',
    intro:
      'SGK verilerini kullanarak İŞKUR işgücü çizelgesi bildirimi yapmak artık dakikalar alıyor ve hatasız gerçekleşiyor. “SGK’dan İŞKUR’a tek tuş” avantajıyla manuel yükünüzü hafifletin, yasal uyum ve işgücü yönetiminde yeni bir çağa adım atın.',
    seo: {
      title: 'İşkur Bildirimi Programı — Segika SGK Otomasyon Yazılımı',
      description:
        'İşkur Bildirimi Programı ile SGK verilerini kullanarak İŞKUR işgücü çizelgesi bildirimi yapmak artık dakikalar alıyor ve hatasız gerçekleşiyor.',
    },
    hero: {
      placeholder: {
        file: 'assets/screenshots/iskur-isgucu-cizelgesi.png',
        ratio: '4 / 3',
        describes: 'İşgücü Çizelgesi — il ve meslek bazında dağılım',
      },
    },
    sections: [
      {
        heading: 'SGK’ya sürekli bağlı, çizelge kendiliğinden hazır',
        body: 'İŞKUR programı SGK’nın işe giriş-çıkış servislerine sürekli bağlı çalışır, her yeni hareketi kaydeder ve İŞKUR’un istediği formatta aylık işgücü çizelgesini üretir. İŞKUR’a düzenli olarak gönderilmesi gereken işgücü çizelgeleri artık manuel işlem gerektirmiyor.',
        href: '/program-ozellikleri/iskur-isgucu-cizelgesi/',
        placeholder: {
          file: 'assets/screenshots/iskur-cizelge-hazirla.png',
          ratio: '16 / 10',
          describes: 'Çizelge hazırlama ekranı — dönem ve şirket seçimi',
        },
      },
      {
        heading: 'Çok şubeli gruplar için toplu bildirim',
        body: 'Birkaç şube veya farklı sicil numarasıyla çalışan büyük gruplar için toplu bildirim desteği en büyük kolaylıktır. Vergi numarası bazında hazırlanan çizelge, gruba bağlı tüm sicilleri tek işlemde kapsar.',
        href: '/program-ozellikleri/iskur-isgucu-cizelgesi-otomatik-bildirimi/',
      },
    ],
    related: [
      { label: 'İşkur İşgücü Çizelgesi', href: '/program-ozellikleri/iskur-isgucu-cizelgesi/' },
      {
        label: 'İşgücü Çizelgesi Otomatik Bildirimi',
        href: '/program-ozellikleri/iskur-isgucu-cizelgesi-otomatik-bildirimi/',
      },
    ],
  },

  {
    slug: 'sgk-araclari-ve-raporlar',
    name: 'SGK Araçları ve Raporlar',
    eyebrow: 'SGK Araçları ve Raporlar',
    headline: 'SGK ile entegre, veriye hızlı erişim|ve tüm siciller tek panelde',
    intro:
      'SGK yardımcı araçlar ve raporlar, borç sorgulamadan teşvik denetimine, asgari ücret desteğinden e-borcu yoktur belgesine kadar birçok işlemi kolaylıkla yapmanızı sağlar. SGK’nın karmaşık yapısına entegre çözümlerimizle zamandan ve iş gücünden kazanç sağlıyoruz.',
    seo: {
      title: 'SGK Araçları ve Raporlar — Segika SGK Otomasyon Yazılımı',
      description:
        'SGK yardımcı araçlar ve raporlar; borç sorgulamadan teşvik denetimine, asgari ücret desteğinden e-borcu yoktur belgesine kadar birçok işlemi tek panelden yapmanızı sağlar.',
    },
    hero: {
      placeholder: {
        file: 'assets/screenshots/sgk-araclari.png',
        ratio: '16 / 10',
        describes: 'İşveren Borç Görüntüleme — anonim firma adlarıyla',
      },
    },
    sections: [
      {
        heading: 'SGK işe giriş ve çıkış bildirgeleri tek panelde',
        body: 'SGK işe giriş çıkış listesi ile tüm işyerlerinizin personel hareketlerini tek bir panelden, hızlı ve eksiksiz şekilde raporlayın. Aylık sicil bazlı raporlamadan TC kimlik numarası ile bireysel takibe, PDF ve Excel formatlarında çıktı almaya kadar her şey tek sistemde.',
        href: '/program-ozellikleri/sgk-ise-giris-cikis-listesi/',
        placeholder: {
          file: 'assets/screenshots/ise-giris-cikis.png',
          ratio: '16 / 10',
          describes: 'İşe Giriş/Çıkış Sorgulama — anonim veriyle',
        },
      },
      {
        heading: 'SGK hizmet listeleri tek panelde, tüm işyerleri elinizde',
        body: 'SGK entegrasyonu sayesinde, SGK hizmet listesi alma süreci artık karmaşık ekranlar ve manuel işlemlerle zaman kaybettirmiyor. Geliştirilmiş SGK yazılımımız, doğrudan entegrasyon yoluyla sistemle anlık iletişim kurarak, tek işyeri veya çoklu işyeri bazında hizmet listelerini saniyeler içinde kullanıcıya sunuyor.',
        href: '/program-ozellikleri/sgk-hizmet-listesi/',
      },
      {
        heading: 'Kolay, hızlı ve kapsamlı toplu tahakkuk raporu',
        body: 'SGK yazılımı, işyerlerine özel olarak tasarlanan güçlü altyapısıyla tüm SGK tahakkuk raporlarını tek tuşla alabilme imkânı sunar. Tekil ya da birden fazla işyeri için, 5510 sayılı Kanun başta olmak üzere tüm teşvik ve sigorta kodlarına uygun detaylı raporlar saniyeler içinde hazırlanır.',
        href: '/program-ozellikleri/sgk-tahakkuk-raporu/',
      },
      {
        heading: 'Tüm borçlar görünür, hiçbir detay gözden kaçmaz',
        body: 'SGK borç takibini her işyeri için tek tek yapmak yerine, tüm SGK sicil numaralarınızı tek bir panel üzerinden kontrol edebilirsiniz. Anlık SGK işyeri borç sorgulaması ile hem zaman kazanır hem de gecikmeye neden olabilecek riskleri önceden görürsünüz. Sistemdeki borçlu sicilleri anında tespit ederek stratejik aksiyonlar alabilirsiniz.',
        href: '/program-ozellikleri/sgk-yardimci-araclar-ve-raporlar/',
        placeholder: {
          file: 'assets/screenshots/borc-raporu.png',
          ratio: '4 / 3',
          describes: 'İşveren Borç Görüntüleme — anonim firma adlarıyla',
        },
      },
      {
        heading: 'Gizli kalan alacaklarınızı görün, emanetler cebinizde kalmasın',
        body: 'Birçok işyeri SGK emanet alacaklarını fark etmiyor ve alacaklar emanette kalıyor. SGK yazılımı, tüm işyerlerinize ait emanet alacaklarını tek ekranda detaylı şekilde raporlayarak, geçmiş dönemden kalan ve sistemde bekleyen iade haklarınızı tespit etmenizi sağlar. Böylece tahsil edilmeyen alacaklar gün yüzüne çıkar.',
        href: '/program-ozellikleri/sgk-yardimci-araclar-ve-raporlar/',
      },
      {
        heading: 'Okunabilir, sade ve detaylı SGK geçmişiniz',
        body: 'SGK müfredat kartı genellikle karmaşık yapısıyla dikkat çeker. SGK yazılımı sayesinde tüm işyerlerinize ait müfredat kartlarını sade, filtrelenebilir ve analiz edilebilir formatta alabilirsiniz. Sicil geçmişi, ödeme hareketleri ve tahakkuk detaylarına tek panelden erişerek muhasebe süreçlerinizi kolaylaştırabilirsiniz.',
        href: '/program-ozellikleri/sgk-yardimci-araclar-ve-raporlar/',
      },
    ],
    related: [
      { label: 'SGK İşe Giriş Çıkış Listesi', href: '/program-ozellikleri/sgk-ise-giris-cikis-listesi/' },
      { label: 'SGK Hizmet Listesi', href: '/program-ozellikleri/sgk-hizmet-listesi/' },
      { label: 'SGK Tahakkuk Raporu', href: '/program-ozellikleri/sgk-tahakkuk-raporu/' },
      {
        label: 'SGK Yardımcı Araçlar ve Raporlar',
        href: '/program-ozellikleri/sgk-yardimci-araclar-ve-raporlar/',
      },
      { label: 'İnsan Kaynakları Raporları', href: '/program-ozellikleri/insan-kaynaklari-raporlari/' },
    ],
  },
];

export const findModulePage = (slug: string) => modulePages.find((m) => m.slug === slug);
