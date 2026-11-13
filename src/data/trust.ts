/**
 * Güven sinyalleri — entegrasyonlar ve sektörler.
 *
 * Her iki liste de segika.com'dan birebir alındı (12 Kasım 2026):
 *  · Entegrasyonlar → /duyurular/
 *  · Sektörler      → /program-ozellikleri/sektorler/
 *
 * Sahte müşteri yorumu ya da uydurma logo duvarı bilinçli olarak yok:
 * doğrulanamayan sosyal kanıt, kazandırdığından çok güven kaybettirir.
 * Yerine gerçek ve doğrulanabilir iki şey kondu — hangi yazılımlarla
 * konuştuğu ve hangi sektörlere hizmet verdiği.
 */

/**
 * Bordro yazılımı entegrasyonları.
 *
 * Kaynak cümle (/duyurular/, birebir): "SGK Otomasyon yazılımımız, Luca,
 * Logo, Mikro ve Eta gibi yaygın bordro programlarıyla tam entegrasyon
 * sunarken; web API altyapısı sayesinde tüm diğer yazılımlarınıza da
 * sorunsuz bağlanır."
 */
export const integrations = {
  claim: 'Mevcut bordro programınızı değiştirmenize gerek yok',
  body: 'Luca, Logo, Mikro ve Eta ile tam entegrasyon; web API altyapısı sayesinde diğer yazılımlarınıza da bağlanır.',
  /** Adı geçen programlar. Logo dosyası gelirse `logo` alanı eklenir. */
  names: ['Luca', 'Logo', 'Mikro', 'Eta'],
  /** Listede olmayanlar için kapanış öğesi. */
  fallback: 'Web API',
} as const;

/**
 * Hizmet verilen sektörler — /program-ozellikleri/sektorler/ sayfasındaki
 * tam liste, sayfadaki sırayla.
 */
export const sectors = [
  'İmalat ve Ağır Sanayi',
  'Tekstil ve Konfeksiyon',
  'İnşaat',
  'Perakende',
  'Bilişim ve Teknoloji',
  'Özel Hastaneler ve Tıp Merkezleri',
  'Oteller ve Konaklama',
  'Restoranlar ve Kafeler',
  'Özel Öğretim ve Eğitim',
  'Özel Güvenlik, Temizlik ve Resepsiyon',
  'Mali Müşavirler',
  'İnsan Kaynakları Danışmanları',
] as const;

/** Sektör bölümünün girişi. İkinci cümle sektorler sayfasından. */
export const sectorsIntro = {
  eyebrow: 'Kimler kullanıyor',
  title: 'Her ay 20.000’den fazla firma, on iki sektörde.',
  body: 'Ölçeğine bakılmaksızın şartları sağlayan tüm özel sektör işletmeleri SGK teşviklerinden faydalanabilir. Mali müşavir ofislerinden ağır sanayiye kadar aynı panel.',
} as const;
