import type { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('api')) {
    return next(req);
  }

  const apiReq = req.clone({
    url: `${environment.apiUrl}/${req.url}`,
    withCredentials: true,
    setHeaders: {
      'Content-Type': req.headers.has('Content-Type')
        ? req.headers.get('Content-Type')!
        : 'application/json',
    },
  });

  return next(apiReq);
};
