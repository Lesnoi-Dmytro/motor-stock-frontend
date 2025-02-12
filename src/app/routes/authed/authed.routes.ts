import type { Routes } from '@angular/router';
import { StocksComponent } from '@components/stocks/stocks.component';

export const authedRoutes: Routes = [
  {
    path: 'stocks',
    component: StocksComponent,
    title: 'Motor Stock: Stocks',
  },
];
