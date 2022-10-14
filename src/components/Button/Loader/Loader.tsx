// Core
import * as React from 'react';
import classNames from 'classnames';

// Styles
import styles from './Loader.module.scss';

export interface ButtonLoaderProps {
  className?: string;
}

const ButtonLoader: React.FC<ButtonLoaderProps> = ({ className }) => (
  <div className={classNames(styles.root, className)}>
    <div className={styles.item} />
    <div className={styles.item} />
    <div className={styles.item} />
  </div>
);

// Exports
export default ButtonLoader;
