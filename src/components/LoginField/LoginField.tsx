// Core
import * as React from 'react';
import classNames from 'classnames';

// Components
import Input, { InputProps } from '@components/Input/Input';

// Utils
import withReduxForm from '@helpers/withReduxForm';

// Styles
import styles from './LoginField.module.scss';

export interface LoginFieldInterface extends React.FC<InputProps> {
  Redux: typeof LoginFieldRedux;
}

const LoginField: LoginFieldInterface = ({
  className,
  type = 'text',
  label = 'Логин',
  ...props
}) => {
  const prefix = <i className="icon-user" />;

  return (
    <Input
      {...props}
      className={classNames(styles.root, className)}
      type={type}
      label={label}
      prefix={prefix}
    />
  );
};

const LoginFieldRedux = withReduxForm(LoginField);

LoginField.Redux = LoginFieldRedux;

// Exports
export default LoginField;
