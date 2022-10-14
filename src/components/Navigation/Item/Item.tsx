// Core
import * as React from 'react';
import classNames from 'classnames';

// Components
import Link from '@components/Link';

// Helpers
import { useRipple } from '@helpers/useRipple';

// Styles
import styles from './Item.module.scss';

export interface NavigationItemProps {
  children: string;
  className?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  to?: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  children,
  className,
  selected,
  disabled,
  onClick,
  to,
}) => {
  const $item = React.useRef<HTMLLIElement>(null);

  useRipple($item);

  return (
    <li
      ref={$item}
      className={classNames(
        styles.root,
        {
          [styles.selected]: selected,
          [styles.disabled]: disabled,
        },
        className,
      )}
      onClick={onClick}
    >
      <Link className={styles.link} to={to!}>
        {children}
      </Link>
    </li>
  );
}

// Exports
export default NavigationItem;
