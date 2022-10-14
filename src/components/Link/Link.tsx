// Core
import * as React from 'react';
import classNames from 'classnames';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

// Styles
import styles from './Link.module.scss';

export interface LinkProps {
  children: React.ReactNode,
  className?: string;
  external?: boolean;
  to: string;
}

const Link: React.FC<LinkProps> = ({
  children,
  className,
  external,
  to,
}) => {
  const externalProps = {
    rel: 'noopener norefferrer',
    target: '_blank',
  };

  const Component: Function = !external
    ? (props: RouterLinkProps) =>
      <RouterLink {...props} to={to} />
    : (props: React.HTMLProps<HTMLAnchorElement>) =>
      <a {...props} {...(external ? externalProps : {})} href={to} />;

  return (
    <Component className={classNames(styles.root, className)}>
      {children}
    </Component>
  );
};

// Exports
export default Link;
