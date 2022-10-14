// Core
import * as React from 'react';
import classNames from 'classnames';

// Components
import Item, { SidebarItemProps } from './Item';

// Helpers
import { useRouter } from '@helpers/useRouter';

// Styles
import styles from './Sidebar.module.scss';

export interface SidebarProps {
    children: React.ReactNode;
    className?: string;
}

export interface SidebarInterface extends React.FC<SidebarProps> {
    Item: typeof Item;
}

const Sidebar: SidebarInterface = ({ children, className }) => {
    const { pathname } = useRouter();

    return (
        <ul className={classNames(styles.root, className)}>
            {React.Children.map(children, (child) => {
                if (!React.isValidElement<SidebarItemProps>(child)) {
                    return child;
                }

                return React.cloneElement<SidebarItemProps>(child, {
                    className: classNames(styles.item, child.props.className),
                    selected: pathname === child.props.to,
                });
            })}
        </ul>
    );
};

Sidebar.Item = Item;

// Exports
export default Sidebar;
