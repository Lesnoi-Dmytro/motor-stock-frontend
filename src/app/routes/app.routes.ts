import { Routes } from '@angular/router';
import { AuthComponent } from '@components/auth/auth.component';
import { authedGuard } from '@guards/authedGuard';
import { unauthedGuard } from '@guards/unauthedGuard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => AuthComponent,
    loadChildren: () =>
      import('@routes/auth/auth.routes').then((m) => m.authRoutes),
    canMatch: [unauthedGuard],
  },
  {
    path: 'test',
    component: AuthComponent,
    canMatch: [authedGuard],
  },
  {
    path: '**',
    component: AuthComponent,
  },
];
