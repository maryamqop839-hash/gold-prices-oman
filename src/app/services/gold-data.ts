import { Injectable } from '@angular/core';

export interface KaratPrice {
  karat: number;
  price: number;
  currency: string;
  unit: string;
}

@Injectable({ providedIn: 'root' })
export class GoldData {
  // سعر الغرام عيار 24 بالريال العُماني (بيانات تجريبية)
  private readonly price24 = 48.5;

  readonly karats = [18, 21, 22, 24];

  getTodayPrices(): KaratPrice[] {
    return this.karats.map((karat) => ({
      karat,
      price: (this.price24 * karat) / 24,
      currency: 'ر.ع.',
      unit: 'للغرام',
    }));
  }

  // الدالة الجديدة: ترجع سعر الغرام لعيار واحد
  getPriceByKarat(karat: number): number {
    return (this.price24 * karat) / 24;
  }
    // يرجع أسعار آخر 30 يومًا لعيار معيّن (الأقدم أولًا، والأحدث آخر عنصر)
  getHistory(karat: number): { date: Date; price: number }[] {
    const history = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

            // karat * 0.05 يخلي لكل عيار تذبذب مختلف قليلًا
      const variation =
        Math.sin(i * 0.6 + karat * 0.05) * 1.2 + Math.cos(i * 0.25 + karat * 0.1) * 0.8;
      const price24 = this.price24 + variation;

      history.push({ date, price: (price24 * karat) / 24 });
    }
    return history;
  }
}