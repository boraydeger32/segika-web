/**
 * Grafik verileri.
 *
 * Kural: hiçbir grafik için yeni sayı üretilmedi. İki veri kümesi var ve
 * ikisi de zaten sitede kullanılan, kaynaklı rakamlardan geliyor:
 *
 *  1. `automationVolume` — işlem defterinin "Otomatik işlemler" grubu.
 *     Birebir `ledger.ts`'ten türetiliyor, elle kopyalanmıyor; defter
 *     güncellenince grafik de güncelleniyor.
 *
 *  2. `incentiveMix` — Landing'deki temsilî hesaplama tablosunun aynısı.
 *     "Temsilî" olarak işaretli ve öyle kalmalı.
 *
 * `ledger.ts` içindeki tasarım notu çubuk grafiği reddediyordu; sebebi
 * değerlerin 4.000 ile 360.000.000 arasında değişmesiydi — o aralıkta
 * doğrusal çubukta küçükler görünmez. Burada çubuk kullanılabiliyor çünkü
 * yalnızca tek grup grafiğe giriyor: 4.000–21.000, beş katlık bir aralık.
 * Toplam (360M) grafiğe sokulmuyor, defterdeki tek rakam olarak kalıyor.
 */

import type { BarDatum } from '../lib/chart';
import { ledgerGroups, ledgerIntro } from './ledger';

/** Defterin "Otomatik işlemler" grubu — grafiğe giren tek grup. */
const automationGroup = ledgerGroups.find((g) => g.caption === 'Otomatik işlemler');

if (!automationGroup) {
  /* Defter yeniden düzenlenirse sessizce boş grafik basmak yerine burada dursun. */
  throw new Error('ledger.ts içinde "Otomatik işlemler" grubu bulunamadı — charts.ts güncellenmeli.');
}

export const automationVolume: BarDatum[] = automationGroup.rows
  /* Büyükten küçüğe: okuyucu ilk satırda en ağır yükü görüyor. */
  .slice()
  .sort((a, b) => b.value - a.value)
  .map((row) => ({
    label: row.label,
    value: row.value,
    display: row.display,
    note: row.note,
  }));

export const automationChart = {
  eyebrow: 'Yük dağılımı',
  title: 'Otomatik işlemler nereye gidiyor',
  body: 'Altı işlem türünün aylık hacmi. Yükün ağırlığı iş kazası takibi ve otomatik onaylamada; sağlık raporu onayı ve kimlik bildirimi bunun yanında daha küçük kalemler.',
  columns: { label: 'İşlem türü', value: 'Aylık hacim' },
  unit: '+',
  source: `segika.com ana sayfa işlem hacmi tablosu · ${ledgerIntro.period}`,
} as const;

/**
 * Temsilî teşvik dağılımı — Landing'deki hesaplama tablosunun grafiği.
 *
 * Tutarlar `tesvik-analizi` sayfasındaki `sample` tablosuyla aynı olmalı.
 * Kanun kodları gerçek; tutarlar temsilî ve grafikte de öyle işaretli.
 */
export const incentiveMix: BarDatum[] = [
  {
    label: '05510 · 5 puanlık indirim',
    value: 463828,
    display: '463.828',
    note: '174 çalışan — en geniş kapsamlı teşvik',
  },
  {
    label: '06111 · Genç, kadın, belge',
    value: 109009,
    display: '109.009',
    note: '11 çalışan — kişi başı kazancı en yüksek olan',
  },
  {
    label: '14857 · Engelli istihdamı',
    value: 33106,
    display: '33.106',
    note: '6 çalışan — işveren hissesinin tamamı',
  },
];

export const incentiveChart = {
  eyebrow: 'Dağılım',
  title: '191 çalışanlı bir işletmede teşvik nasıl dağılıyor',
  body: 'Aynı ay içinde üç ayrı kanun kodu birlikte çalışıyor. 05510 en çok çalışanı kapsıyor ama 06111 kişi başına en yüksek kazancı veriyor — hangisinin hangi personele uygulanacağı her ay değişiyor.',
  columns: { label: 'Kanun kodu', value: 'Aylık teşvik' },
  unit: ' ₺',
  source: 'Ürün ekranındaki gerçek kanun kodlarıyla kurgulanmış temsilî hesap',
} as const;
