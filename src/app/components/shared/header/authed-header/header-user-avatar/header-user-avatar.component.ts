import { MatMenuModule } from '@angular/material/menu';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MenuComponent } from '../../../menu/menu.component';
import { AuthService } from '@services/auth/auth.service';
import { UserRole } from '@models/users/user-role.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-user-avatar',
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MenuComponent,
    MatDividerModule,
    MatListModule,
  ],
  templateUrl: './header-user-avatar.component.html',
  styleUrl: './header-user-avatar.component.scss',
})
export class HeaderUserAvatarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  get user() {
    return this.authService.user;
  }

  get userName() {
    return `${this.user()?.firstName} ${this.user()?.lastName}`;
  }

  get companyName() {
    return this.user()?.role === UserRole.EMPLOYEE
      ? 'Motor Stock'
      : this.user()?.company;
  }

  public onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
