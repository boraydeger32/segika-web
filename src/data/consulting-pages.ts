/**
 * Danışmanlık hizmeti detay sayfaları.
 * Hizmet kalemlerinin tamamı segika.com ana sayfasındaki listelerden birebir alındı.
 */

import type { IconName } from '../lib/icons';

export type ConsultingPage = {
  slug: string;
  /** Çizgi ikon — bkz. src/lib/icons.ts */
  icon: IconName;
  index: string;
  name: string;
  headline: string;
  intro: string;
  seo: { title: string; description: string };
  /** Hizmet kalemleri — sitedeki tam liste. */
  items: string[];
  /** Bu hizmetin kime hitap ettiğini anlatan kısa not. */
  audience: string;
};

export const consultingPages: ConsultingPage[] = [
  {
    slug: 'is-ve-sosyal-guvenlik-hukuku-danismanligi',
    icon: 'terazi',
    index: '01',
    name: 'İş ve Sosyal Güvenlik Hukuku Danışmanlığı',
    headline: 'Riski dava açılmadan önce görün.',
    intro:
      'Hukuki danışmanlıkla iş sözleşmelerinden denetim süreçlerine, fesih ve ihtar uygulamalarından SGK uyuşmazlıklarına kadar riskleri önceden tespit eder, süreci birlikte yönetiriz.',
    seo: {
      title: 'İş ve Sosyal Güvenlik Hukuku Danışmanlığı — Segika',
      description:
        'İş sözleşmelerinden denetim süreçlerine, fesih ve ihtar uygulamalarından SGK uyuşmazlıklarına kadar riskleri önceden tespit eden iş ve sosyal güvenlik hukuku danışmanlığı.',
    },
    audience:
      'Denetim, fesih veya uyuşmazlık süreci yaşayan ya da bu riskleri baştan azaltmak isteyen işverenler için.',
    items: [
      'İş Hukuku Uyuşmazlık Danışmanlığı',
      'Fesih ve İhtar Süreçleri Danışmanlığı',
      'Disiplin Süreçleri ve Kurul Danışmanlığı',
      'İş Sözleşmesi Tasarımı ve Revizyonu Danışmanlığı',
      'Alt İşverenlik ve Hizmet Alımı Danışmanlığı',
      'Toplu İş Sözleşmesi ve Sendika Süreçleri',
      'Sosyal Güvenlik Uyuşmazlıkları Danışmanlığı',
      'İşe İade Davaları ve Süreç Yönetimi Danışmanlığı',
      'Denetim ve Teftiş Süreçleri Danışmanlığı',
      'İşyeri Uygulama Yönetmelikleri ve İç Mevzuat Danışmanlığı',
      'İş Mahkemesi ve Arabuluculuk Süreçleri Danışmanlığı',
    ],
  },
  {
    slug: 'insan-kaynaklari-yonetimi',
    icon: 'ekip',
    index: '02',
    name: 'İnsan Kaynakları Yönetimi',
    headline: 'İK’yı kurumsal bir sisteme dönüştürün.',
    intro:
      'Organizasyon yapısından ücret sistemine, performans değerlendirmeden İK süreçlerinin dijitalleştirilmesine kadar kurumsal İK altyapısını kurar, mevcut yapıyı mevzuata uyumlu hâle getiririz.',
    seo: {
      title: 'İnsan Kaynakları Yönetimi Danışmanlığı — Segika',
      description:
        'Organizasyon yapısı, ücret ve yan haklar, performans değerlendirme, İK politikaları ve mevzuat uyumu için insan kaynakları yönetimi danışmanlığı.',
    },
    audience:
      'İK fonksiyonunu kuran, büyüyen ya da mevcut yapısını mevzuata uyumlu hâle getirmek isteyen şirketler için.',
    items: [
      'Organizasyon Yapısı ve Kadro Planlama Danışmanlığı',
      'İş Analizi ve Görev Tanımı Danışmanlığı',
      'Ücret ve Yan Haklar Yönetimi Danışmanlığı',
      'Performans Değerlendirme Sistemi Danışmanlığı',
      'Kariyer ve Yetenek Yönetimi Danışmanlığı',
      'Eğitim ve Gelişim Planlama Danışmanlığı',
      'İşe Alım ve Seçme Yerleştirme Danışmanlığı',
      'Oryantasyon ve İşe Uyum Programı Danışmanlığı',
      'Çalışan Bağlılığı ve Motivasyon Danışmanlığı',
      'İK Politikaları ve Yönetmelik Geliştirme Danışmanlığı',
      'İK Süreçlerinin Dijitalleştirilmesi Danışmanlığı',
      'İK Denetimi ve Mevzuat Uyum Danışmanlığı',
      'İnsan Kaynakları Raporlama ve Analitik Danışmanlığı',
      'Kriz Dönemi İK Yönetimi ve Yeniden Yapılanma Danışmanlığı',
      'İşyeri Psikoloğu ve Psikososyal Destek Sistemleri Danışmanlığı',
      'İşveren Markası',
    ],
  },
  {
    slug: 'personel-bulma-ve-ise-alim',
    icon: 'ise-alim',
    index: '03',
    name: 'Personel Bulma ve İşe Alım',
    headline: 'Doğru adayı, doğru süreçle bulun.',
    intro:
      'Personel bulma ve işe alım danışmanlığı hizmetlerimiz; şirketinizin kültürüne, ihtiyaçlarına ve sektörel dinamiklerine uygun nitelikli insan kaynağını bulmayı hedefler.',
    seo: {
      title: 'Personel Bulma ve İşe Alım Danışmanlığı — Segika',
      description:
        'Mavi yakadan üst düzey yönetime, aday havuzu oluşturmadan psikometrik değerlendirmeye kadar personel bulma ve işe alım danışmanlığı.',
    },
    audience:
      'Mavi yaka, beyaz yaka veya üst düzey pozisyonlar için nitelikli aday arayan işletmeler için.',
    items: [
      'İşe Alım Stratejisi Danışmanlığı',
      'Pozisyon Profili ve İş Tanımı Oluşturma Danışmanlığı',
      'Aday Kaynakları ve Havuz Oluşturma Danışmanlığı',
      'Mavi Yaka İşe Alım Danışmanlığı',
      'Beyaz Yaka İşe Alım Danışmanlığı',
      'Üst Düzey (Executive) Seçim Danışmanlığı',
      'Mülakat ve Değerlendirme Süreci Danışmanlığı',
      'Psikometrik ve Kişilik Envanteri Danışmanlığı',
      'Dijital ve Yapay Zekâ Destekli İşe Alım Danışmanlığı',
      'Çeşitlilik ve Kapsayıcılık (Diversity Hiring) Danışmanlığı',
      'Sektörel İşe Alım Danışmanlığı',
      'Geçici Personel ve Proje Bazlı İşgücü Danışmanlığı',
      'Yetenek Avcılığı (Headhunting) Danışmanlığı',
      'İşe Alım Süreci Denetim ve İyileştirme Danışmanlığı',
    ],
  },
];

export const findConsultingPage = (slug: string) => consultingPages.find((p) => p.slug === slug);
