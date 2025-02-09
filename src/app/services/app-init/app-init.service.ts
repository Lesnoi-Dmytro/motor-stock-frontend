import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);

  initializeApp() {
    this.iconRegistry.addSvgIcon(
      'logo',
      this.sanitizer.bypassSecurityTrustResourceUrl('logo.svg')
    );
  }
}
