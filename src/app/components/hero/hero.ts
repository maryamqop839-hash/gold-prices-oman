import { Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { GoldData } from '../../services/gold-data';
import { I18n } from '../../services/i18n';

@Component({
  selector: 'app-hero',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  i18n = inject(I18n);
  private gold = inject(GoldData);

  today = new Date();
  price24 = this.gold.getPriceByKarat(24);
}