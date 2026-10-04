import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Prices } from './components/prices/prices';
import { Calculator } from './components/calculator/calculator';
import { Chart } from './components/chart/chart';
import { HistoryTable } from './components/history-table/history-table';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
imports: [Header, Hero, Prices, Calculator, Chart, HistoryTable, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}