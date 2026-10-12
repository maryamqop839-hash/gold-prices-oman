import { Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { KaratPrice } from '../../services/gold-data';
import { I18n } from '../../services/i18n';

@Component({
  selector: 'app-price-card',
  imports: [DecimalPipe],
  templateUrl: './price-card.html',
  styleUrl: './price-card.css',
})
export class PriceCard {
  i18n = inject(I18n);

  data = input.required<KaratPrice>();
  featured = input(false); // اختياري: البطاقة المميزة

  // نسبة النقاء: عيار 18 = 75%، عيار 24 = 100%
  purity = computed(() => (this.data().karat / 24) * 100);
}