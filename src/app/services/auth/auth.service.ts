import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private token = signal<string | null>(localStorage.getItem('token'));
  public user = computed(() => this.token()?.split('.')[1]);

  public isAuthenticated() {
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
    this.token.set(null);
  }
}
