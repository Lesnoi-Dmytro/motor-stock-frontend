import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ThemeMenuComponent } from '@components/shared/theme-menu/theme-menu.component';

@Component({
  selector: 'app-header',
  imports: [MatCardModule, MatIconModule, ThemeMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
