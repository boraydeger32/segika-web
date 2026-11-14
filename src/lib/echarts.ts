/**
 * ECharts'ın yalnızca ihtiyaç duyulan parçaları.
 *
 * Neden ayrı dosya: bileşen içinde `import('echarts/charts')` yazmak barrel
 * modülün tamamını getiriyor ve tree-shaking çalışmıyordu — ölçüm: charts
 * 259 KB + components 259 KB + coğrafya ayrıştırıcısı 245 KB, hepsi tek bir
 * yatay sütun grafiği için. Adlandırılmış **statik** içe almalar burada
 * durduğunda Vite kullanılmayanları atabiliyor; bileşen de yalnızca bu
 * dosyayı dinamik olarak çağırıyor, yani paket hâlâ tembel yükleniyor.
 *
 * Yeni bir grafik tipi gerekirse buraya eklenir, bileşene değil.
 */
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([BarChart, GridComponent, TooltipComponent, CanvasRenderer]);

export { echarts };
