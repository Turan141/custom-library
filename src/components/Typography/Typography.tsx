// Core
import * as React from 'react';
import classNames from 'classnames';

// Utils
import { capitalize } from '@utils/string';

// Styles
import styles from './Typography.module.scss';

const TypographyVariantTypes = ['h1', 'h2', 'h4', 'h5', 'p'] as const;
const TypographyColorTypes = ['light', 'dark'] as const;
const TypographySizeTypes = ['small', 'medium', 'large'] as const;

export type TypographyVariantType = typeof TypographyVariantTypes[number];
export type TypographyColorType = typeof TypographyColorTypes[number];
export type TypographySizeType = typeof TypographySizeTypes[number];

export interface TypographyProps {
    /**
     * Текст или элементы с текстом, к котором применится типография
     */
  children?: React.ReactNode;
    /**
     * className для конфигурурации
     */
  className?: string;
    /**
     * Вариант, аналогичен htmlType
     */
  variant?: TypographyVariantType;
    /**
     * цвет текста
     */
  color?: TypographyColorType;
    /**
     * размер текста
     */
  size?: TypographySizeType;
    /**
     * компонент - обернёт детей
     */
  component?: any;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  className,
  variant = 'p',
  color = 'dark',
  size = 'small',
  component: Component = 'span',
}) => (
  <Component
    className={classNames(
      styles.root,
      styles[variant],
      styles[color],
      {
        [styles[`${variant}${capitalize(color)}`]]: color,
        [styles[`${variant}${capitalize(size)}`]]: size,
      },
      className,
    )}
  >
    {children}
  </Component>
);

// Exports
export default Typography;

// Other Exports
export const H1 = (props: TypographyProps) => (
  <Typography {...props} component="h1" variant="h1" />
);

export const H2 = (props: TypographyProps) => (
  <Typography {...props} component="h2" variant="h2" />
);

export const H4 = (props: TypographyProps) => (
  <Typography {...props} component="h4" variant="h4" />
);

export const H5 = (props: TypographyProps) => (
  <Typography {...props} component="h5" variant="h5" />
);

export const P = (props: TypographyProps) => (
  <Typography {...props} component="p" variant="p" />
);
