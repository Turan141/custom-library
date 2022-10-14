//Core
import React from 'react';

//Components
import Item from './Item/Item';

//Styles
import styles from './List.module.scss';

export interface ListProps {
  children: React.ReactNode;
}

export interface ListInterface extends React.FC<ListProps> {
  Item: typeof Item;
}

const List: ListInterface = ({ children }) => (
  <ul className={styles.root}>
    { children }
  </ul>
);

List.Item = Item;

//Exports
export default List;
