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

  public setTheme(theme: 'light' | 'dark' | 'system') {
    this.appTheme.set(theme);
  }

  constructor() {
    const matchPreferedTheme = (e: MediaQueryListEvent) => {
      this.setDarkTheme(e.matches);
    };
    const matcher = window.matchMedia('(prefers-color-scheme: dark)');

    effect(() => {
      const colorSheme = this.appTheme();
      localStorage.setItem('theme', this.appTheme());

      if (colorSheme === 'system') {
        this.setDarkTheme(matcher.matches);
        matcher.addEventListener('change', matchPreferedTheme);
      } else {
        this.setDarkTheme(colorSheme === 'dark');
        matcher.removeEventListener('change', matchPreferedTheme);
      }
    });
  }

  private setDarkTheme(dark: boolean) {
    if (dark) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }
}

interface ThemeInfo {
  name: 'light' | 'dark' | 'system';
  icon: string;
}
