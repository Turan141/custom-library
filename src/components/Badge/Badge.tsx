// Core
import * as React from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import gsap from 'gsap';

// Styles
import styles from './Badge.module.scss';

export interface BadgeProps {
  /**
   * Рядом с обёрнутым компонентом отобразится Badge
   */
  children: React.ReactNode;
  /**
   * класс нейм для конфигуркции
   */
  className?: string;
  /**
   * отобразится внутри Badge
   */
  content: React.ReactNode;
  /**
   * Максимальное значение, если контент - число
   */
  max?: number;
  /**
   * Показывать ли нули. дефолт - false
   */
  showZero?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  content,
  max = 99,
  showZero,
}) => {
  const numberedContent =
    (content as number) > (max as number) ? `+${max}` : content;

  const isZero = numberedContent === '0' || numberedContent === 0;

  const isHidden = React.useMemo(() => {
    const isEmpty =
      numberedContent === null ||
      numberedContent === undefined ||
      numberedContent === '';

    return isEmpty || (isZero && !showZero);
  }, [numberedContent, isZero, showZero]);

  const timeout = 100;

  return (
    <div
      className={classNames(
        styles.root,
        {
          [styles.hidden]: isHidden,
        },
        className,
      )}
    >
      {children}

      <Transition
        in={!isHidden}
        timeout={timeout}
        mountOnEnter
        unmountOnExit
        addEndListener={(node, done) => {
          gsap.to(node, timeout / 1000, {
            scale: !isHidden ? 1 : 0,
            onComplete: done,
          });
        }}
      >
        <span className={styles.badge}>{content}</span>
      </Transition>
    </div>
  );
};

// Exports
export default React.memo(Badge);
