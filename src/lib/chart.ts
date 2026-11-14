/**
 * Grafik veri tipi.
 *
 * `.astro` dosyasındaki tipi içe almak derleyici ayarına göre kırılgan;
 * hem veri modülü hem bileşen bunu buradan alıyor.
 */
export type BarDatum = {
  label: string;
  value: number;
  /** Ekranda görünen biçim — Türkçe binlik ayracı nokta. */
  display: string;
  /** İpucu ve yedek tablo için açıklama. */
  note?: string;
};
