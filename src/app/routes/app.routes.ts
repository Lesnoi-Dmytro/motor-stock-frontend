import { Routes } from '@angular/router';
import { AuthComponent } from '@components/auth/auth.component';
import { authedGuard } from '@guards/authedGuard';
import { unauthedGuard } from '@guards/unauthedGuard';
import { authRoutes } from '@routes/auth/auth.routes';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => authRoutes,
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
