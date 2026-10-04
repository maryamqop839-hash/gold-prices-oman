import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { KaratPrice } from '../../services/gold-data';

@Component({
  selector: 'app-price-card',
  imports: [DecimalPipe],
  templateUrl: './price-card.html',
  styleUrl: './price-card.css',
})
export class PriceCard {
  data = input.required<KaratPrice>();
}