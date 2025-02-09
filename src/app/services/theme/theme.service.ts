import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public static readonly themes: ThemeInfo[] = [
    { name: 'light', icon: 'light_mode' },
    { name: 'dark', icon: 'dark_mode' },
    { name: 'system', icon: 'brightness_medium' },
  ];

  public appTheme = signal<'light' | 'dark' | 'system'>(
    (localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null) ||
      'system'
  );

  public themeIcon = computed(() => {
    return (
      ThemeService.themes.find(
        (themeIcon) => themeIcon.name === this.appTheme()
      )?.icon || 'brightness_medium'
    );
  });

  public get theme() {
    return this.appTheme.asReadonly();
  }

  constructor() {
    effect(() => {
      const colorSheme =
        this.appTheme() === 'system' ? 'light dark' : this.appTheme();
      document.documentElement.style.colorScheme = colorSheme;
      localStorage.setItem('theme', this.appTheme());
    });
  }

  public setTheme(theme: 'light' | 'dark' | 'system') {
    this.appTheme.set(theme);
  }
}

interface ThemeInfo {
  name: 'light' | 'dark' | 'system';
  icon: string;
}
