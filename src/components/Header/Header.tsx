import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import user from 'assets/header.png';
import logo from 'assets/logo.svg';
import Button from 'components/Button';
import Container from 'components/Container';
import Text from 'components/Text';
import useLocalStore from 'hooks/useLocalStore';
import ThemeStore from 'store/ThemeStore';
import css from './Header.module.scss';

interface IHeaderProps {}

const Header: FC<IHeaderProps> = () => {
  const { changeTheme } = useLocalStore<ThemeStore>(() => new ThemeStore());

  // useEffect(() => {
  // if (theme === 'dark') {
  //   document.documentElement.dataset.theme = 'dark';
  // } else {
  //   document.documentElement.dataset.theme = '';
  // }
  // }, [theme]);

  return (
    <header className={css.header}>
      <Container>
        <div className={css.nav}>
          <div className={css.nav__left}>
            <Link to="/" className={css.nav__logoWrapper}>
              <img className={css.nav__logo} src={logo} alt="logo" />
            </Link>
            <Text tag="h1" view="p-20" weight="bold">
              GitHub Client
            </Text>
          </div>

          <div className={css.nav__right}>
            <Button onClick={changeTheme}>Theme Switcher</Button>
            <Link to="/" className={css.nav__logoWrapper}>
              <img className={css.nav__userLogo} src={user} alt="user" />
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};
export default observer(Header);
