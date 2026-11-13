/**
 * Sıkça sorulan sorular.
 *
 * Her cevap segika.com'dan ya da Segika broşüründen doğrulanabilen bilgiye
 * dayanıyor; `source` alanı dayanağı gösterir. Doğrulanamayan hiçbir iddia
 * (süre taahhüdü, fiyat rakamı, sertifika, SLA) yazılmadı.
 *
 * `needsConfirm: true` işaretli olanlar: ifade doğru ama Segika tarafından
 * teyit edilirse daha güçlü olur ya da detay eklenebilir.
 */

export type FaqItem = {
  q: string;
  a: string;
  /** Cevabın dayandığı kaynak — bakım sırasında doğrulanabilsin diye. */
  source: string;
  needsConfirm?: boolean;
};

export const faqIntro = {
  eyebrow: 'Sık sorulanlar',
  title: 'Karar vermeden önce sorulanlar',
  body: 'Aradığınızı bulamazsanız doğrudan arayın; aynı gün cevaplıyoruz.',
} as const;

export const faq: FaqItem[] = [
  {
    q: 'Mevcut bordro programımla birlikte çalışır mı?',
    a: 'Evet. Luca, Logo, Mikro ve Eta ile tam entegrasyon var; web API altyapısı sayesinde bu listede olmayan yazılımlara da bağlanır. Mevcut düzeninizi değiştirmenize gerek yok — Segika verileri SGK’dan kendisi çeker, bordro programınız olduğu gibi kalır.',
    source: 'segika.com/duyurular',
  },
  {
    q: 'Kurulum gerekiyor mu, ne kadar sürer?',
    a: 'Kurulum yok. Segika web tabanlı çalışır; hesabınızı açıp SGK sicillerinizi tanımladığınız anda sistem çalışmaya başlar. Bilgisayarınıza program yüklemeniz ya da sunucu kurmanız gerekmez.',
    source: 'app.segika.com — web tabanlı panel',
  },
  {
    q: 'Mevzuat değişirse ne oluyor?',
    a: 'Güncellemeleri biz yapıyoruz. Teşvik oranları, kanun kodları ve bildirim kuralları değiştiğinde sistem güncellenir; sizin bir şey yapmanız ya da yeni sürüm yüklemeniz gerekmez. Sistem her zaman günceldir.',
    source: 'segika.com/sgk-tesvik-programi — “her zaman günceldir”',
  },
  {
    q: 'Hangi teşvikleri hesaplıyor?',
    a: 'Yürürlükteki SGK teşviklerinin tamamı: 6111 (genç, kadın ve mesleki belge sahibi istihdamı), 3294 (sosyal yardım alanların istihdamı), 2828, 14857 (engelli istihdamı), 5746 (Ar-Ge ve tasarım), 6322 (yatırım teşvikleri) ve 5510 (5 puanlık indirim). Program hangisinin daha avantajlı olduğunu hesaplayıp en yüksek teşviki seçer.',
    source: 'segika.com/kategori/sgk-tesvikleri',
  },
  {
    q: 'Sağlık raporu onayı için SMS onayı gerekiyor mu?',
    a: 'Hayır. Sağlık raporu otomasyon sistemi, SMS onay sürecine gerek kalmadan tüm SGK sağlık raporlarını otomatik olarak onaylar. Her ay 8.000’den fazla sağlık raporu bu şekilde işleniyor.',
    source: 'segika.com/sgk-vizite-programi',
  },
  {
    q: 'Birden fazla işyerim ve sicilim var, hepsi tek yerden yönetilebilir mi?',
    a: 'Evet, sistem zaten bunun için kurulu. Tüm sicilleriniz tek panelde toplanır; teşvik hesaplama, borç sorgulama, hizmet listesi ve bildirimler işyeri bazında ya da toplu olarak yapılabilir. Şu an 20.000’den fazla firmanın 61.000’den fazla sicili bu şekilde yönetiliyor.',
    source: 'segika.com — aylık işlem hacmi',
  },
  {
    q: 'İş kazası bildirimini kaçırırsam ne olur?',
    a: 'SGK’ya 3 iş günü içinde yapılması gereken iş kazası bildirimi, unutulduğunda veya geciktiğinde ağır idari para cezası doğurur. Segika bu süreci sizin yerinize takip eder ve bildirim zamanı geldiğinde e-posta ile uyarır.',
    source: 'segika.com/sgk-vizite-programi',
  },
  {
    q: 'Kimlik bildirimi Emniyet’e mi Jandarma’ya mı gidiyor?',
    a: 'İşyerinizin bulunduğu bölgeye göre otomatik belirlenir: kentsel alandaki işletmeler için Emniyet, kırsal alandaki işletmeler için Jandarma. Siz ayrıca bir seçim yapmak zorunda değilsiniz, sistem doğru birime yönlendirir.',
    source: 'Segika broşürü — Otomatik Kimlik Bildirimi',
  },
  {
    q: 'Fiyat nasıl belirleniyor?',
    a: 'Tek bir liste fiyatı yok; plan, kullandığınız modüllere ve takip edilecek sicil sayısına göre belirleniyor. Sicil ve çalışan sayınızı iletin, size uygun planı birlikte belirleyelim. Karar vermeden önce ücretsiz deneme hesabıyla sistemi kendi verinizle görebilirsiniz.',
    source: 'segika.com/program-ozellikleri/fiyatlandirma',
    needsConfirm: true,
  },
  {
    q: 'Destek alabiliyor muyum?',
    a: 'Sınırsız sistem desteği planın içinde. Telefon, WhatsApp ve e-posta ile ulaşabilirsiniz; ayrıca panel üzerinden destek talebi açabilirsiniz.',
    source: 'segika.com/sgk-tesvik-programi — “sınırsız sistem desteği”',
    needsConfirm: true,
  },
];
