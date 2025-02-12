import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../header.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-authed-header',
  imports: [
    HeaderComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './authed-header.component.html',
  styleUrl: './authed-header.component.scss',
})
export class AuthedHeaderComponent {
  public searchLoading = signal<boolean>(false);
}
