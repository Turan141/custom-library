// Core
import React from 'react';
import classNames from 'classnames';

// Helpers
import withReduxForm from '@helpers/withReduxForm';

// Styles
import styles from './RadioButton.module.scss';
import Icon from "@components/Icons";

// Types
export interface RadioButtonProps {
    /**
    * className для кастомизации
    */
  className?: string;
    /**
     * id элемента
     */
  id?: string;
    /**
     * определяет, отмечен ли Radio Button при первой отрисовке
     */
  defaultChecked?: boolean;
    /**
     * выбран RadioButton или нет
     */
  checked?: boolean;
    /**
     * определяет включен или выключен контрол
     */
  disabled?: boolean;
    /**
     * определяет действие
     */
  onChange?: (value: boolean) => void;
    /**
     * если определено - подставляется вместо true, при checked = true
     */
  value?: string | number;
    /**
     * подцепляется к форме
     */
  name: string;
    /**
     * показывает текст рядом с radio
     */
  label: string;
}

export interface RadioButtonInterface extends React.FC<RadioButtonProps> {
  Redux: typeof RadioButtonRedux;
}

const RadioButton: RadioButtonInterface =
({
   className,
   id,
   label,
   value,
   disabled,
   name,
   onChange,
   checked = false,
 }) => {

  const handleChange = () => {
    if (disabled) {
      return;
    }
    onChange && onChange(!checked);
  }

    return (
    <div className={classNames(
      styles.root,
      {
        [styles.disabled]: disabled,
        [styles.checked]: !disabled && checked,
      },
      className)}
    >
      <label className={styles.wrapper} htmlFor={id}>
        <span className={styles.control}>
          <input
            type='radio'
            value={value}
            checked={checked}
            onClick={handleChange}
            disabled={disabled}
            id={id}
            name={name}
          />

          <span className={styles.radioButton}>
            {(!disabled && checked) && <Icon className={styles.radioButtonIcon} name='check'/>}
          </span>
        </span>

        {label}
      </label>
    </div>
  );
};

const RadioButtonRedux = withReduxForm(RadioButton);

RadioButton.Redux = RadioButtonRedux;

// Exports
export default RadioButton;
