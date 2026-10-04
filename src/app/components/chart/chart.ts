import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { GoldData } from '../../services/gold-data';

@Component({
  selector: 'app-chart',
  imports: [DecimalPipe],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
})
export class Chart {
  private gold = inject(GoldData);

  karats = [24, 22, 21, 18];
  selectedKarat = signal(24);

  // أبعاد الرسم
  readonly width = 600;
  readonly height = 250;
  readonly padding = 20;

  // بيانات العيار المختار (تتحدث تلقائيًا لما يتغير العيار)
  history = computed(() => this.gold.getHistory(this.selectedKarat()));

  current = computed(() => this.history()[29].price);
  previous = computed(() => this.history()[28].price);
  change = computed(() => this.current() - this.previous());
  max = computed(() => Math.max(...this.history().map((h) => h.price)));
  min = computed(() => Math.min(...this.history().map((h) => h.price)));

  // نحول الأسعار إلى نقاط (x,y) للـ Polyline
  points = computed(() => {
    const data = this.history();
    const max = this.max();
    const min = this.min();
    const range = max - min || 1;
    const usableW = this.width - this.padding * 2;
    const usableH = this.height - this.padding * 2;

    return data
      .map((item, i) => {
        // الأقدم على اليمين، واليوم على اليسار (مناسب لـ RTL)
        const x = this.width - this.padding - (i / (data.length - 1)) * usableW;
        const y = this.padding + (1 - (item.price - min) / range) * usableH;
        return `${x},${y}`;
      })
      .join(' ');
  });

  select(karat: number) {
    this.selectedKarat.set(karat);
  }
}