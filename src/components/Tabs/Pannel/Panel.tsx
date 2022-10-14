// Core
import * as React from 'react';
import classNames from 'classnames';

// Styles
import styles from './Panel.module.scss';

export interface TabsPanelProps {
  className?: string;
  value: any;
  index: any;
}

const TabsPanel: React.FC<TabsPanelProps> = ({
  children,
  className,
  value,
  index,
}) => {
  const visible = value === index;

  return (
    <>
      {visible && (
        <div className={classNames(styles.root, className)}>
          {children}
        </div>
      )}
    </>
  );
};

// Exports
export default TabsPanel;
