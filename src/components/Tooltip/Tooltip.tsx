// Core
import React from 'react';
import cn from 'classnames';

// Styles
import styles from './Tooltip.module.scss';

// Helpers
import Menu from "@components/Menu";

export interface TooltipProps {
  /**
   * Текст, отображаемый внутри tooltip
   */
  title: string;
  /**
   * оборачиваемый компонент
   */
  children: React.ReactNode;
  /**
   * className для конфигурации
   */
  className?: string
}

const Tooltip: React.FC<TooltipProps> = ({ className, title, children }) => (
  <Menu
    trigger={<div className={styles.child}>{children}</div>}
    action='hover'
    className={cn(styles.root, className)}
    position={'top' as 'top left'}
    offsetY={14}
  >
    {title}
  </Menu>
);

// Export
export default Tooltip;
