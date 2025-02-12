import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '@services/theme/theme.service';
import { MenuComponent } from '../../../menu/menu.component';

@Component({
  selector: 'app-theme-menu',
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    TitleCasePipe,
    MenuComponent,
  ],
  templateUrl: './theme-menu.component.html',
  styleUrl: './theme-menu.component.scss',
})
export class ThemeMenuComponent {
  private readonly themeService = inject(ThemeService);

  public get theme() {
    return this.themeService.theme;
  }
  public get themeIcon() {
    return this.themeService.themeIcon;
  }
  public get themes() {
    return ThemeService.themes;
  }

  public OnThemeChange(theme: 'light' | 'dark' | 'system') {
    this.themeService.setTheme(theme);
  }
}
