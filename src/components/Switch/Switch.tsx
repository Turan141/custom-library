// Core
import React, { useState } from 'react';
import classNames from 'classnames';

// Styles
import styles from './Switch.module.scss';
import withReduxForm from "@helpers/withReduxForm";


export interface SwitchProps {
  name: string,
  label?: string,
  className?: string;
  defaultChecked?: boolean
  checked?: boolean,
  onChange?: any,
  disabled?: boolean
}

export interface SwitchReduxInterface extends React.FC<SwitchProps> {
  Redux: typeof SwitchRedux;
}

const Switch: SwitchReduxInterface = ({ className, label, name, checked, defaultChecked, onChange, disabled }) => {
  const [active, setActive] = useState(defaultChecked || checked || false);

  const handleChange = () => {
    if (!disabled) {
      if (onChange) onChange(!active);
      setActive(!active);
    }
  };

  return (
    <div className={classNames(className, styles.Wrapper, active ? styles.active : styles.inactive)}>
      <div className={classNames(styles.switchWrapper)} onClick={handleChange}>
        <input type="checkbox" checked={active} onChange={handleChange} name={name} id={name} disabled={disabled}/>
        <span className={styles.switch}/>
      </div>
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

// Exports
const SwitchRedux = withReduxForm(Switch);

Switch.Redux = SwitchRedux;

export default Switch;
