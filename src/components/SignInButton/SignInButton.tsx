// Core
import * as React from 'react';
import classNames from 'classnames';

// Assets
import Icon from '../../assets/images/union.svg';

// Styles
import styles from './SignInButton.module.scss';

export interface SignInButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const SignInButton: React.FC<SignInButtonProps> = ({
  children,
  className,
  ...props
}) => (
  <button {...props} className={classNames(styles.root, className)}>
    {children}

    <span className={styles.icon}>
      <Icon />
    </span>
  </button>
);

// Exports
export default SignInButton;
