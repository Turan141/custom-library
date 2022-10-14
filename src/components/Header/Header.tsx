// Core
import * as React from 'react';
import classNames from 'classnames';

// Components
import Link from '@components/Link';
import Navigation from '@components/Navigation';
import { LinkProps } from "@components/Layout/Layout";

// Assets
import Logo from '@assets/images/logo_white.svg';

// Styles
import styles from './Header.module.scss';

export interface HeaderProps {
  className?: string;
  navigation: LinkProps[],
  menu?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ className, navigation, menu }) => {
  return (
    <header className={classNames(styles.root, className)}>
      <Link className={styles.logo} to='#'>
        <Logo />
      </Link>

      <Navigation className={styles.navigation}>
        {navigation && navigation.map((item) => (
          <Navigation.Item key={item.id} to={item.to}>{item.title}</Navigation.Item>
        ))}
      </Navigation>

      { menu }

    </header>
  );
}

// Exports
export default React.memo(Header);
