/**
 * Kategori listeleme sayfaları.
 *
 * Mevcut sitedeki /kategori/… adresleri korunuyor; bunlar menüde ve ekmek
 * kırıntılarında hub olarak kullanılıyor.
 *
 * Not: bu veri bilinçli olarak ayrı bir modülde. Astro `getStaticPaths`'i
 * derleme sırasında ayrı bir parçaya çıkarıyor; bileşen gövdesinde tanımlanan
 * sabitler o parçaya dahil edilmediği için import edilmesi gerekiyor.
 */

import { featurePages, guidePages, incentivePages } from './content-pages';
import { modulePages } from './module-pages';
import { consultingPages } from './consulting-pages';

export type CategoryEntry = { title: string; description: string; href: string };

export type Category = {
  slug: string;
  label: string;
  headline: string;
  intro: string;
  seoDescription: string;
  groups: { caption: string; entries: CategoryEntry[] }[];
};

export const categories: Category[] = [
  {
    slug: 'program-ozellikleri',
    label: 'Program Özellikleri',
    headline: 'SGK süreçlerinin tamamı,|tek panelde.',
    intro:
      'Teşvik hesaplamadan sağlık raporu onayına, kimlik bildiriminden işkur çizelgesine kadar Segika’nın yaptığı her iş.',
    seoDescription:
      'Segika SGK otomasyon yazılımının tüm program özellikleri: teşvik hesaplama, vizite, kimlik bildirimi, işkur bildirimi, SGK araçları ve İK araçları.',
    groups: [
      {
        caption: 'Programlar',
        entries: modulePages.map((m) => ({
          title: m.name,
          description: m.intro,
          href: `/${m.slug}/`,
        })),
      },
      {
        caption: 'Özellikler',
        entries: featurePages.map((p) => ({
          title: p.title,
          description: p.description,
          href: `/program-ozellikleri/${p.slug}/`,
        })),
      },
    ],
  },
  {
    slug: 'sgk-isveren-rehberi',
    label: 'SGK İşveren Rehberi',
    headline: 'Yükümlülükleri bilmek,|cezadan ucuzdur.',
    intro:
      'İşverenin SGK karşısındaki sorumlulukları, denetim süreçleri ve idari para cezaları hakkında bilmeniz gerekenler.',
    seoDescription:
      'SGK İşveren Rehberi: işveren yükümlülükleri, iş yeri denetimi, idari para cezaları ve SGK kontrol listesi.',
    groups: [
      {
        caption: 'Rehber konuları',
        entries: guidePages.map((p) => ({
          title: p.title,
          description: p.description,
          href: `/sgk-isveren-rehberi/${p.slug}/`,
        })),
      },
    ],
  },
  {
    slug: 'sgk-tesvikleri',
    label: 'SGK Teşvikleri',
    headline: 'Hangi teşvikten|yararlanabilirsiniz?',
    intro:
      'Yürürlükteki SGK teşvikleri, kapsamları ve kimlerin yararlanabileceği. Segika bunların tamamını otomatik hesaplar.',
    seoDescription:
      'Yürürlükteki SGK teşvikleri: 6111, 3294, 2828, 14857, 5746, 6322 ve 5510 sayılı teşviklerin kapsamı.',
    groups: [
      {
        caption: 'Teşvikler',
        entries: incentivePages.map((p) => ({
          title: p.title,
          description: p.description,
          href: `/sgk-tesvikleri/${p.slug}/`,
        })),
      },
    ],
  },
  {
    slug: 'danismanlik',
    label: 'Danışmanlık',
    headline: 'Yazılımın çözmediği yerde|uzman desteği.',
    intro:
      'İş ve sosyal güvenlik hukuku, insan kaynakları yönetimi ve işe alım konularında danışmanlık hizmetlerimiz.',
    seoDescription:
      'Segika danışmanlık hizmetleri: İş ve Sosyal Güvenlik Hukuku, İnsan Kaynakları Yönetimi, Personel Bulma ve İşe Alım.',
    groups: [
      {
        caption: 'Hizmetler',
        entries: consultingPages.map((p) => ({
          title: p.name,
          description: p.intro,
          href: `/danismanlik/${p.slug}/`,
        })),
      },
    ],
  },
];
