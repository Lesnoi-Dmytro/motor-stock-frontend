import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@components/shared/header/header.component';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  host: {
    class: 'main_layout',
  },
})
export class AuthComponent {}
