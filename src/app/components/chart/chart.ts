import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { GoldData } from '../../services/gold-data';
import { I18n } from '../../services/i18n';

@Component({
  selector: 'app-chart',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
})
export class Chart {
  i18n = inject(I18n);
  private gold = inject(GoldData);

  karats = [24, 22, 21, 18];
  selectedKarat = signal(24);
  hovered = signal<number | null>(null); // رقم النقطة تحت المؤشر

  // أبعاد الرسم
  readonly W = 1000;
  readonly H = 300;
  readonly padX = 20;
  readonly padTop = 24;
  readonly padBottom = 24;

  // خطوط الشبكة الأفقية
  gridLines = [0, 1, 2, 3].map(
    (i) => this.padTop + (i * (this.H - this.padTop - this.padBottom)) / 3
  );

  // البيانات (تتحدث لما يتغير العيار)
  history = computed(() => this.gold.getHistory(this.selectedKarat()));

  current = computed(() => this.history().at(-1)!.price);
  previous = computed(() => this.history().at(-2)!.price);
  change = computed(() => this.current() - this.previous());
  changePct = computed(() => (this.change() / this.previous()) * 100);
  max = computed(() => Math.max(...this.history().map((h) => h.price)));
  min = computed(() => Math.min(...this.history().map((h) => h.price)));

  firstDate = computed(() => this.history()[0].date);
  lastDate = computed(() => this.history().at(-1)!.date);

  // نحول كل سعر إلى نقطة (x, y). الاتجاه يعتمد على اللغة
  points = computed(() => {
    const data = this.history();
    const max = this.max();
    const min = this.min();
    const range = max - min || 1;
    const rtl = this.i18n.dir() === 'rtl';
    const usableW = this.W - this.padX * 2;
    const usableH = this.H - this.padTop - this.padBottom;
    const last = data.length - 1;

    return data.map((d, i) => {
      const ratio = i / last;
      const x = rtl
        ? this.W - this.padX - ratio * usableW // عربي: الأقدم يمين
        : this.padX + ratio * usableW; //          إنجليزي: الأقدم يسار
      const y = this.padTop + (1 - (d.price - min) / range) * usableH;
      return { x, y, price: d.price, date: d.date };
    });
  });

  // مسار الخط، ومسار التعبئة (الخط + إغلاقه من الأسفل)
  linePath = computed(() =>
    this.points().map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  );

  areaPath = computed(() => {
    const p = this.points();
    const base = this.H - this.padBottom;
    return `${this.linePath()} L${p[p.length - 1].x},${base} L${p[0].x},${base} Z`;
  });

  // النقطة المعروضة: تحت المؤشر، وإذا ما في مؤشر فاليوم (آخر نقطة)
  active = computed(() => {
    const p = this.points();
    return p[this.hovered() ?? p.length - 1];
  });

  // عرض المنطقة التفاعلية لكل نقطة
  step = computed(() => (this.W - this.padX * 2) / (this.history().length - 1));

  select(karat: number) {
    this.selectedKarat.set(karat);
    this.hovered.set(null);
  }
}