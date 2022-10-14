// Core
import * as React from 'react';
import classNames from 'classnames';

//Components
import { P } from '@components/Typography';

// Styles
import styles from './Status.module.scss';

const StatusColorTypes = [
  'success',
  'warning',
  'danger',
  'info',
] as const;

export type StatusColorType = typeof StatusColorTypes[number];

export interface StatusProps {
  className?: string;
  color?: StatusColorType;
  icon?: React.ReactNode;
}

const Status: React.FC<StatusProps> = ({
  className,
  children,
  color = 'info',
  icon
}) => (
  <div className={classNames(styles.root, styles[color!], className)}>
    {icon}<P size='small'>{children}</P>
  </div>
);

// Exports
export default Status;
