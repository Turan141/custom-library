// Core
import * as React from 'react';
import classNames from 'classnames';

// Components
import Link from '@components/Link';

// Helpers
import { useRipple } from '@helpers/useRipple';

// Styles
import styles from './Item.module.scss';

export interface SidebarItemProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  to: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  children,
  className,
  icon,
  selected,
  to,
}) => {
  const $item = React.useRef<HTMLLIElement>(null);

  useRipple($item);

  return (
    <li
      ref={$item}
      className={classNames(
        styles.root,
        { [styles.selected]: selected },
        className
      )}
    >
      <Link className={styles.link} to={to}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </Link>
    </li>
  );
}

// Exports
export default SidebarItem;
