//Imports
import React from 'react';

// Components
import { P } from '@components/Typography';

//Styles
import styles from './Item.module.scss';

//Types
export interface ListItemProps {
  title: string;
}

const Item: React.FC<ListItemProps> = ({ title, children }) => (
  <li className={styles.root}>
    <div className={styles.title}>
      <P size='medium'>
        {title}
      </P>
    </div>

    <div className={styles.content}>
      {
        React.isValidElement(children)
          ? children
          : <P size='medium'>{children}</P>
      }
    </div>
  </li>
);

//Exports
export default Item;
