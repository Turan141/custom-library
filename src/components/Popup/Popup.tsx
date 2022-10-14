// Core
import * as React from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import gsap from 'gsap';

// Helpers
import { useDropdown, PositionType } from '@helpers/useDropdown';

// Utils
import { cloneReferencedElement } from '@utils/cloneReferencedElement';

// Styles
import styles from './Popup.module.scss';

const ActionTypes = ['click', 'hover'] as const;

export type ActionType = typeof ActionTypes[number];

export interface PopupProps {
  /**
   * className для конфигурации
   */
  className?: string;
  /**
   * элемент, который отрендерится
   */
  trigger: React.ReactNode;
  /**
   * расположение меню относительно триггера
   */
  position?: PositionType;
  /**
   * действие, которое открывает меню
   */
  action?: ActionType;
  /**
   * сдвиг по по оси x
   */
  offsetX?: number;
  /**
   * сдвиг по оси y
   */
  offsetY?: number;
  /**
   * задержка перед открытием меню
   */
  mouseEnterDelay?: number;
  /**
   * задержка перед закрытием меню
   */
  mouseLeaveDelay?: number;
  /**
   * рендерит содержимое
   */
  renderChildren?: (close: () => void) => React.ReactNode;
  /**
   * колбек закрытия
   */
  onClose?: () => void;
}

export interface PopupInterface extends React.FC<PopupProps> {
}

const Popup: PopupInterface = ({
  className,
  trigger,
  position = 'bottom left',
  action = 'click',
  offsetX = 0,
  offsetY = 0,
  mouseEnterDelay = 0,
  mouseLeaveDelay = 0,
  renderChildren,
  onClose
}) => {
  const $timeout = React.useRef<any>(null);
  const $trigger = React.useRef<any>(null);

  const {
    Dropdown,
    isOpen,
    open,
    close,
  } = useDropdown({
    ref: $trigger,
    position: position,
    offsetX: offsetX,
    offsetY: offsetY,
    onClose
  });

  const handleMouseEnter = () => {
    clearTimeout($timeout.current);
    $timeout.current = setTimeout(open, mouseEnterDelay);
  };

  const handleMouseLeave = () => {
    clearTimeout($timeout.current);
    $timeout.current = setTimeout(() => {
      close();
    }, mouseLeaveDelay);
  };

  const handleToggle = () => {
    isOpen ? close() : open();
  };

  React.useEffect(() => {
    return () => clearTimeout($timeout.current);
  }, [isOpen]);

  const timeout = 200;

  const renderTrigger = () => {
    let triggerProps: any = {
      ref: (element: any) => $trigger.current = element,
    };

    const actions = Array.isArray(action) ? action : [action];

    actions.forEach((action) => {
      switch (action) {
        case 'click': {
          triggerProps.onClick = handleToggle;
          break;
        }

        case 'hover': {
          triggerProps.onMouseEnter = handleMouseEnter;
          triggerProps.onMouseLeave = handleMouseLeave;
          break;
        }
      }
    });

    return cloneReferencedElement(trigger, { ...triggerProps });
  };

  return (
    <>
      {renderTrigger()}

      <Transition
        in={isOpen}
        timeout={timeout}
        mountOnEnter
        unmountOnExit
        addEndListener={(node, done) => {
          gsap.to(node, timeout / 1000, {
            autoAlpha: isOpen ? 1 : 0,
            y: isOpen ? 6 : 0,
            onComplete: done,
          });
        }}
      >
        <Dropdown>
          <div className={classNames(styles.root, className)}>
            {renderChildren && renderChildren(close)}
          </div>
        </Dropdown>
      </Transition>
    </>
  );
};

// Exports
export default Popup;
