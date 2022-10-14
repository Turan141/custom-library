// Core
import * as React from 'react';
import classNames from 'classnames';
import { isNumber, isBoolean } from 'lodash';

// Styles
import styles from './InputBase.module.scss';

export interface ChildrenProps {
  handleFocus: (event: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>) => void;
}

export interface InputBaseProps {
  children: (props: ChildrenProps) => React.ReactElement;
  className?: string;
  id?: string;
  value?: number | string;
  label?: string;
  placeholder?: string;
  error?: boolean | string | null;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onFocus?: (event?: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>) => void;
  onBlur?: (event?: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>) => void;
  onClick?: () => void;
}

const InputBase: React.ForwardRefExoticComponent<
  InputBaseProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef(({
  children,
  className,
  id,
  value,
  label,
  placeholder,
  error,
  disabled,
  prefix,
  suffix,
  onFocus,
  onBlur,
  onClick,
}, ref) => {
  const [focused, setFocused] = React.useState(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>) => {
    setFocused(true);
    onFocus && onFocus(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>) => {
    setFocused(false);
    onBlur && onBlur(event);
  };

  return (
    <div
      className={classNames(
        styles.root,
        {
          [styles.focused]: focused,
          [styles.failed]: !!error,
          [styles.disabled]: disabled,
        },
        className,
      )}
      onClick={onClick}
      ref={ref}
    >
      <label className={styles.control} htmlFor={id}>
        {prefix && <div className={styles.prefix}>{prefix}</div>}

        <div
          className={classNames(styles.wrapper, {
            [styles.isLabel]: !!label,
          })}
        >
          {label && (
            <span
              className={classNames(styles.label, {
                [styles.focused]: isNumber(value) || !!value || !!placeholder || focused,
              })}
            >
              {label}
            </span>
          )}

          {children({ handleFocus, handleBlur })}
        </div>

        {suffix && <div className={styles.suffix}>{suffix}</div>}
      </label>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
});

// Exports
export default InputBase;
