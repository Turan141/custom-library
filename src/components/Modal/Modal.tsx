// Core
import * as React from 'react';
import classNames from 'classnames';
import { Portal } from 'react-portal';
import { Transition } from 'react-transition-group';
import gsap from 'gsap';

// Styles
import styles from './Modal.module.scss';

export interface ModalProps {
  children?: React.ReactNode | ((data: any) => React.ReactNode);
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  style?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = React.forwardRef(
  (
    { children, className, style, isOpen, onClose, ...props },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const $content = React.useRef<HTMLDivElement>(null);
    const $backdrop = React.useRef<HTMLDivElement>(null);

    const handleClose = () => {
      onClose && onClose();
    };

    const handleEnterAnimation = () => {
      gsap.set($content.current, { autoAlpha: 0, yPercent: -20 });
      gsap.set($backdrop.current, { autoAlpha: 0 });

      gsap.to($content.current, timeout / 1000, { autoAlpha: 1, yPercent: 0 });
      gsap.to($backdrop.current, timeout / 1000, { autoAlpha: 1 });
    };

    const handleExitAnimation = () => {
      gsap.set($content.current, { autoAlpha: 1, yPercent: 0 });
      gsap.set($backdrop.current, { autoAlpha: 1 });

      gsap.to($content.current, timeout / 1000, {
        autoAlpha: 0,
        yPercent: -20,
      });
      gsap.to($backdrop.current, timeout / 1000, { autoAlpha: 0 });
    };

    const timeout = 200;

    return (
      <Transition
        in={isOpen}
        timeout={timeout}
        mountOnEnter
        unmountOnExit
        onEnter={handleEnterAnimation}
        onExit={handleExitAnimation}
      >
        <Portal>
          <div ref={ref} className={classNames(styles.root, className)}>
            <div
              ref={$backdrop}
              className={styles.backdrop}
            />

            <div ref={$content} className={styles.content} style={style}>
              <button className={styles.close} onClick={handleClose}>
                <i className='icon-closed' />
              </button>

              {typeof children === 'function'
                ? (children as Function)({ ...props })
                : React.isValidElement(children)
                ? React.cloneElement(children, {
                    ...(children.props ?? {}),
                    ...props,
                  })
                : children}
            </div>
          </div>
        </Portal>
      </Transition>
    );
  }
);

// Exports
export default Modal;
