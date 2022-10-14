// Core
import React from 'react';
import cn from 'classnames';

// Styles
import styles from './TablePreloader.module.scss';

export interface TablePreloaderProps {
  rows?: number;
  columns?: number;
  className?: string;
}

const TablePreloader: React.FC<TablePreloaderProps> = ({ className, columns = 7, rows = 7 }) => {
  const row = React.useMemo(() => {
    const columnsArray = Array(columns).fill(1);

    return (
      <div className={styles.row}>
        {columnsArray.map((_, i) =>
          <div className={styles.col} key={i}>
            <span className={styles.placeholder}/>
          </div>
        )}
      </div>
    )
  }, [columns])

  const table = React.useMemo(() => Array(rows).fill(1).map(() => row), [rows])

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.animation} />

      <div className={styles.table}>
        {table}
      </div>
    </div>
  );
};

export default React.memo(TablePreloader);
