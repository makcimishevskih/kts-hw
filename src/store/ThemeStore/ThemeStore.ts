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
    document.documentElement.dataset.theme = this.theme === 'dark' ? 'dark' : '';
  };

  private setLocalStorageTheme = () => {
    window.localStorage.setItem('theme', this.theme);
  };

  changeTheme = () => {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.setTheme();
    this.setLocalStorageTheme();
  };

  destroy = () => {};
}

export default ThemeStore;
