import type { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  {
    if (!req.url.startsWith('api')) {
      return next(req);
    }

    const apiReq = req.clone({
      url: `http://localhost:3000/${req.url}`,
      withCredentials: true,
      setHeaders: {
        'Content-Type': req.headers.has('Content-Type')
          ? req.headers.get('Content-Type')!
          : 'application/json',
      },
    });

    return next(apiReq);
  }
};
