// Core
import React from 'react';
import classNames from 'classnames';

// Helpers
import withReduxForm from '@helpers/withReduxForm';

// Styles
import styles from './Checkbox.module.scss';
import Icon from '@components/Icons';

// Types
export interface CheckboxProps {
  /**
   * className для кастомизации
   */
  className?: string;
  /**
   * id элемента
   */
  id?: string;
  /**
   * определяет, включен ли чекбокс при первой отрисовке
   */
  defaultChecked?: boolean;
  /**
   * аналог value
   */
  checked?: boolean;
  /**
   * определяет включен или выключен контрол
   */
  disabled?: boolean;
  /**
   * определяет действие
   */
  onChange?: (value: string) => void;
  /**
   * если определено - подставляется вместо true, при checked = true
   */
  value?: string | number;
  /**
   * подцепляется к форме
   */
  name: string;
  /**
   * показывает тест рядом с checkbox
   */
  label: string;
}

export interface CheckboxInterface extends React.FC<CheckboxProps> {
  Redux: typeof CheckboxRedux;
}

const Checkbox: CheckboxInterface = ({
  className,
  id,
  label,
  value,
  disabled,
  name,
  onChange,
  defaultChecked = false,
}) => {
  const [checked, setChecked] = React.useState(defaultChecked);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return;
      }

      setChecked(event.target.checked);

      if (onChange) {
        onChange(event.target.value);
      }
    },
    [onChange, disabled]
  );

  React.useEffect(() => setChecked(defaultChecked), [defaultChecked]);

  return (
    <div
      className={classNames(
        styles.root,
        {
          [styles.disabled]: disabled,
          [styles.disabledChecked]: disabled && checked,
          [styles.checked]: !disabled && checked,
        },
        className
      )}
    >
      <label className={styles.wrapper} htmlFor={id}>
        <span className={styles.control}>
          <input
            type='checkbox'
            value={value}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            id={id}
            name={name}
          />

          <span className={styles.checkbox}>
            {!disabled && checked && <Icon name='done' />}
            {disabled && checked && <Icon name='done' />}
          </span>
        </span>

        {label}
      </label>
    </div>
  );
};

const CheckboxRedux = withReduxForm(Checkbox);

Checkbox.Redux = CheckboxRedux;

// Exports
export default Checkbox;
