import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import dark from 'assets/dark-theme.svg';
import light from 'assets/light-theme.svg';

import Button from 'components/Button';
import useLocalStore from 'hooks/useLocalStore';
import ThemeStore from 'store/ThemeStore';

import css from './ThemeButton.module.scss';

const ThemeButton: FC = () => {
  const { theme, changeTheme } = useLocalStore<ThemeStore>(() => new ThemeStore());

  const themeImg = theme === 'dark' ? dark : light;

  return (
    <Button className={css.themeButton} onClick={changeTheme} isRound={true} isRect={true}>
      <img width={20} height={20} className={css.theme__img} src={themeImg} alt="theme" />
    </Button>
  );
};

export default observer(ThemeButton);
