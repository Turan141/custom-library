// Core
import React from 'react';
import cn from 'classnames';
// Components
import { P } from '@components/Typography';

// Styles
import styles from './Chip.module.scss';
import Icon from "@components/Icons";

interface ChipProps {
  value: string;
  onRemove: (value: string) => void;
  label: string;
  disabled?: boolean;
  notDeletable: boolean;
}

const Chip: React.FC<ChipProps> = ({ value, onRemove, label, disabled = false, notDeletable = false }) => (
  <span className={cn(styles.root, {
    [styles.disabled]: disabled
  })}>
    <P size='medium'> {label} </P>
    {!notDeletable && <span className={styles.close} onClick={onRemove.bind(null, value)}> <Icon name='close' /> </span>}
  </span>
);

export default Chip;
