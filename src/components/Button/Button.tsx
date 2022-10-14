// Core
import * as React from 'react';
import classNames from 'classnames';

// Components
import Loader from '@components/Button/Loader';

// Helpers
import { useRipple } from '@helpers/useRipple';

// Styles
import styles from './Button.module.scss';

const ButtonVariantTypes = ['filled', 'text'] as const;
const ButtonShapeTypes = ['round', 'circle'] as const;
const ButtonHTMLTypes = ['submit', 'button', 'reset'] as const;

export type ButtonVariantType = typeof ButtonVariantTypes[number];
export type ButtonShapeType = typeof ButtonShapeTypes[number];
export type ButtonHTMLType = typeof ButtonHTMLTypes[number];

export interface BaseButtonProps {
  /**
   * дети компонента
   */
  children: React.ReactNode;
  /**
   * className для кастомтзации кнопки
   */
  className?: string;
  /**
   * основные варианты отображения, default to 'filled'
   */
  variant?: ButtonVariantType;
  /**
   * форма кнопки, default to 'round'
   */
  shape?: ButtonShapeType;
  /**
   * width: 100%
   */
  fullWidth?: boolean;
  /**
   * отображает прелоадер
   */
  loading?: boolean;
  /**
   * отключает кнопку
   */
  disabled?: boolean;
  /**
   * вставляет иконку слева
   */
  icon?: React.ReactNode;
}

export type NativeButtonProps = {
  /**
   * html type, default to 'button'
   */
  type?: ButtonHTMLType;
  /**
   * onClick callback
   */
  onClick?: () => void;
};

export type AnchorButtonProps = {
  /**
   * ссылка куда-то
   */
  href?: string;
};

export type ButtonRef = HTMLButtonElement | HTMLAnchorElement | null;

export type ButtonProps =
  & BaseButtonProps
  & AnchorButtonProps
  & NativeButtonProps;

const Button = React.forwardRef<ButtonRef, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'filled',
      shape = 'round',
      fullWidth,
      loading,
      disabled,
      type = 'button',
      onClick,
      icon,
      href,
      ...rest
    },
    ref,
  ) => {
    const $button = React.useRef<ButtonRef>(null);

    const Component: any = href ? 'a' : 'button';

    let additionalProps;

    if (Component === 'a') {
      additionalProps = { href };
    } else {
      additionalProps = { type, disabled, onClick };
    }

    useRipple($button);

    return (
      <Component
        {...rest}
        {...additionalProps}
        ref={(element: ButtonRef) => {
          $button.current = element;
          // @ts-ignore
          ref = element;
        }}
        className={classNames(
          styles.root,
          styles[variant],
          styles[shape],
          {
            [styles.disabled]: disabled,
            [styles.fullWidth]: fullWidth,
          },
          className,
        )}
      >
        {icon && !loading
          ? <span className={styles.icon}>{icon}</span>
          : null
        }

        {loading && !disabled
          ? <Loader />
          : children
        }
      </Component>
    );
  },
);

// Exports
export default React.memo(Button);
