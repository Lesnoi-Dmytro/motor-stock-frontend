import { Routes } from '@angular/router';
import { AuthComponent } from '@components/auth/auth.component';
import { NotFoundComponent } from '@components/not-found/not-found.component';
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
    path: 'stocks',
    component: AuthComponent,
    canMatch: [authedGuard],
  },
  {
    path: '',
    redirectTo: 'stocks',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
