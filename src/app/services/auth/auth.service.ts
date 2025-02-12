import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { IAuthUser } from '@models/auth/auth-user.model';
import type { CustomJwtPayload } from '@models/auth/jwt-payload.model';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  public token = signal<string | null>(null);
  public user = signal<IAuthUser | null | undefined>(undefined);

  constructor() {
    this.initUser();
  }

  private initUser() {
    this.token.set(localStorage.getItem('token'));
    this.decodeUser();
  }

  public isAuthenticated() {
    if (this.user() === undefined) {
      this.decodeUser();
    }

    return !!this.user();
  }

  public signIn(email: string, password: string) {
    return this.http
      .post<{ token: string }>('api/auth/sign_in', {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.token.set(response.token);
          this.decodeUser();
          localStorage.setItem('token', response.token);
        })
      );
  }

  public isEmailAvailable(email: string) {
    return this.http.post<{ available: boolean }>('api/auth/email/available', {
      email,
    });
  }

  public logout() {
    localStorage.removeItem('token');
    this.user.set(null);
    this.token.set(null);
  }

  private decodeUser() {
    if (!this.token()) {
      this.user.set(null);
      return;
    }

    try {
      const payload = jwtDecode(this.token()!) as CustomJwtPayload;
      const expired = !payload.exp || payload.exp < Date.now() / 1000;

      if (!expired) {
        this.user.set({
          id: payload.sub,
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
          color: payload.color,
          role: payload.role,
          company: payload.company,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
