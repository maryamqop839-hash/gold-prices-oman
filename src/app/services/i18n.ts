import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

export type Lang = 'ar' | 'en';

const DICT: Record<Lang, Record<string, string>> = {
  ar: {
    // الهيدر
    'brand': 'الذهب العُماني',
    'nav.prices': 'الأسعار',
    'nav.calculator': 'حاسبة الذهب',
    'nav.chart': 'تغير الأسعار',
    'badge.demo': 'بيانات تجريبية',

    // الـ Hero
    'hero.home': 'الرئيسية',
    'hero.crumb': 'أسعار الذهب في عُمان',
    'hero.badge': 'تحديث يومي',
    'hero.title1': 'لوحة متابعة',
    'hero.title2': 'أسعار الذهب في عُمان',
    'hero.desc': 'تابعي أسعار الذهب لعيارات 18 و21 و22 و24 قيراط، واحسبي قيمة الذهب حسب الوزن، وشاهدي تغير الأسعار خلال آخر 30 يومًا.',
    'hero.cta1': 'شاهدي الأسعار',
    'hero.cta2': 'جرّبي الحاسبة',
    'hero.live': 'عيار 24 اليوم',
    'hero.perGram': 'للغرام الواحد',
    'hero.updated': 'آخر تحديث',
    'hero.market': 'السوق',
    'hero.marketVal': 'مسقط، سلطنة عُمان',
    'hero.currency': 'العملة',
    'hero.currencyVal': 'ريال عُماني (OMR)',
    'unit.omr': 'ر.ع.',

    // الأسعار
    'prices.title': 'أسعار الذهب اليوم',
    'prices.desc': 'أسعار الغرام الواحد حسب العيار بالريال العُماني.',
    'prices.karat': 'عيار',
    'prices.purity': 'النقاء',
    'prices.best': 'الأعلى نقاءً',

        // الحاسبة
    'calc.title': 'حاسبة الذهب',
    'calc.desc': 'اختاري العيار وأدخلي الوزن لتقدير القيمة الإجمالية.',
    'calc.karat': 'العيار',
    'calc.weight': 'الوزن',
    'calc.gram': 'غرام',
    'calc.placeholder': 'مثال: 10',
    'calc.quick': 'أوزان سريعة',
    'calc.button': 'احسب',
    'calc.result': 'القيمة الإجمالية التقديرية',
    'calc.empty': 'اختاري العيار وأدخلي الوزن ثم اضغطي «احسب».',
    'calc.error': 'من فضلك أدخلي وزنًا أكبر من صفر.',
    'calc.note': 'القيمة تقديرية بناءً على بيانات تجريبية.',

        // الرسم البياني
    'chart.title': 'تغير الأسعار خلال آخر 30 يومًا',
    'chart.desc': 'اختاري العيار لعرض حركة سعره، وحرّكي المؤشر فوق الرسم لرؤية سعر كل يوم.',
    'chart.current': 'السعر الحالي',
    'chart.high': 'أعلى سعر',
    'chart.low': 'أقل سعر',
    'chart.previous': 'السعر السابق',
    'chart.change': 'مقدار التغير',

        // الجدول
    'table.title': 'سجل الأسعار',
    'table.desc': 'أسعار الغرام لآخر 30 يومًا بالريال العُماني.',
    'table.date': 'التاريخ',
    'table.k': 'قيراط',
    'table.today': 'اليوم',
    'table.more': 'عرض كل الـ 30 يومًا',
    'table.less': 'عرض أقل',

    // الفوتر
    'footer.desc': 'لوحة متابعة أسعار الذهب في سلطنة عُمان - مسقط',
    'footer.links': 'روابط سريعة',
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.note': 'الأسعار المعروضة بيانات تجريبية لأغراض التدريب فقط.',


  },
  en: {
    // Header
    'brand': 'Omani Gold',
    'nav.prices': 'Prices',
    'nav.calculator': 'Calculator',
    'nav.chart': 'Price Trend',
    'badge.demo': 'Demo data',

    // Hero
    'hero.home': 'Home',
    'hero.crumb': 'Gold prices in Oman',
    'hero.badge': 'Updated daily',
    'hero.title1': 'Gold price tracker',
    'hero.title2': 'for the Sultanate of Oman',
    'hero.desc': 'Follow gold prices for 18, 21, 22 and 24 karat, estimate the value by weight, and watch how prices moved over the last 30 days.',
    'hero.cta1': 'View prices',
    'hero.cta2': 'Try the calculator',
    'hero.live': '24K today',
    'hero.perGram': 'per gram',
    'hero.updated': 'Last update',
    'hero.market': 'Market',
    'hero.marketVal': 'Muscat, Oman',
    'hero.currency': 'Currency',
    'hero.currencyVal': 'Omani Rial (OMR)',
    'unit.omr': 'OMR',

    // Prices
    'prices.title': "Today's gold prices",
    'prices.desc': 'Price per gram by karat, in Omani Rial.',
    'prices.karat': 'Karat',
    'prices.purity': 'Purity',
    'prices.best': 'Highest purity',
    
        // Calculator
    'calc.title': 'Gold calculator',
    'calc.desc': 'Pick the karat and enter the weight to estimate the total value.',
    'calc.karat': 'Karat',
    'calc.weight': 'Weight',
    'calc.gram': 'g',
    'calc.placeholder': 'e.g. 10',
    'calc.quick': 'Quick weights',
    'calc.button': 'Calculate',
    'calc.result': 'Estimated total value',
    'calc.empty': 'Pick a karat, enter the weight, then press "Calculate".',
    'calc.error': 'Please enter a weight greater than zero.',
    'calc.note': 'Estimate based on demo data.',

        // Chart
    'chart.title': 'Price trend over the last 30 days',
    'chart.desc': 'Pick a karat to see its trend, and hover over the chart to see each day\'s price.',
    'chart.current': 'Current price',
    'chart.high': 'Highest price',
    'chart.low': 'Lowest price',
    'chart.previous': 'Previous price',
    'chart.change': 'Change',

        // Table
    'table.title': 'Price history',
    'table.desc': 'Price per gram for the last 30 days, in Omani Rial.',
    'table.date': 'Date',
    'table.k': 'Karat',
    'table.today': 'Today',
    'table.more': 'Show all 30 days',
    'table.less': 'Show less',

    // Footer
    'footer.desc': 'Gold price tracker for the Sultanate of Oman - Muscat',
    'footer.links': 'Quick links',
    'footer.rights': 'All rights reserved',
    'footer.note': 'Prices shown are demo data for training purposes only.',
  },
};

@Injectable({ providedIn: 'root' })
export class I18n {
  private doc = inject(DOCUMENT);

  lang = signal<Lang>('ar');
  dir = computed(() => (this.lang() === 'ar' ? 'rtl' : 'ltr'));

  constructor() {
    effect(() => {
      this.doc.documentElement.lang = this.lang();
      this.doc.documentElement.dir = this.dir();
    });
  }

  t(key: string): string {
    return DICT[this.lang()][key] ?? key;
  }

  toggle() {
    this.lang.update((l) => (l === 'ar' ? 'en' : 'ar'));
  }
}