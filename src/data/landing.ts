/**
 * Landing sayfasının içeriği.
 *
 * Neden ayrı dosyada: bu maddeler hem sayfada görünür metin olarak basılıyor
 * hem de JSON-LD yapısal verisine giriyor. İki yerde ayrı ayrı yazılsalardı
 * biri değiştiğinde diğeri geride kalırdı — ve sayfada yazmayan bir şeyi
 * şemada iddia etmek, arama motorlarının açıkça yasakladığı bir davranış.
 * Tek kaynak bunu yapısal olarak imkânsız kılıyor.
 *
 * Tüm cevaplar sayfadaki mevcut metinlerden; yeni iddia eklenmedi.
 */

/**
 * İtiraz kırma bölümü — aynı zamanda FAQPage şemasının kaynağı.
 *
 * `source` alanı `faq.ts` ile aynı disiplini sürdürüyor: her cevabın
 * nereden geldiği yazılı. Kaynağı olmayan cevap yazılmıyor.
 */
export type FaqItem = {
  question: string;
  answer: string;
  source: string;
  /**
   * Cevabı doğrulayan sayfa. Yalnızca gerçekten bir sayfaya işaret eden
   * cevaplarda dolu — "politikamız açıklar" deyip bağlantı vermemek
   * ziyaretçiyi çıkmaza sokuyor.
   *
   * Bağlantı metni JSON-LD'ye girmiyor; şemadaki `text` yalnızca cevabın
   * kendisi, yani sayfada görünenin birebir aynısı.
   */
  link?: { label: string; href: string };
};

export const landingFaq: FaqItem[] = [
  {
    question: 'Mevcut bordro programım ne olacak?',
    answer:
      'Luca, Logo, Mikro ve Eta ile tam entegrasyon; web API altyapısı sayesinde diğer yazılımlarınıza da bağlanır. Mevcut düzeninizi değiştirmenize gerek yok.',
    source: 'segika.com/duyurular',
  },
  {
    question: 'Kurulum gerekiyor mu?',
    answer:
      'Hayır. Web tabanlı çalışır; hesabınızı açıp sicillerinizi tanımladığınız anda sistem çalışmaya başlar.',
    source: 'segika.com/sgk-tesvik-programi',
  },
  {
    question: 'Mevzuat değişirse?',
    answer:
      'Güncellemeleri biz yapıyoruz. Teşvik oranları ve kanun kodları değiştiğinde sistem güncellenir, sizin bir şey yapmanız gerekmez.',
    source: 'segika.com/sgk-tesvik-programi',
  },
  {
    question: 'Denemek için ödeme yapmam gerekiyor mu?',
    answer:
      'Hayır. Ücretsiz hesap açıp kendi sicillerinizle hesaplama yapabilirsiniz; kredi kartı istenmez.',
    source: 'app.segika.com/register — ücretsiz kayıt akışı',
  },
  {
    question: 'Verilerim nasıl işleniyor?',
    /* Veri işleme bir hukuk konusu; buradan yeni taahhüt verilmiyor.
       Cevap yalnızca mevcut gizlilik politikasına yönlendiriyor. */
    answer:
      'Gizlilik politikamız hangi kişisel verinin hangi amaçla işlendiğini açıklar. Sorularınız için doğrudan bize ulaşabilirsiniz.',
    source: 'segika.com/gizlilik-politikasi',
    link: { label: 'Gizlilik politikasını okuyun', href: '/kurallar/gizlilik-politikasi/' },
  },
  {
    question: 'Birden fazla işyerim var, hepsi tek hesapta mı?',
    answer:
      'Evet. Çoklu işyeri ve çoklu sicil tek panelden yönetilir; her sicil için ayrı hesap açmanız gerekmez.',
    source: 'Segika broşürü — çoklu işyeri ve çoklu sicil yönetimi',
  },
];

/**
 * Başlangıç adımları.
 *
 * Bu üç adım zaten kapanış bölümünde düz cümle olarak yazıyordu
 * ("Hesabınızı açın, sicillerinizi tanımlayın, ilk hesaplamanızı aynı gün
 * alın"). Görünür bir adım listesine çevrildi: ziyaretçi itirazları geçtikten
 * sonra "tıklayınca ne olacak" sorusunun cevabını arıyor ve sayfa bunu
 * söylemiyordu. Yeni bir vaat eklenmedi, mevcut cümle açıldı.
 *
 * Numaralandırma burada doğru: bunlar gerçekten sıralı bir süreç.
 */
export type Step = { title: string; body: string; note: string };

export const landingSteps: Step[] = [
  {
    title: 'Ücretsiz hesabınızı açın',
    body: 'E-posta adresinizle kayıt olun. Kredi kartı istenmez, kurulum yapmanız gerekmez.',
    note: 'Yaklaşık 5 dakika',
  },
  {
    title: 'Sicillerinizi tanımlayın',
    body: 'SGK işyeri sicillerinizi sisteme girin. Çoklu işyeri tek panelden yönetilir.',
    note: 'Tek seferlik',
  },
  {
    title: 'İlk hesaplamanızı görün',
    body: 'Sistem yürürlükteki yedi teşviki personel bazında hesaplar ve en yüksek kazancı seçer.',
    note: 'Aynı gün',
  },
];
