// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
/**
 * GitHub Pages proje sayfasında site alt yolda servis edilir
 * (ör. kullanici.github.io/segika-web/). Derleme iş akışı BASE_PATH'i
 * ayarlıyor; yerelde boş kalır ve site kökte çalışır.
 */
const base = process.env.BASE_PATH ?? '/';
const site = process.env.BASE_PATH
  ? `https://${process.env.GITHUB_REPOSITORY_OWNER ?? 'user'}.github.io`
  : 'https://www.segika.com';

export default defineConfig({
  site,
  base,

  // Mevcut site her URL'yi sonunda eğik çizgiyle sunuyor
  // (ör. /sgk-tesvik-programi/). Arama trafiğini kaybetmemek için korunuyor.
  trailingSlash: 'always',

  build: {
    format: 'directory',
    // Varsayılan '_astro' yerine: alt çizgiyle başlayan yollar bazı statik
    // barındırma ortamlarında rezerve ve reddediliyor.
    assets: 'assets',
  },

  // Geliştirme araç çubuğu kapalı: ekran görüntüsüyle kendi işimi
  // denetlerken sayfanın üstüne binip tasarımı gizliyor.
  devToolbar: { enabled: false },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      // Dışarıda bırakılanlar:
      //  · tipografi-testi → geçici denetim sayfası, noindex
      //  · kategori/duyurular ve gizlilik → başka adrese canonical veren kopyalar
      filter: (page) =>
        !/\/(tipografi-testi|kategori\/duyurular|gizlilik)\/$/.test(page),
    }),
  ],
});