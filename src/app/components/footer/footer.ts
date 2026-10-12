import { Component, inject } from '@angular/core';
import { I18n } from '../../services/i18n';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  i18n = inject(I18n);
  year = new Date().getFullYear();
}