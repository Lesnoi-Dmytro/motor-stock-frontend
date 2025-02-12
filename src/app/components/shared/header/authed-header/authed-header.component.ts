import { Component } from '@angular/core';
import { HeaderComponent } from '../header.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { HeaderSearchComponent } from './header-search/header-search.component';
import { HeaderUserAvatarComponent } from './header-user-avatar/header-user-avatar.component';

@Component({
  selector: 'app-authed-header',
  imports: [
    HeaderComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    HeaderSearchComponent,
    HeaderUserAvatarComponent,
  ],
  templateUrl: './authed-header.component.html',
  styleUrl: './authed-header.component.scss',
})
export class AuthedHeaderComponent {}
