import { Component, inject } from '@angular/core';
import { GoldData } from '../../services/gold-data';
import { I18n } from '../../services/i18n';
import { PriceCard } from '../price-card/price-card';

@Component({
  selector: 'app-prices',
  imports: [PriceCard],
  templateUrl: './prices.html',
  styleUrl: './prices.css',
})
export class Prices {
  i18n = inject(I18n);
  prices = inject(GoldData).getTodayPrices();
}