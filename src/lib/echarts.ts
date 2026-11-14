/**
 * ECharts'ın yalnızca ihtiyaç duyulan parçaları.
 *
 * Neden ayrı dosya: bileşen içinde `import('echarts/charts')` yazmak barrel
 * modülün tamamını getiriyor ve tree-shaking çalışmıyordu — ölçüm: charts
 * 259 KB + components 259 KB + coğrafya ayrıştırıcısı 245 KB, hepsi tek bir
 * yatay sütun grafiği için. Adlandırılmış **statik** içe almalar burada
 * durduğunda Vite kullanılmayanları atabiliyor; bileşenler de yalnızca bu
 * dosyayı dinamik olarak çağırıyor, yani paket hâlâ tembel yükleniyor.
 *
 * Yeni bir grafik tipi gerekirse buraya eklenir, bileşene değil.
 *
 * Kayıtlı tipler ve nerede kullanıldıkları:
 *  · BarChart      — işlem hacmi, teşvik dağılımı, kişi başına, kapsama
 *  · LineChart     — on iki aylık birikim (alan dolgulu)
 *  · HeatmapChart  — yetenek matrisi
 */
import * as echarts from 'echarts/core';
import { BarChart, LineChart, HeatmapChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  BarChart,
  LineChart,
  HeatmapChart,
  GridComponent,
  TooltipComponent,
  /* Isı haritası cartesian ızgarada renk çözmek için buna ihtiyaç duyuyor;
     görünmez piecewise olarak kullanılıyor, ekranda renk çubuğu yok. */
  VisualMapComponent,
  CanvasRenderer,
]);

export { echarts };
