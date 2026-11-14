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

/* ------------------------------------------------------------------ */
/* Türetilmiş veriler                                                  */
/*                                                                     */
/* Buradaki hiçbir sayı yeni değil: hepsi yukarıdaki kaynaklı          */
/* rakamlardan dört işlemle çıkıyor. Türetme her kayıtta yazılı ki     */
/* okuyan "bu nereden geldi" diye sormak zorunda kalmasın.             */
/* ------------------------------------------------------------------ */

/**
 * Sicil penetrasyonu — 61.000 siciline oranla hangi otomasyonun açık olduğu.
 *
 * Defterin yalnızca üç satırı sicil birimli; notunda "…yapılan sicil" yazan
 * satırlar. Sağlık raporu (rapor), iş kazası tespiti (kaza) ve kimlik
 * bildirimi · personel (kişi) farklı birimde, bu yüzden oranlanmadı —
 * 8.000 raporu 61.000 sicile bölmek anlamsız bir yüzde üretirdi.
 */
const SICIL_TOPLAM = 61_000;

export type ShareDatum = {
  label: string;
  value: number;
  display: string;
  share: number;
  note: string;
};

export const sicilShare: ShareDatum[] = [
  { label: 'İş kazası takibi', value: 21_000, display: '21.000' },
  { label: 'Otomatik rapor onaylama', value: 16_000, display: '16.000' },
  { label: 'Kimlik bildirimi', value: 5_000, display: '5.000' },
].map((row) => ({
  ...row,
  share: Math.round((row.value / SICIL_TOPLAM) * 1000) / 10,
  note: `${row.display} / ${SICIL_TOPLAM.toLocaleString('tr-TR')} sicil`,
}));

export const sicilShareChart = {
  eyebrow: 'Kapsama',
  title: 'Altmış bir bin sicilin kaçında hangi otomasyon açık',
  body: 'Aynı panelde birden fazla otomasyon çalışabiliyor; oranlar birbirini dışlamıyor. Yalnızca sicil birimli kalemler oranlandı — rapor ve kişi sayıları farklı birimde.',
  total: SICIL_TOPLAM,
  totalDisplay: SICIL_TOPLAM.toLocaleString('tr-TR'),
  source: `segika.com ana sayfa işlem hacmi tablosu · ${ledgerIntro.period}`,
} as const;

/**
 * Çalışan başına teşvik — temsilî tablodaki tutarın kişi sayısına bölümü.
 *
 * Landing'in ana iddiası "05510 en çok çalışanı kapsıyor ama 06111 kişi
 * başına en yüksek kazancı veriyor". Şimdiye kadar bu yalnızca metinde
 * yazıyordu; grafik iddiayı gösteriyor.
 */
export const incentivePerPerson: BarDatum[] = [
  { kanun: '06111 · Genç, kadın, belge', tutar: 109_008.63, kisi: 11 },
  { kanun: '14857 · Engelli istihdamı', tutar: 33_106.46, kisi: 6 },
  { kanun: '05510 · 5 puanlık indirim', tutar: 463_828.23, kisi: 174 },
].map((row) => {
  const perPerson = Math.round(row.tutar / row.kisi);
  return {
    label: row.kanun,
    value: perPerson,
    display: perPerson.toLocaleString('tr-TR'),
    note: `${row.kisi} çalışan · toplam ${row.tutar.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺`,
  };
});

export const perPersonChart = {
  eyebrow: 'Kişi başına',
  title: 'En çok çalışanı kapsayan, en çok kazandıran değil',
  body: '05510 yüz yetmiş dört çalışanı kapsıyor ve toplamda en büyük kalem. Ama çalışan başına bakıldığında 06111 neredeyse dört katı kazandırıyor. Doğru personele doğru kodu yazmak bu yüzden önemli.',
  columns: { label: 'Kanun kodu', value: 'Çalışan başına' },
  unit: ' ₺',
  source: 'Temsilî tablodaki tutarın çalışan sayısına bölümü',
} as const;

/**
 * On iki aylık birikim — temsilî aylık toplamın yıla yayılmış hâli.
 *
 * Tek varsayım var ve açıkça yazılı: kadro ve teşvik kompozisyonu sabit
 * kalıyor. Gerçek hayatta değişir; sayfa bunu "temsilî" diye işaretliyor.
 */
const AYLIK_TOPLAM = 605_943.32;
const AYLAR = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

export const cumulativeYear = AYLAR.map((ay, i) => {
  const total = AYLIK_TOPLAM * (i + 1);
  return {
    label: ay,
    value: Math.round(total),
    display: Math.round(total).toLocaleString('tr-TR'),
  };
});

export const cumulativeChart = {
  eyebrow: 'Yıllık ölçek',
  title: 'Aynı kadroyla on iki ayın sonunda',
  body: 'Yukarıdaki aylık toplam değişmeden sürerse yıl sonunda biriken tutar. Kadro ve teşvik kompozisyonunun sabit kaldığı varsayılmıştır.',
  unit: ' ₺',
  totalDisplay: Math.round(AYLIK_TOPLAM * 12).toLocaleString('tr-TR'),
  monthlyDisplay: AYLIK_TOPLAM.toLocaleString('tr-TR', { minimumFractionDigits: 2 }),
  source: 'Temsilî aylık toplamın on iki aya yayılması',
} as const;
