import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [DatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  today = new Date();
}