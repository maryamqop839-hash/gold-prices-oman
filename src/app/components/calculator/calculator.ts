import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { GoldData } from '../../services/gold-data';

@Component({
  selector: 'app-calculator',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
})
export class Calculator {
  private gold = inject(GoldData);

  karats = this.gold.karats;
  selectedKarat = 21;
  weight: number | null = null;

  result = signal<number | null>(null);

  calculate() {
    if (this.weight && this.weight > 0) {
      this.result.set(this.gold.getPriceByKarat(this.selectedKarat) * this.weight);
    }
  }
}