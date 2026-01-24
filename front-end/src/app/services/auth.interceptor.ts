import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TokenService } from './token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  if (tokenService.getToken()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${tokenService.getToken()}`
      }
    });
  }

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        console.log('token not available or expired', err.status);
        tokenService.clearToken();
        router.navigateByUrl('/dashboard');
      }
      return throwError(() => err);
    })
  );
};
