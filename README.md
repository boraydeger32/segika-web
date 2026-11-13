# Segika — pazarlama sitesi

segika.com için statik frontend. Astro 7 + Tailwind CSS 4 + TypeScript (strict).
Backend, CMS veya form gönderimi yok; tüm içerik `src/data/` altındaki tip güvenli
TypeScript modüllerinden geliyor.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/
npm run audit /    # 360 / 768 / 1440'ta ekran görüntüsü + yatay taşma denetimi
npm run a11y /     # klavye, odak, mobil menü, azaltılmış hareket denetimi
npm run links      # dist/ içindeki kırık iç bağlantıları bulur (önce build)
```

## Yarışma teslimi

Kapsam: ortak **Header + Footer (master)** ve üç ayrı sayfa.

| Teslim | Adres | Amacı |
|---|---|---|
| **Master** | `src/layouts/Master.astro` | Header, Footer, font, meta, hareket sürücüsü |
| **Home** | `/` | Ürünün tamamını tanıtır, ücretsiz denemeye yönlendirir |
| **Landing** | `/tesvik-analizi/` | Tek teklif: kaçırılan teşvik. Tek CTA, dört tekrar |
| **Services** | `/hizmetler/` | Dokuz hizmetin kataloğu + yetenek matrisi + seçim rehberi |

### Üç sayfa neden birbirinin kopyası değil

Ortak tasarım dili (koyu hero, defter çizgili zemin, elektrik yeşili tek
vurgu, IBM Plex, görünür sayfa çerçevesi) üçünde de aynı — ama yapıları farklı:

| | Home | Landing | Services |
|---|---|---|---|
| Hero | Koyu + ürün sahnesi | Koyu + tek rakam | Açık, sakin |
| Omurga | 12 bölüm, geniş kapsam | problem → kanıt → itiraz → çağrı | katalog + matris |
| CTA | Deneme + teklif | Tek CTA, 4 tekrar | Matrise yönlendirme |
| Ayırt eden | Bento ızgara, işlem defteri | Temsilî hesaplama tablosu | 10×6 yetenek matrisi |

### Kabul kriterleri

| Kriter | Durum |
|---|---|
| Üç sayfa eksiksiz, ortak tasarım dili | ✓ ortak `Master.astro` |
| Masaüstü ve mobil uyum | ✓ 360 / 768 / 1440'ta taşma yok |
| Faydanın ilk bakışta anlaşılması | ✓ her sayfanın H1'i tek cümlede söylüyor |
| Sayfa amacı, hiyerarşi, CTA | ✓ yukarıdaki tabloda |
| Sayfalar birbirinin kopyası değil | ✓ farklı omurga ve düzen |
| Gerçekçi içerik, okunabilirlik, erişilebilirlik | ✓ içerik segika.com'dan; 17–19/19 denetim |
| İncelenebilir web önizlemesi | `npm run build` → `dist/` |

## Durum

Üç yarışma sayfası ve 77 iç sayfa hazır. Eksik olan tek şey elimde
olmayan görseller — hepsi işaretli yer tutucuyla duruyor.

| Faz | Durum |
|---|---|
| 0 · Keşif, URL haritası, varlık envanteri | tamam |
| 1 · İskelet, token'lar, font, Türkçe glif denetimi | tamam |
| 2 · Temel bileşenler | tamam |
| 3 · Ana sayfa (9 bölüm) | tamam |
| 4 · Erişilebilirlik ve performans geçişi | tamam — 17/17 |
| 5 · İç sayfalar | tamam — 80 sayfa, kırık bağlantı yok |
| 6 · v2 teması, hareket, dinamik ada | tamam |
| 7 · Yarışma: master + Home + Landing + Services | tamam |

### Üretilen sayfalar

78 sayfa. Mevcut segika.com'un URL haritasındaki adreslerin tamamı karşılanıyor
(aşağıdaki istisnalar hariç). Her sayfada tek `h1`, canonical ve en az 50
karakterlik meta açıklama var; `npm run links` kırık iç bağlantı bulmuyor.

| Rota | Adet | Şablon |
|---|---|---|
| `/{modül}/` | 5 | modül detayı — tam metin |
| `/program-ozellikleri/{slug}/` | 22 | içerik sayfası |
| `/sgk-isveren-rehberi/{slug}/` | 15 | içerik sayfası |
| `/sgk-tesvikleri/{slug}/` | 7 | içerik sayfası |
| `/danismanlik/{slug}/` | 3 | danışmanlık detayı — tam metin |
| `/kategori/{slug}/` | 4 | liste |
| `/konu/{slug}/` | 6 | konu hub'ı |
| `/kurallar/{slug}/` | 3 | içerik sayfası |
| tekil sayfalar | 13 | ana sayfa, fiyatlandırma, iletişim, hakkımızda, danışmanlık hub'ı, duyurular, blog, gizlilik, çerez politikası, site haritası, 404, tipografi testi |

### Kasıtlı olarak yeniden kurulmayan adresler

Üçü WordPress artığı; yeni statik sitede karşılığı yok ve olmamalı. Bunlar için
sunucu tarafında yönlendirme kurulmalı:

| Eski adres | Öneri |
|---|---|
| `/author/admin/` | `/hakkimizda/` adresine 301 |
| `/portfolio-items/` | `/kategori/program-ozellikleri/` adresine 301 |
| `/sitemap.html` | `/sitemap.html/` adresine 301 (çoğu sunucu kendiliğinden yapar) |

Kopya içerik veren iki adres korundu ama canonical ile tekilleştirildi:
`/kategori/duyurular/` → `/duyurular/`, `/gizlilik/` → `/kurallar/gizlilik-politikasi/`.
İkisi de `sitemap.xml` dışında bırakıldı.

## Tasarım sistemi

Tüm renk, tipografi ve boşluk değerleri `src/styles/global.css` içindeki `@theme`
bloğunda tanımlı. Bileşenler sabit değer yazmaz.

### Renk

Vurgu rengi logodan örneklendi: **`#2CBC63`**. Bu ton açık zeminde 2,48:1 kontrast
verdiği için metin olarak WCAG AA'yı geçemez. Bu yüzden iki role ayrıldı:

- `--color-brand` `#2CBC63` — yalnızca grafik. Logo noktası ve **koyu defter
  panelindeki rakamlar**. Koyu zeminde (`#1C1B18`) 6,96:1 verdiği için orada
  metin olarak kullanılabiliyor.
- `--color-accent` `#0C6E37` — aksiyon ve bağlantı rengi. Açık zeminde ve kendi
  üzerinde beyaz metinle 6,36:1.

Ölçülen kontrastlar: `ink` 16,2:1 · `ink-muted` 5,21:1 · `accent` 6,36:1 ·
koyu panelde `ink-subtle` 5,83:1 · koyu panelde `brand` 6,96:1. Hepsi AA üstü.

### Tipografi

IBM Plex Sans (değişken) + IBM Plex Mono, `public/fonts/` altından self-host.
`latin` ve `latin-ext` altkümeleri ayrı yükleniyor; Türkçe'nin **Ğ ğ İ ı Ş ş**
harfleri `latin-ext` aralığında, **Ü Ö Ç** ise `latin` içinde. Toplam 144 KB,
üçüncü taraf isteği yok.

Gövdede `font-variant-numeric: tabular-nums lining-nums` global olarak açık —
defter sütununun hizalanması buna bağlı.

`/tipografi-testi/` adresinde geçici bir denetim sayfası var: Türkçe glifler beş
boyutta, karıştırılması kolay harf çiftleri, tabular hizalama ve renk token'ları.
`noindex` işaretli. **Yayına almadan önce silin.**

## İmza öğe: işlem defteri

`src/components/Ledger.astro` — sayfadaki tek koyu bölüm ve tek cesur hamle.

Solda mono etiket, sağda tabular rakam. Tüm rakamlar aynı sağ kenara hizalandığı
için basamaklar üst üste bir sütun oluşturuyor; ölçek buradan okunuyor. Son satır
muhasebe defterindeki toplam gibi çift çizgiyle ayrılıyor.

Rakamların yanına orantı çubuğu **bilinçli olarak konmadı**: değerler 4.000 ile
360.000.000 arasında değişiyor, doğrusal çubukta küçükler görünmez, logaritmik
çubuk ise okuyucuyu yanıltır.

Hareket: bölüm görünür olduğunda rakamlar bir kez sayarak yükselir. Sıfırlama
yalnızca animasyon başlayacağı anda yapılır — gözlemci hiç tetiklenmezse ziyaretçi
`0` değil doğru rakamı görür. `prefers-reduced-motion` açıkken sayaç hiç çalışmaz.

## URL yapısı

Mevcut site arama trafiği aldığı için adresler korunuyor. 12 Kasım 2026'da
segika.com taranarak 80 URL haritalandı; hepsi sonunda eğik çizgiyle bitiyor
(`astro.config.mjs` → `trailingSlash: 'always'`).

Bir tutarsızlık bulundu: mevcut ana sayfadaki danışmanlık bağlantıları
`/hizmetler/...` adresine gidiyor, ama menü, footer ve sitemap `/danismanlik/...`
diyor. Burada sitemap'teki `/danismanlik/` kullanıldı.

## Eksik varlıklar

Elde olmayan hiçbir metin veya görsel uydurulmadı; yerine açıkça işaretli yer
tutucu kondu (`ScreenshotFrame` bileşeni, doğru en-boy oranında).

| Eksik | Nerede |
|---|---|
| Ürün ekran görüntüleri (hero + 6 modül) | `src/data/modules.ts` → `screenshot` |
| Modül sayfası ekran görüntüleri | `src/data/module-pages.ts` → `hero.shot`, `sections[].shot` |
| Tanıtım videosu | `src/pages/index.astro` → video bölümü |
| Fiyat ve plan bilgisi | `src/pages/program-ozellikleri/fiyatlandirma/index.astro` |
| Ofis adresi | `src/pages/iletisim/index.astro` |
| Geçmiş duyurular | `src/components/Announcements.astro` |
| 30 iç sayfanın gövde metni | `src/data/content-pages.ts` → ilgili `body` |
| Vektör logo (SVG) | `public/brand/segika-wordmark.png` 130×40 kullanılıyor |

Hepsinin yerinde **açıkça işaretli yer tutucu** var; hangi dosyadaki hangi alanın
doldurulacağı yer tutucunun üzerinde yazıyor. Metin veya görsel geldiğinde yalnızca
o alan doldurulur, düzen değişmez.

`content-pages.ts` içindeki sayfaların 18'inde gövde metni mevcut siteden
doğrulanarak alındı; kalan 30'unda başlık, açıklama ve adres doğru ama gövde
yer tutucu. Hiçbir gövde metni yazılmadı.

### Logo hakkında

`assets/logo/segika-logo-512.png` saydam **değil** — alfa kanalı var ama beyaz
zeminle dolu. Kullanılan dosya `segika-logo-130x40.png`; gerçekten saydam ama
küçük. Yüksek çözünürlüklü ekranlarda keskin durması için **SVG sürüm gerekli.**

## KVKK uyarısı

`assets/KVKK-RISKLI-GORSELLER.md` dosyasını okuyun.

Mevcut segika.com'daki ürün ekran görüntülerinin sekizi gerçek müşteri verisi
içeriyor: TC Kimlik numaraları, ad-soyad, sağlık durumu (HASTALIK / İŞ KAZASI),
ücret tutarları, müşteri firma borçları ve e-posta adresleri. Yerel kopyaları
`assets/_kvkk-riskli/` klasöründe karantinada; **yeni sitede kullanılmıyor.**
Canlı sitedeki dosyaların kaldırılması ayrı bir iş.

## Denetim araçları

`tools/audit.mjs` ve `tools/a11y.mjs` Chrome'u CDP üzerinden gerçekten sürerek
çalışır; ek bağımlılık gerektirmez.

`audit` her genişlikte tam sayfa ekran görüntüsü alır (`tools/.shots/`) ve yatay
taşmaya sebep olan öğeleri adıyla bildirir. Kendi içinde kaydırılan kapsayıcıların
çocuklarını eler, yalnızca en dıştaki suçluyu gösterir.

`a11y` başlık hiyerarşisi, alt metinleri, erişilebilir adlar, mega menünün
klavyeyle açılışı, Esc davranışı ve odak dönüşü, odak halkasının rengi, mobil
menü ve kaydırma kilidi, azaltılmış hareket davranışını kontrol eder.

## Dizin yapısı

```
src/
  data/          site · modules · module-pages · content-pages · consulting-pages
                 ledger · services · categories · topics
  components/    Container · Eyebrow · Button · Breadcrumb · PageHero
                 ScreenshotFrame · ContentPage · CallToAction · Announcements
                 Header · Footer · Ledger
  layouts/       Base.astro
  pages/         ana sayfa, dinamik rotalar, tekil sayfalar, 404
  styles/        global.css — @theme token'ları, font tanımları, temel katman
public/
  fonts/         IBM Plex woff2, latin + latin-ext
  brand/         logo, favicon
assets/          ham varlıklar ve broşür — siteye dahil değil
  _kvkk-riskli/  karantina — KVKK riskli ekran görüntüleri
tools/           audit.mjs · a11y.mjs · links.mjs
```

## Astro notu

`getStaticPaths` derleme sırasında ayrı bir parçaya çıkarılıyor; bileşen
gövdesinde tanımlanan sabitler o parçaya dahil edilmiyor. Bu yüzden rota verisi
her zaman `src/data/` altında ayrı modülde tutuluyor ve import ediliyor.
