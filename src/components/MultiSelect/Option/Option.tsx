// Core
import React from 'react';
import classNames from 'classnames';

// Components
import Checkbox from '@components/Checkbox';

// Styles
import styles from './Options.module.scss';

export interface OptionProps {
  onClick?: (value: string) => void;
  disabled?: boolean;
  value: string | number;
  label: string;
  selectedValues?: string[];
  register?: (value: string, label: string) => void;
}

const Option: React.FC<OptionProps> = ({
  label,
  value,
  onClick: onClickProp,
  disabled,
  selectedValues,
  register,
}) => {
  const onClick = React.useCallback(() => {
    !disabled && onClickProp?.(value as string);
  }, [disabled]);

  const selected = React.useMemo(() => (
    selectedValues?.includes(value as string)
  ), [selectedValues, value]);

  React.useEffect(() => {
    register && register(value as string, label);
  }, [])

  return (
    <Checkbox
      className={classNames(
        styles.option,
        {
          [styles.selected]: selected,
          [styles.disabled]: disabled
        },
      )}
      label={label}
      name={value as string}
      onChange={onClick}
      disabled={disabled}
      defaultChecked={selected}
    />
  )
};

// Exports
export default Option;

