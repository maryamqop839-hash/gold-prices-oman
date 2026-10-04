import { Component, inject } from '@angular/core';
import { GoldData } from '../../services/gold-data';
import { PriceCard } from '../price-card/price-card';

@Component({
  selector: 'app-prices',
  imports: [PriceCard],
  templateUrl: './prices.html',
  styleUrl: './prices.css',
})
export class Prices {
  prices = inject(GoldData).getTodayPrices();
}