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
            <Link to={ROUTES.orgs.mask}>
              <img width="32" height="32" src={logo} alt="logo" />
            </Link>
            <Text tag="h1" view="p-18" weight="bold">
              GitHub Explorer
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
