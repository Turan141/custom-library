// Core
import * as React from 'react';
import classNames from 'classnames';
import NumberFormat, { NumberFormatProps }  from 'react-number-format';

// Components
import Input, { InputProps } from '@components/Input/Input';

// Utils
import withReduxForm from '@helpers/withReduxForm';

// Styles
import styles from './PhoneField.module.scss';
import Icon from "@components/Icons";

const CustomInput: React.FC<InputProps> = ({ className, ...props }) => (
  <Input
    {...props}
    className={classNames(styles.customInput, className)}
    prefix={<Icon name='phoneMobile'/>}
  />
);

export interface PhoneFieldInterface extends React.FC<NumberFormatProps> {
  Redux: typeof PhoneFieldRedux;
}

const PhoneField: PhoneFieldInterface = ({ className, ...props }) => (
  <NumberFormat
    {...props}
    className={classNames(styles.root, className)}
    customInput={CustomInput}
    format="+7 (###) ###-##-##"
    mask="_"
    allowEmptyFormatting
  />
);

const PhoneFieldRedux = withReduxForm(PhoneField);

PhoneField.Redux = PhoneFieldRedux;

// Exports
export default PhoneField;
