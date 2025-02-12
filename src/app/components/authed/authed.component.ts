import { Component } from '@angular/core';
import { AuthedHeaderComponent } from '../shared/header/authed-header/authed-header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authed',
  imports: [AuthedHeaderComponent, RouterOutlet],
  templateUrl: './authed.component.html',
  styleUrl: './authed.component.scss',
  host: {
    class: 'main_layout',
  },
})
export class AuthedComponent {}
