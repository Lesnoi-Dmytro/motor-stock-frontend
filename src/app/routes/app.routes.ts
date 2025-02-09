import { Routes } from '@angular/router';
import { AuthComponent } from '@components/auth/auth.component';
import { authRoutes } from '@routes/auth/auth.routes';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => authRoutes,
  },
];
