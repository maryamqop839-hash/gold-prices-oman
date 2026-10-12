import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private doc = inject(DOCUMENT);

  theme = signal<Theme>(this.initialTheme());

  constructor() {
    effect(() => {
      const t = this.theme();
      this.doc.documentElement.classList.toggle('dark', t === 'dark');
      try {
        localStorage.setItem('theme', t);
      } catch {
        // الخادم (SSR) ما عنده localStorage، نتجاهل
      }
    });
  }

  toggle() {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  // نقرأ اختيار المستخدم المحفوظ، وإلا نتبع إعداد جهازه
  private initialTheme(): Theme {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch {
      // SSR
    }
    return 'light';
  }
}