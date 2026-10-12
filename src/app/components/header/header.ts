import { Component, inject } from '@angular/core';
import { I18n } from '../../services/i18n';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  i18n = inject(I18n);
  theme = inject(ThemeService);
}