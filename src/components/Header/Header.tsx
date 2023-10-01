import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import logo from 'assets/logo.svg';

import Container from 'components/Container';
import LangButton from 'components/LangButton';
import Text from 'components/Text';
import ThemeButton from 'components/ThemeButton';

import { ROUTES } from 'config/routes';

import css from './Header.module.scss';

const Header: FC = () => {
  return (
    <header className={css.header}>
      <Container>
        <div className={css.nav}>
          <div className={css.nav__github}>
            <Link to={ROUTES.orgs.mask} className={css.nav__logoWrapper}>
              <img className={css.nav__logo} src={logo} alt="logo" />
            </Link>
            <Text tag="h1" view="p-20" weight="bold">
              GitHub
            </Text>
          </div>

          <div className={css.nav__switchers}>
            <LangButton />
            <ThemeButton />
          </div>
        </div>
      </Container>
    </header>
  );
};
export default observer(Header);
