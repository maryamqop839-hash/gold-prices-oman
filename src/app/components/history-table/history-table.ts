import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { GoldData } from '../../services/gold-data';
import { I18n } from '../../services/i18n';

@Component({
  selector: 'app-history-table',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './history-table.html',
  styleUrl: './history-table.css',
})
export class HistoryTable {
  i18n = inject(I18n);
  private gold = inject(GoldData);

  karats = [18, 21, 22, 24];

  // 30 يوم، وكل يوم فيه أسعار العيارات الأربعة (اليوم أول صف)
  rows = this.buildRows();
    expanded = signal(false);

  // أول 7 صفوف (اليوم + 6 أيام) أو كل الصفوف إذا انضغط الزر
  visibleRows = computed(() => (this.expanded() ? this.rows : this.rows.slice(0, 7)));

  private buildRows() {
    const byKarat = this.karats.map((k) => this.gold.getHistory(k));

    return byKarat[0]
      .map((item, i) => ({
        date: item.date,
        prices: byKarat.map((list) => list[i].price),
      }))
      .reverse();
  }
}