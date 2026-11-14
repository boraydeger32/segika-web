/**
 * Çizgi ikon seti — yol verisi ve ad listesi.
 *
 * Neden hazır bir kütüphane değil: Lucide/Heroicons gibi setler her yerde
 * aynı göründüğü için sayfa "şablon" hissi veriyor — brifingin kaçınılacaklar
 * listesinde bu madde var. Emoji ikon da aynı sebeple yasak.
 *
 * Çizim kuralları (hepsi aynı olmalı, yoksa set dağılır):
 *  · 24×24 ızgara, 1.5px kalınlık, yuvarlak uç ve köşe
 *  · 2px güvenli kenar boşluğu — gövde 2..22 arasında kalır
 *  · Yalnızca `stroke="currentColor"`; dolgu yok. Renk metinden miras alınır
 *
 * Veri burada, `.ts` içinde duruyor: tipi `.astro` dosyasından içe almak
 * derleyici ayarına göre kırılgan — veri modülü her zaman çözülüyor.
 */

export type IconName =
  // modüller
  | 'tesvik'
  | 'vizite'
  | 'kaza'
  | 'kimlik'
  | 'iskur'
  | 'araclar'
  // değer önerileri
  | 'saat'
  | 'kalkan'
  | 'yenile'
  | 'baglanti'
  | 'katman'
  | 'destek'
  | 'kilit'
  | 'rapor'
  // danışmanlık
  | 'terazi'
  | 'ekip'
  | 'ise-alim'
  // yardımcı
  | 'onay'
  | 'ok'
  | 'uyari';

/**
 * Yol verileri. Her kayıt bir dizi — çoklu yollar ayrı `<path>` olur ki
 * kesişimlerde uç yuvarlaması doğru çalışsın.
 */
export const iconPaths: Record<IconName, string[]> = {
  /* Teşvik — belge üstünde yüzde işareti. Kazanç değil oran anlatıyor. */
  tesvik: [
    'M5 3.5h9l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z',
    'M14 3.5v5h5',
    'M9.75 13h.01M14.25 17h.01',
    'M14.75 12.75 9.25 17.25',
  ],
  /* Vizite — sağlık raporu: belge + nabız çizgisi.
     Artı işareti denendi, "yeni belge" gibi okunuyordu. */
  vizite: [
    'M5 3.5h9l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z',
    'M14 3.5v5h5',
    'M7.5 15h2L11 12.25 13 17l1.5-2h2',
  ],
  /* İş kazası — uyarı üçgeni, köşeleri yumuşak */
  kaza: ['M12 3.5 21 19.5a1 1 0 0 1-.87 1.5H3.87A1 1 0 0 1 3 19.5L12 3.5Z', 'M12 9.5v5M12 17.5h.01'],
  /* Kimlik bildirimi — kimlik kartı */
  kimlik: [
    'M3.5 5.5h17a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z',
    'M9 11.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z',
    'M6 15.5c.5-1.6 1.6-2.4 3-2.4s2.5.8 3 2.4',
    'M14.5 10h4M14.5 13.5h4',
  ],
  /* İşkur — çizelge: çerçeve içinde sütunlar */
  iskur: [
    'M3.5 3.5h17a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z',
    'M2.5 8h19',
    'M7.5 16.5v-4M12 16.5v-6M16.5 16.5v-2.5',
  ],
  /* Araçlar — tek panelde çok araç: 2×2 ızgara, biri vurgulu */
  araclar: [
    'M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6z',
    'M13.5 13.5h6v6h-6z',
    'M15.3 16.5h2.4M16.5 15.3v2.4',
  ],
  /* Zaman kazancı */
  saat: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v5l3.5 2'],
  /* Yasal risk — kalkan + onay */
  kalkan: ['M12 2.75 20 5.5v6c0 4.6-3.2 8.3-8 9.75-4.8-1.45-8-5.15-8-9.75v-6l8-2.75Z', 'M8.75 11.75 11.25 14.25 15.5 10'],
  /* Mevzuat güncelliği — dönen ok */
  yenile: [
    'M20.5 12a8.5 8.5 0 1 1-2.6-6.1',
    'M20.75 3.75v4.5h-4.5',
  ],
  /* Entegrasyon — iki halka kenetli */
  baglanti: [
    'M10 14 14 10',
    'M8.5 11.5 6.8 13.2a3.25 3.25 0 0 0 4.6 4.6l1.7-1.7',
    'M15.5 12.5l1.7-1.7a3.25 3.25 0 0 0-4.6-4.6l-1.7 1.7',
  ],
  /* Çoklu sicil — katmanlar */
  katman: [
    'M12 3 21 7.5 12 12 3 7.5 12 3Z',
    'M3 12.25 12 16.75l9-4.5',
    'M3 16.75 12 21.25l9-4.5',
  ],
  /* Destek — kulaklık */
  destek: [
    'M4 14.5v-2.5a8 8 0 0 1 16 0v2.5',
    'M4 13.5h1.5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1.5 1.5 0 0 1-1.5-1.5v-2A1.5 1.5 0 0 1 4 13.5Z',
    'M20 13.5h-1.5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1H20a1.5 1.5 0 0 0 1.5-1.5v-2a1.5 1.5 0 0 0-1.5-1.5Z',
  ],
  /* Veri güvenliği — kilit */
  kilit: [
    'M5.5 10.5h13a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z',
    'M8 10.5V7.5a4 4 0 0 1 8 0v3',
    'M12 14.5v2.5',
  ],
  /* Rapor — indirilebilir belge */
  rapor: [
    'M5 3.5h9l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z',
    'M14 3.5v5h5',
    'M12 11.5v6M9.25 14.75 12 17.5l2.75-2.75',
  ],
  /* Hukuk — terazi */
  terazi: [
    'M12 4v15.5M7.5 20h9',
    'M4.5 7.5h15',
    'M4.5 7.5 2.25 13h4.5L4.5 7.5ZM19.5 7.5 17.25 13h4.5L19.5 7.5Z',
  ],
  /* İK yönetimi — ekip */
  ekip: [
    'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
    'M2.5 19.5c.6-3.3 3-5 6.5-5s5.9 1.7 6.5 5',
    'M16 5.75a3 3 0 0 1 0 5.5',
    'M17.5 14.9c2 .6 3.3 2.1 3.8 4.6',
  ],
  /* İşe alım — aday arama */
  'ise-alim': [
    'M10.5 13a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5Z',
    'M3 20.5c.4-2.6 1.9-4.3 4.3-5',
    'M16.25 20a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z',
    'M18.7 19.2 21.25 21.5',
  ],
  onay: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M8.25 12.25 11 15l4.75-5.5'],
  ok: ['M4 12h15', 'M14 7l5 5-5 5'],
  uyari: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7.5v5.5M12 16.5h.01'],
};
