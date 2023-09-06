import css from './Header.module.scss';
import right from 'assets/header.png';
import logo from 'assets/logo.svg';
import { FC } from 'react';
import Text from 'components/Text';

interface IHeaderProps {}

const Header: FC<IHeaderProps> = () => {
  return (
    <header className={css.header}>
      <div className={`${css.header__nav} container`}>
        <div className={css.header__left}>
          <div className={css.header__logoWrapper}>
            <img className={css.header__logo} src={logo} alt="logo" />
          </div>
          <Text tag="h1" view="p-20" weight="bold">
            GitHub Client
          </Text>
        </div>

        <div className={css.header__right}>
          <img className={css.header__rightImg} src={right} alt="right" />
        </div>
      </div>
    </header>
  );
};
export default Header;
