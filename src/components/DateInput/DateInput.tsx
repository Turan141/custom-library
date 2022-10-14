// Core
import React from 'react';
import NumberFormat  from 'react-number-format';
import classNames from 'classnames';

// Components
import Input from '@components/Input';
import Icon from "@components/Icons";

// Types
import { NumberFormatProps }  from 'react-number-format'
import { InputProps } from '@components/Input/Input'

// Helpers
import withReduxForm from '@helpers/withReduxForm';
import dayjs from 'dayjs';
// Styles
import styles from './DataInput.module.scss';

const CustomInput: React.FC<InputProps> = ({ className, ...props }) => (
  <Input
    {...props}
    className={classNames(styles.input, className)}
    prefix={<Icon name='calendar' />}
  />
);

export interface DateInputInterface extends React.FC<NumberFormatProps>{
  Redux: typeof DateInputWithRedux;
}

const limit = (val: string, max: number) => {
  if (val.length === 1 && val[0] > `${max}`[0]) {
    val = '0' + val;
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      val = '01';

      //this can happen when user paste number
    } else if (Number(val) > max) {
      val = `${max}`;
    }
  }

  return val;
};

const dateConvert = (val: string) => {
  const date = limit(val.substring(0, 2), 31);
  const month = limit(val.substring(2, 4), 12);
  const year = val.substring(4, 8);

  return (date.length? `${date}` : 'ДД') +
    (month.length? `.${month}` : '.ММ') +
    (year.length? `.${year}` : '.ГГГГ')
}
const dateConvertUtc = (val: string) => {
  const data = dayjs(val, 'DD.MM.YYYY')
  return data.isValid() && val.length >= 10 ? data.format('DD.MM.YYYY') : dateConvert(val);
}
const DateInput: DateInputInterface = ({ className, ...props }) => (
  <NumberFormat
    {...props}
    format={props?.utc ? dateConvertUtc : dateConvert}
    customInput={CustomInput}
    className={classNames(styles.root, className)}
    allowEmptyFormatting
  />
);

const DateInputWithRedux = withReduxForm(DateInput);

DateInput.Redux = DateInputWithRedux;

// Exports
export default DateInput;
