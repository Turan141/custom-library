// Core
import * as React from 'react';
import classNames from 'classnames';

// Components
import InputBase from '@components/InputBase';

// Utils
import withReduxForm from '@helpers/withReduxForm';

// Styles
import styles from './Input.module.scss';

const InputHTMLTypes = [
  'text',
  'number',
  'password',
  'phone',
  'email',
  'tel',
] as const;

export type InputHTMLType = typeof InputHTMLTypes[number];

export interface InputProps {
  className?: string;
  id?: string;
  name?: string;
  value?: number | string;
  label?: string;
  placeholder?: string;
  type?: InputHTMLType;
  error?: boolean | string | null;
  autoFocus?: boolean;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  maxLength?: number;
  pattern?: string;
  onFocus?: (event?: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.FormEvent<HTMLInputElement>) => void;
}

//TODO: разобраться с этим недоразумением: не даёт доступ к .Redux из-за ForwardRef
export interface InputStatic extends React.ForwardRefExoticComponent<React.PropsWithoutRef<InputProps> & React.RefAttributes<HTMLInputElement>> {
  Redux: typeof InputRedux;
}

// @ts-ignore
const Input: InputStatic = React.forwardRef(({
  className,
  id,
  name,
  value,
  label,
  placeholder,
  type = 'text',
  error,
  autoFocus,
  disabled,
  prefix,
  suffix,
  maxLength,
  pattern,
  onFocus,
  onBlur,
  onChange,
  onKeyDown,
  ...props
}, ref) => (
  <InputBase
    className={classNames(styles.root, className)}
    id={id}
    value={value}
    label={label}
    placeholder={placeholder}
    disabled={disabled}
    error={error}
    prefix={prefix}
    suffix={suffix}
    onFocus={onFocus}
    onBlur={onBlur}
  >
    {({ handleFocus, handleBlur }) => (
      <input
        {...props}
        ref={ref}
        className={styles.input}
        id={id}
        name={name}
        value={value}
        type={type}
        autoFocus={autoFocus}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        pattern={pattern}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    )}
  </InputBase>
));

const InputRedux = withReduxForm(Input);

Input.Redux = InputRedux;

// Exports
export default Input;
