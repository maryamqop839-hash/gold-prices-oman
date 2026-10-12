import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { GoldData } from '../../services/gold-data';
import { I18n } from '../../services/i18n';

interface CalcResult {
  total: number;
  perGram: number;
  karat: number;
  weight: number;
}

@Component({
  selector: 'app-calculator',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
})
export class Calculator {
  i18n = inject(I18n);
  private gold = inject(GoldData);

  karats = this.gold.karats;
  quickWeights = [5, 10, 20, 50];

  selectedKarat = signal(21);
  weight = signal<number | null>(null);

  result = signal<CalcResult | null>(null);
  error = signal(false);

  calculate() {
    const w = this.weight();
    if (w && w > 0) {
      const karat = this.selectedKarat();
      const perGram = this.gold.getPriceByKarat(karat);
      this.result.set({ total: perGram * w, perGram, karat, weight: w });
      this.error.set(false);
    } else {
      this.result.set(null);
      this.error.set(true);
    }
  }
}