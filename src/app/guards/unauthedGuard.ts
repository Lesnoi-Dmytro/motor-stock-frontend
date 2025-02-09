import { AuthService } from '@services/auth/auth.service';
import { Router, type CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';

export const unauthedGuard: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  if (isAuthenticated) {
    router.navigate(['/']);
  }

  return !isAuthenticated;
};
