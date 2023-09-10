import { FC } from 'react';
import { Link } from 'react-router-dom';
import user from 'assets/header.png';
import logo from 'assets/logo.svg';
import Text from 'components/Text';
import css from './Header.module.scss';

interface IHeaderProps {}

const Header: FC<IHeaderProps> = () => {
  return (
    <header className={css.header}>
      <div className={`${css.header__nav} container`}>
        <div className={css.header__left}>
          
          <Link to="/" className={css.header__logoWrapper}>
            <img className={css.header__logo} src={logo} alt="logo" />
          </Link>
          <Text tag="h1" view="p-20" weight="bold">
            GitHub Client
          </Text>
        </div>

        <div className={css.header__right}>
          {/* Go to some */}
          <Link to="/" className={css.header__logoWrapper}>
            <img className={css.header__user} src={user} alt="user" />
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
