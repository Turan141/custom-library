// Core
import * as React from 'react';
import classNames from 'classnames';

// Styles
import styles from './Item.module.scss';

interface MenuItemProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  isLink?: boolean;
  isDownload?: string;
  href?: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  className,
  icon,
  isLink,
  isDownload,
  href,
  onClick,
}) => (
  <li className={classNames(styles.root, className)} onClick={onClick}>
    {isLink
        ? <a href={href} className={styles.link} download={isDownload}>{icon}</a>
        : <span className={styles.icon}>{icon}</span>
    }
    {children}
  </li>
);

// Exports
export default MenuItem;
