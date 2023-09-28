import { action, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'hooks/useLocalStore';

type Theme = 'light' | 'dark';

class ThemeStore implements ILocalStore {
  theme: Theme = 'dark';

  constructor() {
    makeObservable(this, {
      theme: observable,
      changeTheme: action,
    });

    this.setTheme();
  }

  private setTheme = () => {
    this.theme === 'dark'
      ? (document.documentElement.dataset.theme = 'dark')
      : (document.documentElement.dataset.theme = '');
  };

  changeTheme = () => {
    this.theme === 'light' ? (this.theme = 'dark') : (this.theme = 'light');
    this.setTheme();
  };

  destroy = () => {};
}

export default ThemeStore;
