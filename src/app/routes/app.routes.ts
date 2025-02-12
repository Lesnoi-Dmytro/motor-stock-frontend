import { Routes } from '@angular/router';
import { AuthComponent } from '@components/auth/auth.component';
import { AuthedComponent } from '@components/authed/authed.component';
import { NotFoundComponent } from '@components/not-found/not-found.component';
import { authedGuard } from '@guards/authedGuard';
import { unauthedGuard } from '@guards/unauthedGuard';
import { authedRoutes } from '@routes/authed/authed.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'stocks',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () => AuthComponent,
    loadChildren: () =>
      import('@routes/auth/auth.routes').then((m) => m.authRoutes),
    canMatch: [unauthedGuard],
  },
  {
    path: '',
    component: AuthedComponent,
    canMatch: [authedGuard],
    children: authedRoutes,
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Motor Stock: Page Not Found',
  },
];
