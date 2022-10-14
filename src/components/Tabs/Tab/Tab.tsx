// Core
import React from 'react';
import classnames from 'classnames';

// Styles
import styles from './Tab.module.scss';

export interface TabsTabProps {
  disabled?: boolean;
  onClick?: (val: number) => void;
  onChange?: (val: number) => void;
  selected?: boolean;
  value: number;
  icon?: JSX.Element;
  label: any;
}

const TabsTab: React.FC<TabsTabProps> = ({
  disabled,
  icon,
  value,
  label,
  onClick,
  onChange,
  selected,
  children,
}) => {
  const $button = React.useRef<any>(null);

  const handleClick = () => {
    if (!selected && onChange) {
      onChange(value);
    }

    onClick && onClick(value);
  };

  return (
    <button
      ref={$button}
      onClick={handleClick}
      role="tab"
      type={'button'}
      disabled={disabled}
      className={classnames(
        styles.tab,
        {
          [styles.active]: selected,
          [styles.disabled]: disabled,
        }
      )}
    >
      <span>
        {icon}
        {label}
      </span>

      {children}
    </button>
  );
};

// Exports
export default TabsTab;
