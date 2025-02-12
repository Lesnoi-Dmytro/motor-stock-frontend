import { Component, inject } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '@services/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', hideRequiredMarker: true },
    },
  ],
  host: {
    class: 'main_layout',
  },
})
export class AppComponent {
  private readonly themeService = inject(ThemeService);
}
