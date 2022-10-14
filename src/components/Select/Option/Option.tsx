// Core
import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './Option.module.scss';

export interface SelectOptionProps {
  selected?: boolean;
  disabled?: boolean;
  value: string | number;
  label: string;
  onClick?: (value: string | number, label: string) => void;
  key?: string | number;
  style?: React.CSSProperties;
  className?: string;
}

const Option: React.FC<SelectOptionProps> = ({
  value,
  disabled,
  label,
  selected,
  onClick,
  key,
  style,
  className,
}) => {
  const handleClick = React.useCallback(() => {
    if (!disabled) {
      onClick && onClick(value, label);
    }
  }, [disabled]);

  return (
    <li
      className={classNames(styles.root, className, {
        [styles.selected]: selected,
        [styles.disabled]: disabled,
      })}
      onClick={handleClick}
      key={key}
      style={style}
    >
      {label}
    </li>
  );
};

// Exports
export default Option;
