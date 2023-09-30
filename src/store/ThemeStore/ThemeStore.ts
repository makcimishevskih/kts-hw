import { action, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'hooks/useLocalStore';

export type Theme = 'light' | 'dark';

class ThemeStore implements ILocalStore {
  theme: Theme = 'light';

  constructor() {
    makeObservable(this, {
      theme: observable,
      changeTheme: action,
    });

    this.setTheme();
    this.setLocalStorageTheme();
  }

  private setTheme = () => {
    this.theme === 'dark'
      ? (document.documentElement.dataset.theme = 'dark')
      : (document.documentElement.dataset.theme = '');
  };

  changeTheme = () => {
    this.theme === 'light' ? (this.theme = 'dark') : (this.theme = 'light');
    this.setTheme();
    this.setLocalStorageTheme();
  };

  private setLocalStorageTheme = () => {
    window.localStorage.setItem('theme', this.theme);
  };

  destroy = () => {};
}

export default ThemeStore;
