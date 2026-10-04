import { Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { GoldData } from '../../services/gold-data';

@Component({
  selector: 'app-history-table',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './history-table.html',
  styleUrl: './history-table.css',
})
export class HistoryTable {
  private gold = inject(GoldData);

  karats = [18, 21, 22, 24];

  // نجمع 30 يوم، وكل يوم فيه أسعار العيارات الأربعة
  rows = this.buildRows();

  private buildRows() {
    const byKarat = this.karats.map((k) => this.gold.getHistory(k));

    // نعكس الترتيب عشان اليوم يظهر في أول الجدول
    return byKarat[0]
      .map((item, i) => ({
        date: item.date,
        prices: byKarat.map((list) => list[i].price),
      }))
      .reverse();
  }
}