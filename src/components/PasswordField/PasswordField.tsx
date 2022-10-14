// Core
import * as React from 'react';

// Components
import Input, { InputProps } from '@components/Input/Input';

// Utils
import withReduxForm from '@helpers/withReduxForm';

// Styles
import styles from './PasswordField.module.scss';
import Icon from "@components/Icons";

export interface PasswordFieldProps extends InputProps {
  eye?: boolean;
}

export interface PasswordFieldInterface extends React.FC<PasswordFieldProps> {
  Redux: typeof PasswordFieldRedux;
}

const PasswordField: PasswordFieldInterface = ({
  label = 'Пароль',
  type: typeProps = 'password',
  eye,
  ...props
}) => {
  const [type, setType] = React.useState(typeProps);

  const isPassword = type === 'password';

  const handleType = () => {
    setType(type === 'text' ? 'password' : 'text');
  };

  const prefix = <i className="icon-password" />;

  const suffix = eye && (
    <button type="button" className={styles.eyeButton}>
      <span onClick={handleType}>
        {isPassword? <Icon name='eye' /> : <Icon name='eyeSlash' />}
      </span>
    </button>
  );

  return (
    <Input
      {...props}
      type={type}
      label={label}
      prefix={prefix}
      suffix={suffix}
    />
  );
};

const PasswordFieldRedux = withReduxForm(PasswordField);

PasswordField.Redux = PasswordFieldRedux;

// Exports
export default PasswordField;
