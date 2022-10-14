// Core
import * as React from 'react';
import classNames from 'classnames';

// Components
import Item, { NavigationItemProps } from './Item';

// Helpers
import { useRouter } from '@helpers/useRouter';

// Styles
import styles from './Navigation.module.scss';

export interface NavigationProps {
  children: React.ReactNode;
  className?: string;
}

export interface NavigationInterface extends React.FC<NavigationProps> {
  Item: typeof Item;
}

const Navigation: NavigationInterface = ({ children, className }) => {
  const { match } = useRouter();

  return (
    <ul className={classNames(styles.root, className)}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<NavigationItemProps>(child)) {
          return child;
        }

        const isSelected = match.path === child.props.to;

        return React.cloneElement<NavigationItemProps>(child, {
          className: classNames(styles.item, child.props.className),
          selected: isSelected,
        });
      })}
    </ul>
  );
};

Navigation.Item = Item;

// Exports
export default Navigation;
